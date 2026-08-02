export interface CreateOrderRequestDto {
  shippingForm: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  };

  cart: Array<{
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    selectedColor?: string;
    selectedSize?: string;
  }>;
}
