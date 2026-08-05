import { CartRepository } from "@/modules/cart/domain/repositories/CartRepository";
import { CartItemType } from "../../types/cart.types";

export class DecreaseItemQuantityUseCase {
  constructor(private readonly repository: CartRepository) { }

  execute(product: CartItemType): void {
    this.repository.decreaseQuantity(product);
  }
}
