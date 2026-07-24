"use client";

import CheckoutView from "@/modules/checkout/presentation/views/CheckoutView";
import { Suspense } from "react";

export default function CartPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutView />
    </Suspense>
  );
}
