import { CheckoutContext } from "../CheckoutContext";
import { Money } from "../../value-objects/Money";
import { DiscountCalculator } from "../DiscountCalculator";

export class NoDiscountCalculator implements DiscountCalculator {
  calculate(context: CheckoutContext): Money {
    return Money.zero(context.currency);
  }
}
