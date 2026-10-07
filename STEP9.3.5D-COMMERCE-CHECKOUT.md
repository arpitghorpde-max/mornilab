# Morni Stage 9.3.5D - Buy, COD, Online Payment & Enquiry

## Purpose
Stage 9.3.5D turns the Product and Skill Lab catalogues into a usable commerce flow on both the public homepage and the Principal/School marketplace.

## Public homepage
Every published public Product card now includes:
- Buy button
- Inquiry button

Every published public Skill Lab card now includes:
- Buy button when at least one published lab package exists
- Inquiry button even when a direct-purchase package is not available

## Principal / School marketplace
The same Buy and Inquiry actions are available to the School Admin.
A new **My Orders & Enquiries** tab shows that school's history and status.

## Checkout methods
Direct purchases support:
- Cash on Delivery (for a Skill Lab this means payment on delivery / fulfilment / installation)
- Razorpay online payment using the existing Morni Razorpay environment keys

The server always reloads the live published catalogue record and calculates the amount itself. Browser-supplied prices are never trusted.

## Enquiries
An enquiry can be sent for:
- a Product
- a specific Skill Lab package
- a general Skill Lab, even before choosing a package

The enquiry captures contact details, school/organization and the requirement/message.

## Founder / Admin
A new **Orders & enquiries** page shows:
- public website orders
- school marketplace orders
- Product and Skill Lab enquiries
- COD vs online
- payment status
- delivery/contact information
- order amount and GST
- order status workflow
- internal notes
- Mark COD Paid action

Order states supported:
- inquiry
- awaiting payment
- placed
- processing
- dispatched
- delivered
- cancelled
- payment failed

## Finance safety
Catalogue pricing is snapshotted into each order and order item when the order is created. If the Founder changes a Product or Skill Lab price later, the old order amount does not change.

## Database
Migration:
`1727000024000_commerce_checkout.sql`

New tables:
- `commerce_orders`
- `commerce_order_items`

Both are protected by school tenant RLS. Public orders have no school tenant and are only readable by the Founder/Admin. School orders can only be read by the matching school or Founder/Admin.

## Razorpay
No new keys are needed. This stage uses the existing:
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`

Online commerce payments are stored separately from Morni subscription payments so product/lab sales do not alter subscription access or billing history.

## Important
Do not run `seed`, `db:reset`, or `migrate:redo` on your working database.
