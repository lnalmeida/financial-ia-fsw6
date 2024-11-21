import { TransactionCategory } from "@prisma/client";

export type TransactiosPerCategory = {
  [key in TransactionCategory]: number;
};
