import { Order } from "../../domain/entities/Order";
import { OrderRepository } from "../../domain/repositories/OrderRepository";

export class InMemoryOrderRepository implements OrderRepository {
  private static readonly orders: Map<string, Order> = new Map();

  async save(order: Order): Promise<void> {
    InMemoryOrderRepository.orders.set(order.getId(), order);
  }

  async findById(id: string): Promise<Order | null> {
    const order = InMemoryOrderRepository.orders.get(id);
    return order || null;
  }

  async exists(id: string): Promise<boolean> {
    return InMemoryOrderRepository.orders.has(id);
  }
}
