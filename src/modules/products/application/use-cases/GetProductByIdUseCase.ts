import { InMemoryProductRepository } from "../../infrastructure/repositories/InMemoryProductRepository";

export class GetProductByIdUseCase {
  private readonly repository = new InMemoryProductRepository();

  execute(id: number) {
    return this.repository.findById(id);
  }
}
