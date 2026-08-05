import { CreateOrderDto } from "../dto/CreateOrderDto";

import { IdGenerator } from "@/ports/identity/IdGenerator";

import { OrderItem } from "@/modules/orders/domain/entities/OrderItem";
import { CustomerSnapshot } from "@/modules/orders/domain/value-objects/CustomerSnapshot";
import { Money } from "@/modules/orders/domain/value-objects/Money";
import { ShippingAddress } from "@/modules/orders/domain/value-objects/ShippingAddress";

export interface OrderFactoryResult {
  id: string;
  customerSnapshot: CustomerSnapshot;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
}

export class OrderFactory {
  constructor(
    private readonly idGenerator: IdGenerator,
  ) { }

  create(dto: CreateOrderDto): OrderFactoryResult {
    const customerSnapshot = CustomerSnapshot.create(
      dto.customer.firstName,
      dto.customer.lastName,
      dto.customer.email,
      dto.customerId,
      dto.customer.phone,
      dto.customer.company,
      dto.customer.taxId,
    );

    const shippingAddress = ShippingAddress.create(
      dto.shippingAddress.recipientName,
      dto.shippingAddress.addressLine1,
      dto.shippingAddress.city,
      dto.shippingAddress.postalCode,
      dto.shippingAddress.addressLine2,
      dto.shippingAddress.state,
      dto.shippingAddress.phone,
    );

    const items = dto.items.map((item) => {
      const originalUnitPrice = Money.create(
        item.originalUnitPrice,
        dto.currency,
      );

      const finalUnitPrice = Money.create(
        item.finalUnitPrice,
        dto.currency,
      );

      return OrderItem.create({
        productId: item.productId,
        sku: item.sku,
        name: item.name,
        originalUnitPrice,
        finalUnitPrice,
        quantity: item.quantity,
      });
    });

    return {
      id: this.idGenerator.generate(),
      customerSnapshot,
      shippingAddress,
      items,
    };
  }
}
