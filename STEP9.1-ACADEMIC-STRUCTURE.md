# Morni Stage 9.1 — Academic Structure

Stage 9.1 adds the school-operations foundation needed for later reporting, promotion and class-based workflows.

## Included
- Academic years with one current year per school
- Grade 1–10 classes/divisions
- Optional class capacity and room label
- Student placement/movement into a class for an academic year
- Existing student Grade/Section stays synchronized when a class is assigned
- Teacher-to-class assignment
- One class teacher per class
- Teaching area / skill labels per teacher assignment
- Principal UI at **School → Academic structure**
- Founder/super-admin-compatible API through explicit school scope
- Audit events for academic structure changes
- Tenant RLS on all new tables
- Custom icon slot for the new Principal sidebar item

## Migration
`1727000019000_academic_structure.sql`

Always make a PostgreSQL backup before running it on your real Morni database.
