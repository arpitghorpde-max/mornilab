# Stage 9.3.5F Test Plan

1. Run `npm run migrate:up` and confirm the 0026 migration applies.
2. Founder → Quotations & POs: create a manual quote with two items and verify totals/GST.
3. Convert a marketplace enquiry into a quotation and verify customer/item data is copied.
4. Approve a teacher material request as Principal; Founder converts it into a quotation and approved quantities are copied.
5. Edit a Draft quotation, add charges/discount, save, and verify recalculation.
6. Send a school-linked quote. Confirm the Principal sees it under Quotations.
7. Principal opens it; status should become Viewed.
8. Request Revision with a note. Founder edits it; version increases and status becomes Revised; resend it.
9. Principal accepts the resent quote. Verify status Accepted and one Purchase Order number is shown.
10. Attempt to accept again; API should prevent duplicate workflow action / duplicate PO.
11. Reject a second quote and verify no PO is created.
12. Create a quote with a past validity date (or wait for expiry) and verify expired quotes cannot be accepted.
13. Use Print / Save PDF and verify A4 layout, Morni branding, items, totals, GST, terms, validity and addresses.
14. Sign in as a different school Principal and verify they cannot see or act on another school's quotation.
15. Run `npm run typecheck`.

## Validation status in this build

`npm run typecheck` passes for API, web and shared packages after restoring the workspace symlink lost by ZIP extraction. A full Vite production bundle could not be executed in this Linux sandbox because the uploaded Windows `node_modules` copy does not contain Rolldown's Linux native binding. On the normal development machine, run `npm install` once and then `npm run build`.
