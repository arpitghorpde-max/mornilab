# Morni Stage 9.2 — Acceptance Test

## 1. Student import
1. Principal → Bulk management → Bulk import.
2. Download Student template.
3. Add 2 test students and save as CSV or XLSX.
4. Upload and Preview.
5. Confirm 0 errors, then Import.
6. Download temporary credentials immediately.
7. Verify both students appear in People and Academic Structure.
8. If a class was supplied, verify class counts increased.
9. Login with one imported student's temporary credentials and confirm password-change flow.

## 2. Validation
Repeat preview with:
- duplicate student code in the file;
- an existing student code;
- invalid Grade 11;
- invalid email;
- unknown class name.
The batch must not be importable until errors are fixed.

## 3. Teacher import
1. Download Teacher template.
2. Import 1 teacher with email, employee code, assigned standards, optional class and teaching area.
3. Download credentials.
4. Confirm teacher appears in People and any requested class assignment appears in Academic Structure.

## 4. Promotion
1. Create next academic year and next-grade target class in Academic Structure.
2. Bulk management → Promote students.
3. Pick source class and target class.
4. Select students and Preview.
5. Confirm source / target / count, then Confirm promotion.
6. Verify target class count, student Grade/Section and lifecycle history.

## 5. Transfer / exit
1. Choose one test student.
2. Preview Transfer out and provide destination school.
3. Confirm.
4. Verify student status is transferred, active class placement ended and old login can no longer access that school.
5. Preview Reactivate and confirm; verify status becomes active but no class is silently restored.

## 6. Regression
Confirm Stage 9.1 Academic Structure, learning, XP, portfolio, billing, Website Manager and role-based access still load normally.
