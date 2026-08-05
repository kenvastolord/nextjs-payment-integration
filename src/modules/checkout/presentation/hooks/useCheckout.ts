"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { container } from "@/infrastructure/container";

import useCartStore from "@/modules/cart/store/cartStore";
import { CartItemType } from "@/modules/cart/types/cart.types";
import { ShippingFormInputs } from "@/modules/checkout/schemas/shipping.schema";

export function useCheckout() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();

  const activeStep = Number(searchParams.get("step") ?? "1");

  const { cart } = useCartStore();

  const removeFromCart = (item: CartItemType) => {
    container.cart.removeFromCartUseCase.execute(item);
  };

  const increaseQuantity = (item: CartItemType) => {
    container.cart.increaseItemQuantityUseCase.execute(item);
  };

  const decreaseQuantity = (item: CartItemType) => {
    container.cart.decreaseItemQuantityUseCase.execute(item);
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
    increaseQuantity,
    decreaseQuantity,

    shippingForm,
    setShippingForm,

    goToStep,
  };
}
