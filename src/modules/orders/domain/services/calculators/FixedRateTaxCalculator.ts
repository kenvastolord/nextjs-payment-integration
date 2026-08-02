import { Money } from "../../value-objects/Money";
import { CheckoutContext } from "../CheckoutContext";
import { TaxCalculator } from "../TaxCalculator";

export class FixedRateTaxCalculator implements TaxCalculator {
  constructor(
    private readonly rate: number,
  ) { }

  calculate(context: CheckoutContext): Money {
    const subtotal = context.items.reduce(
      (sum, item) => sum + item.getLineTotal().getAmount(),
      0,
    );

    const tax = Number((subtotal * this.rate).toFixed(2));

    return Money.create(tax, context.currency);
  }
}
