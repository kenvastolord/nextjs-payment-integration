import { CheckoutContext } from "./CheckoutContext";
import { Money } from "../value-objects/Money";

export interface ShippingCalculator {
  calculate(context: CheckoutContext): Money;
}
