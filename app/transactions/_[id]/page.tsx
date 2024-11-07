interface TransactionProps {
    params: {
        id: number;
    }
}

const Transaction =  ({params: {id}}: TransactionProps) => {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1>Transaction {id}  - Foma dce passar parâmetros de rota no NEXTJS</h1>
        </div>
    )
}

export default Transaction;