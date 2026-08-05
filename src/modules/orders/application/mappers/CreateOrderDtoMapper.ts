import { DEFAULT_CURRENCY } from "@/shared/constants/config";

import { CreateOrderDto } from "../dto/CreateOrderDto";
import { CreateOrderRequestDto } from "../dto/CreateOrderRequestDto";

export class CreateOrderDtoMapper {
  public static toDto(
    request: CreateOrderRequestDto,
  ): CreateOrderDto {
    const { shippingForm, cart } = request;

    return {
      customer: {
        firstName: shippingForm.firstName.trim() || "Guest",
        lastName: shippingForm.lastName.trim() || "Customer",
        email: shippingForm.email,
        phone: shippingForm.phone,
      },

      shippingAddress: {
        recipientName: `${shippingForm.firstName} ${shippingForm.lastName}`.trim(),
        addressLine1: shippingForm.addressLine1,
        addressLine2: shippingForm.addressLine2,
        city: shippingForm.city,
        postalCode: shippingForm.postalCode,
        country: shippingForm.country,
        state: shippingForm.state,
        phone: shippingForm.phone,
      },

      items: cart.map((item) => ({
        productId: String(item.id),

        // TODO: Use the catalog SKU once product integration is available.
        sku: `${item.id}-${item.selectedColor ?? "default"}-${item.selectedSize ?? "default"}`,

        name: item.name,
        // TODO: Use catalog prices already normalized to minor units.
        originalUnitPrice: item.price,
        finalUnitPrice: item.price,

        quantity: item.quantity,
      })),

      currency: DEFAULT_CURRENCY,
    };
  }
}
