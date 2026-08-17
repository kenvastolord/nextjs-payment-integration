import { describe, expect, it } from 'vitest';

import { UuidV7Generator } from '../identity/UuidV7Generator';
import { buildApplicationDependencies } from './buildApplicationDependencies';

describe('buildApplicationDependencies', () => {
  it('should build the application container', () => {
    const container = buildApplicationDependencies();

    expect(container).toBeDefined();

    expect(container.application).toBeDefined();
    expect(container.orders).toBeDefined();
    expect(container.products).toBeDefined();
    expect(container.cart).toBeDefined();
  });

  it('should register UuidV7Generator as the IdGenerator implementation', () => {
    const container = buildApplicationDependencies();

    expect(container.application.idGenerator).toBeInstanceOf(UuidV7Generator);
  });
});
