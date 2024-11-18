interface TransactionProps {
  params: {
    id: number;
  };
}

const Transaction = ({ params: { id } }: TransactionProps) => {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <h1>Transaction {id} - Forma dce passar parâmetros de rota no NEXTJS</h1>
    </div>
  );
};

export default Transaction;
