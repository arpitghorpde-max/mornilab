# Morni Stage 9.3.5A — Dynamic Subscription Pricing

## Purpose
The Founder can change Morni's subscription fee from the old fixed ₹1 per student per day to a new global per-student/day rate.

The annual student price is always calculated by the server as:

`daily rate × 365 days`

Example: ₹2/day becomes ₹730/student/year.

## Founder control
Go to **Founder → Finance & subscriptions → Subscription pricing**.

The Founder can change **Per student / day (₹)** and immediately see the annual calculation before saving.

## Where the new rate is reflected
- Founder finance dashboard
- Principal subscription page
- Pending-student amount payable
- Annual renewal amount
- Razorpay order amount
- Razorpay payment verification
- Student entitlement amount snapshot
- Default offline-payment amount when a school is opened in Founder finance
- Subscription-locked screen for Teacher / Student roles

## Historical safety
Existing successful payments, subscriptions and receipts are not recalculated when the price changes.

Every new Razorpay order stores an order-time pricing snapshot. If the Founder changes the current price while a Razorpay order is still being paid, verification uses the price that belonged to that order rather than the new rate.

## Database
Migration:

`1727000021000_dynamic_subscription_pricing.sql`

It adds `billing_settings.subscription_daily_rate_minor` with a default of 100 paise (₹1/day), so existing installations keep their current price until the Founder changes it.

## Notes
- Currency remains INR.
- Billing duration remains 365 days.
- This stage changes global Morni subscription pricing only. Product, kit and Skill Lab pricing will be handled separately in later 9.3.5 modules.
