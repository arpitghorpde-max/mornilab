# Morni Step 6 — Razorpay Test Setup

Start in **Razorpay Test Mode**. Do not put the Key Secret in the React/web code.

## 1. Add these lines to your existing `.env`

```env
RAZORPAY_KEY_ID=rzp_test_your_key_id_here
RAZORPAY_KEY_SECRET=your_test_key_secret_here
RAZORPAY_WEBHOOK_SECRET=choose_the_same_secret_you_configure_in_razorpay
```

Keep these values private. `RAZORPAY_KEY_SECRET` and `RAZORPAY_WEBHOOK_SECRET` stay on the API server.

## 2. Install and check the code

From the Morni root folder:

```powershell
npm.cmd ci
npm.cmd run typecheck
npm.cmd run build
```

Fix any red code error before migrating your working database.

## 3. Run the Step 6 migration

```powershell
npm.cmd run migrate:up
```

Expected new migration:

```text
1727000015000_school_billing_and_trials
```

Do **not** run `seed`, `db:reset` or `migrate:redo` on your working database.

## 4. Start Morni

API terminal:

```powershell
npm.cmd run dev:api
```

Second terminal:

```powershell
npm.cmd run dev:web
```

Open:

```text
http://localhost:5173
```

## 5. First test free trial (does not need a Razorpay payment)

Founder → Billing → choose a school → Manage access → enter trial months → Activate trial.

Then sign in as a teacher/student from that school. Learning access should open immediately. If they were already signed in on the locked page, use **Check access again**.

Revoke the trial to confirm the Teacher/Student subscription lock screen appears after refresh.

## 6. Test school payment

School Admin / Principal → People → add student(s) → **Forward to payment**.

On Subscription:
- verify the student count,
- verify `pending students × ₹365`,
- click **Proceed to Razorpay**,
- use Razorpay Test Mode checkout.

After a successful captured payment, Morni verifies it and activates the purchased students for 365 days.

## 7. Webhook

Morni endpoint:

```text
POST /api/v1/billing/razorpay/webhook
```

For a deployed site, configure Razorpay to send the relevant payment events to:

```text
https://YOUR-MORNI-DOMAIN/api/v1/billing/razorpay/webhook
```

Use the same webhook secret in Razorpay and `RAZORPAY_WEBHOOK_SECRET`.

For local-only testing on `localhost`, Standard Checkout verification already activates a successful captured payment. A public HTTPS URL is required if you want Razorpay to reach your local webhook.

## Price in this Step 6 build

The current locked price is **₹365 per student per year** (₹36,500 for 100 students). No separate tax is added by Morni in this build.
