export interface CreateOrderDto {
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

    /**
     * Price in minor units (e.g. cents).
     * Values must already be normalized by the Products module.
     */
    originalUnitPrice: number;

    /**
     * Price in minor units (e.g. cents).
     * Values must already be normalized by the Products module.
     */
    finalUnitPrice: number;

    quantity: number;
  }>;

  currency: string;
}
