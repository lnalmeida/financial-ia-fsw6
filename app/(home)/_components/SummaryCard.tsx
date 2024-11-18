import AddTransactionButton from "@/app/_components/addTransactionButton";
import { Card, CardHeader, CardContent } from "@/app/_components/ui/card";
import { ReactNode } from "react";

interface SujmmaryCardProps {
  title: string;
  icon: ReactNode;
  amount: number | undefined;
  size?: "small" | "large";
}

const SummaryCard = ({
  title,
  icon,
  amount = 0,
  size = "small",
}: SujmmaryCardProps) => {
  return (
    <Card className="px-6">
      <CardHeader className="flex-row items-start gap-4">
        {icon}
        <p
          className={`${size === "small" ? "text-muted-foreground" : "text-white opacity-70"}`}
        >
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p
          className={`font-bold ${size === "small" ? "text-2xl" : "text-4xl"} ${size === "large" && amount < 0 ? "text-red-500" : "text-white opacity-70"} `}
        >
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>
        {size === "large" && <AddTransactionButton />}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
