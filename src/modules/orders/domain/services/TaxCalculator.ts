import { CheckoutContext } from "./CheckoutContext";
import { Money } from "../value-objects/Money";

export interface TaxCalculator {
  calculate(context: CheckoutContext): Money;
}
