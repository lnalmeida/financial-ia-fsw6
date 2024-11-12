import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/app/_components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useToast } from "@/app/_hooks/use-toast";
import { deleteTransaction } from "@/app/_actions/deleteTransaction";

interface DeleteTransactionConfirmationDialogProps {
  isOpen: boolean;
  transactionId: string;
  setIsOpen: (open: boolean) => void;
}

const DeleteTransactionConfirmationDialog = ({
  isOpen,
  setIsOpen,
  transactionId,
}: DeleteTransactionConfirmationDialogProps) => {
  const { toast } = useToast();

  const handleDeleteTransaction = async () => {
    try {
      console.log("Click");
      await deleteTransaction({ id: transactionId });
      setIsOpen(false);
      toast({
        variant: "warning",
        description: "Transação deletada com sucesso.",
      });
    } catch (e) {
      console.error(e);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar a transação.",
      });
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deletar transação</DialogTitle>
          </DialogHeader>
          <h1 className="text-bold text-3xl text-accent-foreground">
            ATENÇÃO!!!
          </h1>
          <p className="text-bold text-2xl text-accent-foreground">
            Esta operação não pode ser desfeita. Deseja realmente EXCLUIR a
            transação?
          </p>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              type="button"
              onClick={() => handleDeleteTransaction()}
            >
              Deletar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteTransactionConfirmationDialog;
