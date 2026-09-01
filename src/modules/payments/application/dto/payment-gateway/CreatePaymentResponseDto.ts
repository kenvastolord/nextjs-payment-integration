import { PaymentStatus } from "@/modules/payments/domain/enums/PaymentStatus";
import { MoneyDto } from "./MoneyDto";

export interface CreatePaymentResponseDto {
  providerPaymentId: string;
  amount: MoneyDto;
  status: PaymentStatus;
  paymentToken?: string;
  redirectUrl?: string;
  expiresAt?: Date;
}
