"use server";

import { TransactionType } from "@prisma/client";
import { db } from "../_lib/prisma";
import { TransactionPercentagePerType } from "../types/TransactionPercentagePerType";
import { TRANSACTION_CATEGORY_LABELS } from "../_constants/transactions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const fetchSummaryData = async (startDate: string, endDate: string) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("User is not logged!");
      redirect("/login");
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const where = {
      userId: { equals: userId },
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
      category: TRANSACTION_CATEGORY_LABELS[expense.category],
      totalAmount: expense._sum.amount,
      percentage: Math.round(
        (Number(expense._sum.amount || 0) / expensesTotal) * 100,
      ),
    }));

    const lastTransactions = await db.transaction.findMany({
      where,
      orderBy: {
        date: "desc",
      },
      take: 10,
    });

    console.log(expensesByCategory, categorizedExpenses, lastTransactions);

    return {
      depositsTotal,
      investmentsTotal,
      expensesTotal,
      balance,
      typesPercentage,
      categorizedExpenses,
      lastTransactions,
    };
    console.log("funcionou");
  } catch (error) {
    console.error("erro ao acessar dados: ", error);
  }
};

export default fetchSummaryData;
