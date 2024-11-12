import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import { db } from "../_lib/prisma";
import AddTransactionButton from "../_components/addTransactionButton";

const TransactionsPage = async () => {
  //acessa transactions no database
  const transactions = await db.transaction.findMany({});
  return (
    <>
      <div className="space-y-6 p-6">
        {/* TITULO e BOTÃO*/}
        <div className="flex-full flex items-center justify-between p-6">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>
        <DataTable columns={transactionColumns} data={transactions} />
      </div>
    </>
  );
};

export default TransactionsPage;
