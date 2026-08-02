import { CheckoutContext } from "./CheckoutContext";
import { DiscountCalculator } from "./DiscountCalculator";
import { ShippingCalculator } from "./ShippingCalculator";
import { TaxCalculator } from "./TaxCalculator";

import { Money } from "../value-objects/Money";
import { OrderTotals } from "../value-objects/OrderTotals";

export class OrderPricingService {
  constructor(
    private readonly shippingCalculator: ShippingCalculator,
    private readonly taxCalculator: TaxCalculator,
    private readonly discountCalculator: DiscountCalculator,
  ) { }

  public calculate(
    context: CheckoutContext,
  ): OrderTotals {
    if (context.items.length === 0) {
      throw new Error("Cannot calculate totals for an empty order.");
    }

    const subtotal = context.items.reduce(
      (sum, item) => sum.add(item.getLineTotal()),
      Money.zero(context.currency),
    );

    const shipping =
      this.shippingCalculator.calculate(context);

    const taxes =
      this.taxCalculator.calculate(context);

    const discount =
      this.discountCalculator.calculate(context);

    const total = subtotal
      .add(shipping)
      .add(taxes)
      .subtract(discount);

    return OrderTotals.create({
      subtotal,
      shipping,
      taxes,
      discount,
      total,
    });
  }
}
