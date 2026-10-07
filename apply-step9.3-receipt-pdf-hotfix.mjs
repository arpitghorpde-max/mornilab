import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const file = path.join(root, 'apps', 'web', 'src', 'components', 'Billing.tsx');
if (!fs.existsSync(file)) {
  console.error('Could not find apps/web/src/components/Billing.tsx. Run this script from the Morni project root (beside package.json).');
  process.exit(1);
}

const before = fs.readFileSync(file, 'utf8');
const backupDir = path.join(root, '.morni-step9.3-receipt-backup');
fs.mkdirSync(backupDir, { recursive: true });
fs.writeFileSync(path.join(backupDir, 'Billing.tsx'), before, 'utf8');

const startMarker = 'async function printReceipt(paymentId: string) {';
const endMarker = '\n\nfunction downloadCsv(';
const start = before.indexOf(startMarker);
const end = before.indexOf(endMarker, start);
if (start < 0 || end < 0) {
  console.error('Could not locate the existing printReceipt function. No files were changed.');
  process.exit(1);
}

const replacement = `async function printReceipt(paymentId: string) {
  // Open the receipt window immediately while the click is still a direct user gesture.
  // Previously Morni waited for the API request before calling window.open(), which let
  // browsers treat the receipt as an async popup and block it for both Principal and Founder.
  const win = window.open('', \`morni-receipt-\${paymentId}\`, 'width=850,height=950');
  if (!win) {
    window.alert('Your browser blocked the receipt window. Allow popups for Morni and try again.');
    return;
  }

  win.document.open();
  win.document.write('<!doctype html><html><head><title>Morni receipt</title><style>body{font-family:Arial,sans-serif;padding:40px;color:#172033}.muted{color:#667085}</style></head><body><h2>Preparing your Morni receipt…</h2><p class="muted">Please wait.</p></body></html>');
  win.document.close();

  try {
    const data = await api.get<{ receipt: any }>(\`/billing/payments/\${paymentId}/receipt\`);
    const r = data.receipt;
    const html = (value: unknown) => String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
    const logoUrl = r.receipt_logo_image
      ? \`\${window.location.origin}/api/v1/public/images/\${encodeURIComponent(String(r.receipt_logo_image))}\`
      : '';

    win.document.open();
    win.document.write(\`<!doctype html><html><head><meta charset="utf-8"><title>\${html(r.receipt_number || 'Morni receipt')}</title><style>
      @page{size:A4;margin:16mm}
      *{box-sizing:border-box}
      body{font-family:Arial,sans-serif;margin:0;color:#172033;background:#fff}
      .sheet{max-width:760px;margin:0 auto;padding:8px}
      .header{display:flex;justify-content:space-between;gap:24px;align-items:flex-start;border-bottom:3px solid #0d9488;padding-bottom:18px}
      .logo{max-height:70px;max-width:210px;object-fit:contain;margin-bottom:10px}
      h1,h2,p{margin-top:0}.muted{color:#667085}.right{text-align:right}.receipt-title{margin:24px 0 10px;font-size:26px}.box{border:1px solid #d0d5dd;border-radius:14px;overflow:hidden}.row{display:flex;justify-content:space-between;gap:20px;padding:12px 16px;border-bottom:1px solid #eaecf0}.row:last-child{border-bottom:0}.row span:first-child{color:#667085}.total{font-size:22px;font-weight:700;background:#f0fdfa}.footer{margin-top:20px;font-size:12px;color:#667085}.actions{margin:24px 0;text-align:center}.actions button{border:0;border-radius:10px;background:#0d9488;color:#fff;font-weight:700;padding:11px 18px;cursor:pointer}
      @media print{.actions{display:none}.sheet{max-width:none;padding:0}}
    </style></head><body><div class="sheet"><div class="header"><div>\${logoUrl ? \`<img class="logo" src="\${html(logoUrl)}" alt="Receipt logo" />\` : ''}<h1>\${html(r.organization_name || 'Morni')}</h1><p class="muted">\${html(r.billing_address || '')}</p></div><div class="right"><strong>Receipt</strong><p class="muted">\${html(r.receipt_number)}</p></div></div><h2 class="receipt-title">Payment Receipt</h2><div class="box"><div class="row"><span>School</span><strong>\${html(r.school_name)}</strong></div><div class="row"><span>Payment date</span><strong>\${html(r.paid_at ? new Date(r.paid_at).toLocaleDateString('en-IN') : '—')}</strong></div><div class="row"><span>Method</span><strong>\${html(r.method || r.provider || '—')}</strong></div><div class="row"><span>Students / seats</span><strong>\${html(r.seats || '—')}</strong></div><div class="row"><span>Access period</span><strong>\${html(r.current_period_start ? new Date(r.current_period_start).toLocaleDateString('en-IN') : '—')} – \${html(r.current_period_end ? new Date(r.current_period_end).toLocaleDateString('en-IN') : '—')}</strong></div><div class="row total"><span>Amount paid</span><span>\${html(money(Number(r.amount_minor)))}</span></div></div>\${r.gstin ? \`<p class="footer"><strong>GSTIN:</strong> \${html(r.gstin)}</p>\` : ''}\${r.pan ? \`<p class="footer"><strong>PAN:</strong> \${html(r.pan)}</p>\` : ''}<p class="footer"><strong>Reference:</strong> \${html(r.external_reference || r.id)}</p><div class="actions"><button type="button" onclick="window.print()">Print / Save as PDF</button></div><p class="footer">To download a PDF, choose <strong>Save as PDF</strong> in the browser print window.</p></div><script>window.addEventListener('load',()=>setTimeout(()=>window.print(),350));<\/script></body></html>\`);
    win.document.close();
    win.focus();
  } catch (error) {
    const message = error instanceof ApiError ? error.message : error instanceof Error ? error.message : 'Could not load this receipt.';
    win.document.open();
    win.document.write(\`<!doctype html><html><head><title>Receipt error</title><style>body{font-family:Arial,sans-serif;padding:40px;color:#172033}.box{max-width:600px;border:1px solid #fecaca;background:#fef2f2;border-radius:14px;padding:20px}</style></head><body><div class="box"><h2>Receipt could not be opened</h2><p>\${String(message).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')}</p><p>Please close this window and try again.</p></div></body></html>\`);
    win.document.close();
  }
}`;

let after = before.slice(0, start) + replacement + before.slice(end);
after = after.replace('>Print / PDF</Button>', '>Open / Save PDF</Button>');
after = after.replace('>Receipt</Button>:p.provider', '>Open / Save PDF</Button>:p.provider');

if (after === before) {
  console.error('Nothing changed. No files were written.');
  process.exit(1);
}
fs.writeFileSync(file, after, 'utf8');
console.log('Fixed: apps/web/src/components/Billing.tsx');
console.log('Receipt window now opens synchronously so browsers do not block it after the API request.');
console.log('Works for both Principal payment history and Founder/Admin recent payments.');
console.log('Backup created: .morni-step9.3-receipt-backup');
console.log('No database migration and no npm install are required.');
console.log('Next: npm.cmd run typecheck');
