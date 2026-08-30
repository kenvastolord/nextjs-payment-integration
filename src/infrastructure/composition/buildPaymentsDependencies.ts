import { PaymentGateway } from "@/modules/payments/domain/services/PaymentGateway";
import { PaymentRepository } from "@/modules/payments/domain/repositories/PaymentRepository";
import { StartPaymentUseCase } from "@/modules/payments/application/use-cases/StartPaymentUseCase";
import { ApplicationDependencies } from "./ApplicationDependencies";
import { OrdersDependencies } from "./OrdersDependencies";
import { PaymentsDependencies } from "./PaymentsDependencies";

export function buildPaymentsDependencies(
  application: ApplicationDependencies,
  orders: OrdersDependencies,
  paymentGateway: PaymentGateway,
  paymentRepository: PaymentRepository,
): PaymentsDependencies {
  return {
    startPaymentUseCase: new StartPaymentUseCase(
      orders.getOrderByIdUseCase,
      paymentGateway,
      paymentRepository,
      application.idGenerator,
    ),
  };
}
