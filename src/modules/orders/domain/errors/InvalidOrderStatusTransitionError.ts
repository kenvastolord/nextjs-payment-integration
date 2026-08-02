import { OrderStatus } from "../enums/OrderStatus";

export class InvalidOrderStatusTransitionError extends Error {
  constructor(
    currentStatus: OrderStatus,
    targetStatus: OrderStatus,
  ) {
    super(
      `Cannot transition order status from '${currentStatus}' to '${targetStatus}'.`,
    );

    this.name = "InvalidOrderStatusTransitionError";
  }
}
