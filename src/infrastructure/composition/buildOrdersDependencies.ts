import { ApplicationDependencies } from "./ApplicationDependencies";
import { DEFAULT_SHIPPING_COST, DEFAULT_TAX_RATE, FREE_SHIPPING_THRESHOLD } from "@/shared/constants/pricing";
import { OrderFactory } from "@/modules/orders/application/factories/OrderFactory";
import { CancelOrderUseCase } from "@/modules/orders/application/use-cases/CancelOrderUseCase";
import { ConfirmOrderUseCase } from "@/modules/orders/application/use-cases/ConfirmOrderUseCase";
import { CreateOrderUseCase } from "@/modules/orders/application/use-cases/CreateOrderUseCase";
import { DeliverOrderUseCase } from "@/modules/orders/application/use-cases/DeliverOrderUseCase";
import { GetOrderByIdUseCase } from "@/modules/orders/application/use-cases/GetOrderByIdUseCase";
import { MarkOrderAsPaidUseCase } from "@/modules/orders/application/use-cases/MarkOrderAsPaidUseCase";
import { MarkOrderAsFailedUseCase } from "@/modules/orders/application/use-cases/MarkOrderAsFailedUseCase";
import { PrepareOrderUseCase } from "@/modules/orders/application/use-cases/PrepareOrderUseCase";
import { RefundOrderUseCase } from "@/modules/orders/application/use-cases/RefundOrderUseCase";
import { ShipOrderUseCase } from "@/modules/orders/application/use-cases/ShipOrderUseCase";
import { FlatRateShippingCalculator } from "@/modules/orders/domain/services/calculators/FlatRateShippingCalculator";
import { FixedRateTaxCalculator } from "@/modules/orders/domain/services/calculators/FixedRateTaxCalculator";
import { NoDiscountCalculator } from "@/modules/orders/domain/services/calculators/NoDiscountCalculator";
import { OrderPricingService } from "@/modules/orders/domain/services/OrderPricingService";
import { InMemoryOrderRepository } from "@/modules/orders/infrastructure/repositories/InMemoryOrderRepository";

export interface OrdersDependencies {
  createOrderUseCase: CreateOrderUseCase;
  getOrderByIdUseCase: GetOrderByIdUseCase;
  confirmOrderUseCase: ConfirmOrderUseCase;
  cancelOrderUseCase: CancelOrderUseCase;
  prepareOrderUseCase: PrepareOrderUseCase;
  shipOrderUseCase: ShipOrderUseCase;
  deliverOrderUseCase: DeliverOrderUseCase;
  markOrderAsPaidUseCase: MarkOrderAsPaidUseCase;
  markOrderAsFailedUseCase: MarkOrderAsFailedUseCase;
  refundOrderUseCase: RefundOrderUseCase;
}

export function buildOrdersDependencies(
  _application: ApplicationDependencies,
): OrdersDependencies {
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

  const orderFactory = new OrderFactory(
    _application.idGenerator,
  );

  return {
    createOrderUseCase: new CreateOrderUseCase(
      orderRepository,
      orderFactory,
      orderPricingService,
    ),
    getOrderByIdUseCase: new GetOrderByIdUseCase(
      orderRepository,
    ),
    confirmOrderUseCase: new ConfirmOrderUseCase(
      orderRepository,
    ),
    cancelOrderUseCase: new CancelOrderUseCase(
      orderRepository,
    ),
    prepareOrderUseCase: new PrepareOrderUseCase(
      orderRepository,
    ),
    shipOrderUseCase: new ShipOrderUseCase(
      orderRepository,
    ),
    deliverOrderUseCase: new DeliverOrderUseCase(
      orderRepository,
    ),
    markOrderAsPaidUseCase: new MarkOrderAsPaidUseCase(
      orderRepository,
    ),
    markOrderAsFailedUseCase: new MarkOrderAsFailedUseCase(
      orderRepository,
    ),
    refundOrderUseCase: new RefundOrderUseCase(
      orderRepository,
    ),
  };
}
