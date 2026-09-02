import { PaymentMethodType } from "../enums/PaymentMethodType";
import { PaymentProvider } from "../enums/PaymentProvider";
import { PaymentStatus } from "../enums/PaymentStatus";

interface CreatePaymentProps {
  id: string;
  orderId: string;
  provider: PaymentProvider;
  providerPaymentId: string;
  paymentMethod: PaymentMethodType;
  amountMinorUnits: number;
  currency: string;
  paymentToken?: string;
}

export class Payment {
  private constructor(
    private readonly id: string,
    private readonly orderId: string,
    private readonly provider: PaymentProvider,
    private readonly providerPaymentId: string,
    private readonly paymentMethod: PaymentMethodType,
    private readonly amountMinorUnits: number,
    private readonly currency: string,
    private status: PaymentStatus,
    private readonly paymentToken: string | undefined,
    private readonly createdAt: Date,
    private updatedAt: Date,
  ) { }

  public static create(props: CreatePaymentProps): Payment {
    const now = new Date();

    return new Payment(
      props.id,
      props.orderId,
      props.provider,
      props.providerPaymentId,
      props.paymentMethod,
      props.amountMinorUnits,
      props.currency,
      PaymentStatus.PENDING,
      props.paymentToken,
      now,
      now,
    );
  }

  public getId(): string {
    return this.id;
  }

  public getOrderId(): string {
    return this.orderId;
  }

  public getProvider(): PaymentProvider {
    return this.provider;
  }

  public getProviderPaymentId(): string {
    return this.providerPaymentId;
  }

  public getPaymentMethod(): PaymentMethodType {
    return this.paymentMethod;
  }

  public getAmountMinorUnits(): number {
    return this.amountMinorUnits;
  }

  public getCurrency(): string {
    return this.currency;
  }

  public getStatus(): PaymentStatus {
    return this.status;
  }

  public getPaymentToken(): string | undefined {
    return this.paymentToken;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public markAsPaid(): void {
    if (this.status !== PaymentStatus.PENDING) {
      throw new Error(
        `Cannot mark payment as paid from status: ${this.status}`,
      );
    }
    this.status = PaymentStatus.PAID;
    this.updatedAt = new Date();
  }

  public markAsFailed(): void {
    if (this.status !== PaymentStatus.PENDING) {
      throw new Error(
        `Cannot mark payment as failed from status: ${this.status}`,
      );
    }
    this.status = PaymentStatus.FAILED;
    this.updatedAt = new Date();
  }

  public markAsExpired(): void {
    if (this.status !== PaymentStatus.PENDING) {
      throw new Error(
        `Cannot mark payment as expired from status: ${this.status}`,
      );
    }
    this.status = PaymentStatus.EXPIRED;
    this.updatedAt = new Date();
  }

  public refund(): void {
    if (this.status !== PaymentStatus.PAID) {
      throw new Error(
        `Cannot refund payment that is not paid. Current status: ${this.status}`,
      );
    }
    this.status = PaymentStatus.REFUNDED;
    this.updatedAt = new Date();
  }

  public partiallyRefund(): void {
    if (this.status !== PaymentStatus.PAID) {
      throw new Error(
        `Cannot partially refund payment that is not paid. Current status: ${this.status}`,
      );
    }
    this.status = PaymentStatus.PARTIALLY_REFUNDED;
    this.updatedAt = new Date();
  }
}
