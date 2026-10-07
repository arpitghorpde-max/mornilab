import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
function patch(rel, edits) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) throw new Error(`Missing ${rel}. Run this from the Morni Step 8 folder.`);
  let s = fs.readFileSync(file, 'utf8');
  let changed = false;
  for (const [from, to] of edits) {
    if (s.includes(from)) { s = s.replace(from, to); changed = true; }
  }
  if (!changed) throw new Error(`Expected Step 8 code not found in ${rel}. It may already be patched or changed.`);
  fs.writeFileSync(file, s, 'utf8');
  console.log(`Fixed: ${rel}`);
}

patch('apps/api/src/routes/publicSite.ts', [
  [
    "    let user=(await c.query(`SELECT id,role::text FROM users WHERE lower(email)=lower($1) AND archived_at IS NULL LIMIT 1`,[lead.email])).rows[0];\n    if(user && user.role!=='school_admin') throw conflict('That email already belongs to a non-principal Morni account.');",
    "    let user=(await c.query(`SELECT id,role::text FROM users WHERE lower(email)=lower($1) AND archived_at IS NULL LIMIT 1`,[lead.email])).rows[0];\n    if(user && user.role!=='school_admin') throw conflict('That email already belongs to a non-principal Morni account.');\n    const existingAccount=Boolean(user);"
  ],
  [
    "    return {schoolId:school.id,schoolName:school.name,principalUserId:user.id,trialEndsAt:grant.ends_at};\n  }); res.status(201).json({result,message:'Trial approved. School and principal access are connected.'});",
    "    return {schoolId:school.id,schoolName:school.name,principalUserId:user.id,trialEndsAt:grant.ends_at,loginIdentifier:lead.email,existingAccount};\n  }); res.status(201).json({result,message:result.existingAccount?\"Trial approved and the existing principal account was connected. Use the principal's existing password.\":'Trial approved. Use the enquiry email with the temporary password.'});"
  ]
]);

patch('apps/web/src/components/WebsiteManager.tsx', [
  [
    "const [password,setPassword]=useState(''); const [notice,setNotice]=useState<{ok:boolean;text:string}|null>(null); const [busy,setBusy]=useState(false);",
    "const [password,setPassword]=useState(''); const [notice,setNotice]=useState<{ok:boolean;text:string}|null>(null); const [credentials,setCredentials]=useState<{email:string;temporaryPassword:string|null;existingAccount:boolean}|null>(null); const [busy,setBusy]=useState(false);"
  ],
  [
    "function choose(x:Inquiry){setSelected(x);setStatus",
    "function choose(x:Inquiry){setSelected(x);setCredentials(null);setStatus"
  ],
  [
    "async function approve(){if(!selected)return;setBusy(true);try{const r=await api.post<{message:string}>(`/public/admin/inquiries/${selected.id}/approve-trial`,{months,school_code:code,school_slug:slug,temporary_password:password});setNotice({ok:true,text:r.message});setSelected(null);onChange()}",
    "async function approve(){if(!selected)return;setBusy(true);try{const temporaryPassword=password;const r=await api.post<{message:string;result:{loginIdentifier:string;existingAccount:boolean}}>(`/public/admin/inquiries/${selected.id}/approve-trial`,{months,school_code:code,school_slug:slug,temporary_password:password});setNotice({ok:true,text:r.message});setCredentials({email:r.result.loginIdentifier,temporaryPassword:r.result.existingAccount?null:temporaryPassword,existingAccount:r.result.existingAccount});setSelected(null);onChange()}"
  ],
  [
    "return <div className=\"space-y-5\">{notice&&<Alert tone={notice.ok?'success':'error'}>{notice.text}</Alert>}",
    "return <div className=\"space-y-5\">{notice&&<Alert tone={notice.ok?'success':'error'}>{notice.text}</Alert>}{credentials&&<Card className=\"border-teal-200 bg-teal-50\"><h3 className=\"font-black text-teal-900\">Principal sign-in details</h3><p className=\"mt-2 text-sm text-teal-900\"><strong>Login email:</strong> {credentials.email}</p>{credentials.existingAccount?<p className=\"mt-2 text-sm text-teal-800\">This email already had a Morni principal account, so its password was not changed. Use the existing password or password reset.</p>:<p className=\"mt-2 text-sm text-teal-800\"><strong>Temporary password:</strong> {credentials.temporaryPassword}</p>}<p className=\"mt-2 text-xs font-bold text-teal-800\">Use the email to sign in. The principal's full name is not a login ID.</p></Card>}"
  ]
]);

patch('apps/web/src/pages/Login.tsx', [
  ["Use the email or username your school gave you.", "Use your email, username or phone. Your full name is not a login ID."],
  ["label=\"Email or username\"", "label=\"Email / username / phone\""],
  ["inputMode=\"email\"", "inputMode=\"text\""],
  ["placeholder=\"you@school.edu.in\"", "placeholder=\"you@school.edu.in\""]
]);

console.log('\nMorni Stage 8 principal-login hotfix applied successfully.');
console.log('Next: npm.cmd run typecheck');
