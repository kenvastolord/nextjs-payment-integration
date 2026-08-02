import { PlainOrderDto } from "../dto/PlainOrderDto";

import { Order } from "@/modules/orders/domain/entities/Order";

export class OrderResponseMapper {
  public static toPlainOrder(
    order: Order,
  ): PlainOrderDto {
    const totals = order.getTotals();
    const currency = totals.getTotal().getCurrency();

    return {
      id: order.getId(),
      customerId: order.getCustomerId(),

      customerSnapshot: {
        firstName: order.getCustomerSnapshot().getFirstName(),
        lastName: order.getCustomerSnapshot().getLastName(),
        email: order.getCustomerSnapshot().getEmail(),
        phone: order.getCustomerSnapshot().getPhone(),
      },

      shippingAddress: {
        recipientName: order.getShippingAddress().getRecipientName(),
        addressLine1: order.getShippingAddress().getAddressLine1(),
        addressLine2: order.getShippingAddress().getAddressLine2(),
        city: order.getShippingAddress().getCity(),
        postalCode: order.getShippingAddress().getPostalCode(),
        country: order.getShippingAddress().getCountry(),
        state: order.getShippingAddress().getState(),
        phone: order.getShippingAddress().getPhone(),
      },

      items: order.getItems().map((item) => ({
        productId: item.getProductId(),
        sku: item.getSku(),
        name: item.getName(),
        originalUnitPrice: item.getOriginalUnitPrice().getAmount(),
        finalUnitPrice: item.getFinalUnitPrice().getAmount(),
        quantity: item.getQuantity(),
        lineTotal: item.getLineTotal().getAmount(),
      })),

      totals: {
        subtotal: totals.getSubtotal().getAmount(),
        shipping: totals.getShipping().getAmount(),
        taxes: totals.getTaxes().getAmount(),
        discount: totals.getDiscount().getAmount(),
        total: totals.getTotal().getAmount(),
        currency,
      },

      status: order.getStatus(),

      createdAt: order.getCreatedAt().toISOString(),
      updatedAt: order.getUpdatedAt().toISOString(),
    };
  }
}
