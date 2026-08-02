import { Order } from "../../domain/entities/Order";
import { OrderRepository } from "../../domain/repositories/OrderRepository";

export class GetOrderByIdUseCase {
  constructor(
    private readonly repository: OrderRepository,
  ) { }

  execute(id: string): Promise<Order | null> {
    return this.repository.findById(id);
  }
}
