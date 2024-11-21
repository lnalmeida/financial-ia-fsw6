import { ScrollArea } from "@/app/_components/ui/scroll-area";

const TransactionListArea = () => {
  return (
    <ScrollArea className="ml-6 flex flex-col space-y-6 rounded-md border p-2">
      <div className="w-full">Last Transactions</div>
    </ScrollArea>
  );
};

export default TransactionListArea;
