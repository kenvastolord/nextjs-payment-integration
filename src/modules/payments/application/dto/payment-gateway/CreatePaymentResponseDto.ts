import { PaymentStatus } from "@/modules/payments/domain/enums/PaymentStatus";
import { MoneyDto } from "./MoneyDto";

export interface CreatePaymentResponseDto {
  paymentId: string;

  providerPaymentId: string;

  amount: MoneyDto;

  status: PaymentStatus;

  redirectUrl?: string;

  expiresAt?: Date;
}
