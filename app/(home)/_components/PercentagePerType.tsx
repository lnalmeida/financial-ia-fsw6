import { ReactNode } from "react";

interface PercentagePerTypeProps {
  title: string;
  icon: ReactNode;
  tytransactionTypepe: ReactNode;
}
const PercentagePerType = ({
  title,
  icon,
  tytransactionTypepe,
}: PercentagePerTypeProps) => {
  return (
    <div className="flex items-center justify-between">
      {/**Icone */}
      <div className="flex items-center gap-2">
        <div className="rounded-sm bg-white bg-opacity-10 p-2">{icon}</div>
        <p>{title}</p>
      </div>
      {/**Porcentagem */}
      <p>{tytransactionTypepe}%</p>
    </div>
  );
};

export default PercentagePerType;
