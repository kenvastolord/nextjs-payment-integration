import { CheckoutContext } from "./CheckoutContext";
import { Money } from "../value-objects/Money";

export interface DiscountCalculator {
  calculate(context: CheckoutContext): Money;
}
