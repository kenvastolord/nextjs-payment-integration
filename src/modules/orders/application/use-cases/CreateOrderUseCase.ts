import { CreateOrderDto } from "../dto/CreateOrderDto";
import { OrderFactory } from "../factories/OrderFactory";

import { Order } from "@/modules/orders/domain/entities/Order";
import { OrderRepository } from "@/modules/orders/domain/repositories/OrderRepository";
import { CheckoutContext } from "@/modules/orders/domain/services/CheckoutContext";
import { OrderPricingService } from "@/modules/orders/domain/services/OrderPricingService";

export class CreateOrderUseCase {
  constructor(
    private readonly repository: OrderRepository,
    private readonly orderFactory: OrderFactory,
    private readonly orderPricingService: OrderPricingService,
  ) { }

  async execute(dto: CreateOrderDto): Promise<Order> {
    const {
      customerSnapshot,
      shippingAddress,
      items,
    } = this.orderFactory.create(dto);

    const checkoutContext: CheckoutContext = {
      items,
      currency: dto.currency,
      country: shippingAddress.getCountry(),
      postalCode: shippingAddress.getPostalCode(),
    };

    const totals = this.orderPricingService.calculate(
      checkoutContext,
    );

    const order = Order.create({
      id: dto.id,
      customerId: dto.customerId,
      customerSnapshot,
      shippingAddress,
      items,
      totals,
    });

    await this.repository.save(order);

    return order;
  }
}
