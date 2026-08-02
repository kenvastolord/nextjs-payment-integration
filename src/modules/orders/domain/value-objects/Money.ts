export class Money {
  private constructor(
    private readonly amount: number,
    private readonly currency: string,
  ) { }

  public static create(amount: number, currency: string): Money {
    if (!Number.isFinite(amount)) {
      throw new Error("Amount must be a valid number.");
    }

    if (amount < 0) {
      throw new Error("Amount cannot be negative.");
    }

    const normalizedCurrency = currency.trim().toUpperCase();

    if (!normalizedCurrency) {
      throw new Error("Currency cannot be empty.");
    }

    if (normalizedCurrency.length !== 3) {
      throw new Error("Currency must be a valid ISO 4217 code.");
    }

    return new Money(amount, normalizedCurrency);
  }

  public getAmount(): number {
    return this.amount;
  }

  public getCurrency(): string {
    return this.currency;
  }

  public equals(other: Money): boolean {
    return (
      this.amount === other.amount &&
      this.currency === other.currency
    );
  }

  public toString(): string {
    return `${this.amount} ${this.currency}`;
  }
  public add(other: Money): Money {
    this.assertSameCurrency(other);

    return Money.create(
      this.amount + other.amount,
      this.currency,
    );
  }

  public subtract(other: Money): Money {
    this.assertSameCurrency(other);

    if (this.amount < other.amount) {
      throw new Error("Resulting amount cannot be negative.");
    }

    return Money.create(
      this.amount - other.amount,
      this.currency,
    );
  }


  public multiply(multiplier: number): Money {
    if (!Number.isInteger(multiplier)) {
      throw new Error("Multiplier must be an integer.");
    }

    if (multiplier <= 0) {
      throw new Error("Multiplier must be greater than zero.");
    }

    return Money.create(
      this.amount * multiplier,
      this.currency,
    );
  }

  private assertSameCurrency(other: Money): void {
    if (this.currency !== other.currency) {
      throw new Error("Cannot operate with different currencies.");
    }
  }

  public static zero(currency: string): Money {
    return Money.create(0, currency);
  }

}

