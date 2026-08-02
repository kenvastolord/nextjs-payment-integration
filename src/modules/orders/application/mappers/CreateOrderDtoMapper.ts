import { DEFAULT_CURRENCY } from "@/shared/constants/config";

import { CreateOrderDto } from "../dto/CreateOrderDto";
import { CreateOrderRequestDto } from "../dto/CreateOrderRequestDto";

export class CreateOrderDtoMapper {
  public static toDto(
    request: CreateOrderRequestDto,
  ): CreateOrderDto {
    const { shippingForm, cart } = request;

    const nameParts = shippingForm.name.trim().split(/\s+/);

    return {
      // TODO: Reemplazar por UUID v7 cuando exista el servicio de generación de IDs.
      id: `order-${Date.now()}`,

      customer: {
        firstName: nameParts[0] ?? "Guest",
        lastName: nameParts.slice(1).join(" ") || "Customer",
        email: shippingForm.email,
        phone: shippingForm.phone,
      },

      shippingAddress: {
        recipientName: shippingForm.name,
        addressLine1: shippingForm.address,
        city: shippingForm.city,
        postalCode: "10001",
        country: "US",
        phone: shippingForm.phone,
      },

      items: cart.map((item) => ({
        productId: String(item.id),
        sku: `${item.id}-${item.selectedColor ?? "default"}-${item.selectedSize ?? "default"}`,
        name: item.name,
        originalUnitPrice: item.price,
        finalUnitPrice: item.price,
        quantity: item.quantity,
      })),

      currency: DEFAULT_CURRENCY,

      // Estos valores serán recalculados por OrderPricingService.
      shipping: 0,
      taxes: 0,
      discount: 0,
    };
  }
}
