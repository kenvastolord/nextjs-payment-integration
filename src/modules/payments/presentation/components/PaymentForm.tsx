"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import StripePaymentForm from "./StripePaymentForm";
import { startPaymentAction } from "@/modules/payments/actions/paymentActions";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

type PaymentFormProps = {
  orderId: string;
  onSuccess: () => void;
};

function PaymentForm({ orderId, onSuccess }: PaymentFormProps) {
  const [paymentToken, setPaymentToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    startPaymentAction({ orderId })
      .then((result) => setPaymentToken(result.paymentToken))
      .catch(() => setError("Failed to initialize payment. Please try again."))
      .finally(() => setIsLoading(false));
  }, [orderId]);

  if (isLoading) {
    return (
      <p className="text-sm text-gray-500">Initializing payment...</p>
    );
  }

  if (error || !paymentToken) {
    return (
      <p className="text-sm text-red-500">{error ?? "Payment unavailable."}</p>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret: paymentToken }}
    >
      <StripePaymentForm
        paymentToken={paymentToken}
        onSuccess={onSuccess}
        onError={setError}
      />
    </Elements>
  );
}

export default PaymentForm;
