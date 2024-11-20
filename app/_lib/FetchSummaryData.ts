"use server";

import { TransactionType } from "@prisma/client";
import { db } from "../_lib/prisma";
import { TransactionPercentagePerType } from "../types/TransactionPercentagePerType";

const fetchSummaryData = async (startDate: string, endDate: string) => {
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const where = {
      date: {
        gte: start,
        lte: end,
      },
    };

    // Lógica de busca dos valores diretamente do banco
    const depositsTotal = Number(
      (
        await db.transaction.aggregate({
          where: { ...where, type: "DEPOSIT" },
          _sum: { amount: true },
        })
      )?._sum?.amount,
    );

    const investmentsTotal = Number(
      (
        await db.transaction.aggregate({
          where: { ...where, type: "INVESTMENT" },
          _sum: { amount: true },
        })
      )?._sum?.amount,
    );

    const expensesTotal = Number(
      (
        await db.transaction.aggregate({
          where: { ...where, type: "EXPENSE" },
          _sum: { amount: true },
        })
      )?._sum?.amount,
    );

    const balance = depositsTotal - investmentsTotal - expensesTotal;

    const transactionsTotal = Number(
      (
        await db.transaction.aggregate({
          where,
          _sum: { amount: true },
        })
      )._sum.amount,
    );

    const typesPercentage: TransactionPercentagePerType = {
      [TransactionType.DEPOSIT]: Math.round(
        (Number(depositsTotal || 0) / Number(transactionsTotal)) * 100,
      ),
      [TransactionType.EXPENSE]: Math.round(
        (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
      ),
      [TransactionType.INVESTMENT]: Math.ceil(
        (Number(investmentsTotal || 0) / Number(transactionsTotal)) * 100,
      ),
      [TransactionType.DONATION]: 0,
    };

    return {
      depositsTotal,
      investmentsTotal,
      expensesTotal,
      balance,
      typesPercentage,
    };
    console.log("funcionou");
  } catch (error) {
    console.error("erro ao acessar dados: ", error);
  }
};

export default fetchSummaryData;
