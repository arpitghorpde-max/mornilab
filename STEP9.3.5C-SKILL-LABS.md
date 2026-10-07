# Morni Stage 9.3.5C — Skill Labs + Catalog Visibility

## What this stage adds

1. Founder/Admin Skill Lab Catalog
   - Lab code, name, type, headline and descriptions
   - Cover image
   - Features and skills covered
   - Grade suitability
   - Default area requirement
   - Installation / teacher training included flags
   - Support and warranty months
   - GST, featured, display order, status
   - Separate visibility switches for Public Website and Schools

2. Lab Packages
   - Package code and name
   - Students per batch
   - Recommended school strength range
   - Area required
   - Equipment/inclusions list
   - Base lab cost
   - Installation cost
   - Training cost
   - GST calculation inherited from the lab
   - Support/warranty
   - Published / Draft / Archived

3. Product visibility bridge
   - Stage 9.3.5B already stored product visibility and exposed APIs, but did not yet render those products outside Founder/Admin.
   - This stage adds a Public Homepage Products section.
   - This stage adds Principal -> Marketplace -> Products.
   - Only Published products with the appropriate visibility flag are shown.

4. Skill Lab visibility
   - Public Homepage -> Skill Labs
   - Principal -> Marketplace -> Skill Labs
   - Only Published labs with the appropriate visibility flag are shown.

## Visibility rules

Public website:
- status = Published
- Visible on public website = ON

Principal marketplace:
- status = Published
- Visible to schools = ON

Draft/Archived records are never shown in public/school catalog views.

## Important

This stage is browse/catalog only for Principals. Teacher cart, Principal approval, Founder requirement queue, quotations and fulfilment are later procurement steps. The same product IDs remain in use so those workflows can connect without duplicate catalog data.

## Migration

1727000023000_skill_lab_catalog.sql
