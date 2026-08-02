export class FailureReason {
  private constructor(private readonly value: string) { }

  public static create(reason: string): FailureReason {
    const normalizedReason = reason.trim();

    if (!normalizedReason) {
      throw new Error("Failure reason cannot be empty.");
    }

    if (normalizedReason.length > 255) {
      throw new Error("Failure reason cannot exceed 255 characters.");
    }

    return new FailureReason(normalizedReason);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: FailureReason): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
