# Documentation roadmap

This document defines the plan to progressively update and align the project's documentation.

## Objective

Create documentation that is consistent, simple, and aligned with the real architecture of the project, while avoiding contradictions and inconsistent vocabulary.

---

## Phase 1 — Terminology and consistency criteria

### Standard terminology

- `PaymentGateway`: standard term for the abstraction or interface of a payment gateway.
- `StripePaymentService`, `PayPalPaymentService`, `RedsysPaymentService`: names of concrete provider integration services.

### Rules

- `PaymentGateway` is used for the business abstraction.
- `*PaymentService` is used for concrete provider implementations.
- These names should not be changed just to achieve uniformity.
- The rest of the documentation must clearly distinguish between abstraction and implementation.

### Output

- Agreed and documented terminology.
- List of accepted terms and usage rules.

---

## Phase 2 — Correction and alignment of `docs/monitoring.md`

### Objective

Align `monitoring.md` with the existing documentation and ensure it does not introduce new or inconsistent concepts.

### Checks

- Use the same vocabulary as the ADRs and the architecture documentation.
- Do not define rules that contradict the current architecture.
- Do not use `PaymentService` for the abstraction.
- Do not use external provider states without translating them into domain states.
- Do not introduce terminology different from already defined concepts.

### Output

- `monitoring.md` corrected and coherent.
- Validation that there are no visible contradictions with the ADRs.

---

## Phase 3 — Audit of the current documentation structure

### Objective

Identify the role of each document and detect duplication, gaps, or inconsistencies.

### Review

- Which documents exist.
- What purpose each document serves.
- Which documents are rules or principles versus procedures or guides.
- Which documents are incomplete or empty.
- Which information is duplicated.
- Which documents should be consolidated.
- What relationships exist between documents.

### Output

- Documentation inventory with classification and purpose.
- List of incomplete and duplicated documents.

---

## Phase 4 — Definition of a simple documentation structure

### Objective

Design a clear and sustainable structure for the project's documentation.

### Criteria

- Easy to understand for new developers.
- Avoids duplication of information.
- Has a clear source of truth for each rule.
- Separates principles, architecture, decisions, and procedures.
- Does not introduce unnecessary hierarchy.
- Allows continuous evolution.

### Output

- Proposed documentation structure.
- Classification of documents by type.

---

## Phase 5 — Prioritization of empty or incomplete documents

### Objective

Identify and order the documents that require immediate drafting.

### Priority criteria

- High priority: fundamental rules, architecture, major decisions.
- Medium priority: implementation, maintenance, understanding of key areas.
- Low priority: complementary documentation.

### Output

- Prioritized list of documents with purpose and dependencies.

---

## Phase 6 — Progressive drafting of documentation

### Objective

Complete documents in priority order, validating each one before moving to the next.

### Flow for each document

1. Define the purpose.
2. Identify the required content.
3. Look for existing information in other documents.
4. Determine the source of truth.
5. Draft the document.
6. Validate terminology.
7. Review coherence.
8. Validate examples and references.
9. Mark as completed.

---

## Phase 7 — Final validation

### General checklist

- Consistent terminology.
- `PaymentGateway` used as the abstraction.
- `*PaymentService` used only for concrete providers.
- `monitoring.md` aligned with the documentation.
- No contradictions between documents.
- No rules introduced without justification.
- Each rule has an identifiable source of truth.
- The documentation structure is simple and understandable.
- Empty documents are prioritized.
- Drafting was incremental and validated.

---

## Recommended order

1. Terminology and consistency criteria.
2. Alignment of `monitoring.md`.
3. Global documentation audit.
4. Definition of the simple structure.
5. Prioritization of empty documents.
6. Progressive drafting.
7. Cross-review and final validation.
