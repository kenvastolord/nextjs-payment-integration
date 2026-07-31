import { PaymentStatus } from "@/modules/payments/domain/enums/PaymentStatus";

export interface CreatePaymentResponseDto {
  paymentId: string;

  providerPaymentId: string;

  status: PaymentStatus;

  redirectUrl?: string;

  expiresAt?: Date;
}
