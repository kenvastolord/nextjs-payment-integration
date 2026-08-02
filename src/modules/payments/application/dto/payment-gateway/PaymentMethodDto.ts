import { PaymentMethodType } from "@/modules/payments/domain/enums/PaymentMethodType";

export interface PaymentMethodDto {
  type: PaymentMethodType;
}
