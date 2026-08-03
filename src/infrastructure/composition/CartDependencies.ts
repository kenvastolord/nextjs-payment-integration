import { AddProductToCartUseCase } from "@/modules/cart/application/use-cases/AddProductToCartUseCase";
import { ClearCartUseCase } from "@/modules/cart/application/use-cases/ClearCartUseCase";
import { RemoveFromCartUseCase } from "@/modules/cart/application/use-cases/RemoveFromCartUseCase";

export interface CartDependencies {
  addProductToCartUseCase: AddProductToCartUseCase;
  removeFromCartUseCase: RemoveFromCartUseCase;
  clearCartUseCase: ClearCartUseCase;
}
