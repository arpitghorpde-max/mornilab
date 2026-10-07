# Morni Stage 9.1 — Test Plan

1. Run typecheck and build.
2. Back up PostgreSQL.
3. Run `npm.cmd run migrate:up` and confirm `1727000019000_academic_structure` is applied.
4. Sign in as Principal → Academic structure.
5. Create `2026-27`, set it current, refresh and confirm persistence.
6. Add Grade 6 - A and Grade 6 - B.
7. Assign an existing student to Grade 6 - A; confirm the student's legacy Grade/Section updates too.
8. Reassign the same student to Grade 6 - B; confirm only one current-year placement remains.
9. Assign a teacher to Grade 6 - A with teaching area `Art, Maker Skills`.
10. Mark that teacher as Class Teacher; confirm the class row shows the teacher.
11. Assign another teacher as Class Teacher for the same class; confirm only the new teacher is Class Teacher.
12. Remove a teacher assignment.
13. Refresh the page and confirm all remaining data persists.
14. Verify another school cannot access these records.
15. Confirm existing Students, Teachers, Learning, Billing and Website pages still open.
