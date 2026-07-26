import { CartItemType, CartItemsType } from "../../types/cart.types";

export interface CartRepository {
  getCart(): CartItemsType;

  addProduct(product: CartItemType): void;

  removeProduct(product: CartItemType): void;

  clear(): void;
}
