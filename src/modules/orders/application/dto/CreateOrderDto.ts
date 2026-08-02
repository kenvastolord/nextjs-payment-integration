export interface CreateOrderDto {
  id: string;
  customerId?: string;

  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
    taxId?: string;
  };

  shippingAddress: {
    recipientName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    postalCode: string;
    country: string;
    state?: string;
    phone?: string;
  };

  items: Array<{
    productId: string;
    sku: string;
    name: string;
    originalUnitPrice: number;
    finalUnitPrice: number;
    quantity: number;
  }>;

  currency: string;

  shipping: number;
  taxes: number;
  discount: number;
}
