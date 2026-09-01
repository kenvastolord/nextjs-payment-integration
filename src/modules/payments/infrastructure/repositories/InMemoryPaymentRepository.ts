import { Payment } from "@/modules/payments/domain/entities/Payment";
import { PaymentRepository } from "@/modules/payments/domain/repositories/PaymentRepository";

export class InMemoryPaymentRepository implements PaymentRepository {
  private readonly store = new Map<string, Payment>();

  async save(payment: Payment): Promise<void> {
    this.store.set(payment.getId(), payment);
  }

  async findById(id: string): Promise<Payment | null> {
    return this.store.get(id) ?? null;
  }

  async findByOrderId(orderId: string): Promise<Payment | null> {
    for (const payment of this.store.values()) {
      if (payment.getOrderId() === orderId) {
        return payment;
      }
    }
    return null;
  }
}
