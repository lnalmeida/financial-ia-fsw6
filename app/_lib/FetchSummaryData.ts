"use server";

import { db } from "../_lib/prisma";

const fetchSummaryData = async (
  startDate: string | undefined,
  endDate: string | undefined,
) => {
  try {
    const where = {
      date: {
        gte: startDate,
        lt: endDate,
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

    return {
      depositsTotal,
      investmentsTotal,
      expensesTotal,
      balance,
    };
    console.log("funcionou");
  } catch (error) {
    console.error("erro ao acessar dados: ", error);
  }
};

export default fetchSummaryData;
