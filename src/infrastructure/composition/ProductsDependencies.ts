import { GetProductByIdUseCase } from "@/modules/products/application/use-cases/GetProductByIdUseCase";
import { GetProductsUseCase } from "@/modules/products/application/use-cases/GetProductsUseCase";

export interface ProductsDependencies {
  getProductsUseCase: GetProductsUseCase;
  getProductByIdUseCase: GetProductByIdUseCase;
}
