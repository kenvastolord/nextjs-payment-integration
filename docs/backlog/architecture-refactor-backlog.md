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

_No tasks yet._

---

## Checkout

_No tasks yet._

---

## Payments

_No tasks yet._

---

## Shared

_No tasks yet._
