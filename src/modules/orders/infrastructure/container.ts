import { DEFAULT_SHIPPING_COST, DEFAULT_TAX_RATE, FREE_SHIPPING_THRESHOLD } from "@/shared/constants/pricing";

import { OrderFactory } from "../application/factories/OrderFactory";

import { CancelOrderUseCase } from "../application/use-cases/CancelOrderUseCase";
import { ConfirmOrderUseCase } from "../application/use-cases/ConfirmOrderUseCase";
import { CreateOrderUseCase } from "../application/use-cases/CreateOrderUseCase";
import { DeliverOrderUseCase } from "../application/use-cases/DeliverOrderUseCase";
import { GetOrderByIdUseCase } from "../application/use-cases/GetOrderByIdUseCase";
import { PrepareOrderUseCase } from "../application/use-cases/PrepareOrderUseCase";
import { ShipOrderUseCase } from "../application/use-cases/ShipOrderUseCase";

import { FlatRateShippingCalculator } from "../domain/services/calculators/FlatRateShippingCalculator";
import { FixedRateTaxCalculator } from "../domain/services/calculators/FixedRateTaxCalculator";
import { NoDiscountCalculator } from "../domain/services/calculators/NoDiscountCalculator";
import { OrderPricingService } from "../domain/services/OrderPricingService";

import { InMemoryOrderRepository } from "./repositories/InMemoryOrderRepository";

const orderRepository = new InMemoryOrderRepository();

const shippingCalculator = new FlatRateShippingCalculator(
  DEFAULT_SHIPPING_COST,
  FREE_SHIPPING_THRESHOLD,
);

const taxCalculator = new FixedRateTaxCalculator(
  DEFAULT_TAX_RATE,
);

const discountCalculator = new NoDiscountCalculator();

const orderPricingService = new OrderPricingService(
  shippingCalculator,
  taxCalculator,
  discountCalculator,
);

const orderFactory = new OrderFactory();

export const createOrderUseCase = new CreateOrderUseCase(
  orderRepository,
  orderFactory,
  orderPricingService,
);

export const getOrderByIdUseCase = new GetOrderByIdUseCase(orderRepository);
export const confirmOrderUseCase = new ConfirmOrderUseCase(orderRepository);
export const cancelOrderUseCase = new CancelOrderUseCase(orderRepository);
export const prepareOrderUseCase = new PrepareOrderUseCase(orderRepository);
export const shipOrderUseCase = new ShipOrderUseCase(orderRepository);
export const deliverOrderUseCase = new DeliverOrderUseCase(orderRepository);
