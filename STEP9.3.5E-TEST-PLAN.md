# Stage 9.3.5E Test Plan

## 1. Teacher
1. Login as Teacher and open `Material Store`.
2. Confirm school-visible products load.
3. Add two products, change quantities, choose class/skill/project, add reason and submit.
4. Confirm `My requests` shows status `submitted`.
5. If a project already has level materials linked, use `Add project materials` and confirm matching catalog items enter the cart.

## 2. Principal
1. Login as Principal and confirm Overview shows the pending material-request count.
2. Open `Material Requests`.
3. Confirm the Teacher request is visible and no other school's requests appear.
4. Reduce one quantity and approve.
5. Confirm status becomes `approved`, approved quantities persist, and total changes accordingly.
6. Submit a second Teacher request and reject it with a reason; confirm Teacher sees that reason.

## 3. Founder
1. Login as Founder and confirm `School needs` appears on the Platform dashboard.
2. Open `School requirements`.
3. Confirm the Principal-approved request appears as ready for Morni.
4. Move it to Packed → Shipped → Delivered.
5. Add courier/tracking details and confirm the Teacher can see shipped status/details.
6. Confirm an unapproved submitted request is visible but cannot be processed by Founder.

## 4. Regression
- Public/Product marketplace checkout still works.
- Principal Marketplace Buy/COD/Online/Inquiry still works.
- Billing and subscription payments are unchanged.
- Learning project review, XP and certificates still work.
- Product Catalog and Skill Labs still work.

## Safety
Use dummy request data for the first test. Do not run `seed`, `db:reset` or `migrate:redo` on a database containing real data.
