"use client";

import SummaryCards from "./_components/SummaryCards";
import { DatePickerWithRange } from "../_components/ui/date-picker-range";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import fetchSummaryData from "../_lib/FetchSummaryData";
import { revalidatePath } from "next/cache";
import TransactionPieChart from "./_components/TransactionsPieChart";
import { TransactionPercentagePerType } from "../types/TransactionPercentagePerType";
import ExpensesByCategory from "./_components/ExpensesByCategory";
import TransactionListArea from "./_components/TransactionListArea";
import { Transaction } from "@prisma/client";

interface SummaryData {
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  balance: number;
  typesPercentage: TransactionPercentagePerType;
  categorizedExpenses:
    | Array<{
        category: string;
        totalAmount: number;
        percentage: number;
      }>
    | undefined;
  lastTransactions: Transaction[] | undefined;
}

const Home = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: searchParams.get("startDate")
      ? new Date(searchParams.get("startDate")!)
      : addDays(new Date(), -30),
    to: searchParams.get("endDate")
      ? new Date(searchParams.get("endDate")!)
      : new Date(),
  });

  const [summaryData, setSummaryData] = useState<SummaryData | undefined>(
    undefined,
  );

  const { userId } = useAuth();
  if (!userId) {
    redirect("/login");
  }

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from && range?.to) {
      router.push(
        `/?startDate=${range.from.toISOString().split("T")[0]}&endDate=${range.to.toISOString().split("T")[0]}`,
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (dateRange?.from && dateRange?.to) {
        try {
          const startDate = dateRange.from.toISOString().split("T")[0];
          const endDate = dateRange.to.toISOString().split("T")[0];
          const data = await fetchSummaryData(startDate, endDate);
          if (data) {
            console.log(data);
            setSummaryData({
              ...data,
              categorizedExpenses: data.categorizedExpenses.map((expense) => ({
                category: expense.category,
                totalAmount: Number(expense.totalAmount || 0),
                percentage: expense.percentage,
              })),
            });
            revalidatePath("/dashboard");
          }
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      }
    };

    fetchData();
  }, [dateRange?.from, dateRange?.to, searchParams]);

  return (
    <div className="flex h-full flex-col gap-6 overflow-hidden p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <DatePickerWithRange
          dateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
        />
      </div>
      <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
        <div className="flex flex-col gap-6 overflow-hidden">
          <SummaryCards summaryData={summaryData} />
          <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
            <TransactionPieChart pieChartData={summaryData} />
            {summaryData && (
              <ExpensesByCategory
                expensesByCategory={summaryData.categorizedExpenses}
              />
            )}
          </div>
        </div>
        <TransactionListArea lastTransactions={summaryData?.lastTransactions} />
      </div>
    </div>
  );
};

export default Home;
