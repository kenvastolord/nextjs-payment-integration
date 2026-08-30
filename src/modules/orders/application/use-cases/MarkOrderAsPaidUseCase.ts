
import { Order } from "../../domain/entities/Order";
import { OrderRepository } from "../../domain/repositories/OrderRepository";

export class MarkOrderAsPaidUseCase {
  constructor(
    private readonly repository: OrderRepository,
  ) { }

  async execute(orderId: string): Promise<Order> {
    const order = await this.repository.findById(orderId);

    if (!order) {
      throw new Error("Order not found.");
    }

    order.markPaymentAsPaid();

    await this.repository.save(order);

    return order;
  }
}

