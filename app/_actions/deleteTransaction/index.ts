"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface DeleteTransactionParams {
  id: string;
}

export const deleteTransaction = async (params: DeleteTransactionParams) => {
  const { userId } = auth();
  if (!userId) throw new Error("Não autorizado!");

  if (params.id) {
    await db.transaction.delete({
      where: { id: params.id },
    });
  } else {
    throw new Error("Transação inválida ou usuário não autorizado.");
  }

  revalidatePath("/transactions");
};
