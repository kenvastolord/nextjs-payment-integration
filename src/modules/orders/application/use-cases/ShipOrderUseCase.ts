import { Order } from "../../domain/entities/Order";
import { OrderRepository } from "../../domain/repositories/OrderRepository";

export class ShipOrderUseCase {
  constructor(
    private readonly repository: OrderRepository,
  ) { }

  async execute(orderId: string): Promise<Order> {
    const order = await this.repository.findById(orderId);

    if (!order) {
      throw new Error("Order not found.");
    }

    order.ship();

    await this.repository.save(order);

    return order;
  }
}
