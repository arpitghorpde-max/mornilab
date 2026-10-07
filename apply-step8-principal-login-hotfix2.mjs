import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const rel = 'apps/web/src/components/WebsiteManager.tsx';
const file = path.join(root, rel);
if (!fs.existsSync(file)) throw new Error(`Missing ${rel}. Run this from the Morni Step 8 folder beside package.json.`);

let s = fs.readFileSync(file, 'utf8');
const card = `{credentials&&<Card className="border-teal-200 bg-teal-50"><h3 className="font-black text-teal-900">Principal sign-in details</h3><p className="mt-2 text-sm text-teal-900"><strong>Login email:</strong> {credentials.email}</p>{credentials.existingAccount?<p className="mt-2 text-sm text-teal-800">This email already had a Morni principal account, so its password was not changed. Use the existing password or password reset.</p>:<p className="mt-2 text-sm text-teal-800"><strong>Temporary password:</strong> {credentials.temporaryPassword}</p>}<p className="mt-2 text-xs font-bold text-teal-800">Use the email to sign in. The principal's full name is not a login ID.</p></Card>}`;

// The previous hotfix accidentally placed the principal credentials card inside SiteEditor.
const siteStart = `return <div className="space-y-5">{notice&&<Alert tone={notice.ok?'success':'error'}>{notice.text}</Alert>}${card}<Card><h2 className="text-lg font-black">Branding</h2>`;
const siteFixed = `return <div className="space-y-5">{notice&&<Alert tone={notice.ok?'success':'error'}>{notice.text}</Alert>}<Card><h2 className="text-lg font-black">Branding</h2>`;
if (s.includes(siteStart)) s = s.replace(siteStart, siteFixed);

// Put that card where the credentials state actually lives: LeadManager.
const leadMarker = 'function LeadManager({rows,onChange}:{rows:Inquiry[];onChange:()=>void}){';
const leadIndex = s.indexOf(leadMarker);
if (leadIndex < 0) throw new Error('LeadManager was not found. The file differs from the expected Step 8 version.');
const beforeLead = s.slice(0, leadIndex);
let lead = s.slice(leadIndex);

const leadReturn = `return <div className="space-y-5">{notice&&<Alert tone={notice.ok?'success':'error'}>{notice.text}</Alert>}`;
if (!lead.includes(card)) {
  if (!lead.includes(leadReturn)) throw new Error('LeadManager return block was not found.');
  lead = lead.replace(leadReturn, `${leadReturn}${card}`);
}

s = beforeLead + lead;
fs.writeFileSync(file, s, 'utf8');
console.log(`Fixed: ${rel}`);
console.log('Moved the principal sign-in details card from Website Editor to Enquiries & Trials.');
console.log('\nNext run: npm.cmd run typecheck');
