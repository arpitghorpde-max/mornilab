# Morni Step 6 — School Subscription, Razorpay & Free Trials

Step 6 sits on top of the working Step 5 learning/portfolio build.

## Locked business rule

- Student price: **₹1/day = ₹365/student/year**.
- The server calculates the amount. The browser never decides the payable amount.
- A student can use learning features when either:
  1. that student has active paid annual access, or
  2. the school has an active Founder-granted free trial.
- School Admin / Principal can always sign in to add students and reach Billing.
- Teacher/student learning access is blocked after trial/subscription expiry; no learning data is deleted.
- Students added after a bulk payment remain pending until the school purchases access for those new students.

## Principal / School Admin

- New **Subscription** section.
- Dashboard shows total students, paid students, pending students and amount due.
- Shows the value proposition: **₹1/student/day, billed annually at ₹365/student**.
- `Forward to payment` appears after adding a student.
- Razorpay Checkout creates a server-side order for all currently pending students.
- Payment signature is verified by the API; the captured payment is fetched from Razorpay before activation.
- Successful payment creates a school subscription and one annual entitlement per purchased student.
- Payment history is shown in the dashboard.

## Founder / Super Admin

- New **Billing** dashboard across all schools.
- Shows paid schools, trial schools, payment-required schools and verified revenue.
- Founder can activate a free trial for 1–36 months.
- Founder can extend or revoke an active free trial.
- Trial changes are written to the audit log.
- An active paid subscription cannot be overwritten by a free trial.

## Access protection

- Server-side subscription gate protects learning-facing APIs.
- Teacher rosters only show students with current paid access unless the school has an active trial.
- Teacher project/photo/XP review also checks the target student's access.
- Student and Teacher UI show a subscription lock screen when access is unavailable.
- Existing XP, projects, photos, portfolio, certificates and trophies remain stored while access is locked.

## Razorpay security

- Key Secret is server-only.
- Checkout receives only the public Key ID.
- Standard Checkout response signature is HMAC verified.
- Morni fetches the Razorpay payment and requires `captured` status and the expected amount.
- A public raw-body webhook endpoint verifies `X-Razorpay-Signature` before processing events.
- Captured webhook delivery is idempotent through the existing `payment_events` inbox.

## Database migration

`1727000015000_school_billing_and_trials.sql`

Adds:
- `school_access_grants`
- `student_access_entitlements`

It reuses the existing Step 1 commerce tables:
- `subscriptions`
- `payments`
- `payment_events`

No reset or seed is required.
