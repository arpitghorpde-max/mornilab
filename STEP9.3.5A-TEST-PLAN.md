# Morni Stage 9.3.5A — Test Plan

Use a test/dummy school for payment-flow checks where possible.

## 1. Founder pricing control
1. Login as Founder / Super Admin.
2. Open **Finance & subscriptions**.
3. Confirm a **Subscription pricing** card is visible.
4. Confirm the current rate starts at ₹1/day after migration if it has never been changed.
5. Change the rate to ₹2/day.
6. Confirm the preview shows ₹730 per student / 365 days.
7. Save.
8. Refresh the page and confirm ₹2/day and ₹730/year remain saved.

## 2. Principal calculation
1. Login as a Principal with pending students.
2. Open **Subscription**.
3. Confirm the plan shows ₹2/student/day and ₹730/student/year.
4. If 3 students are pending, confirm amount payable is ₹2,190.
5. Do not complete a real/live payment merely for this test unless intended.

## 3. Razorpay test order
With Razorpay test keys only:
1. Start checkout from a dummy school.
2. Confirm Razorpay amount equals pending students × current annual price.
3. Complete the test payment.
4. Confirm access activates and the receipt keeps the paid amount.

## 4. Historical-price protection
1. Note one old receipt amount created before the rate change.
2. Change the global rate again.
3. Re-open the old receipt.
4. Confirm its amount has not changed.

## 5. Order-time snapshot protection
Optional but important test with Razorpay test mode:
1. At ₹2/day, create a Razorpay order but do not finish it yet.
2. In Founder, change the current rate to ₹3/day.
3. Complete the already-created ₹2/day order.
4. Confirm it verifies using its original order amount rather than failing against the new price.
5. Start a new order and confirm the new order uses ₹3/day = ₹1,095/student/year.

## 6. Locked Teacher / Student screen
For a school with no paid/trial access:
1. Login as Teacher or Student.
2. Confirm the locked screen displays the current Founder-controlled price, not hard-coded ₹1 / ₹365.

## 7. Founder offline payment helper
1. Founder → Finance & subscriptions → select a school with pending students.
2. Confirm the suggested offline amount uses the current annual rate × pending students.
3. Do not submit unless you intend to create an actual offline payment record.

## 8. Regression
Confirm these still work:
- Founder receipt PDF
- Principal receipt PDF
- Free trial activate / extend / revoke
- Grace period
- Reports & analytics
- Bulk management
- Student / Teacher / Principal login

When all checks pass, mark **Stage 9.3.5A complete**.
