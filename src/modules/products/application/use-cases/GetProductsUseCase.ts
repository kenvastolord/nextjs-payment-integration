import { InMemoryProductRepository } from "../../infrastructure/repositories/InMemoryProductRepository";

export class GetProductsUseCase {
  private readonly repository = new InMemoryProductRepository();

  execute() {
    return this.repository.findAll();
  }
}
