"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import CartItemsList from "@/modules/cart/presentation/components/CartItemList";
import CartSummary from "@/modules/cart/presentation/components/CartSummary";
import useCartStore from "@/modules/cart/store/cartStore";

import CheckoutSteps from "@/modules/checkout/presentation/components/CheckoutSteps";
import ShippingForm from "@/modules/checkout/presentation/components/ShippingForm";
import { ShippingFormInputs } from "@/modules/checkout/schemas/shipping.schema";

import PaymentForm from "@/modules/payments/presentation/components/PaymentForm";

function CheckoutView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();
  const activeStep = parseInt(searchParams.get("step") || "1");
  const { cart, removeFromCart } = useCartStore();

  const goToStep = (step: number) => {
    router.push(`/cart?step=${step}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center mt-12">
      <h1 className="text-2xl font-medium">Your Shopping Cart</h1>
      <CheckoutSteps activeStep={activeStep} />
      <div className="w-full flex flex-col lg:flex-row gap-16">
        <div className="w-full lg:w-7/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8">
          {activeStep === 1 ? (
            <CartItemsList items={cart} onRemove={removeFromCart} />
          ) : activeStep === 2 ? (
            <ShippingForm
              shippingForm={shippingForm}
              setShippingForm={setShippingForm}
            />
          ) : activeStep === 3 && shippingForm ? (
            <PaymentForm />
          ) : (
            <p className="text-sm text-gray-500">
              Please fill in the shipping form to continue.
            </p>
          )}
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
