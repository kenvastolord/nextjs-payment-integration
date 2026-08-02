import { Money } from "../value-objects/Money";

interface CreateOrderItemProps {
  productId: string;
  sku: string;
  name: string;
  originalUnitPrice: Money;
  finalUnitPrice: Money;
  quantity: number;
}

export class OrderItem {
  private constructor(
    private readonly productId: string,
    private readonly sku: string,
    private readonly name: string,
    private readonly originalUnitPrice: Money,
    private readonly finalUnitPrice: Money,
    private readonly quantity: number,
    private readonly lineTotal: Money,
  ) { }

  public static create({
    productId,
    sku,
    name,
    originalUnitPrice,
    finalUnitPrice,
    quantity,
  }: CreateOrderItemProps): OrderItem {
    const normalizedProductId = productId.trim();
    const normalizedSku = sku.trim();
    const normalizedName = name.trim();

    if (!normalizedProductId) {
      throw new Error("Product ID cannot be empty.");
    }

    if (!normalizedSku) {
      throw new Error("SKU cannot be empty.");
    }

    if (!normalizedName) {
      throw new Error("Product name cannot be empty.");
    }

    if (!Number.isInteger(quantity)) {
      throw new Error("Quantity must be an integer.");
    }

    if (quantity <= 0) {
      throw new Error("Quantity must be greater than zero.");
    }

    const lineTotal = finalUnitPrice.multiply(quantity);

    return new OrderItem(
      normalizedProductId,
      normalizedSku,
      normalizedName,
      originalUnitPrice,
      finalUnitPrice,
      quantity,
      lineTotal,
    );
  }

  public getProductId(): string {
    return this.productId;
  }

  public getSku(): string {
    return this.sku;
  }

  public getName(): string {
    return this.name;
  }

  public getOriginalUnitPrice(): Money {
    return this.originalUnitPrice;
  }

  public getFinalUnitPrice(): Money {
    return this.finalUnitPrice;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getLineTotal(): Money {
    return this.lineTotal;
  }

  public equals(other: OrderItem): boolean {
    return (
      this.productId === other.productId &&
      this.sku === other.sku &&
      this.name === other.name &&
      this.originalUnitPrice.equals(other.originalUnitPrice) &&
      this.finalUnitPrice.equals(other.finalUnitPrice) &&
      this.quantity === other.quantity &&
      this.lineTotal.equals(other.lineTotal)
    );
  }
}
