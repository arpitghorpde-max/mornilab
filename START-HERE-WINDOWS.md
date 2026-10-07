# Morni Step 8 — Windows upgrade guide

## 1. Keep Step 7 safe
Do not delete your working Step 7 folder. Keep your PostgreSQL backup until Step 8 is fully tested.

## 2. Extract Step 8
Extract `morni-step8.zip`. Open the inner `morni-step8` folder — it should contain `package.json`, `apps`, and `packages`.

## 3. Copy configuration
Copy `.env` from the working Step 7 root into the Step 8 root. Never share this file; it contains database and Razorpay secrets.

## 4. Copy uploads
Copy/merge the complete Step 7 `uploads` folder into Step 8. Step 8 continues to use existing learning/project/profile images and adds `uploads/public` for website media.

## 5. Install correct Windows dependencies
Open VS Code in the Step 8 root and run:

```powershell
npm.cmd ci
```

## 6. Validate code BEFORE migration
Run:

```powershell
npm.cmd run typecheck
npm.cmd run build
```

If either command fails, stop and fix the error before migrating.

## 7. Back up PostgreSQL
Create a backup such as `morni-before-step8.backup` in pgAdmin.

## 8. Apply Step 8 migration
Run:

```powershell
npm.cmd run migrate:up
```

Expected new migration: `1727000017000_public_site_crm_gamification`.

Never run `seed`, `db:reset`, or `migrate:redo` on your working Morni database.

## 9. Start Morni
Terminal 1:

```powershell
npm.cmd run dev:api
```

Terminal 2:

```powershell
npm.cmd run dev:web
```

Open `http://localhost:5173`.

## 10. First checks
1. The root URL should open the public Morni homepage.
2. Founder → **Website & leads** should open.
3. Upload a logo, edit hero text, and save.
4. Submit a free-trial request from the public homepage.
5. Confirm the request appears in Founder → Website & leads → Enquiries & trials.
6. Approve a test request with a trial duration, school code/slug, and temporary principal password.
7. Confirm the created principal can sign in and the school has trial access.
8. Login as an existing student and verify badges, leaderboards, XP milestone, achievement timeline, portfolio, trophies and certificates.

See `STEP8-TEST-PLAN.md` for the full checklist.
