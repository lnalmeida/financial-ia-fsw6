import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import { db } from "../_lib/prisma";
import AddTransactionButton from "../_components/addTransactionButton";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "../_components/ui/scroll-area";

const TransactionsPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  //acessa transactions no database
  const transactions = await db.transaction.findMany({
    where: { userId },
  });
  return (
    <>
      <div className="space-y-6 overflow-hidden p-6">
        {/* TITULO e BOTÃO*/}
        <div className="flex-full flex items-center justify-between p-6">
          <h1 className="-ml-4 text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>
        <ScrollArea>
          <DataTable columns={transactionColumns} data={transactions} />
        </ScrollArea>
      </div>
    </>
  );
};

export default TransactionsPage;
