import { OrderStatus } from "@/modules/orders/domain/enums/OrderStatus";

export interface PlainOrderDto {
  id: string;
  customerId?: string;

  customerSnapshot: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };

  shippingAddress: {
    recipientName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    postalCode: string;
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
    lineTotal: number;
  }>;

  totals: {
    subtotal: number;
    shipping: number;
    taxes: number;
    discount: number;
    total: number;
    currency: string;
  };

  status: OrderStatus;

  createdAt: string;
  updatedAt: string;
}
