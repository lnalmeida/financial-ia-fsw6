"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionType } from "@prisma/client";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { TransactionPercentagePerType } from "@/app/types/TransactionPercentagePerType";
import PercentagePerType from "./PercentagePerType";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investimentos",
    color: "#FFFFFF",
  },
  [TransactionType.DEPOSIT]: {
    label: "Receitas",
    color: "#55B02E",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#E93030",
  },
} satisfies ChartConfig;

interface TransactionPieChartData {
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  typesPercentage: TransactionPercentagePerType;
}

interface TransactionPieChartProps {
  pieChartData: TransactionPieChartData | undefined;
}

const TransactionPieChart = ({ pieChartData }: TransactionPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: pieChartData?.depositsTotal,
      fill: "#55B02E",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: pieChartData?.investmentsTotal,
      fill: "#FFFFFF",
    },
    {
      type: TransactionType.EXPENSE,
      amount: pieChartData?.expensesTotal,
      fill: "#E93030",
    },
  ];

  return (
    <Card className="flex flex-col p-6">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
        <div className="space-y-3">
          <PercentagePerType
            title="Receita"
            icon={<TrendingUpIcon size={16} className="text-primary" />}
            tytransactionTypepe={
              pieChartData?.typesPercentage[TransactionType.DEPOSIT]
            }
          />
          <PercentagePerType
            title="Despesa"
            icon={<TrendingDownIcon size={16} className="text-red-500" />}
            tytransactionTypepe={
              pieChartData?.typesPercentage[TransactionType.EXPENSE]
            }
          />
          <PercentagePerType
            title="Investimento"
            icon={
              <PiggyBankIcon
                size={16}
                className="rounded-sm bg-white bg-opacity-10 text-white"
              />
            }
            tytransactionTypepe={
              pieChartData?.typesPercentage[TransactionType.INVESTMENT]
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionPieChart;
