# Documentation glossary

This document defines the core terminology used by the project's architecture and operations documentation.

## 1. General terms

### PaymentGateway

Business abstraction used by the application to execute payments without depending on a specific provider.

- It is the interface or contract used by the Application layer.
- It should not be confused with an external provider or a concrete implementation.
- Examples of concrete implementations: `StripePaymentService`, `PayPalPaymentService`, `RedsysPaymentService`.

### PaymentService

Term reserved for concrete services that integrate with external providers.

- It is used for infrastructure-specific implementations.
- It is not used for the business abstraction.

## 2. Operational terms

### Payment Attempt ID

Unique identifier for a payment attempt within the system.

### Idempotency Key

Key used to ensure the same event or request is not processed more than once.

### Provider Transaction ID

Identifier assigned by the external provider to a specific transaction.

### Webhook Event ID

Identifier of the event received through a webhook.

## 3. Domain states

Domain states should be used in the business system.

### Order status

- `CREATED`
- `CONFIRMED`
- `PREPARING`
- `SHIPPED`
- `DELIVERED`
- `CANCELLED`

### Payment status

- `PENDING`
- `PAID`
- `FAILED`
- `REFUNDED`

## 4. Provider-to-domain mappings

States received from external providers must be translated into domain states before updating the system.

| External state | Recommended domain state |
| --- | --- |
| `succeeded` | `PAID` |
| `failed` | `FAILED` |
| `pending` | `PENDING` |
| `requires_action` | `PENDING` |
| `canceled` | `FAILED` or `CANCELLED`, depending on business context |

## 5. Usage rules

- Documentation should use `PaymentGateway` for the business abstraction.
- Concrete providers keep the `Service` suffix in their names.
- Provider states should not appear as if they were domain states without translation.
- Operational identifiers should be treated as tracking and reconciliation metadata.
