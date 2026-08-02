import { CreatePaymentRequestDto } from "../../application/dto/payment-gateway/CreatePaymentRequestDto";
import { CreatePaymentResponseDto } from "../../application/dto/payment-gateway/CreatePaymentResponseDto";

export interface PaymentGateway {
  createPayment(
    request: CreatePaymentRequestDto,
  ): Promise<CreatePaymentResponseDto>;
}
