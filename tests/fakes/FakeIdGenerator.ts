import type { IdGenerator } from '@/ports/identity/IdGenerator';

export class FakeIdGenerator implements IdGenerator {
  private currentId = 0;

  generate(): string {
    this.currentId += 1;

    return `fake-id-${this.currentId}`;
  }
}
