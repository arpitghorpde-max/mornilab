# Stage 9.3.5C Test Plan

## A. Confirm old product visibility is fixed

1. Founder -> Product catalog.
2. Edit a test product.
3. Set:
   - Status = Published
   - Visible on public website = ON
   - Visible to schools = ON
4. Save.
5. Open the public homepage and confirm the product appears under Products.
6. Login as Principal -> Marketplace -> Products and confirm the same product appears.
7. Turn Visible on public website OFF and confirm it disappears only from the public homepage.
8. Keep Visible to schools ON and confirm it still appears for the Principal.

## B. Create a Skill Lab

Create:
- Code: STEM_LAB_01
- Name: STEM Innovation Lab
- Type: STEM Skill Lab
- Grade suitability: Grades 6-10
- GST: 18%
- Published
- Visible on public website = ON
- Visible to schools = ON

Add useful features and a cover image.

## C. Create the first package

Add:
- Code: 30_STUDENT
- Name: 30 Student Lab
- Students per batch: 30
- Package cost: Rs 70,000
- Installation cost: Rs 0
- Training cost: Rs 0
- Published

Confirm the UI displays 30 students/batch and the GST-inclusive calculation.

## D. Visibility

1. Public homepage -> Skill Labs should show the lab and package.
2. Principal -> Marketplace -> Skill Labs should show the same published school-visible lab.
3. Set Public visibility OFF. Public site should hide it, Principal should still see it.
4. Set School visibility OFF. Principal should hide it.
5. Set status Draft. It should be hidden from both regardless of visibility flags.

## E. Regression

Check:
- Founder Product Catalog still opens and saves.
- Principal Reports still open.
- Principal Subscription still opens.
- Admin and Principal payment receipts still work.
- Existing learning/project material records remain intact.
