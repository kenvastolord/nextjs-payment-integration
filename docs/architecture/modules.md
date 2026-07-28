# Modules

This document defines the responsibilities, ownership, and boundaries of each business module.

Each module represents an independent business capability.

Modules should communicate through business concepts rather than implementation details.

The goal is to maximize cohesion while minimizing coupling between modules.

---

# Module Interaction

The business workflow is composed of the following modules.

```text
Products
    │
    ▼
Cart
    │
    ▼
Checkout
    │
    ▼
Orders
    │
    ▼
Payments
```

This diagram represents the business workflow.

It does **not** represent implementation dependencies.

Each module owns its own business rules and exposes behavior through its Application layer.

---

# Products

## Responsibility

The Products module owns the product catalog.

It is responsible for exposing product information to the rest of the application.

## Owns

- Products
- Categories
- Product search
- Product filtering

## Can Know

- Its own domain

## Must Not Know

- Cart
- Checkout
- Orders
- Payments
- Users
- Payment providers

---

# Cart

## Responsibility

The Cart module manages the customer's temporary product selection.

The shopping cart is not a purchase.

It only represents the customer's current selection.

## Owns

- Cart items
- Quantities
- Selected variants
- Cart subtotal

## Can Know

- Products

## Must Not Know

- Payment providers
- Orders
- Payment lifecycle
- Transactions

---

# Checkout

## Responsibility

The Checkout module coordinates the checkout process.

It collects and validates all information required before an Order can be created.

Checkout is a workflow.

It is not responsible for payments.

## Owns

- Shipping information
- Checkout validation
- Checkout flow
- Checkout steps

## Can Know

- Cart
- Orders

## Must Not Know

- Payment providers
- Payment SDKs
- Payment implementation details
- Webhooks

Checkout finishes once the Order has been successfully created.

---

# Orders

## Responsibility

The Orders module owns the commercial agreement between the customer and the business.

Once created, the Order becomes the central business entity.

## Owns

- Orders
- Order items
- Order totals
- Order status

## Can Know

- Checkout
- Payments (business concepts only)

## Must Not Know

- Shopping cart implementation
- Payment provider SDKs
- Provider-specific payment objects

Orders must remain independent from external payment providers.

---

# Payments

## Responsibility

The Payments module owns the payment lifecycle.

It is responsible for initiating payments, processing payment notifications, and maintaining payment state.

Payments are always associated with an existing Order.

## Owns

- Payments
- Payment status
- Payment transactions
- Payment workflow

## Can Know

- Orders
- PaymentGateway abstraction

## Must Not Know

- Shopping cart
- Product catalog
- Checkout implementation
- Provider SDKs outside Infrastructure

---

# Users

## Responsibility

The Users module manages user information.

## Owns

- User profile
- Customer information

## Can Know

- Authentication

## Must Not Know

- Payment implementation
- Product catalog internals

---

# Authentication

## Responsibility

The Authentication module manages identity and access.

Authentication determines who the user is.

It does not manage business rules.

## Owns

- Authentication
- Sessions
- Authorization
- Credentials

## Can Know

- Users

## Must Not Know

- Payments
- Orders
- Cart
- Products

---

# Module Communication

Modules should communicate through their Application layer.

Direct access to another module's Infrastructure layer is prohibited.

Example:

```text
Checkout
        │
        ▼
CreateOrderUseCase
        │
        ▼
Orders
```

Instead of:

```text
Checkout
        │
        ▼
OrderRepository
```

---

# Provider Isolation

External providers belong exclusively to the Infrastructure layer.

Examples include:

- Stripe
- PayPal
- Mercado Pago
- Redsys
- Adyen

Business modules must never communicate directly with external providers.

Instead, communication occurs through the `PaymentGateway` abstraction.

```text
Payments
        │
        ▼
PaymentGateway
        ▲
        │
StripeGateway

PayPalGateway

MercadoPagoGateway
```

---

# Business Ownership

Each business concept has a single owner.

| Business Concept     | Owner Module   |
| -------------------- | -------------- |
| Product              | Products       |
| Category             | Products       |
| Shopping Cart        | Cart           |
| Checkout Flow        | Checkout       |
| Shipping Information | Checkout       |
| Order                | Orders         |
| Payment              | Payments       |
| Payment Transaction  | Payments       |
| User                 | Users          |
| Authentication       | Authentication |

Business concepts should never have multiple owners.

---

# Design Principles

Every module should follow these principles:

- Own a single business capability.
- Encapsulate its business rules.
- Expose behavior instead of implementation.
- Depend on abstractions.
- Avoid knowledge of external providers.
- Avoid direct access to another module's Infrastructure.
- Remain independently evolvable whenever possible.

The objective is to create independent, maintainable modules that can evolve without introducing unnecessary coupling across the application.
