import { UuidV7Generator } from "../identity/UuidV7Generator";
import { ApplicationContainer } from "./ApplicationContainer";
import { ApplicationDependencies } from "./ApplicationDependencies";
import { buildCartDependencies } from "./buildCartDependencies";
import { buildOrdersDependencies } from "./buildOrdersDependencies";
import { buildProductsDependencies } from "./buildProductsDependencies";

export function buildApplicationDependencies(): ApplicationContainer {
  const application: ApplicationDependencies = {
    idGenerator: new UuidV7Generator(),
  };

  const orders = buildOrdersDependencies(application);
  const products = buildProductsDependencies(application);
  const cart = buildCartDependencies(application);

  // TODO: Wire payments once StripePaymentGateway and
  // InMemoryPaymentRepository are implemented. At that point:
  // - Remove the optional modifier from payments in ApplicationContainer
  // - Call buildPaymentsDependencies(application, orders, gateway, repository)
  // - Add payments to the returned object

  return {
    application,
    orders,
    products,
    cart,
  };
}
