"use client";

import Image from "next/image";
import { Lock, ShoppingCart } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  PaymentFormInputs,
  paymentFormSchema,
} from "@/modules/payments/schemas/payment.schema";

type PaymentFormProps = {
  onSubmit: () => Promise<void>;
};

function PaymentForm({ onSubmit }: PaymentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PaymentFormInputs>({
    resolver: zodResolver(paymentFormSchema),
  });

  const handlePaymentForm: SubmitHandler<PaymentFormInputs> = async () => {
    await onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit(handlePaymentForm)}
      className="flex flex-col gap-8"
    >
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <p className="mb-3 text-sm font-medium text-gray-700">
          Accepted payment methods
        </p>
        <div className="flex items-center gap-2 mt-4">
          <Image src="/klarna.png" alt="Klarna" width={50} height={25} className="h-auto rounded-md" />
          <Image src="/cards.png" alt="Accepted cards" width={50} height={25} className="h-auto rounded-md" />
          <Image src="/stripe.png" alt="Stripe" width={50} height={25} className="h-auto rounded-md" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="cardHolder" className="text-sm font-medium">Name on card</label>
        <input id="cardHolder" type="text" placeholder="John Doe" {...register("cardHolder")} className="rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900" />
        {errors.cardHolder && <p className="text-xs text-red-500">{errors.cardHolder.message}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="cardNumber" className="text-sm font-medium">Card Number</label>
        <input id="cardNumber" type="text" placeholder="1234 5678 9012 3456" {...register("cardNumber")} className="rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900" />
        {errors.cardNumber && <p className="text-xs text-red-500">{errors.cardNumber.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="expirationDate" className="text-sm font-medium">Expiration Date</label>
          <input id="expirationDate" type="text" placeholder="MM/YY" {...register("expirationDate")} className="rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900" />
          {errors.expirationDate && <p className="text-xs text-red-500">{errors.expirationDate.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="cvv" className="text-sm font-medium">CVV</label>
          <input id="cvv" type="password" placeholder="123" {...register("cvv")} className="rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900" />
          {errors.cvv && <p className="text-xs text-red-500">{errors.cvv.message}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
        <Lock className="h-4 w-4" />
        <span>Your payment information is securely encrypted.</span>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 py-3 font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
      >
        <ShoppingCart className="h-4 w-4" />
        {isSubmitting ? "Processing..." : "Complete Order"}
      </button>
    </form>
  );
}

export default PaymentForm;
