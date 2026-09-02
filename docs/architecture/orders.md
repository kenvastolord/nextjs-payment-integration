# Orders

## Purpose

The Orders module owns the commercial agreement between the customer and the business.

Once an Order has been successfully created, it becomes the central business entity of the purchasing workflow.

The Order represents a completed checkout process and serves as the reference point for subsequent business operations, including payment processing and order fulfillment.

The module is responsible for preserving the integrity and consistency of every Order throughout its lifecycle.

---

# Responsibilities

The Orders module is responsible for:

- Creating Orders.
- Maintaining the Order lifecycle.
- Managing Order state transitions.
- Persisting purchase information.
- Protecting business invariants.
- Exposing Order-related business behavior.

The module owns:

- Orders
- Order Items
- Order Totals
- Order Status

Orders represent business concepts and must remain independent from implementation details.

---

# Module Boundaries

## Can Know

The Orders module may collaborate with:

- Checkout
- Payments (business concepts only)

## Must Not Know

The Orders module must never depend on:

- Shopping cart implementation
- Product catalog implementation
- Payment provider SDKs
- Payment provider APIs
- Provider-specific payment models
- Infrastructure implementations

Orders communicate with other modules through business abstractions exposed by the Application layer.

---

# Business Workflow

The Orders module participates in the business workflow below.

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
Create Order
    │
    ▼
Payments
```

Checkout is responsible for collecting and validating customer information before creating the Order.

Once the Order has been created, Checkout has completed its responsibility.

Payments always operate on an existing Order.

The Orders module never communicates directly with external payment providers.

---

# Domain Model

The Order Aggregate models the commercial agreement between the customer and the business.

The Aggregate Root is responsible for protecting the consistency of the Order and coordinating all modifications to its internal state.

## Aggregate Root

- Order

### Order

```text
Order
├── id
├── customerId
├── customerSnapshot
├── shippingAddress
├── items
├── totals
├── status
├── paymentStatus
├── createdAt
└── updatedAt
```

| Property | Description |
|----------|-------------|
| id | Unique identifier of the Order. |
| customerId | Identifier of the customer who owns the Order. |
| customerSnapshot | Snapshot of the customer information at the time of purchase. |
| shippingAddress | Shipping address used during checkout. |
| items | Collection of purchased items. |
| totals | Financial summary of the Order. |
| status | Current business state of the Order. |
| paymentStatus | Current payment state associated with the Order. |
| createdAt | Order creation timestamp. |
| updatedAt | Last modification timestamp. |

---

## Entities

### OrderItem

The Order Aggregate owns every OrderItem.

Each OrderItem represents a snapshot of the purchased product at the time the Order was created.

Future modifications to the Product catalog must never affect existing Orders.

```text
OrderItem
├── productId
├── sku
├── name
├── originalUnitPrice
├── finalUnitPrice
├── quantity
└── lineTotal
```

| Property | Description |
|----------|-------------|
| productId | Identifier of the purchased Product. |
| sku | Purchased product variant. |
| name | Product name at the time of purchase. |
| originalUnitPrice | Original product price before discounts. |
| finalUnitPrice | Final unit price paid by the customer. |
| quantity | Purchased quantity. |
| lineTotal | Final amount charged for the Order line. |

The OrderItem stores historical purchase information.

It is intentionally independent from future Product updates.

---

## Value Objects

### CustomerSnapshot

Represents customer information captured during checkout.

### ShippingAddress

Represents the shipping address used for the Order.

### Money

Represents monetary values used throughout the Order Aggregate.

### OrderTotals

Represents the financial summary of the Order.

```text
OrderTotals
├── subtotal
├── shipping
├── taxes
├── discount
└── total
```

| Property | Description |
|----------|-------------|
| subtotal | Sum of every OrderItem lineTotal. |
| shipping | Shipping cost. |
| taxes | Applied taxes. |
| discount | Total discount applied to the Order. |
| total | Final amount to be charged. |

OrderTotals is responsible for guaranteeing internal financial consistency.

The Aggregate Root owns the lifecycle of all child entities.

All state changes must be performed through the Aggregate Root.

---

# Aggregate Invariants

The Order Aggregate is responsible for enforcing its own consistency.

Business invariants include:

- An Order must contain at least one OrderItem.
- Product quantities must be greater than zero.
- Monetary values cannot be negative.
- OrderTotals must always remain internally consistent.
- The subtotal must equal the sum of every OrderItem lineTotal.
- The total must equal subtotal + shipping + taxes − discount.
- Invalid state transitions must be rejected.
- The Aggregate Root is the only component allowed to modify its child entities.
- Customer and Product information stored inside the Order represent immutable snapshots of the purchase.

Business invariants belong to the Domain and must never depend on Presentation, Application, Infrastructure, or external providers.

---

# Order Lifecycle

The Orders module owns the complete lifecycle of an Order.

The lifecycle begins when Checkout successfully creates an Order.

Subsequent state changes are managed by the Orders module in response to valid business operations.

Payment confirmation may trigger Order state transitions, but Orders remain responsible for validating and applying those transitions.

## Order Status

```text
CREATED
CONFIRMED
PREPARING
SHIPPED
DELIVERED
CANCELLED
```

Allowed transitions:

```text
CREATED
    │
    ▼
CONFIRMED
    │
    ▼
PROCESSING
    │
    ▼
SHIPPED
    │
    ▼
DELIVERED
```

Cancellation:

```text
CREATED ─────────► CANCELLED

CONFIRMED ───────► CANCELLED
```

Orders in the SHIPPED or DELIVERED state cannot be cancelled.

---

## Payment Status

```text
PENDING
PAID
FAILED
REFUNDED
PARTIALLY_REFUNDED
```

Allowed transitions:

```text
    PENDING
    ├──► PAID
    ├──► FAILED
    └──► EXPIRED

    PAID
    ├──► REFUNDED
    └──► PARTIALLY_REFUNDED

    PARTIALLY_REFUNDED
    └──► REFUNDED
```

The payment lifecycle is owned by the Payments module.

The Orders module stores the current payment status to coordinate business workflows while remaining independent from payment providers.

# Application Layer

The Application layer coordinates Order-related business workflows.

Typical responsibilities include:

- Creating Orders.
- Retrieving Orders.
- Coordinating Order state transitions through business operations.
- Coordinating persistence through repository abstractions.

Business rules remain inside the Domain.

The Application layer orchestrates workflows but does not implement core business logic.

Typical use cases include:

- CreateOrderUseCase
- GetOrderByIdUseCase
- ConfirmOrderUseCase
- PrepareOrderUseCase
- ShipOrderUseCase
- DeliverOrderUseCase
- CancelOrderUseCase

Each business transition is represented by a dedicated use case.

Instead of exposing a generic `UpdateOrderStatusUseCase`, every operation expresses a specific business intent, such as confirming, preparing, shipping, delivering, or cancelling an order.

This approach provides several advantages:

- Preserves the ubiquitous language of the domain.
- Avoids generic status updates and `switch`-based implementations.
- Keeps each use case focused on a single responsibility.
- Allows each workflow to evolve independently with its own dependencies, validations, and integrations.
- Aligns with Domain-Driven Design (DDD), Clean Architecture, and CQRS principles.

The use cases delegate all business rules and state transition validation to the `Order` Aggregate, which remains the single source of truth for the Order lifecycle.

---

# Repository

Persistence is abstracted through the OrderRepository interface.

The repository contract belongs to the Domain.

Infrastructure provides the implementation.

The Orders module depends only on the repository abstraction and never on persistence technologies.

Typical responsibilities include:

- Persisting Orders.
- Retrieving Orders.
- Updating existing Orders.

Repository implementations belong exclusively to the Infrastructure layer.

---

# Integration with Checkout

Checkout coordinates the workflow required before an Order exists.

Its responsibilities include:

- Collecting customer information.
- Collecting shipping information.
- Validating checkout data.
- Initiating Order creation.

Checkout communicates with Orders through the Application layer.

```text
Checkout
        │
        ▼
CreateOrderUseCase
        │
        ▼
Orders
```

Checkout does not own Orders and must never modify Order state directly.

---

# Integration with Payments

Payments always operate on an existing Order.

The Orders module never communicates directly with payment providers.

Instead, Payments coordinate payment execution and request Order updates through business operations.

```text
Create Order
        │
        ▼
Payments
        │
        ▼
Webhook
        │
        ▼
Update Order
```

Payment providers remain isolated behind the PaymentGateway abstraction.

Orders remain independent from provider-specific concepts such as:

- Checkout Session
- Payment Intent
- Client Secret
- Provider Events

These concepts belong exclusively to the Payments Infrastructure layer.

---

# Future Evolution

The Orders module has been designed to evolve independently from payment providers and infrastructure technologies.

Future enhancements may introduce additional business capabilities while preserving the existing architectural boundaries.

Examples include:

- Order history.
- Order cancellation policies.
- Shipment tracking.
- Partial shipments.
- Returns.
- Exchanges.
- Order auditing.

Future functionality should extend the existing Domain Model without compromising module isolation, business ownership, or dependency rules.
