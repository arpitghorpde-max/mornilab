# Morni Stage 9.3 — Reports & Analytics

Stage 9.3 is a read-only reporting layer built on the existing Stage 5–9.2 data model. It does not alter XP, progress, certificates, billing or academic records.

## Principal reports
A new **Reports & analytics** workspace provides:
- Overview KPIs: students, teachers, classes, skills, projects, certificates, XP, badges, trophies and average progress.
- 6-month project activity chart and class activity comparison.
- Student progress report.
- Class-wise report.
- Skill-wise report with Prarambha / Sadhana / Siddhi completion counts.
- Teacher activity report.
- Project / level completion report.
- Gamification / achievements report.
- Certificate report.

## Filters
Reports can be filtered by:
- academic year
- class
- skill
- teacher
- learning stage
- date range

## Founder reports
The Founder / Super Admin gets a platform-level school comparison report and can drill into any school using the same school reports.

## Exports
- CSV export for tabular reports (Excel-ready)
- browser Print / Save PDF for any report view

## Privacy and access
- School admins only see their own school.
- Founder can compare schools and drill into a selected school.
- Existing PostgreSQL RLS and role checks remain in place.

## Database
No Stage 9.3 migration is required. Reports read existing tables only.
