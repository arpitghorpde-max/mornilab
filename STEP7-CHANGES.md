# Morni Step 7 — Finance, Renewal & Production Readiness

Step 7 extends the working Step 6 billing system without resetting any school, student, XP, portfolio, certificate, payment, or trial data.

## Added

- Printable payment receipts; browser Print can save them as PDF.
- Founder finance dashboard with monthly collections, failed-payment count, renewals due in 30 days, and recent payments.
- CSV exports for school billing, monthly collections, and payment history.
- Founder-configurable billing identity: organization name, billing address, GSTIN, PAN, support details, invoice prefix, and default grace days.
- Per-school grace period control (0–60 days). Paid teacher/student access remains available through the grace end date.
- Founder-only offline/manual payment recording for NEFT, bank transfer, cheque, CSR-sponsored, or other payments.
- Offline payments immediately create an auditable paid subscription and student entitlements for the selected pending seats.
- Razorpay reconciliation action for created/failed orders; it checks Razorpay for a captured payment and uses the existing idempotent activation path.
- Annual renewal opens 30 days before expiry when the school has no unpaid new students.
- Renewals start at the existing paid period end so early renewal does not waste remaining days.
- Existing Razorpay webhook replay protection remains in place through `payment_events(provider, provider_event_id)`.
- Renewal queue for subscriptions expiring in the next 30 days.

## New migration

`1727000016000_finance_renewal_production.sql`

It adds:

- `subscriptions.grace_period_days`
- `subscriptions.grace_ends_at`
- `payments.external_reference`
- `payments.notes`
- `billing_settings`

## Important access rule

Paid access is treated as active until `grace_ends_at` when a grace period is configured. Data is never deleted when payment expires.

## Offline payment safety

Only Founder / Super Admin can record offline payments. Every action is written to the audit log with school, amount, method, reference and seat count.

## Renewal rule

- New unpaid students are billed first at ₹365/student.
- If no students are pending and the latest paid subscription expires within 30 days, Morni offers annual renewal for all active students.
- The renewed period begins at the previous period end.

## Production note

The application still needs to be deployed behind HTTPS with production PostgreSQL, secure production environment variables and a public Razorpay webhook URL before Live Mode money is enabled.
