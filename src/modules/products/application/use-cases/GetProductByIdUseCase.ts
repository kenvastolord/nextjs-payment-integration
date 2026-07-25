import { products } from "../../infrastructure/data/products";
import { ProductType } from "../../types/product.types";

export class GetProductByIdUseCase {
  execute(id: number): ProductType | undefined {
    return products.find((product) => product.id === id);
  }
}
