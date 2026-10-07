import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const webFile = path.join(root, 'apps', 'web', 'src', 'components', 'WebsiteManager.tsx');
const apiFile = path.join(root, 'apps', 'api', 'src', 'routes', 'publicSite.ts');

for (const file of [webFile, apiFile]) {
  if (!fs.existsSync(file)) {
    console.error(`Missing expected Morni file: ${file}`);
    process.exit(1);
  }
}

let web = fs.readFileSync(webFile, 'utf8');
let api = fs.readFileSync(apiFile, 'utf8');
let webChanges = 0;
let apiChanges = 0;

const oldDefaults = "const defaultSettings=(s:SiteSettings)=>({...s,how_it_works:[...s.how_it_works],skills_showcase:s.skills_showcase.map(x=>({...x})),testimonials:s.testimonials.map(x=>({...x})),social_links:{...s.social_links},custom_stats:{...s.custom_stats}});";
const newDefaults = "const defaultSettings=(s:SiteSettings)=>({...s,contact_email:s.contact_email??'',contact_phone:s.contact_phone??'',opening_video_url:s.opening_video_url??'',how_it_works:[...s.how_it_works],skills_showcase:s.skills_showcase.map(x=>({...x})),testimonials:s.testimonials.map(x=>({...x})),social_links:{...s.social_links},custom_stats:{...s.custom_stats}});";
if (web.includes(oldDefaults)) {
  web = web.replace(oldDefaults, newDefaults);
  webChanges++;
} else if (!web.includes("contact_email:s.contact_email??''")) {
  console.error('Could not locate WebsiteManager defaultSettings block. Hotfix was not applied.');
  process.exit(1);
}

const oldSave = "async function save(){setBusy(true);setNotice(null);try{const r=await api.patch<{message:string}>('/public/admin/site',v);setNotice({ok:true,text:r.message});onSaved()}catch(e){setNotice({ok:false,text:e instanceof ApiError?e.message:'Could not save.'})}finally{setBusy(false)}}";
const newSave = "async function save(){setBusy(true);setNotice(null);try{const r=await api.patch<{message:string}>('/public/admin/site',v);setNotice({ok:true,text:r.message});onSaved()}catch(e){if(e instanceof ApiError){const fields=Object.entries(e.fieldErrors);setNotice({ok:false,text:fields.length?`Please fix: ${fields.map(([k,msg])=>`${k.replaceAll('_',' ')}: ${msg}`).join(' | ')}`:e.message})}else setNotice({ok:false,text:'Could not save.'})}finally{setBusy(false)}}";
if (web.includes(oldSave)) {
  web = web.replace(oldSave, newSave);
  webChanges++;
} else if (!web.includes('const fields=Object.entries(e.fieldErrors)')) {
  console.error('Could not locate WebsiteManager save function. Hotfix was not applied.');
  process.exit(1);
}

const apiPairs = [
  [
    "contact_email: z.union([z.string().trim().email().max(254), z.literal('')]).default(''),",
    "contact_email: z.union([z.string().trim().email().max(254), z.literal(''), z.null()]).default('').transform((value)=>value??''),"
  ],
  [
    "contact_phone: z.string().trim().max(40).default(''),",
    "contact_phone: z.union([z.string().trim().max(40), z.null()]).default('').transform((value)=>value??''),"
  ],
  [
    "opening_video_url: z.union([httpsUrl, localVideoUrl, z.literal('')]).default(''),",
    "opening_video_url: z.union([httpsUrl, localVideoUrl, z.literal(''), z.null()]).default('').transform((value)=>value??''),"
  ],
];

for (const [before, after] of apiPairs) {
  if (api.includes(before)) {
    api = api.replace(before, after);
    apiChanges++;
  } else if (!api.includes(after)) {
    console.error(`Could not locate expected API schema line: ${before}`);
    process.exit(1);
  }
}

fs.writeFileSync(webFile, web);
fs.writeFileSync(apiFile, api);

console.log(`Fixed: apps/web/src/components/WebsiteManager.tsx (${webChanges || 'already'} changes)`);
console.log(`Fixed: apps/api/src/routes/publicSite.ts (${apiChanges || 'already'} changes)`);
console.log('');
console.log('Morni Step 8 website-save hotfix applied successfully.');
console.log('Next run: npm.cmd run typecheck');
