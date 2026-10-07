# Morni Step 8 — acceptance test plan

Use fictional/test records for the first pass.

## A. Public website
- `/` opens without login.
- Logo/name/tagline and hero content display.
- About, How It Works, Skills, Gallery, Contact sections work.
- Principal Login opens existing Morni login.
- Free Trial opens the trial request form.
- Social links open only configured HTTPS URLs.

## B. Founder Website Manager
- Founder sees **Website & leads**; other roles do not.
- Change hero text and save; public homepage updates.
- Upload main/login/certificate/receipt/favicon logos; each appears in the intended surface.
- Change primary/accent colors and save.
- Toggle opening animation and student achievement celebrations.
- Test Logo + Text, Fade, Scale and Custom Video.
- Upload a short MP4/WebM and confirm it plays only once in the browser session.

## C. Public gallery/privacy
- Add a gallery item and mark Visible; it appears publicly.
- Hide it; it disappears publicly but remains editable in Founder CMS.
- Edit title/order/featured state.
- Remove an item.
- Confirm a teacher project-evidence image does NOT appear publicly unless manually uploaded/approved in gallery.

## D. Enquiry / trial CRM
- Submit School Enquiry; it appears in Founder lead list.
- Submit Free Trial from public home or Login → Principal free trial.
- Update lead status and notes.
- Approve a trial with 1 month, unique code/slug and temporary password.
- Confirm school + principal are connected and the trial is active.
- Confirm requesting a trial does not activate access before Founder approval.

## E. Student gamification
- Existing XP total matches the student record.
- Badge progress changes with verified XP/level count.
- School leaderboard shows first name only.
- Class leaderboard works.
- School league shows aggregate verified XP.
- Trophy/certificate vault preserves existing awards.
- Achievement timeline shows completed projects/certificates/trophies.
- New achievement celebration appears once and respects Founder toggle.
- Print Portfolio opens a clean print/PDF view.

## F. Regression checks
- Founder finance dashboard still works.
- Grace period still saves.
- Offline payments still work.
- Razorpay test payment/reconciliation still works.
- Teacher project review/photo/XP still works.
- Stage unlocks, certificates and trophies still work.
- Existing uploads remain visible.

## G. Before real deployment
Run production build on the target Windows/deployment environment and complete the production checklist from Step 7. Load-test expected school/student concurrency before making a capacity claim.
