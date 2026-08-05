"use client";

import CartSummary from "@/modules/cart/presentation/components/CartSummary";

import CheckoutContent from "../components/CheckoutContent";
import CheckoutSteps from "../components/CheckoutSteps";
import { useCheckout } from "../hooks/useCheckout";

function CheckoutView() {
  const {
    activeStep,
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    shippingForm,
    setShippingForm,
    goToStep,
  } = useCheckout();

  return (
    <div className="flex flex-col gap-8 items-center justify-center mt-12">
      <h1 className="text-2xl font-medium">Your Shopping Cart</h1>

      <CheckoutSteps activeStep={activeStep} />

      <div className="w-full flex flex-col lg:flex-row gap-16">
        <div className="w-full lg:w-7/12 shadow-lg border border-gray-100 p-8 rounded-lg flex flex-col gap-8">
          <CheckoutContent
            activeStep={activeStep}
            cart={cart}
            shippingForm={shippingForm}
            setShippingForm={setShippingForm}
            onRemoveCartItem={removeFromCart}
            onIncreaseQuantity={increaseQuantity}
            onDecreaseQuantity={decreaseQuantity}
          />
        </div>

        <CartSummary
          activeStep={activeStep}
          shippingCompleted={!!shippingForm}
          cart={cart}
          onNextStep={() => goToStep(activeStep + 1)}
          onPreviousStep={() => goToStep(activeStep - 1)}
        />
      </div>
    </div>
  );
}

export default CheckoutView;
