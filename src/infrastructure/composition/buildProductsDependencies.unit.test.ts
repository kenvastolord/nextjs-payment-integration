import { describe, expect, it } from 'vitest';

import { FakeIdGenerator } from '@tests/fakes/FakeIdGenerator';

import { buildProductsDependencies } from './buildProductsDependencies';

describe('buildProductsDependencies', () => {
  it('should build all Products use cases', () => {
    const dependencies = buildProductsDependencies({
      idGenerator: new FakeIdGenerator(),
    });

    expect(dependencies.getProductsUseCase).toBeDefined();
    expect(dependencies.getProductByIdUseCase).toBeDefined();
  });
});
