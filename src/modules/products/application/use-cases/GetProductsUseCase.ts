import { products } from "../../infrastructure/data/products";
import { ProductsType } from "../../types/product.types";

export class GetProductsUseCase {
  execute(): ProductsType {
    return products;
  }
}
