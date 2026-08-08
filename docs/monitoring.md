# Payment & Checkout Monitoring

## Purpose

Payment monitoring is not only about measuring whether payments succeed.

This document complements the architecture and workflow ADRs. It focuses on observability, reconciliation, and incident detection for the payment flow, without redefining the business architecture.

A payment system should allow the business and engineering teams to answer:

- Are our customers able to pay?
- Are we losing revenue because of payment failures?
- Is the payment system operating correctly?
- Are payments and orders consistent?
- Can we detect and investigate problems quickly?
- Can we trust the payment data?

This monitoring system is designed around those questions.

### Alignment with the architecture

This document uses the terminology established by the architecture documentation:

- `PaymentGateway` refers to the business abstraction used by the application.
- Concrete provider integrations are implemented as provider-specific services such as `StripePaymentService`, `PayPalPaymentService`, or `RedsysPaymentService`.
- Provider-specific states must be translated into domain states before they are reflected in order or payment state.

### Scope and boundaries

This document focuses on observability and incident detection. It does not redefine business rules, module responsibilities, or domain states. Any signal coming from a payment provider must be translated into the application's domain concepts before it is treated as an operational truth.

### Operational principles

- Monitoring should observe business outcomes and state transitions rather than provider internals alone.
- Payment state changes must be derived from domain concepts such as `PENDING`, `PAID`, and `FAILED`.
- Webhook and provider notifications are only authoritative after validation and idempotency checks.

---

## 1. Can our customers successfully pay?

### Business questions

- What percentage of payment attempts succeed?
- How many payments are failing?
- Is the failure rate increasing?
- Are failures related to a specific payment method?
- Are failures related to the payment provider?
- Are failures affecting specific countries, currencies or customers?
- Are customers abandoning checkout because of payment problems?

### Monitoring solution

Track the complete payment funnel:

```text
Checkout Started
                      ↓
Order Created
                      ↓
Payment Initiated
                      ↓
Payment Confirmed / Failed
                      ↓
Order Updated
```

### Key metrics

- Payment Success Rate
- Payment Failure Rate
- Checkout Conversion Rate
- Checkout Abandonment Rate
- Payment Attempts
- Successful Payments
- Failed Payments

---

## 2. Are we losing revenue because of payment failures?

### Business questions

Payment failures are not only technical errors — they can represent lost revenue.

We need to know:

- How much revenue is affected by failed payments?
- Which errors cause the most failures?
- Which payment methods have the highest failure rate?
- Which provider is responsible for the failures?
- Are failures temporary or permanent?
- Are customers retrying after a failed payment?

### Monitoring solution

Classify payment failures by cause:

```text
Payment Failure
                     │
                     ├── Customer
                     │     ├── Card Declined
                     │     └── Authentication Failed
                     │
                     ├── Provider
                     │     ├── Provider Error
                     │     └── Provider Timeout
                     │
                     └── System
                                          ├── Internal Error
                                          ├── Invalid State
                                          └── Processing Error
```

### Key metrics

- Failed Payments by Reason
- Failed Payments by Provider
- Failed Payments by Payment Method
- Revenue Affected by Failures
- Payment Retry Rate
- Recovery Rate

---

## 3. Is our payment system healthy?

### Engineering questions

- Is the payment provider available?
- Are payment requests becoming slower?
- Are API calls timing out?
- Are provider errors increasing?
- Are payment processing times increasing?
- Is there a sudden increase in failed transactions?

### Monitoring solution

Monitor the health of every external dependency involved in payment processing.

### Key metrics

- Provider Availability
- Provider Response Time
- Payment Processing Time
- Provider Error Rate
- Timeout Rate
- Payment Failure Rate

### Example

**Normal**

```
Success Rate:       98.7%
Provider Latency:   420ms
Timeout Rate:       0.2%
```

**Possible Incident**

```
Success Rate:       91.2%  ← 🚨
Provider Latency:   2.8s   ← 🚨
Timeout Rate:       4.7%   ← 🚨
```

The monitoring system should make this visible before customers or the business report the problem.

---

## 4. Did the payment actually happen?

### Business questions

Can we trust the state stored in our database?

For example:

```
Our system:
       PaymentStatus = PENDING

Provider:
       PaymentStatus = SUCCEEDED (provider-specific state)

-- or --

Our system:
       PaymentStatus = PENDING

Provider:
       PaymentStatus = FAILED (provider-specific state)
```

These are payment integrity problems.

### Monitoring solution

Compare the state of our system with the payment provider.

The application should translate provider-specific status values into domain concepts before updating order and payment state.

```text
                                                 ┌─────────────────┐
                                                 │   Our System    │
                                                 │                 │
                                                 │ Order: PAID     │
                                                 │ Payment: PENDING│
                                                 └────────┬────────┘
                                                                              │
                                                                      COMPARE
                                                                              │
                                                                              ▼
                                                 ┌─────────────────┐
                                                 │ Payment Provider│
                                                 │                 │
                                                 │ PaymentStatus: SUCCEEDED (provider-specific state)
                                                 └─────────────────┘
```

### Key metrics

- Payment Status Mismatches
- Order Status Mismatches
- Unmatched Payments
- Payments Without Orders
- Orders Without Payments
- Amount Mismatches
- Currency Mismatches

---

## 5. Did we process the same payment twice?

### Business questions

Payment providers, networks, customers, and webhooks can all cause retries or duplicate deliveries.

How do we know the same payment was not processed twice?

### Monitoring solution

Track identifiers and detect duplicates:

- Payment Attempt ID
- Idempotency Key
- Provider Transaction ID
- Webhook Event ID

Detect:

- Duplicate payment attempts
- Duplicate webhook events
- Duplicate successful payments
- Idempotency conflicts

### Example

```text
Order #123

Payment Attempt #1
                            ↓
               SUCCESS

Payment Attempt #2
                            ↓
               SUCCESS

Possible duplicate charge 🚨
```

The monitoring system should detect and expose this situation.

---

## 6. Are our webhooks working correctly?

### Engineering questions

- Are we receiving webhooks?
- Are webhooks being processed successfully?
- Are webhook deliveries delayed?
- Are events being retried?
- Are duplicate events being received?
- Are invalid events reaching our application?
- Are webhook processing failures increasing?

### Monitoring solution

Track the complete webhook lifecycle:

```text
Provider
        │
        │ Webhook
        ▼
Received
        │
        ▼
Signature Verified
        │
        ▼
Idempotency Checked
        │
        ▼
Event Processed
        │
        ▼
Payment Updated
```

### Key metrics

- Webhooks Received
- Webhook Success Rate
- Webhook Failure Rate
- Webhook Processing Time
- Webhook Retries
- Duplicate Webhooks
- Invalid Signatures
- Unknown Events

---

## 7. What happens when something fails?

### Engineering questions

A monitoring system should not only tell us \"Something failed.\" It should help answer:

- What failed?
- Why did it fail?
- Which payment was affected?
- How many customers were affected?
- How much revenue was affected?
- Can we recover automatically?

### Monitoring solution

Every important payment operation should be traceable and reconstructible:

```text
Order
       │
       ▼
Checkout
       │
       ▼
Payment Attempt
       │
       ▼
Provider Request
       │
       ▼
Provider Response
       │
       ▼
Webhook
       │
       ▼
Payment State
       │
       ▼
Order State
```

The system should preserve enough information to reconstruct what happened.

#### Investigation data

- Order ID
- Payment ID
- Payment Attempt ID
- Provider Transaction ID
- Idempotency Key
- Webhook Event ID
- Payment Status
- Provider Status
- Error Code
- Error Type
- Timestamps

---

## 8. Can we detect problems before customers report them?

### Business question

How quickly can we know that payments are failing?

A good monitoring system should reduce the time between:

```text
Problem occurs
                     ↓
Problem detected
                     ↓
Problem understood
                     ↓
Problem resolved
```

### Monitoring solution

Define alerts around business and technical signals.

**Critical alerts**

- Payment Success Rate drops below threshold
- Provider becomes unavailable
- Duplicate successful payments detected
- Large number of unmatched payments
- Reconciliation failures
- Payments remaining in PENDING for too long

**Warning alerts**

- Failure rate increasing
- Webhook latency increasing
- Provider latency increasing
- Checkout conversion decreasing
- Retry rate increasing

---

## 9. Can we prove that payments are consistent?

### Business question

At any given moment, can we trust that our orders, payments and provider transactions agree?

### Monitoring solution

Introduce payment reconciliation.

```text
                                                         OUR SYSTEM
                                                                       │
                                                                       │
                                                                       ▼
                                                 ┌──────────────┐
                                                 │ Reconciliation│
                                                 │    Engine     │
                                                 └───────┬──────┘
                                                                             │
                                                                             │
                                                                             ▼
                                                  PAYMENT PROVIDER
```

The reconciliation process identifies:

- ✓ Consistent payment
- ⚠ Payment exists at provider but not in our system
- ⚠ Payment exists in our system but not at provider
- ⚠ Status mismatch
- ⚠ Amount mismatch
- ⚠ Currency mismatch
- ⚠ Duplicate transaction

---

## 10. What is the health of the checkout experience?

### Business question

A payment can be technically healthy while checkout is still failing.

For example:

```
Payment Provider
                     ↓
               99.8% success

But:

Checkout Started
                     ↓
1000 users

Payment Attempted
                     ↓
600 users

Payment Succeeded
                     ↓
580 users
```

The payment provider may be healthy while the application loses customers before they even reach the payment stage.

### Monitoring solution

Measure the complete checkout funnel.

### Key metrics

- Checkout Started
- Checkout Completed
- Payment Attempted
- Payment Succeeded
- Checkout Abandonment
- Conversion Rate
- Time to Complete Checkout

---

## 11. Can we identify where the problem is?

### Business question

When payment success rate drops, we need to know whether the problem is our application, the payment provider, the payment method, or the customer.

### Monitoring solution

Segment metrics by:

- Payment provider
- Payment method
- Country
- Currency
- Error type
- Error code
- Application version
- Time period

#### Example

- Overall Success Rate → 96.2%

**By Provider**

- Provider A → 99.1%
- Provider B → 94.3% 🚨

**By Payment Method**

- Card → 98.2%
- Bank → 91.4% 🚨

This turns a generic failure metric into an actionable signal.

---

## 12. What should the monitoring system ultimately answer?

The system should allow the business and engineering teams to answer these questions quickly:

```text
PAYMENT HEALTH
       - Are customers able to pay?
       - Are payments failing?
       - Is the provider healthy?

PAYMENT INTEGRITY
       - Did the payment actually happen?
       - Was it processed exactly once?
       - Do our records match the provider?

CHECKOUT EXPERIENCE
       - Are customers completing checkout?
       - Where are they abandoning?
       - Is payment causing conversion loss?

INCIDENT RESPONSE
       - Can we detect failures quickly?
       - Can we identify the root cause?
       - Can we identify affected payments?
       - Can we recover safely?
```

---

## Philosophy

Payment monitoring is not about collecting as many metrics as possible.

It is about answering the questions that matter when money moves through a distributed system.

```text
Business Question
                      ↓
Engineering Problem
                      ↓
Observable Signal
                      ↓
Metric / Log / Trace
                      ↓
Alert
                      ↓
Investigation
                      ↓
Resolution
                      ↓
Prevention
```
