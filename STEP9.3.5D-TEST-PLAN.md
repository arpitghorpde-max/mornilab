# Stage 9.3.5D Test Plan

## 1. Public Product
Publish one Product with Website visibility ON and availability In Stock.
Confirm its card has:
- Buy
- Inquiry

## 2. Public Product Inquiry
Click Inquiry.
Enter contact details and message.
Submit.
Confirm an enquiry reference such as `MORNI-...` appears.
Founder -> Orders & enquiries must show it.

## 3. Public COD Product Order
Click Buy.
Enter quantity and delivery details.
Select Cash on Delivery.
Submit.
Founder -> Orders & enquiries should show:
- placed
- cod due
- correct server-calculated amount

## 4. Public Online Product Order
Click Buy -> Online Payment.
Use Razorpay test checkout.
After successful capture, the confirmation must show the Morni order number.
Founder should see:
- placed
- paid
- provider Razorpay

## 5. School / Principal Marketplace
Login as School Admin -> Marketplace.
Confirm Product and Skill Lab cards show Buy and Inquiry.
Submit one school enquiry and one COD test order.
Open My Orders & Enquiries and verify only that school's records are visible.

## 6. Skill Lab
Use a published Skill Lab with a published package.
Buy should allow package selection and show the package total including GST.
Inquiry should allow either:
- general lab enquiry
- package-specific enquiry

## 7. Founder order workflow
Founder -> Orders & enquiries.
Change a COD test order through:
placed -> processing -> dispatched -> delivered.
Use Mark COD paid after collection.
Confirm the School Admin order view reflects the updated status.

## 8. Price-history safety
Create a test order.
Then change the Product price in Product Catalog.
The old order must keep the old amount.
A new order must use the new amount.

## 9. Visibility/security
- A public-hidden Product must not appear on homepage.
- A school-hidden Product must not appear in Principal Marketplace.
- School A must not see School B orders.
- Public buyer must not get an order-list API.

## 10. Regression
Confirm these still work:
- subscription Razorpay payment
- Principal subscription receipt PDF
- Founder receipt PDF
- Reports & analytics
- Product Catalog editing
- Skill Lab editing
