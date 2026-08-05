import { AddProductToCartUseCase } from "@/modules/cart/application/use-cases/AddProductToCartUseCase";
import { ClearCartUseCase } from "@/modules/cart/application/use-cases/ClearCartUseCase";
import { DecreaseItemQuantityUseCase } from "@/modules/cart/application/use-cases/DecreaseItemQuantityUseCase";
import { IncreaseItemQuantityUseCase } from "@/modules/cart/application/use-cases/IncreaseItemQuantityUseCase";
import { RemoveFromCartUseCase } from "@/modules/cart/application/use-cases/RemoveFromCartUseCase";

export interface CartDependencies {
  addProductToCartUseCase: AddProductToCartUseCase;
  removeFromCartUseCase: RemoveFromCartUseCase;
  increaseItemQuantityUseCase: IncreaseItemQuantityUseCase;
  decreaseItemQuantityUseCase: DecreaseItemQuantityUseCase;
  clearCartUseCase: ClearCartUseCase;
}
