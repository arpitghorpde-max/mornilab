# Morni Stage 9.3.5B · Product Catalog & Categories

Stage 9.3.5B turns Morni's existing `materials` catalogue into the commercial product catalogue used by future school and teacher material requests. It deliberately does **not** create a second product table: `material_request_items.material_id` already points to `materials`, so one product ID can flow from learning content to teacher cart to principal approval and Founder fulfilment.

## Founder / Admin

A new **Product catalog** page is available in the Founder sidebar.

The Founder can:
- manage categories and product types: Skill Material, Lab Equipment and Kit;
- create/edit products with SKU, image, price, GST, HSN, unit, descriptions and feature list;
- set grade suitability and optional student capacity;
- track optional stock quantity, reorder level and availability;
- set minimum order quantity;
- mark products featured;
- independently control **Visible on public website** and **Visible to schools**;
- keep products Draft, Published or Archived;
- customize the Product Catalog sidebar icon from the existing Icon Manager.

Three starter categories are created by the migration: Skill Materials, Lab Equipment and Kits. Existing platform materials are preserved and mapped to Skill Materials / Kits where possible. They do not become public automatically.

## API foundation

- `GET /api/v1/commerce/public/catalog` — only published items explicitly approved for public visibility.
- `GET /api/v1/commerce/catalog` — authenticated school/teacher/student-safe catalogue; only published items explicitly visible to schools.
- Founder CRUD lives under `/api/v1/commerce/admin/...` and is protected by the `super_admin` role.

## Important safety / compatibility

- Existing learning materials, level links and material request foreign keys are preserved.
- Prices continue to use integer minor units (paise); no floating-point money is stored.
- Existing product/material IDs are preserved.
- Nothing is published to the public website just because the migration runs.
- Stage 9.3.5B does not yet add Principal marketplace UI, Teacher cart, approvals, quotations or Skill Labs. Those are the next stages.
