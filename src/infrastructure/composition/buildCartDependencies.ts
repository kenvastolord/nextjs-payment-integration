import { ApplicationDependencies } from "./ApplicationDependencies";
import { CartDependencies } from "./CartDependencies";

import { AddProductToCartUseCase } from "@/modules/cart/application/use-cases/AddProductToCartUseCase";
import { ClearCartUseCase } from "@/modules/cart/application/use-cases/ClearCartUseCase";
import { RemoveFromCartUseCase } from "@/modules/cart/application/use-cases/RemoveFromCartUseCase";
import { IncreaseItemQuantityUseCase } from "@/modules/cart/application/use-cases/IncreaseItemQuantityUseCase";
import { DecreaseItemQuantityUseCase } from "@/modules/cart/application/use-cases/DecreaseItemQuantityUseCase";

import { ZustandCartRepository } from "@/modules/cart/infrastructure/repositories/ZustandCartRepository";

export function buildCartDependencies(
  _application: ApplicationDependencies,
): CartDependencies {
  const cartRepository = new ZustandCartRepository();

  return {
    addProductToCartUseCase: new AddProductToCartUseCase(
      cartRepository,
    ),

    removeFromCartUseCase: new RemoveFromCartUseCase(
      cartRepository,
    ),

    increaseItemQuantityUseCase: new IncreaseItemQuantityUseCase(
      cartRepository,
    ),

    decreaseItemQuantityUseCase: new DecreaseItemQuantityUseCase(
      cartRepository,
    ),

    clearCartUseCase: new ClearCartUseCase(
      cartRepository,
    ),
  };
}
