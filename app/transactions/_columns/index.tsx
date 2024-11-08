"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from "@/app/_constants/transactions";
import { Transaction, TransactionType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon, PencilIcon, Trash2Icon } from "lucide-react";

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
            <CircleIcon className="fill-primary mr-2" size={10} />
            Depósito
          </Badge>
        );
      if (transaction.type === TransactionType.EXPENSE)
        return (
          <Badge className="bg-danger text-danger hover:bg-danger-100 bg-opacity-10 font-bold">
            <CircleIcon className="fill-danger mr-2" size={10} />
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
    cell: () => (
      <div>
        <Button
          title="Editar"
          variant="ghost"
          size="icon"
          className="hover: group bg-transparent"
        >
          <PencilIcon className="transition-colors group-hover:text-blue-400" />
        </Button>
        <Button
          title="Excluir"
          variant="ghost"
          size="icon"
          className="hover: group bg-transparent"
        >
          <Trash2Icon className="group-hover:text-danger transition-colors" />
        </Button>
      </div>
    ),
  },
];
