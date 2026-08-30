import { StartPaymentUseCase } from "@/modules/payments/application/use-cases/StartPaymentUseCase";

export interface PaymentsDependencies {
  startPaymentUseCase: StartPaymentUseCase;
}
