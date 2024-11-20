import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./SummaryCard";

interface SummaryData {
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  balance: number;
}
interface SummaryCardsProps {
  summaryData: SummaryData | undefined;
}

const SummaryCards = ({ summaryData }: SummaryCardsProps) => {
  return (
    <div className="space-y-6">
      {/* Card superior */}
      <SummaryCard
        icon={<WalletIcon size={20} className="mt-2 text-white" />}
        title="Saldo"
        amount={summaryData?.balance}
        size="large"
      />
      {/**Cards Inferiores */}
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} className="mt-3 text-white" />}
          title="Investimento"
          amount={summaryData?.investmentsTotal}
          size="small"
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="mt-3 text-primary" />}
          title="Receita"
          amount={summaryData?.depositsTotal}
          size="small"
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="mt-3 text-red-500" />}
          title="Despesa"
          amount={summaryData?.expensesTotal}
          size="small"
        />
      </div>
    </div>
  );
};

export default SummaryCards;
