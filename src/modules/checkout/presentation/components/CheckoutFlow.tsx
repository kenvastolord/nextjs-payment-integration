"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

import CartSummary from "@/modules/cart/presentation/components/CartSummary";
import CheckoutContent from "./CheckoutContent";
import CheckoutNavigation from "./CheckoutNavigation";

import { submitCheckoutAction } from "@/modules/checkout/actions/checkoutActions";
import { container } from "@/infrastructure/container";

import { CartItemType } from "@/modules/cart/types/cart.types";
import { ShippingFormInputs } from "@/modules/checkout/schemas/shipping.schema";

type CheckoutFlowProps = {
  activeStep: number;
  cart: CartItemType[];
  shippingForm?: ShippingFormInputs;
  setShippingForm: (data: ShippingFormInputs) => void;
  onRemoveCartItem: (item: CartItemType) => void;
  onIncreaseQuantity: (item: CartItemType) => void;
  onDecreaseQuantity: (item: CartItemType) => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
};

function CheckoutFlow({
  activeStep,
  cart,
  shippingForm,
  setShippingForm,
  onRemoveCartItem,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onNextStep,
  onPreviousStep,
}: CheckoutFlowProps) {
  const router = useRouter();
  const shippingFormRef = useRef<HTMLFormElement>(null);

  const handleNextStep = () => {
    if (activeStep === 2) {
      shippingFormRef.current?.requestSubmit();
      return;
    }
    onNextStep();
  };

  const handleShippingSubmit = (data: ShippingFormInputs) => {
    setShippingForm(data);
    onNextStep();
  };

  const handlePaymentSubmit = async () => {
    if (!shippingForm || cart.length === 0) return;

    try {
      const order = await submitCheckoutAction({
        shippingForm,
        cart: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          selectedColor: item.selectedColor,
          selectedSize: item.selectedSize,
        })),
      });

      container.cart.clearCartUseCase.execute();
      router.push(`/orders/confirmation/${order.id}`);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Unknown error";
      alert(`Failed to place order: ${message}`);
    }
  };

  return (
    <div className="flex w-full flex-col gap-16 lg:flex-row">
      <div className="flex w-full flex-col gap-8 rounded-lg border border-gray-100 p-8 shadow-lg lg:w-7/12">
        <CheckoutContent
          activeStep={activeStep}
          cart={cart}
          shippingForm={shippingForm}
          onShippingSubmit={handleShippingSubmit}
          onPaymentSubmit={handlePaymentSubmit}
          onRemoveCartItem={onRemoveCartItem}
          onIncreaseQuantity={onIncreaseQuantity}
          onDecreaseQuantity={onDecreaseQuantity}
          shippingFormRef={shippingFormRef}
        />
        <CheckoutNavigation
          activeStep={activeStep}
          onNextStep={handleNextStep}
          onPreviousStep={onPreviousStep}
        />
      </div>
      <CartSummary cart={cart} />
    </div>
  );
}

export default CheckoutFlow;
