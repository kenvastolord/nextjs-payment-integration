import { ApplicationDependencies } from "./ApplicationDependencies";
import { ProductsDependencies } from "./ProductsDependencies";

import { GetProductByIdUseCase } from "@/modules/products/application/use-cases/GetProductByIdUseCase";
import { GetProductsUseCase } from "@/modules/products/application/use-cases/GetProductsUseCase";

import { InMemoryProductRepository } from "@/modules/products/infrastructure/repositories/InMemoryProductRepository";

export function buildProductsDependencies(
  _application: ApplicationDependencies,
): ProductsDependencies {
  const productRepository = new InMemoryProductRepository();

  return {
    getProductsUseCase: new GetProductsUseCase(
      productRepository,
    ),

    getProductByIdUseCase: new GetProductByIdUseCase(
      productRepository,
    ),
  };
}
