# ADR-0001 - Next.js Full Stack MVP

## Status

Accepted

## Date

2026-07-24

## Context

The objective of this project is to evolve an existing ecommerce frontend into a production-ready Full Stack application while maintaining a single codebase during the MVP phase.

The architecture should:

- Minimize operational complexity.
- Reduce development overhead.
- Allow rapid feature delivery.
- Remain flexible enough to extract the backend in the future if required.

Maintaining separate frontend and backend applications at this stage would introduce unnecessary complexity without providing significant benefits for the current project scope.

## Decision

The project will adopt **Next.js** as the primary Full Stack framework.

The application will initially use:

- Next.js App Router
- React Server Components
- Client Components when required
- Server Actions
- Route Handlers (API Routes) when appropriate
- TypeScript throughout the project

Next.js will be responsible for:

- Frontend rendering
- Routing
- Initial backend capabilities
- Server-side rendering
- Server-side business entry points

The project will remain a single repository during the MVP.

## Consequences

### Positive

- Faster development.
- Simpler deployment.
- Lower infrastructure complexity.
- Single technology stack.
- Easier onboarding.
- Excellent TypeScript integration.

### Negative

- Backend initially depends on Next.js.
- Future backend extraction will require an additional migration phase.

## Future Evolution

The architecture must allow the backend to become an independent service without requiring major changes to the business logic.

Future extraction may target technologies such as:

- NestJS
- Fastify
- Express

Only the application entry points should change during this migration.

The domain and application layers should remain reusable.

## Alternatives Considered

### Separate Frontend and Backend

Rejected.

Reason:

The additional complexity is not justified for the MVP.

### Microservices

Rejected.

Reason:

Premature optimization.

### Backend First

Rejected.

Reason:

The current objective is to evolve an existing frontend while progressively introducing backend capabilities.
