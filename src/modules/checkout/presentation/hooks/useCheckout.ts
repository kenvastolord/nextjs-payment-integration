"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import useCartStore from "@/modules/cart/store/cartStore";
import { ShippingFormInputs } from "@/modules/checkout/schemas/shipping.schema";

export function useCheckout() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();

  const activeStep = Number(searchParams.get("step") ?? "1");

  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCartStore();

  const goToStep = (step: number) => {
    router.push(`/cart?step=${step}`, {
      scroll: false,
    });
  };

  return {
    activeStep,
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    shippingForm,
    setShippingForm,
    goToStep,
  };
}
