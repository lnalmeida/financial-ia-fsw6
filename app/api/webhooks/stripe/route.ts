import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: Request) => {
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.error();
  }
  const text = await req.text();
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.error();
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-10-28.acacia",
  });

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.error();
  }

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );

  switch (event.type) {
    case "invoice.paid": {
      // Assinatura foi paga, atualizar o cliewnte com o novo plano
      const { customer, subscription, subscription_details } =
        event.data.object;
      const clerkUserId = subscription_details?.metadata?.clerk_user_id;

      if (!clerkUserId) {
        return NextResponse.error();
        break;
      }
      await clerkClient.users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: customer,
          stripeSubscriptionId: subscription,
        },
        publicMetadata: {
          subscriptionPlan: "premium",
        },
      });
      break;
    }

    case "customer.subscription.deleted":
      // Assinatura falhou, desativar o cliente atualizando os campos para null
      const subscriptionId = await stripe.subscriptions.retrieve(
        event.data.object.id,
      );
      const clerkUserId = subscriptionId?.metadata?.clerk_user_id;

      if (!clerkUserId) {
        return NextResponse.error();
      }

      await clerkClient.users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: null,
          stripeSubscriptionId: null,
        },
        publicMetadata: {
          subscriptionPlan: null,
        },
      });
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
      break;
  }

  return NextResponse.json({ received: true });
};
