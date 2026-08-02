import { Order } from "../entities/Order";

export interface OrderRepository {
  /**
   * Persists an Order aggregate.
   *
   * The implementation decides whether the aggregate
   * should be created or updated.
   */
  save(order: Order): Promise<void>;

  /**
   * Retrieves an Order aggregate by its identifier.
   *
   * Returns null when the order does not exist.
   */
  findById(id: string): Promise<Order | null>;

  /**
   * Checks whether an Order exists.
   */
  exists(id: string): Promise<boolean>;
}
