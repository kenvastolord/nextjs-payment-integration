import "server-only";

import { PaymentGateway } from "@/modules/payments/domain/services/PaymentGateway";
import { CreatePaymentRequestDto } from "@/modules/payments/application/dto/payment-gateway/CreatePaymentRequestDto";
import { CreatePaymentResponseDto } from "@/modules/payments/application/dto/payment-gateway/CreatePaymentResponseDto";
import { PaymentStatus } from "@/modules/payments/domain/enums/PaymentStatus";
import { stripeClient } from "@/config/providers/stripe.config";

export class StripePaymentService implements PaymentGateway {
  async createPayment(
    request: CreatePaymentRequestDto,
  ): Promise<CreatePaymentResponseDto> {
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: request.amount.amount,
      currency: request.amount.currency.toLowerCase(),
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        orderId: request.orderId,
        customerId: request.customer.id,
        ...request.metadata,
      },
    });

    return {
      providerPaymentId: paymentIntent.id,
      amount: {
        amount: paymentIntent.amount,
        currency: paymentIntent.currency.toUpperCase(),
      },
      status: PaymentStatus.PENDING,
      paymentToken: paymentIntent.client_secret ?? undefined,
    };
  }
}
