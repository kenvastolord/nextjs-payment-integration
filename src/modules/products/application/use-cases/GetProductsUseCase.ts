import { ProductRepository } from "../../domain/repositories/ProductRepository";

export class GetProductsUseCase {
  constructor(private readonly repository: ProductRepository) { }

  execute() {
    return this.repository.findAll();
  }
}
