# ADR-0004 - Payment Workflow

## Status

Proposed

## Date

2026-07-27

## Context

The application must support online payments while remaining independent of any specific payment provider.

Although the MVP will initially integrate Stripe Checkout, the business architecture must allow future integrations with providers such as:

- PayPal
- Mercado Pago
- Redsys
- Adyen
- Mollie

Changing the payment provider must not require modifications to the business workflow or the application's core domain.

The payment workflow should model business concepts rather than provider-specific implementations.

---

# Decision

The payment workflow is centered around the **Order**.

The shopping cart represents a temporary user selection.

The Order represents the commercial agreement between the customer and the application.

Payments are always executed against an existing Order.

The Checkout module is responsible for collecting and validating customer information before creating the Order.

Once the Order has been created, Checkout has completed its responsibility.

The Payments module becomes responsible for managing the payment lifecycle.

---

# Business Workflow

The application follows the workflow below.

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
Start Payment
    │
    ▼
Redirect to Payment Provider
    │
    ▼
Payment Provider
    │
    ▼
Webhook
    │
    ▼
Update Payment
    │
    ▼
Update Order
```

This workflow represents the business process and is independent of any payment provider.

---

# Module Responsibilities

## Products

Responsible for:

- Exposing the product catalog.
- Providing product information.

Products must not know about:

- Cart
- Orders
- Payments
- Payment providers

---

## Cart

Responsible for:

- Managing the customer's temporary product selection.
- Calculating the cart subtotal.

The cart is temporary and must never represent a purchase.

The Cart module must not:

- Process payments.
- Create Orders.
- Communicate with payment providers.

---

## Checkout

Responsible for:

- Collecting customer information.
- Collecting shipping information.
- Validating checkout data.
- Initiating Order creation.

Checkout is an application workflow.

Checkout does not own payments.

Checkout does not communicate directly with payment providers.

Its responsibility ends once the Order has been successfully created.

---

## Orders

Responsible for:

- Creating Orders.
- Persisting the purchase information.
- Maintaining the Order lifecycle.
- Representing the commercial agreement.

Orders become the central business entity once Checkout has completed.

Orders do not communicate directly with payment providers.

---

## Payments

Responsible for:

- Starting the payment process.
- Managing the payment lifecycle.
- Communicating with payment providers through the PaymentGateway abstraction.
- Processing payment notifications.
- Updating payment state.
- Coordinating Order status updates after successful payment confirmation.

Payments never operate directly on the Cart.

Payments always reference an existing Order.

---

# Payment Confirmation

The frontend is not considered a trusted source for payment confirmation.

Payment completion is confirmed only after receiving a verified notification from the configured payment provider.

The application must never mark an Order as paid solely because the frontend reports a successful payment.

---

# Webhooks

Provider notifications are the authoritative source of payment status.

Payment providers notify the application asynchronously after processing payments.

These notifications are responsible for updating:

- Payment status.
- Order status.

The application must validate incoming webhook requests before processing them.

---

# Idempotency

Webhook processing must be idempotent.

The same provider event may be delivered multiple times.

Processing the same event repeatedly must always produce the same final application state.

Duplicate events must never:

- Create duplicate Orders.
- Create duplicate Payments.
- Execute business actions multiple times.

---

# Payment Gateway

The application communicates with external payment providers through the `PaymentGateway` abstraction.

The PaymentGateway represents a business capability rather than a provider-specific API.

Examples of provider implementations include:

- Stripe Checkout
- PayPal
- Mercado Pago
- Redsys

The business workflow must never depend on provider-specific concepts.

---

# Provider Independence

Business modules must not contain concepts that belong exclusively to a payment provider.

Examples include:

- Checkout Session
- Payment Intent
- Client Secret
- Preference
- Provider Event

These concepts belong exclusively to the Infrastructure layer.

The Domain and Application layers communicate only through business concepts.

---

# Consequences

## Positive

- Clear separation of responsibilities.
- Order-centered business workflow.
- Independent payment lifecycle.
- Low coupling between business logic and payment providers.
- Easier testing.
- Easier maintenance.
- Future provider replacement with minimal impact.
- Consistent architecture across all payment providers.

## Negative

- Requires additional abstraction layers.
- Introduces more application components during the initial implementation.

---

# Future Evolution

Future payment providers should only require:

- A new PaymentGateway implementation.
- Infrastructure configuration.
- Dependency registration.

The business workflow, Domain, Application, and Presentation layers should remain unchanged regardless of the selected payment provider.

The application understands only one business concept:

**Process a payment for an existing Order.**

How that payment is executed is an implementation detail of the configured PaymentGateway.
