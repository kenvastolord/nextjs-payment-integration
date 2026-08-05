import { CartRepository } from "@/modules/cart/domain/repositories/CartRepository";
import { CartItemType, CartItemsType } from "@/modules/cart/types/cart.types";
import useCartStore from "@/modules/cart/store/cartStore";

export class ZustandCartRepository implements CartRepository {
  getCart(): CartItemsType {
    return useCartStore.getState().cart;
  }

  addProduct(product: CartItemType): void {
    useCartStore.getState().addToCart(product);
  }

  removeProduct(product: CartItemType): void {
    useCartStore.getState().removeFromCart(product);
  }

  increaseQuantity(product: CartItemType): void {
    useCartStore.getState().increaseQuantity(product);
  }

  decreaseQuantity(product: CartItemType): void {
    useCartStore.getState().decreaseQuantity(product);
  }
  clear(): void {
    useCartStore.getState().clearCart();
  }
}
