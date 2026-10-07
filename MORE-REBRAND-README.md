# MORE Rebrand Build

This build changes the user-facing software brand from **Morni** to **MORE** and keeps the working Stage 9.3.5F Quotations & Purchase Orders functionality.

## Rebranded areas
- Public website, login, dashboards and user-facing messages
- Billing/receipt organization identity
- Subscription plan display name
- Quotation print/PDF branding
- New quotation numbers: `MORE-Q-...`
- New purchase-order numbers: `MORE-PO-...`
- New billing receipt numbers: `MORE-...`
- New commerce order numbers: `MORE-...`
- New certificate numbers: `MORE-...`
- Existing default MORNI-prefixed records are migrated to MORE-prefixed values

Technical compatibility names such as `@morni/api`, `@morni/web`, `morni_*` SQL helper functions, CSS class names, and source folder names are intentionally retained. They are internal and are not displayed as the software brand.

## Windows run order
Keep/copy your existing `.env` into this project root, then run:

```powershell
npm.cmd install
npm.cmd run migrate:up
npm.cmd run typecheck
npm.cmd run dev
```

`npm.cmd run dev` is now cross-platform; the old Unix-only `trap` command has been removed.

Do not run `seed`, `db:reset`, or `migrate:redo` on your working database.
