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

  clear(): void {
    useCartStore.getState().clearCart();
  }
}
