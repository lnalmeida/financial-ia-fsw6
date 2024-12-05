"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../_actions/create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";

const AcquireSubscriptionButton = ({}) => {
  const handleAcquireSubscriptionClick = async () => {
    const { sessionId } = await createStripeCheckout();
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Stripe publishable key not found!");
    }
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );

    if (!stripe) {
      throw new Error("Stripe not initialized!");
    }
    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <Button
      onClick={handleAcquireSubscriptionClick}
      className="w-full rounded-md font-bold"
    >
      Assinar
    </Button>
  );
};

export default AcquireSubscriptionButton;
