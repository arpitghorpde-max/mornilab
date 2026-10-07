# Morni Stage 9.3.5B · Test Plan

Run `npm.cmd run typecheck` and `npm.cmd run build` before migrating. Make a fresh PostgreSQL backup, then run `npm.cmd run migrate:up`.

## Founder smoke test

1. Login as Founder / Super Admin.
2. Open **Product catalog** in the sidebar.
3. Confirm the three starter categories exist: Skill Materials, Lab Equipment and Kits.
4. Create a test category, save it, edit it, and verify it persists after refresh.
5. Create a test product with:
   - SKU `TEST_KIT_001`
   - Type Kit
   - a Kit category
   - image upload
   - price ₹1,000
   - GST 18%
   - unit Kit
   - grade suitability `Grades 6–8`
   - student capacity 5
   - one or more feature lines
6. Confirm the price preview shows ₹1,000 + 18% GST = ₹1,180.
7. Refresh and confirm the product persists with its image.
8. Edit the price/name/visibility and verify the changes persist.
9. Search by SKU/name and filter by product type.
10. Confirm the Founder can set Website and Schools visibility independently.

## Security / regression

- Principal, Teacher and Student must not be able to call Founder product mutation routes.
- Existing Skill/Level learning pages still load.
- Existing billing and dynamic subscription pricing still work.
- Existing materials remain present after migration.
- Existing level/material and material request foreign keys remain valid.
- Public catalogue endpoint returns only `published + visible_public` products.
- Authenticated catalogue endpoint returns only `published + visible_schools` products.

Do not run `seed`, `db:reset`, or `migrate:redo` against the working database.
