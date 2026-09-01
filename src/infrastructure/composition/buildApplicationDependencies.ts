import { UuidV7Generator } from "../identity/UuidV7Generator";
import { ApplicationContainer } from "./ApplicationContainer";
import { ApplicationDependencies } from "./ApplicationDependencies";
import { buildCartDependencies } from "./buildCartDependencies";
import { buildOrdersDependencies } from "./buildOrdersDependencies";
import { buildPaymentsDependencies } from "./buildPaymentsDependencies";
import { buildProductsDependencies } from "./buildProductsDependencies";

export function buildApplicationDependencies(): ApplicationContainer {
  const application: ApplicationDependencies = {
    idGenerator: new UuidV7Generator(),
  };

  const orders = buildOrdersDependencies(application);
  const products = buildProductsDependencies(application);
  const cart = buildCartDependencies(application);
  const payments = buildPaymentsDependencies(application, orders);

  return {
    application,
    orders,
    products,
    cart,
    payments,
  };
}
