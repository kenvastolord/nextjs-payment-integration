import { CartRepository } from "@/modules/cart/domain/repositories/CartRepository";

export class ClearCartUseCase {
  constructor(private readonly repository: CartRepository) { }

  execute(): void {
    this.repository.clear();
  }
}
