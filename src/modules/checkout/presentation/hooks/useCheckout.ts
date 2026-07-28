"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import useCartStore from "@/modules/cart/store/cartStore";

import { ShippingFormInputs } from "@/modules/checkout/schemas/shipping.schema";
import { removeFromCartUseCase } from "@/modules/cart/infrastructure/container";
import { CartItemType } from "@/modules/cart/types/cart.types";

export function useCheckout() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();

  const activeStep = Number(searchParams.get("step") ?? "1");

  const { cart } = useCartStore();

  const removeFromCart = (item: CartItemType) => {
    removeFromCartUseCase.execute(item);
  };

  const goToStep = (step: number) => {
    router.push(`/cart?step=${step}`, {
      scroll: false,
    });
  };

  return {
    activeStep,

    cart,
    removeFromCart,

    shippingForm,
    setShippingForm,

    goToStep,
  };
}
