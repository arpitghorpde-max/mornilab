# Morni Step 7 — Production Checklist

Do not switch Razorpay to Live Mode until all items below are checked.

## Hosting

- Public HTTPS domain for the web application.
- Public HTTPS API endpoint.
- Production PostgreSQL database with automated backups.
- Persistent private storage for `uploads` or an object-storage replacement.

## Environment

Use strong production values for:

- `NODE_ENV=production`
- `APP_URL`
- `API_URL`
- `CORS_ORIGINS`
- `DATABASE_URL`
- `DATABASE_APP_URL`
- `SESSION_SECRET` (32+ random characters)
- `COOKIE_SECURE=true`
- `COOKIE_SAMESITE=lax`
- `RAZORPAY_KEY_ID` (Live Mode only after testing)
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`

Never place Razorpay secrets in the web/frontend bundle.

## Razorpay webhook

Configure Razorpay to POST to:

`https://YOUR-API-DOMAIN/api/v1/billing/razorpay/webhook`

Use the exact same webhook secret in Razorpay and Morni. The API verifies the HMAC signature from the raw request body. Replayed event IDs are ignored.

Recommended events for this Morni flow:

- `payment.captured`
- `payment.failed`

## Before Live Mode

1. Run `npm.cmd run typecheck`.
2. Run `npm.cmd run build`.
3. Back up the production database.
4. Run only `npm.cmd run migrate:up`.
5. Test one Founder trial.
6. Test one Razorpay Test Mode payment.
7. Test one failed/cancelled payment.
8. Test Founder reconciliation.
9. Test one offline/manual payment.
10. Test receipt printing and CSV export.
11. Test a 30-day renewal flow.
12. Test grace-period expiry.
13. Verify audit logs for trial, payment, offline payment, grace and reconciliation actions.

## Never run on the real database

- `npm.cmd run seed`
- `npm.cmd run db:reset`
- `npm.cmd run migrate:redo`
