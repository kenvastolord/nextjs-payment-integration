import { v7 as uuidv7 } from "uuid";

import type { IdGenerator } from "@/ports/identity/IdGenerator";

export class UuidV7Generator implements IdGenerator {
  generate(): string {
    return uuidv7();
  }
}
