import { Money } from "../../value-objects/Money";
import { CheckoutContext } from "../CheckoutContext";
import { ShippingCalculator } from "../ShippingCalculator";

export class FlatRateShippingCalculator implements ShippingCalculator {
  constructor(
    private readonly amount: number,
    private readonly freeShippingThreshold?: number,
  ) { }

  calculate(context: CheckoutContext): Money {
    const subtotal = context.items.reduce(
      (sum, item) => sum + item.getLineTotal().getAmount(),
      0,
    );

    if (
      this.freeShippingThreshold !== undefined &&
      subtotal >= this.freeShippingThreshold
    ) {
      return Money.zero(context.currency);
    }

    return Money.create(
      this.amount,
      context.currency,
    );
  }
}
