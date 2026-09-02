"use client";

import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Lock, ShoppingCart } from "lucide-react";

type StripePaymentFormProps = {
  paymentToken: string;
  onSuccess: () => void;
  onError: (message: string) => void;
};

function StripePaymentForm({
  paymentToken,
  onSuccess,
  onError,
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    if (!card) return;

    setIsSubmitting(true);

    const { error } = await stripe.confirmCardPayment(paymentToken, {
      payment_method: { card },
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
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Card details</label>
        <div className="rounded-lg border border-gray-300 px-4 py-3">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#111827",
                  "::placeholder": { color: "#9ca3af" },
                },
              },
            }}
          />
        </div>
      </div>

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
