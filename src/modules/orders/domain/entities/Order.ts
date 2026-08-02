import { OrderStatus } from "../enums/OrderStatus";
import { EmptyOrderError } from "../errors/EmptyOrderError";
import { InvalidOrderStatusTransitionError } from "../errors/InvalidOrderStatusTransitionError";
import { OrderAlreadyInStatusError } from "../errors/OrderAlreadyInStatusError";
import { CustomerSnapshot } from "../value-objects/CustomerSnapshot";
import { OrderTotals } from "../value-objects/OrderTotals";
import { ShippingAddress } from "../value-objects/ShippingAddress";
import { OrderItem } from "./OrderItem";

interface CreateOrderProps {
  id: string;
  customerId?: string;
  customerSnapshot: CustomerSnapshot;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  totals: OrderTotals;
}

export class Order {
  private constructor(
    private readonly id: string,
    private readonly customerId: string | undefined,
    private readonly customerSnapshot: CustomerSnapshot,
    private readonly shippingAddress: ShippingAddress,
    private readonly items: OrderItem[],
    private readonly totals: OrderTotals,
    private status: OrderStatus,
    private readonly createdAt: Date,
    private updatedAt: Date,
  ) { }

  public static create({
    id,
    customerId,
    customerSnapshot,
    shippingAddress,
    items,
    totals,
  }: CreateOrderProps): Order {
    const normalizedId = id.trim();

    if (!normalizedId) {
      throw new Error("Order ID cannot be empty.");
    }

    if (items.length === 0) {
      throw new EmptyOrderError();
    }

    const calculatedTotal = items.reduce(
      (sum, item) => sum.add(item.getLineTotal()),
      items[0].getLineTotal().subtract(items[0].getLineTotal()),
    );

    if (!calculatedTotal.equals(totals.getTotal())) {
      throw new Error("Order total does not match the sum of its items.");
    }

    const now = new Date();

    return new Order(
      normalizedId,
      customerId?.trim() || undefined,
      customerSnapshot,
      shippingAddress,
      [...items],
      totals,
      OrderStatus.CREATED,
      now,
      now,
    );
  }

  public getId(): string {
    return this.id;
  }

  public getCustomerId(): string | undefined {
    return this.customerId;
  }

  public getCustomerSnapshot(): CustomerSnapshot {
    return this.customerSnapshot;
  }

  public getShippingAddress(): ShippingAddress {
    return this.shippingAddress;
  }

  public getItems(): OrderItem[] {
    return [...this.items];
  }

  public getTotals(): OrderTotals {
    return this.totals;
  }

  public getStatus(): OrderStatus {
    return this.status;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public confirm(): void {
    this.transitionTo(OrderStatus.CREATED, OrderStatus.CONFIRMED);
  }

  public prepare(): void {
    this.transitionTo(OrderStatus.CONFIRMED, OrderStatus.PREPARING);
  }

  public ship(): void {
    this.transitionTo(OrderStatus.PREPARING, OrderStatus.SHIPPED);
  }

  public deliver(): void {
    this.transitionTo(OrderStatus.SHIPPED, OrderStatus.DELIVERED);
  }

  public cancel(): void {
    if (this.status === OrderStatus.CANCELLED) {
      throw new OrderAlreadyInStatusError(OrderStatus.CANCELLED);
    }

    if (
      this.status !== OrderStatus.CREATED &&
      this.status !== OrderStatus.CONFIRMED &&
      this.status !== OrderStatus.PREPARING
    ) {
      throw new InvalidOrderStatusTransitionError(
        this.status,
        OrderStatus.CANCELLED,
      );
    }

    this.status = OrderStatus.CANCELLED;
    this.updatedAt = new Date();
  }

  private transitionTo(
    expected: OrderStatus,
    next: OrderStatus,
  ): void {
    if (this.status === next) {
      throw new OrderAlreadyInStatusError(next);
    }

    if (this.status !== expected) {
      throw new InvalidOrderStatusTransitionError(
        this.status,
        next,
      );
    }

    this.status = next;
    this.updatedAt = new Date();
  }
}
