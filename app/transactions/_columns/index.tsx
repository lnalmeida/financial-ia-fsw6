"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from "@/app/_constants/transactions";
import { Transaction, TransactionType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon, Trash2Icon } from "lucide-react";
import EditTransactionButton from "../_components/editTransactionButton";

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => {
      if (transaction.type === TransactionType.DEPOSIT)
        return (
          <Badge className="bg-muted text-primary hover:bg-muted">
            <CircleIcon className="mr-2 fill-primary" size={10} />
            Depósito
          </Badge>
        );
      if (transaction.type === TransactionType.EXPENSE)
        return (
          <Badge className="hover:bg-danger-100 bg-danger bg-opacity-10 font-bold text-danger">
            <CircleIcon className="mr-2 fill-danger" size={10} />
            Despesa
          </Badge>
        );
      if (transaction.type === TransactionType.INVESTMENT)
        return (
          <Badge className="hover:bg-white-100 bg-white bg-opacity-10 font-bold text-white">
            <CircleIcon className="mr-2 fill-white" size={10} />
            Investimento
          </Badge>
        );
      return (
        <Badge className="hover:bg-blue bg-blue-400 bg-opacity-15 font-bold text-blue-400">
          <CircleIcon className="mr-2 fill-blue-400" size={10} />
          Doação
        </Badge>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_CATEGORY_LABELS[transaction.category],
  },
  {
    accessorKey: "paymentMethod",
    header: "Método",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod],
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: transaction } }) =>
      new Date(transaction.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transaction } }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(transaction.amount)),
  },

  //coluna para os botões
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: transaction } }) => (
      <div className="space-x-1">
        <EditTransactionButton transaction={transaction} />
        <Button
          title="Excluir"
          variant="ghost"
          size="icon"
          className="hover: group bg-transparent"
        >
          <Trash2Icon className="transition-colors group-hover:text-danger" />
        </Button>
      </div>
    ),
  },
];
