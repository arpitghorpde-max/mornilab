# Morni Stage 9.2 — Bulk Management

Stage 9.2 extends the Principal / School Admin workspace with safe bulk operations.

## Included

- Bulk student import from `.xlsx` or `.csv`
- Bulk teacher import from `.xlsx` or `.csv`
- Downloadable Excel-ready CSV templates
- Server-side preview before import
- Duplicate checks inside the file and against Morni
- School capacity and class capacity validation
- Optional automatic student username generation
- Optional automatic temporary-password generation
- One-time downloadable temporary-credentials CSV after import
- Optional class placement during student import
- Optional class / class-teacher assignment during teacher import
- Bulk promotion from one class to the next grade in a later academic year
- Promotion preview with target-capacity and duplicate-enrolment checks
- Student transfer-out, inactive/left, graduation and reactivation flows
- Lifecycle history for promotion / exit actions
- Audit trail entries for bulk actions
- Customizable Principal sidebar icon for Bulk Management

## Safety rules

- Imports are limited to 250 rows per batch.
- A batch with any validation error cannot be committed.
- Import commit re-runs validation inside the database transaction.
- Promotion is all-or-nothing and requires a preview first.
- Promotion only permits the next grade in a later academic year.
- Grade 10 students are graduated rather than promoted.
- Transfer / exit ends the active class placement and suspends the school membership so the student cannot continue using that school account.
- Reactivation restores the school membership but does not silently restore a class placement.
- Plain-text temporary passwords are returned once after import and are not stored by Morni.

## Migration

`1727000020000_bulk_management`

Adds `student_lifecycle_events` and a privacy-preserving identifier-availability helper used by bulk-import preview.
