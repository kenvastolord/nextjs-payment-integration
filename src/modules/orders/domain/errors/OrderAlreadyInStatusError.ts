import { OrderStatus } from "../enums/OrderStatus";

export class OrderAlreadyInStatusError extends Error {
  constructor(status: OrderStatus) {
    super(`Order is already in '${status}' status.`);

    this.name = "OrderAlreadyInStatusError";
  }
}
