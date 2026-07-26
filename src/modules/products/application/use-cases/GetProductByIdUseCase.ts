import { ProductRepository } from "../../domain/repositories/ProductRepository";

export class GetProductByIdUseCase {
  constructor(private readonly repository: ProductRepository) { }

  execute(id: number) {
    return this.repository.findById(id);
  }
}
