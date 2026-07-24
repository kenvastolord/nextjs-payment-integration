# Architecture Refactor Backlog

Este documento recopila mejoras detectadas durante el proceso de refactorización arquitectónica.

## Reglas

- No implementar estas tareas durante el refactor salvo que bloqueen el avance.
- Cada tarea debe estar asociada a una decisión técnica o arquitectónica.
- Al finalizar la migración, se priorizarán y convertirán en issues o tareas del roadmap.

---

## Images

### Add `sizes` to Next.js Image components

**Estado**

- Pending

**Prioridad**

- Medium

**Motivo**

Los componentes que utilizan `next/image` con la propiedad `fill` deben definir `sizes` para que Next.js pueda generar imágenes optimizadas según el viewport.

**Archivos afectados**

- `modules/products/presentation/components/ProductCard.tsx`

---

## Products

_No tasks yet._

---

## Cart

### Domain Model

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

- [ ] Design the PaymentService abstraction.
- [ ] Isolate payment providers behind the infrastructure layer.
- [ ] Prevent presentation components from depending on payment providers.
- [ ] Define the PaymentService interface.
- [ ] Implement the Stripe provider behind the PaymentService abstraction.
- [ ] Ensure the application layer is provider-agnostic.
- [ ] Prevent business logic from depending on payment SDKs.

### Integration

- [ ] Integrate Stripe provider.
- [ ] Create payment intents.
- [ ] Handle payment confirmation and failures.
- [ ] Persist payment transactions.

### Domain

- [ ] Introduce payment use cases.
- [ ] Model the payment lifecycle.

## Shared

_No tasks yet._
