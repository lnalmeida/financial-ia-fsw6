import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { Progress } from "@/app/_components/ui/progress";
import { ScrollArea } from "@/app/_components/ui/scroll-area";

interface ExpensesByCategoryProps {
  expensesByCategory:
    | Array<{
        category: string;
        totalAmount: number;
        percentage: number;
      }>
    | undefined;
}
const ExpensesByCategory = ({
  expensesByCategory,
}: ExpensesByCategoryProps) => {
  return (
    <ScrollArea className="col-span-2 h-full rounded-md border p-6">
      <CardHeader>
        <CardTitle className="text-center text-lg font-bold">
          Despesas por categoria
        </CardTitle>
      </CardHeader>
      <CardContent>
        {expensesByCategory?.map((expense) => (
          <div className="space-y-3 p-6" key={expense.category}>
            <div className="space-y-2 rounded-md p-2">
              <div className="flex-start flex justify-between font-bold">
                <p>{expense.category}</p>
                <p>{expense.percentage}%</p>
              </div>
              <Progress value={expense.percentage} />
            </div>
            <p className="ml-2 text-muted-foreground">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(expense.totalAmount)}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default ExpensesByCategory;
