"use server";

import { container } from "@/infrastructure/container";
import { PaymentMethodType } from "@/modules/payments/domain/enums/PaymentMethodType";
import { PaymentProvider } from "@/modules/payments/domain/enums/PaymentProvider";

export interface StartPaymentRequest {
  orderId: string;
}

export interface StartPaymentResponse {
  paymentId: string;
  paymentToken: string;
}

export async function startPaymentAction(
  request: StartPaymentRequest,
): Promise<StartPaymentResponse> {
  const result = await container.payments.startPaymentUseCase.execute({
    orderId: request.orderId,
    provider: PaymentProvider.STRIPE,
    paymentMethod: PaymentMethodType.CARD,
    successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/orders/confirmation/${request.orderId}`,
    cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/cart?step=3`,
  });

  if (!result.paymentToken) {
    throw new Error("Payment token was not returned by the payment provider.");
  }

  return {
    paymentId: result.paymentId,
    paymentToken: result.paymentToken,
  };
}
