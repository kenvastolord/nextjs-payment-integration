import { ZustandCartRepository } from "./repositories/ZustandCartRepository";

import { AddProductToCartUseCase } from "../application/use-cases/AddProductToCartUseCase";

const cartRepository = new ZustandCartRepository();

export const addProductToCartUseCase = new AddProductToCartUseCase(
  cartRepository,
);
