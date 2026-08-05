import { CartItemsType, CartItemType } from "../../types/cart.types";

export interface CartRepository {
  getCart(): CartItemsType;

  addProduct(product: CartItemType): void;

  removeProduct(product: CartItemType): void;

  increaseQuantity(product: CartItemType): void;

  decreaseQuantity(product: CartItemType): void;

  clear(): void;
}
