import { InMemoryProductRepository } from "./repositories/InMemoryProductRepository";

import { GetProductsUseCase } from "../application/use-cases/GetProductsUseCase";
import { GetProductByIdUseCase } from "../application/use-cases/GetProductByIdUseCase";

const productRepository = new InMemoryProductRepository();

export const getProductsUseCase = new GetProductsUseCase(productRepository);

export const getProductByIdUseCase = new GetProductByIdUseCase(
  productRepository,
);
