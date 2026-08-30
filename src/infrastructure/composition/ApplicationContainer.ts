import { ApplicationDependencies } from "./ApplicationDependencies";
import { CartDependencies } from "./CartDependencies";
import { OrdersDependencies } from "./OrdersDependencies";
import { PaymentsDependencies } from "./PaymentsDependencies";
import { ProductsDependencies } from "./ProductsDependencies";

export interface ApplicationContainer {
  application: ApplicationDependencies;
  orders: OrdersDependencies;
  products: ProductsDependencies;
  cart: CartDependencies;
  // TODO: Remove optional modifier once StripePaymentGateway and
  // InMemoryPaymentRepository are implemented and wired in
  // buildApplicationDependencies. payments must always be required.
  payments?: PaymentsDependencies;
}
