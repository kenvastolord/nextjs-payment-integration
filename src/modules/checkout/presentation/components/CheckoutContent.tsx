import CartItemsList from "@/modules/cart/presentation/components/CartItemList";
import PaymentForm from "@/modules/payments/presentation/components/PaymentForm";

import ShippingForm from "./ShippingForm";

import { CartItemType } from "@/modules/cart/types/cart.types";
import { ShippingFormInputs } from "../../schemas/shipping.schema";

type CheckoutContentProps = {
  activeStep: number;
  cart: CartItemType[];
  shippingForm?: ShippingFormInputs;
  setShippingForm: (data: ShippingFormInputs) => void;
  onRemoveCartItem: (item: CartItemType) => void;
};

function CheckoutContent({
  activeStep,
  cart,
  shippingForm,
  setShippingForm,
  onRemoveCartItem,
}: CheckoutContentProps) {
  switch (activeStep) {
    case 1:
      return <CartItemsList items={cart} onRemove={onRemoveCartItem} />;

    case 2:
      return (
        <ShippingForm
          shippingForm={shippingForm}
          setShippingForm={setShippingForm}
        />
      );

    case 3:
      return shippingForm ? (
        <PaymentForm />
      ) : (
        <p className="text-sm text-gray-500">
          Please fill in the shipping form to continue.
        </p>
      );

    default:
      return <p className="text-sm text-gray-500">Invalid checkout step.</p>;
  }
}

export default CheckoutContent;
