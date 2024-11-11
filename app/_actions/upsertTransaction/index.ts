"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { upsertTransactionSchema } from "./upsertTransactionSchema";
import { revalidatePath } from "next/cache";

interface UpsertransactionParams {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}

export const upsertTransaction = async (params: UpsertransactionParams) => {
  const parsedParams = upsertTransactionSchema.parse(params);
  const { userId } = auth();
  if (!userId) throw new Error("Não autorizado!");

  if (params.id) {
    await db.transaction.upsert({
      where: { id: params.id },
      create: { ...parsedParams, userId },
      update: { ...parsedParams, userId },
    });
  } else {
    await db.transaction.create({
      data: { ...parsedParams, userId },
    });
  }

  revalidatePath("/transactions");
};
