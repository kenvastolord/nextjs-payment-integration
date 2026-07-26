import { ZustandCartRepository } from "./repositories/ZustandCartRepository";

import { AddProductToCartUseCase } from "../application/use-cases/AddProductToCartUseCase";
import { RemoveFromCartUseCase } from "../application/use-cases/RemoveFromCartUseCase";
import { ClearCartUseCase } from "../application/use-cases/ClearCartUseCase";

const cartRepository = new ZustandCartRepository();

export const addProductToCartUseCase = new AddProductToCartUseCase(
  cartRepository,
);

export const removeFromCartUseCase = new RemoveFromCartUseCase(cartRepository);

export const clearCartUseCase = new ClearCartUseCase(cartRepository);
