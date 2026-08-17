import { describe, expect, it } from 'vitest';


import { buildOrdersDependencies } from './buildOrdersDependencies';
import { FakeIdGenerator } from '@tests/fakes/FakeIdGenerator';

describe('buildOrdersDependencies', () => {
  it('should build all Orders use cases', () => {
    const dependencies = buildOrdersDependencies({
      idGenerator: new FakeIdGenerator(),
    });

    expect(dependencies.createOrderUseCase).toBeDefined();
    expect(dependencies.getOrderByIdUseCase).toBeDefined();
    expect(dependencies.confirmOrderUseCase).toBeDefined();
    expect(dependencies.cancelOrderUseCase).toBeDefined();
    expect(dependencies.prepareOrderUseCase).toBeDefined();
    expect(dependencies.shipOrderUseCase).toBeDefined();
    expect(dependencies.deliverOrderUseCase).toBeDefined();
  });
});
