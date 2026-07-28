# Next.js Payment Integration

A modern e-commerce application built with Next.js, evolving from an existing frontend into a modular and scalable application architecture.

## Live Demo

Explore the latest deployed version of the application:

**Live Demo:** https://nextjs-payment-integration-7ztn.vercel.app/

## About

**Next.js Payment Integration** is an e-commerce application built with Next.js, React, and TypeScript.

The project provides the client-side experience of an online store, including product browsing, product details, search, filtering, shopping cart management, and checkout-related user interfaces.

The repository started from an existing e-commerce frontend and is being progressively evolved through modularization, separation of responsibilities, application use cases, repository abstractions, and infrastructure implementations.

## From UI Prototype to Modular Architecture

### Initial Project

The repository started from the **e-commerce-ui** project created by **Safak**. The initial codebase provided the core e-commerce UI and client-side functionality, with shared components, a centralized cart store, and shared types.

The initial structure was centered around shared UI components and client-side state:

```text
  src/
  ├── app/
  │   ├── cart/
  │   └── products/
  ├── components/
  │   ├── Categories.tsx
  │   ├── Filter.tsx
  │   ├── Footer.tsx
  │   ├── Navbar.tsx
  │   ├── PaymentForm.tsx
  │   ├── ProductCard.tsx
  │   ├── ProductInteraction.tsx
  │   ├── ProductList.tsx
  │   ├── SearchBar.tsx
  │   ├── ShippingForm.tsx
  │   └── ShoppingCartIcon.tsx
  ├── stores/
  │   └── cartStore.ts
  └── types.ts
```

### Current Project Infrastructure

The project has since been progressively reorganized into feature-oriented modules with separated architectural responsibilities.

```text
  src/
  ├── app/
  │   ├── cart/
  │   └── products/
  └── modules/
      ├── cart/
      │   ├── application/
      │   ├── domain/
      │   ├── infrastructure/
      │   ├── presentation/
      │   ├── store/
      │   └── types/
      ├── checkout/
      │   ├── presentation/
      │   ├── schemas/
      │   └── types/
      ├── payments/
      │   ├── presentation/
      │   ├── schemas/
      │   └── types/
      └── products/
          ├── application/
          ├── domain/
          ├── infrastructure/
          ├── presentation/
          └── types/
```

The current architecture introduces separation between Presentation, Application, Domain, and Infrastructure, with repository abstractions and infrastructure implementations being introduced progressively within the implemented modules.

## Features

- Product catalog
- Product details page
- Product search
- Product filtering
- Product categories
- Shopping cart
- Shipping information form
- Payment information form (UI)
- Client-side state management with Zustand

## Architecture

```text
  Presentation
        ↓
  Application
        ↓
  Domain
        ↑
  Infrastructure
```

Current implemented modules include:

- Products — product retrieval through application use cases and a repository abstraction with an in-memory implementation.
- Cart — cart operations through application use cases and a repository abstraction backed by Zustand.
- Checkout — checkout presentation flow and shipping information form.
- Payments — payment information UI and validation schema.

The architecture is still evolving as new application and infrastructure capabilities are introduced.

## Tech Stack

### Frontend

- Next.js 15
- React 19
- TypeScript

### Styling

- Tailwind CSS v4

### Forms & Validation

- React Hook Form
- Zod

### State Management

- Zustand

### UI Libraries

- Lucide React
- React Toastify

### Package Manager

- pnpm

## Installation

### Prerequisites

- Node.js (LTS recommended)
- pnpm

### Clone the repository

```bash
git clone https://github.com/kenvastolord/nextjs-payment-integration.git
cd nextjs-payment-integration
```

### Install dependencies

```bash
pnpm install
```

### Start the development server

```bash
pnpm dev
```

The application will be available at:

```text
http://localhost:3000
```

## Acknowledgements

The initial frontend of this project is based on the excellent work created by **Safak** in the **e-commerce-ui** project.

The original project served as the starting point for this repository, which extends the application with additional backend functionality and payment integration features.

**Original project:**

- https://github.com/safak/e-commerce-ui/tree/completed

At the time this repository was referenced, no license file was included in the original repository. All rights to the original source code remain with its respective author. This project acknowledges and credits the original work accordingly.
