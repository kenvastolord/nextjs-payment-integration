import { CartRepository } from "@/modules/cart/domain/repositories/CartRepository";
import { CartItemType } from "../../types/cart.types";

export class RemoveFromCartUseCase {
  constructor(private readonly repository: CartRepository) { }

  execute(product: CartItemType): void {
    this.repository.removeProduct(product);
  }
}
