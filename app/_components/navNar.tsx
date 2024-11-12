"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathName = usePathname();
  return (
    <nav className="flex justify-between">
      {/**Esquerda */}
      <div className="flex items-center gap-10 border-b border-solid px-8 py-4">
        <Image src="/logo.svg" width={173} height={39} alt="Logo finance-ai" />
        <Link
          href="/"
          className={
            pathName === "/"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Dashboard
        </Link>
        <Link
          href="/transactions"
          className={
            pathName === "/transactions"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Transações
        </Link>
        <Link
          href="/subscription"
          className={
            pathName === "/subscription"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Assinatura
        </Link>
      </div>
      <div className="px-8 py-4">
        <UserButton showName />
      </div>
    </nav>
  );
};

export default NavBar;
