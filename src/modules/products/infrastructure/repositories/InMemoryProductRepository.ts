import { ProductRepository } from "../../domain/repositories/ProductRepository";
import { ProductType, ProductsType } from "../../types/product.types";
import { products } from "../data/products";

function normalizeProduct(product: ProductType): ProductType {
  return {
    ...product,
    price: Math.round(product.price * 100),
  };
}

export class InMemoryProductRepository implements ProductRepository {
  findAll(): ProductsType {
    return products.map(normalizeProduct);
  }

  findById(id: number): ProductType | undefined {
    const product = products.find((product) => Number(product.id) === id);
    return product ? normalizeProduct(product) : undefined;
  }
}
