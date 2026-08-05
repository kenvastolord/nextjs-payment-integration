"use client";

import CheckoutFlow from "../components/CheckoutFlow";
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
    <div className="mt-12 flex flex-col items-center gap-8">
      <h1 className="text-2xl font-medium">
        Your Shopping Cart
      </h1>

      <CheckoutSteps activeStep={activeStep} />

      <CheckoutFlow
        activeStep={activeStep}
        cart={cart}
        shippingForm={shippingForm}
        setShippingForm={setShippingForm}
        onRemoveCartItem={removeFromCart}
        onIncreaseQuantity={increaseQuantity}
        onDecreaseQuantity={decreaseQuantity}
        onNextStep={() => goToStep(activeStep + 1)}
        onPreviousStep={() => goToStep(activeStep - 1)}
      />
    </div>
  );
}

export default CheckoutView;
