"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import { XCircle } from "lucide-react";

const PaymentErrorPage = () => {
  const tryAgain = () => {
    window.location.href = "/planos";
  };

  const goToSupport = () => {
    window.location.href = "/suporte";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-red-50 p-4">
      <Card className="w-full max-w-md border-red-500">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <XCircle className="h-10 w-10 text-red-600" />
            Falha no Pagamento
          </CardTitle>
          <CardDescription>
            Não foi possível processar sua assinatura
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p>Verifique os detalhes do seu cartão ou tente novamente.</p>
          <div className="flex justify-center space-x-4">
            <Button variant="destructive" onClick={tryAgain}>
              Tentar Novamente
            </Button>
            <Button variant="secondary" onClick={goToSupport}>
              Suporte
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentErrorPage;
