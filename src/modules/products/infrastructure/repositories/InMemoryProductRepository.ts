import { ProductRepository } from "../../domain/repositories/ProductRepository";
import { ProductType, ProductsType } from "../../types/product.types";
import { products } from "../data/products";

export class InMemoryProductRepository implements ProductRepository {
  findAll(): ProductsType {
    return products;
  }

  findById(id: number): ProductType | undefined {
    return products.find((product) => Number(product.id) === id);
  }
}
