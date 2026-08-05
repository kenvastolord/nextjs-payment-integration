import { IdGenerator } from "@/ports/identity/IdGenerator";

export interface ApplicationDependencies {
  idGenerator: IdGenerator;
}
