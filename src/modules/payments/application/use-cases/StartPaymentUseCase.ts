import { PaymentGateway } from "@/modules/payments/domain/services/PaymentGateway";
import { PaymentRepository } from "@/modules/payments/domain/repositories/PaymentRepository";
import { Payment } from "@/modules/payments/domain/entities/Payment";
import { PaymentMethodType } from "@/modules/payments/domain/enums/PaymentMethodType";
import { PaymentProvider } from "@/modules/payments/domain/enums/PaymentProvider";
import { GetOrderByIdUseCase } from "@/modules/orders/application/use-cases/GetOrderByIdUseCase";
import { IdGenerator } from "@/ports/identity/IdGenerator";

export interface StartPaymentInput {
  orderId: string;
  provider: PaymentProvider;
  paymentMethod: PaymentMethodType;
  successUrl: string;
  cancelUrl: string;
}

export interface StartPaymentOutput {
  paymentId: string;
  paymentToken: string | undefined;
}

export class StartPaymentUseCase {
  constructor(
    private readonly getOrderByIdUseCase: GetOrderByIdUseCase,
    private readonly paymentGateway: PaymentGateway,
    private readonly paymentRepository: PaymentRepository,
    private readonly idGenerator: IdGenerator,
  ) { }

  async execute(input: StartPaymentInput): Promise<StartPaymentOutput> {
    const order = await this.getOrderByIdUseCase.execute(input.orderId);

    if (!order) {
      throw new Error(`Order not found: ${input.orderId}`);
    }

    const customer = order.getCustomerSnapshot();
    const total = order.getTotals().getTotal();

    const response = await this.paymentGateway.createPayment({
      orderId: order.getId(),
      amount: {
        amount: total.getMinorAmount(),
        currency: total.getCurrency(),
      },
      customer: {
        id: customer.getCustomerId() ?? order.getId(),
        firstName: customer.getFirstName(),
        lastName: customer.getLastName(),
        email: customer.getEmail(),
      },
      paymentMethod: {
        type: input.paymentMethod,
      },
      successUrl: input.successUrl,
      cancelUrl: input.cancelUrl,
    });

    const payment = Payment.create({
      id: this.idGenerator.generate(),
      orderId: order.getId(),
      provider: input.provider,
      providerPaymentId: response.providerPaymentId,
      paymentMethod: input.paymentMethod,
      amountMinorUnits: response.amount.amount,
      currency: response.amount.currency,
      paymentToken: response.paymentToken,
    });

    await this.paymentRepository.save(payment);

    return {
      paymentId: payment.getId(),
      paymentToken: payment.getPaymentToken(),
    };
  }
}
