import { ProductType, ProductsType } from "../../types/product.types";

export interface ProductRepository {
  findAll(): ProductsType;

  findById(id: number): ProductType | undefined;
}
