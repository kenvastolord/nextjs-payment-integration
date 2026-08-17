import { describe, expect, it } from 'vitest';

import { FakeIdGenerator } from '@tests/fakes/FakeIdGenerator';

import { buildCartDependencies } from './buildCartDependencies';

describe('buildCartDependencies', () => {
  it('should build all Cart use cases', () => {
    const dependencies = buildCartDependencies({
      idGenerator: new FakeIdGenerator(),
    });

    expect(dependencies.addProductToCartUseCase).toBeDefined();
    expect(dependencies.removeFromCartUseCase).toBeDefined();
    expect(dependencies.increaseItemQuantityUseCase).toBeDefined();
    expect(dependencies.decreaseItemQuantityUseCase).toBeDefined();
    expect(dependencies.clearCartUseCase).toBeDefined();
  });
});
