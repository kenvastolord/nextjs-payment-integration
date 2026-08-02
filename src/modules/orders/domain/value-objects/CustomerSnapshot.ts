export class CustomerSnapshot {
  private constructor(
    private readonly customerId: string | undefined,
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly email: string,
    private readonly phone?: string,
    private readonly company?: string,
    private readonly taxId?: string,
  ) { }

  public static create(
    firstName: string,
    lastName: string,
    email: string,
    customerId?: string,
    phone?: string,
    company?: string,
    taxId?: string,
  ): CustomerSnapshot {
    const normalizedFirstName = firstName.trim();
    const normalizedLastName = lastName.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedFirstName) {
      throw new Error("First name cannot be empty.");
    }

    if (!normalizedLastName) {
      throw new Error("Last name cannot be empty.");
    }

    if (!normalizedEmail) {
      throw new Error("Email cannot be empty.");
    }

    return new CustomerSnapshot(
      customerId?.trim(),
      normalizedFirstName,
      normalizedLastName,
      normalizedEmail,
      phone?.trim(),
      company?.trim(),
      taxId?.trim(),
    );
  }

  public getCustomerId(): string | undefined {
    return this.customerId;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPhone(): string | undefined {
    return this.phone;
  }

  public getCompany(): string | undefined {
    return this.company;
  }

  public getTaxId(): string | undefined {
    return this.taxId;
  }

  public equals(other: CustomerSnapshot): boolean {
    return (
      this.customerId === other.customerId &&
      this.firstName === other.firstName &&
      this.lastName === other.lastName &&
      this.email === other.email &&
      this.phone === other.phone &&
      this.company === other.company &&
      this.taxId === other.taxId
    );
  }

  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
