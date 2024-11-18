"use client";

import SummaryCards from "./_components/SummaryCards";
import { DatePickerWithRange } from "../_components/ui/date-picker-range";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import fetchSummaryData from "../_lib/FetchSummaryData";

interface SummaryData {
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  balance: number;
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
          const data = await fetchSummaryData(
            dateRange.from.toISOString(),
            dateRange.to.toISOString(),
          );
          console.log(data);
          setSummaryData(data);
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      }
    };

    fetchData();
  }, [dateRange?.from, dateRange?.to]);

  return (
    <>
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <DatePickerWithRange
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
          />
          {/* <MonthSelect /> */}
        </div>
        <SummaryCards summaryData={summaryData} />
      </div>
    </>
  );
};

export default Home;
