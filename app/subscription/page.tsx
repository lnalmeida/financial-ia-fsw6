import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import AcquireSubscriptionButton from "./_components/AcquireSubscriptionButton";
import { Badge } from "../_components/ui/badge";

const SubscriptionPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const user = await clerkClient.users.getUser(userId);
  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan === "premium";

  return (
    <>
      <div className="space-y-6 p-6">
        {/* TITULO e BOTÃO*/}
        <h1 className="-ml-4 text-2xl font-bold">Assinaturas</h1>

        <div className="flex gap-6">
          {/* card 1 */}
          <Card className="w-[450px]">
            <CardHeader className="border-b border-solid py-8">
              {!hasPremiumPlan && (
                <Badge className="right- relative top-1 z-10 mr-12 w-14 bg-primary/10 text-center text-primary">
                  Ativo
                </Badge>
              )}
              <h2 className="text-center text-2xl font-semibold">
                Plano Básico
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold">0</span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Apenas 10 transações mensais (7/10)</p>
              </div>
              <div className="flex items-center gap-2">
                <XIcon />
                <p>Relatórios de IA ilimitados</p>
              </div>
            </CardContent>
          </Card>
          {/* card 2 */}
          <Card className="w-[450px]">
            <CardHeader className="border-b border-solid py-8">
              {hasPremiumPlan && (
                <Badge className="relative left-4 top-1 z-10 mr-12 w-14 bg-primary/10 text-center text-primary">
                  Ativo
                </Badge>
              )}
              <h2 className="text-center text-2xl font-semibold">
                Plano Premium
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold">19,</span>
                <span className="text-2xl font-semibold">99</span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Transações ilimitadas</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Relatórios de IA ilimitados</p>
              </div>
              <AcquireSubscriptionButton />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
