"use client";

import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Lock, ShoppingCart } from "lucide-react";

type StripePaymentFormProps = {
  paymentToken: string;
  onSuccess: () => void;
  onError: (message: string) => void;
};

function StripePaymentForm({
  paymentToken: _paymentToken,
  onSuccess,
  onError,
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsSubmitting(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
      redirect: "if_required",
    });

    if (error) {
      onError(error.message ?? "Payment failed. Please try again.");
    } else {
      onSuccess();
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <PaymentElement
        options={{
          layout: "tabs",
        }}
      />

      <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
        <Lock className="h-4 w-4" />
        <span>Your payment information is securely encrypted.</span>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !stripe}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 py-3 font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
      >
        <ShoppingCart className="h-4 w-4" />
        {isSubmitting ? "Processing..." : "Complete Order"}
      </button>
    </form>
  );
}

export default StripePaymentForm;
