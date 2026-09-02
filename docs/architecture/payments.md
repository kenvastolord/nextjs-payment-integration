# Payments

## Purpose

The Payments module owns the payment lifecycle.

It is responsible for initiating payments, processing payment 
notifications, and maintaining payment state.

Payments are always associated with an existing Order.

---

## Responsibilities

- Initiating the payment process for an existing Order.
- Managing the payment lifecycle.
- Communicating with payment providers through the PaymentGateway abstraction.
- Processing payment notifications.
- Updating payment state.
- Coordinating Order status updates after payment confirmation.

---

## Module Boundaries

### Can Know

- Orders (through Application layer use cases)
- PaymentGateway abstraction

### Must Not Know

- Shopping cart
- Product catalog
- Checkout implementation
- Provider SDKs outside Infrastructure
- Provider-specific concepts

---

## Presentation Layer

The Payments presentation layer is responsible for:

- Collecting payment method selection from the user.
- Delegating sensitive data capture to the configured payment provider.
- Never handling raw card data or provider-specific tokens directly.
- Receiving a paymentToken from the Application layer via Server Action.
- Using the provider SDK to complete the payment with the paymentToken.

The presentation layer must never depend on provider SDKs directly.
Provider SDKs used for UI rendering must be isolated behind 
presentation-level abstractions or loaded exclusively in 
client components dedicated to that purpose.

---

## Payment Flow

```text
Order Created
      │
      ▼
Start Payment (Server Action)
      │
      ▼
PaymentGateway.createPayment
      │
      ▼
Payment persisted (PENDING)
      │
      ▼
paymentToken returned to frontend
      │
      ▼
User completes payment on provider UI
      │
      ▼
Webhook received and validated
      │
      ▼
Payment status updated
      │
      ▼
Order status updated
```

---

## Payment Confirmation

The frontend is not a trusted source for payment confirmation.

Payment completion is confirmed only after receiving a verified 
notification from the configured payment provider via webhook.

The application must never mark an Order as paid solely because 
the frontend reports a successful payment.

---

## Order Confirmation Page

The confirmation page reflects the current state of the Order 
at the time of rendering.

Payment confirmation arrives asynchronously via webhook.

The page must not assume the payment has been confirmed simply 
because the user has been redirected to it.

---

## Server Actions

Each Server Action has a single responsibility and belongs 
to its owning module.

| Action | Module | Responsibility |
|---|---|---|
| submitCheckoutAction | Checkout | Creates the Order |
| startPaymentAction | Payments | Initiates the Payment for an existing Order |

---

## Provider Independence

The business workflow must remain independent of any specific 
payment provider.

Examples of provider-specific concepts that must never appear 
in Domain or Application layers:

- Payment Intent
- Checkout Session
- Client Secret
- Preference
- Provider Event

These concepts belong exclusively to the Infrastructure layer.

The Domain and Application layers communicate only through 
business concepts such as:

- paymentToken
- PaymentStatus
- PaymentGateway

---

## Webhook Handler

The webhook handler is the only entry point for provider 
notifications into the application.

Responsibilities:

- Validate the authenticity of the incoming notification.
- Translate provider-specific events into domain operations.
- Delegate state updates to the appropriate use cases.
- Respond to the provider to acknowledge receipt.

The webhook handler must never contain business logic.
Business logic belongs to the Domain and Application layers.

---

## Future Evolution

Additional payment providers should only require:

- A new PaymentGateway implementation in Infrastructure.
- Configuration and dependency registration.

The Domain, Application, and Presentation layers must remain 
unchanged regardless of the configured payment provider.
