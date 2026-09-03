import { describe, expect, it } from 'vitest';

import { FakeIdGenerator } from './FakeIdGenerator';

describe('FakeIdGenerator', () => {
  it('should generate sequential fake identifiers', () => {
    const generator = new FakeIdGenerator();

    expect(generator.generate()).toBe('fake-id-1');
    expect(generator.generate()).toBe('fake-id-2');
    expect(generator.generate()).toBe('fake-id-3');
  });
});
