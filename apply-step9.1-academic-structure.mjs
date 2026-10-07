import { cp, mkdir, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const payload = path.join(root, 'stage9.1-payload');
const backup = path.join(root, '.morni-step9.1-backup');
const files = [
  'apps/api/migrations/1727000019000_academic_structure.sql',
  'apps/api/src/routes/academic.ts',
  'apps/api/src/app.ts',
  'apps/web/src/components/AcademicManager.tsx',
  'apps/web/src/pages/SchoolHome.tsx',
  'apps/web/src/brand/BrandProvider.tsx',
  'STEP9.1-ACADEMIC-STRUCTURE.md',
  'STEP9.1-TEST-PLAN.md',
];

async function exists(file) {
  try { await access(file, constants.F_OK); return true; } catch { return false; }
}

if (!(await exists(path.join(root, 'package.json'))) || !(await exists(path.join(root, 'apps')))) {
  console.error('Run this script from the Morni project root (beside package.json and apps).');
  process.exit(1);
}
if (!(await exists(payload))) {
  console.error('stage9.1-payload folder is missing. Copy it beside this script first.');
  process.exit(1);
}

for (const rel of files) {
  const src = path.join(payload, rel);
  const dst = path.join(root, rel);
  if (!(await exists(src))) {
    console.error(`Missing payload file: ${rel}`);
    process.exit(1);
  }
  if (await exists(dst)) {
    const bak = path.join(backup, rel);
    await mkdir(path.dirname(bak), { recursive: true });
    await cp(dst, bak, { force: true });
  }
  await mkdir(path.dirname(dst), { recursive: true });
  await cp(src, dst, { force: true });
  console.log(`Applied: ${rel}`);
}

console.log('');
console.log('Morni Stage 9.1 Academic Structure applied successfully.');
console.log('Existing files were backed up under .morni-step9.1-backup when applicable.');
console.log('Next: npm.cmd run typecheck');
console.log('Then: npm.cmd run build');
console.log('After a PostgreSQL backup: npm.cmd run migrate:up');
