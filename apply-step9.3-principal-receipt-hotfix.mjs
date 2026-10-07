import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const file = path.join(root, 'apps', 'api', 'src', 'routes', 'billing.ts');
if (!fs.existsSync(file)) {
  console.error('Could not find apps/api/src/routes/billing.ts. Run this script from the Morni project root (beside package.json).');
  process.exit(1);
}

const before = fs.readFileSync(file, 'utf8');
const backupDir = path.join(root, '.morni-step9.3-principal-receipt-backup');
fs.mkdirSync(backupDir, { recursive: true });
fs.writeFileSync(path.join(backupDir, 'billing.ts'), before, 'utf8');

const oldBlock = `    const receipt=await withTenant(appPool,a.tenant,async(c)=>{\n      const row=(await c.query(\n        \`SELECT p.id,p.school_id,p.receipt_number,p.provider::text,p.status::text,p.amount_minor,p.tax_minor,p.currency,p.method,p.external_reference,p.paid_at,p.created_at,\n                s.name AS school_name,s.code AS school_code,sub.seats,sub.current_period_start,sub.current_period_end,\n                bs.organization_name,bs.billing_address,bs.gstin,bs.pan,bs.support_email,bs.support_phone,bs.invoice_prefix,ps.receipt_logo_image\n           FROM payments p JOIN schools s ON s.id=p.school_id LEFT JOIN subscriptions sub ON sub.id=p.subscription_id CROSS JOIN billing_settings bs CROSS JOIN public_site_settings ps\n          WHERE p.id=$1 AND p.purpose='subscription'\`,[paymentId])).rows[0];\n      if(!row) throw notFound('Receipt not found.');\n      if(a.role==='school_admin' && row.school_id!==a.schoolId) throw forbidden('Receipt is not available for this school.');\n      return row;\n    });\n    res.json({receipt});`;

const newBlock = `    // Load the payment inside the caller's tenant so school admins can only access\n    // receipts that belong to their own school. Do not CROSS JOIN public_site_settings\n    // here: that table is protected by a Founder-only RLS policy, which made the whole\n    // receipt query return zero rows for Principals even when the payment existed.\n    const receipt=await withTenant(appPool,a.tenant,async(c)=>{\n      const row=(await c.query(\n        \`SELECT p.id,p.school_id,p.receipt_number,p.provider::text,p.status::text,p.amount_minor,p.tax_minor,p.currency,p.method,p.external_reference,p.paid_at,p.created_at,\n                s.name AS school_name,s.code AS school_code,sub.seats,sub.current_period_start,sub.current_period_end,\n                bs.organization_name,bs.billing_address,bs.gstin,bs.pan,bs.support_email,bs.support_phone,bs.invoice_prefix\n           FROM payments p JOIN schools s ON s.id=p.school_id LEFT JOIN subscriptions sub ON sub.id=p.subscription_id CROSS JOIN billing_settings bs\n          WHERE p.id=$1 AND p.purpose='subscription'\`,[paymentId])).rows[0];\n      if(!row) throw notFound('Receipt not found.');\n      if(a.role==='school_admin' && row.school_id!==a.schoolId) throw forbidden('Receipt is not available for this school.');\n      return row;\n    });\n\n    // Branding is global Founder-managed data. Read only the receipt-logo reference with\n    // the existing super-admin tenant context, then merge it into the receipt payload.\n    // This preserves RLS separation while allowing both Principal and Founder receipts\n    // to use the same branded PDF/print layout.\n    const branding=await withTenant(appPool,SUPER_ADMIN_CONTEXT,async(c)=>\n      (await c.query('SELECT receipt_logo_image FROM public_site_settings WHERE singleton=true')).rows[0] ?? null,\n    );\n    res.json({receipt:{...receipt,receipt_logo_image:branding?.receipt_logo_image ?? null}});`;

if (!before.includes(oldBlock)) {
  if (before.includes("CROSS JOIN billing_settings bs CROSS JOIN public_site_settings ps") || before.includes("ps.receipt_logo_image")) {
    console.error('The receipt route was found but does not match the expected Stage 9.3 structure. No files were changed.');
  } else if (before.includes('receipt_logo_image:branding?.receipt_logo_image')) {
    console.log('Principal receipt hotfix already appears to be applied. Nothing to do.');
    process.exit(0);
  } else {
    console.error('Could not locate the Stage 9.3 receipt query. No files were changed.');
  }
  process.exit(1);
}

const after = before.replace(oldBlock, newBlock);
fs.writeFileSync(file, after, 'utf8');

console.log('Fixed: apps/api/src/routes/billing.ts');
console.log('Principal receipts no longer CROSS JOIN Founder-only public_site_settings.');
console.log('Receipt branding is loaded separately under the existing super-admin context.');
console.log('Founder/Admin receipt access remains unchanged.');
console.log('Backup created: .morni-step9.3-principal-receipt-backup');
console.log('No database migration and no npm install are required.');
console.log('Next: npm.cmd run typecheck');
