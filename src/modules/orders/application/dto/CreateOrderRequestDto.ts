import { ShippingFormInputs } from "@/modules/checkout/schemas/shipping.schema";

export interface CreateOrderRequestDto {
  shippingForm: ShippingFormInputs;

  cart: Array<{
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    selectedColor?: string;
    selectedSize?: string;
  }>;
}
