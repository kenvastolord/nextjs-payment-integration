import { describe, expect, it } from 'vitest';

import { UuidV7Generator } from './UuidV7Generator';

describe('UuidV7Generator', () => {
  it('should generate a UUID string', () => {
    const generator = new UuidV7Generator();

    const id = generator.generate();

    expect(id).toBeTypeOf('string');
    expect(id).not.toHaveLength(0);
  });

  it('should generate unique identifiers', () => {
    const generator = new UuidV7Generator();

    const first = generator.generate();
    const second = generator.generate();

    expect(first).not.toBe(second);
  });
});
