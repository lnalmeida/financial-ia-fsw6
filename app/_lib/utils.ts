import { TransactionType } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value));
};

export const setPrefixByType = (type: TransactionType) => {
  if (type === TransactionType.EXPENSE) return "- ";
  return "+";
};

export const setColorByType = (type: TransactionType) => {
  if (type === TransactionType.DEPOSIT) return "text-primary";
  if (type === TransactionType.EXPENSE) return "text-red-500";
  return "text-white";
};
