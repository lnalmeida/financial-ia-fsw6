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
      [TransactionType.INVESTMENT]: Math.round(
        (Number(investmentsTotal || 0) / Number(transactionsTotal)) * 100,
      ),
      [TransactionType.DONATION]: 0,
    };

    const expensesByCategory = await db.transaction.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionType.EXPENSE,
      },

      _sum: { amount: true },
    });

    const categorizedExpenses = expensesByCategory.map((expense) => ({
      category: expense.category,
      totalAmount: expense._sum.amount,
      percentage: Math.round(
        (Number(expense._sum.amount || 0) / expensesTotal) * 100,
      ),
    }));

    console.log(expensesByCategory, categorizedExpenses);

    return {
      depositsTotal,
      investmentsTotal,
      expensesTotal,
      balance,
      typesPercentage,
      categorizedExpenses,
    };
    console.log("funcionou");
  } catch (error) {
    console.error("erro ao acessar dados: ", error);
  }
};

export default fetchSummaryData;
