import { Trash2Icon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { useState } from "react";
import { Transaction } from "@prisma/client";
import DeleteTransactionConfirmationDialog from "./deleteTransactionConfirmationDialog";

interface DeleteTransactionButtonProps {
  transaction: Transaction;
}

const DeleteTransactionButton = ({
  transaction,
}: DeleteTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        title="Deletar"
        variant="ghost"
        size="icon"
        className="hover: group bg-transparent"
        onClick={() => setDialogIsOpen(true)}
      >
        <Trash2Icon className="transition-colors group-hover:text-danger" />
      </Button>
      <DeleteTransactionConfirmationDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        transactionId={transaction.id}
      />
    </>
  );
};

export default DeleteTransactionButton;
