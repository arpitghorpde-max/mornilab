# Morni Stage 9.3.5F — Quotations & Purchase Orders

## Delivered

- Founder/Admin **Quotations & POs** workspace.
- Create a quotation from:
  - public website / school marketplace enquiry,
  - Principal-approved teacher material requirement,
  - admin-created manual requirement.
- Editable commercial fields: customer/contact, billing/shipping address, item quantity, unit price, discounts, GST, installation, training, delivery, other charges, validity, payment terms, delivery timeline, terms and notes.
- Status lifecycle: Draft → Sent → Viewed → Accepted / Rejected / Revision Requested → Revised → Sent.
- Principal **Quotations** workspace with Accept, Reject and Request Revision actions.
- Acceptance creates exactly one confirmed Purchase Order.
- Professional Morni quotation print layout. **Print / Save PDF** opens the browser print dialog so the quotation can be saved as PDF without adding another PDF runtime dependency.
- Audit trail events for quotation creation, edits, sending and Principal decisions.
- School tenant isolation is preserved through existing RLS + explicit school scoping.

## New database objects

- `quotations`
- `quotation_items`
- `purchase_orders`

Migration: `1727000026000_quotations_purchase_orders.sql`

## New API routes

### Founder/Admin
- `GET /api/v1/quotations/admin`
- `GET /api/v1/quotations/admin/sources`
- `POST /api/v1/quotations/admin`
- `POST /api/v1/quotations/admin/from-order/:id`
- `POST /api/v1/quotations/admin/from-material-request/:id`
- `PUT /api/v1/quotations/admin/:id`
- `POST /api/v1/quotations/admin/:id/send`

### Principal
- `GET /api/v1/quotations/school`
- `POST /api/v1/quotations/school/:id/view`
- `POST /api/v1/quotations/school/:id/respond`

## Next stage

Stage **9.3.5G — Inventory & Fulfilment** can now use accepted `purchase_orders` as the stock-reservation trigger.
