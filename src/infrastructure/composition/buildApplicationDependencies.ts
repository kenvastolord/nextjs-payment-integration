import { ApplicationContainer } from "./ApplicationContainer";
import { ApplicationDependencies } from "./ApplicationDependencies";
import { buildCartDependencies } from "./buildCartDependencies";
import { buildOrdersDependencies } from "./buildOrdersDependencies";
import { buildProductsDependencies } from "./buildProductsDependencies";

export function buildApplicationDependencies(): ApplicationContainer {
  const application: ApplicationDependencies = {};

  const orders = buildOrdersDependencies(application);
  const products = buildProductsDependencies(application);
  const cart = buildCartDependencies(application);

  return {
    application,
    orders,
    products,
    cart,
  };
}
