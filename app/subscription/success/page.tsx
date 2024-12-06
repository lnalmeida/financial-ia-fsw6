"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import { Check } from "lucide-react";

const PaymentSuccessPage = () => {
  const navigateToDashboard = () => {
    window.location.href = "/";
  };

  const [timer, setTimer] = useState(5);
  const autoNavigateToDashboard = () => {
    setTimeout(() => {
      setTimer(timer - 1);
      if (timer === 1) {
        navigateToDashboard();
      }
    }, 1000);
  };

  useEffect(() => {
    autoNavigateToDashboard();
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="mb-4 flex items-center justify-center gap-2 text-2xl text-muted-foreground">
            <Check className="h-10 w-10 text-green-600" />
            Pagamento Concluído
          </CardTitle>
          <CardDescription className="text-center text-xl text-muted-foreground">
            Seu plano Premium foi ativado com sucesso!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-center text-muted-foreground">
          <p>
            Agora você tem acesso completo a todos os recursos do plano Premium.
          </p>
          {/* <div className="flex justify-center space-x-4 font-semibold text-white">
            <Button onClick={navigateToDashboard}>Ir para Dashboard</Button>
          </div> */}
          <div className="flex justify-center space-x-4 font-semibold text-white">
            <Button onClick={navigateToDashboard}>
              Você sera redirecionado em {timer} segundos
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;
