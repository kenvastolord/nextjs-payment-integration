# Architecture refactor backlog

This document collects improvements identified during the architectural refactor process.

## Rules

- Do not implement these tasks during the refactor unless they block progress.
- Each task should be associated with a technical or architectural decision.
- At the end of the migration, they will be prioritized and converted into roadmap issues or tasks.

---

## Images

### Add `sizes` to Next.js Image components

**Status**

- Pending

**Priority**

- Medium

**Reason**

Components using `next/image` with the `fill` property should define `sizes` so that Next.js can generate optimized images based on the viewport.

**Affected files**

- `modules/products/presentation/components/ProductCard.tsx`

---

## Products

_No tasks yet._

---

## Cart

### Domain model

- [ ] Decouple CartItem from ProductType.
- [ ] Introduce a dedicated CartItem domain model.
- [ ] Store only the selected product snapshot required for checkout.

## Checkout

### Forms

- [ ] Create reusable form field components.
- [ ] Create reusable text input components.
- [ ] Standardize form validation patterns.
- [ ] Standardize error message rendering.

### Domain

- [ ] Move checkout business rules into the application layer.
- [ ] Remove navigation logic from presentation components.
- [ ] Introduce use cases for shipping and payment.
- [ ] Design the checkout workflow.
- [ ] Validate checkout step transitions.

### Persistence

- [ ] Persist shipping information.
- [ ] Associate shipping data with carts and orders.
- [ ] Support guest and authenticated checkout.

## Payments

### Architecture

- [ ] Design the PaymentGateway abstraction.
- [ ] Isolate payment providers behind the infrastructure layer.
- [ ] Prevent presentation components from depending on payment providers.
- [ ] Define the PaymentGateway interface.
- [ ] Implement the Stripe provider behind the PaymentGateway abstraction.
- [ ] Ensure the application layer is provider-agnostic.
- [ ] Prevent business logic from depending on payment SDKs.

### Integration

- [ ] Integrate the Stripe provider.
- [ ] Create payment intents.
- [ ] Handle payment confirmation and failures.
- [ ] Persist payment transactions.

### Domain

- [ ] Introduce payment use cases.
- [ ] Model the payment lifecycle.

## Shared

_No tasks yet._
