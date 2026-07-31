import { MoneyDto } from "./MoneyDto";
import { PaymentCustomerDto } from "./PaymentCustomerDto";
import { PaymentMethodDto } from "./PaymentMethodDto";

export interface CreatePaymentRequestDto {
  orderId: string;

  amount: MoneyDto;

  customer: PaymentCustomerDto;

  paymentMethod: PaymentMethodDto;

  successUrl: string;

  cancelUrl: string;

  metadata?: Record<string, string>;
}
