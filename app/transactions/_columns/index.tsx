"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon } from "lucide-react";

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
        <Badge className="bg-blue hover:bg-blue bg-opacity-10 font-bold text-blue-400">
          <CircleIcon className="mr-2 fill-blue-400" size={10} />
          Doação
        </Badge>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "paymentMethod",
    header: "Método",
  },
  {
    accessorKey: "date",
    header: "Data",
  },
  {
    accessorKey: "amount",
    header: "Valor",
  },

  //coluna para os botões
  {
    accessorKey: "actions",
    header: "",
  },
];
