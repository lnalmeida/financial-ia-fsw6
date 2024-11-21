import { Button } from "@/app/_components/ui/button";
import { CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_IMAGES,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from "@/app/_constants/transactions";
import {
  formatCurrency,
  formatDate,
  setColorByType,
  setPrefixByType,
} from "@/app/_lib/utils";
import { Transaction } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface TransactionListAreaProps {
  lastTransactions: Transaction[] | undefined;
}

const TransactionListArea = ({
  lastTransactions,
}: TransactionListAreaProps) => {
  return (
    <ScrollArea className="ml-6 rounded-md border px-6">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="-ml-5 text-lg font-bold">
          Últimas transações
        </CardTitle>
        <Button
          variant="outline"
          className="-mr-7 rounded-full font-bold"
          asChild
        >
          <Link href="/transactions"> ver main...</Link>
        </Button>
      </CardHeader>
      {lastTransactions?.map((transaction) => (
        <div
          key={transaction.id}
          className="mb-3 flex flex-row items-center justify-between gap-2"
        >
          <div className="flex flex-row justify-center gap-3">
            <div className="justify-center rounded-md bg-white bg-opacity-[3%] p-3">
              <Image
                width={20}
                height={20}
                alt={
                  TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod]
                }
                src={
                  TRANSACTION_PAYMENT_METHOD_IMAGES[transaction.paymentMethod]
                }
              />
            </div>
            <div>
              <p className="font-bold">
                {TRANSACTION_CATEGORY_LABELS[transaction.category]}
              </p>
              <p className="text-muted-foreground">
                {formatDate(transaction.date)}
              </p>
            </div>
          </div>
          <div>
            <p
              className={`text-lg font-bold ${setColorByType(transaction.type)}`}
            >
              {" "}
              {`${setPrefixByType(transaction.type)}${formatCurrency(Number(transaction.amount))}`}{" "}
            </p>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};

export default TransactionListArea;
