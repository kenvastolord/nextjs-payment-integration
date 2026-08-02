import { Money } from "./Money";

interface CreateOrderTotalsProps {
  subtotal: Money;
  shipping: Money;
  taxes: Money;
  discount: Money;
  total: Money;
}

export class OrderTotals {
  private constructor(
    private readonly subtotal: Money,
    private readonly shipping: Money,
    private readonly taxes: Money,
    private readonly discount: Money,
    private readonly total: Money,
  ) { }

  public static create({
    subtotal,
    shipping,
    taxes,
    discount,
    total,
  }: CreateOrderTotalsProps): OrderTotals {
    const calculatedTotal = subtotal
      .add(shipping)
      .add(taxes)
      .subtract(discount);

    if (!calculatedTotal.equals(total)) {
      throw new Error("Order totals are inconsistent.");
    }

    return new OrderTotals(
      subtotal,
      shipping,
      taxes,
      discount,
      total,
    );
  }

  public getSubtotal(): Money {
    return this.subtotal;
  }

  public getShipping(): Money {
    return this.shipping;
  }

  public getTaxes(): Money {
    return this.taxes;
  }

  public getDiscount(): Money {
    return this.discount;
  }

  public getTotal(): Money {
    return this.total;
  }

  public equals(other: OrderTotals): boolean {
    return (
      this.subtotal.equals(other.subtotal) &&
      this.shipping.equals(other.shipping) &&
      this.taxes.equals(other.taxes) &&
      this.discount.equals(other.discount) &&
      this.total.equals(other.total)
    );
  }
}
