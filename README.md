# Morni Step 8

Morni Step 8 builds on the working Step 7 release and adds the public Morni website, Founder-managed branding/content, website enquiries and free-trial conversion, public showcase gallery, opening animation controls, and a richer student gamification/portfolio experience.

## Important upgrade rule

This is an upgrade of the existing Morni database. Do **not** seed, reset, or redo the production/development database that contains your real schools and learners.

Before migration on Windows:

```powershell
npm.cmd ci
npm.cmd run typecheck
npm.cmd run build
```

Then back up PostgreSQL and run:

```powershell
npm.cmd run migrate:up
```

Step 8 migration:

`1727000017000_public_site_crm_gamification`

Read `START-HERE-WINDOWS.md` and `STEP8-TEST-PLAN.md` before upgrading.
