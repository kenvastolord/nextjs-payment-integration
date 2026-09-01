import { StartPaymentUseCase } from "@/modules/payments/application/use-cases/StartPaymentUseCase";
import { InMemoryPaymentRepository } from "@/modules/payments/infrastructure/repositories/InMemoryPaymentRepository";
import { StripePaymentService } from "@/infrastructure/payment/StripePaymentService";
import { ApplicationDependencies } from "./ApplicationDependencies";
import { OrdersDependencies } from "./OrdersDependencies";
import { PaymentsDependencies } from "./PaymentsDependencies";

export function buildPaymentsDependencies(
  application: ApplicationDependencies,
  orders: OrdersDependencies,
): PaymentsDependencies {
  const paymentRepository = new InMemoryPaymentRepository();
  const paymentGateway = new StripePaymentService();

  return {
    startPaymentUseCase: new StartPaymentUseCase(
      orders.getOrderByIdUseCase,
      paymentGateway,
      paymentRepository,
      application.idGenerator,
    ),
  };
}
