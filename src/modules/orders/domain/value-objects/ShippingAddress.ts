export class ShippingAddress {
  private constructor(
    private readonly recipientName: string,
    private readonly addressLine1: string,
    private readonly addressLine2: string | undefined,
    private readonly city: string,
    private readonly postalCode: string,
    private readonly state?: string,
    private readonly phone?: string,
  ) { }

  public static create(
    recipientName: string,
    addressLine1: string,
    city: string,
    postalCode: string,
    addressLine2?: string,
    state?: string,
    phone?: string,
  ): ShippingAddress {
    const normalizedRecipientName = recipientName.trim();
    const normalizedAddressLine1 = addressLine1.trim();
    const normalizedAddressLine2 = addressLine2?.trim() || undefined;
    const normalizedCity = city.trim();
    const normalizedPostalCode = postalCode.trim();
    const normalizedState = state?.trim() || undefined;
    const normalizedPhone = phone?.trim() || undefined;

    if (!normalizedRecipientName) {
      throw new Error("Recipient name cannot be empty.");
    }

    if (!normalizedAddressLine1) {
      throw new Error("Address line 1 cannot be empty.");
    }

    if (!normalizedCity) {
      throw new Error("City cannot be empty.");
    }

    if (!normalizedPostalCode) {
      throw new Error("Postal code cannot be empty.");
    }


    return new ShippingAddress(
      normalizedRecipientName,
      normalizedAddressLine1,
      normalizedAddressLine2,
      normalizedCity,
      normalizedPostalCode,
      normalizedState,
      normalizedPhone,
    );
  }

  public getRecipientName(): string {
    return this.recipientName;
  }

  public getAddressLine1(): string {
    return this.addressLine1;
  }

  public getAddressLine2(): string | undefined {
    return this.addressLine2;
  }

  public getCity(): string {
    return this.city;
  }

  public getState(): string | undefined {
    return this.state;
  }

  public getPostalCode(): string {
    return this.postalCode;
  }


  public getPhone(): string | undefined {
    return this.phone;
  }

  public equals(other: ShippingAddress): boolean {
    return (
      this.recipientName === other.recipientName &&
      this.addressLine1 === other.addressLine1 &&
      this.addressLine2 === other.addressLine2 &&
      this.city === other.city &&
      this.state === other.state &&
      this.postalCode === other.postalCode &&
      this.phone === other.phone
    );
  }
}
