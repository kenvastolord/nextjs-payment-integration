import type { RefObject } from "react";

import CartItemsList from "@/modules/cart/presentation/components/CartItemList";
import PaymentForm from "@/modules/payments/presentation/components/PaymentForm";
import ShippingForm from "./ShippingForm";

import { CartItemType } from "@/modules/cart/types/cart.types";
import { ShippingFormInputs } from "../../schemas/shipping.schema";

type CheckoutContentProps = {
  activeStep: number;
  cart: CartItemType[];
  shippingForm?: ShippingFormInputs;
  onShippingSubmit: (data: ShippingFormInputs) => void;
  onPaymentSubmit: () => Promise<void>;
  onRemoveCartItem: (item: CartItemType) => void;
  onIncreaseQuantity: (item: CartItemType) => void;
  onDecreaseQuantity: (item: CartItemType) => void;
  shippingFormRef: RefObject<HTMLFormElement | null>;
};

function CheckoutContent({
  activeStep,
  cart,
  shippingForm,
  onShippingSubmit,
  onPaymentSubmit,
  onRemoveCartItem,
  onIncreaseQuantity,
  onDecreaseQuantity,
  shippingFormRef,
}: CheckoutContentProps) {
  switch (activeStep) {
    case 1:
      return (
        <CartItemsList
          items={cart}
          onRemove={onRemoveCartItem}
          onIncreaseQuantity={onIncreaseQuantity}
          onDecreaseQuantity={onDecreaseQuantity}
        />
      );

    case 2:
      return (
        <ShippingForm
          ref={shippingFormRef}
          shippingForm={shippingForm}
          onSubmit={onShippingSubmit}
        />
      );

    case 3:
      return shippingForm ? (
        <PaymentForm onSubmit={onPaymentSubmit} />
      ) : (
        <p className="text-sm text-gray-500">
          Please fill in the shipping form to continue.
        </p>
      );

    default:
      return (
        <p className="text-sm text-gray-500">
          Invalid checkout step.
        </p>
      );
  }
}

export default CheckoutContent;
