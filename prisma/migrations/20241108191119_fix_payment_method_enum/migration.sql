/*
  Warnings:

  - The values [CREDITI_CARD] on the enum `TransactionPaymentMethod` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TransactionPaymentMethod_new" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'BANK_SLIP', 'CASH', 'PIX', 'BITCOIN', 'OTHER');
ALTER TABLE "Transaction" ALTER COLUMN "paymentMethod" TYPE "TransactionPaymentMethod_new" USING ("paymentMethod"::text::"TransactionPaymentMethod_new");
ALTER TYPE "TransactionPaymentMethod" RENAME TO "TransactionPaymentMethod_old";
ALTER TYPE "TransactionPaymentMethod_new" RENAME TO "TransactionPaymentMethod";
DROP TYPE "TransactionPaymentMethod_old";
COMMIT;
