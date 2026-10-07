# Morni Stage 9.3.5E — Teacher Material Requests & School Approval

## Goal
Connect Morni learning projects to school procurement without letting teachers purchase directly.

## Workflow
Teacher Material Store → Request cart → Principal review → Morni Admin school requirements → Packed → Shipped → Delivered.

## Teacher
- New `Material Store` navigation item.
- Browses the existing school-visible Product Catalog (Skill Materials, Lab Equipment, Kits).
- Search/filter products and add quantities to a request cart.
- Optional class, skill, Morni project, needed-by date and Normal/Urgent priority.
- Project shortcut reads existing `level_materials` and can add linked project materials to the cart.
- Submits a requirement to the Principal; no teacher payment occurs.
- `My requests` shows approval, rejection and fulfilment status.

## Principal / School Admin
- New `Material Requests` navigation item.
- School overview shows the number awaiting review.
- Sees only requests from the current school.
- Can reduce approved quantity item-by-item (never above teacher request).
- Can approve with a note or reject with a reason.
- Approved total is recalculated server-side from snapshotted unit prices and GST.

## Founder / Admin
- New `School requirements` navigation item.
- Founder dashboard shows requirements ready for Morni and those still waiting for Principals.
- Cross-school list with school, teacher, class, skill/project, items, approved quantity and estimate.
- Approved requirements can move through `approved → packed → shipped → delivered`.
- Courier, tracking number and internal notes are supported.
- Submitted requests are visible for planning, but Morni cannot fulfil them before Principal approval.

## Data model
This stage intentionally reuses Morni's original `material_requests` and `material_request_items` tables instead of creating a parallel shopping-request system.

Migration `1727000025000_teacher_material_requests` adds:
- `material_requests.class_id`
- `material_requests.project_id`
- `material_requests.principal_notes`
- `material_request_items.approved_quantity`
- indexes for requester/class/project lookup

Historical commerce orders, subscription payments and product checkout remain separate.

## Security
- Teacher: own submitted requests only.
- School Admin: own school's requests only.
- Founder: platform-wide requirements.
- Server recalculates all amounts and validates every material/class/skill/project reference.
- Tenant RLS remains enabled on the existing material request tables.
