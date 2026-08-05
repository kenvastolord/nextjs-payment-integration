import { OrderItem } from "../entities/OrderItem";

export interface CheckoutContext {
  items: OrderItem[];
  currency: string;
  postalCode: string;
}
