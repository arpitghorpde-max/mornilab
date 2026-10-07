import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const payload = path.join(root, 'stage9.2-payload');
const packageJson = path.join(root, 'package.json');

if (!fs.existsSync(packageJson)) {
  console.error('ERROR: Run this script from the Morni project root (the folder containing package.json).');
  process.exit(1);
}
if (!fs.existsSync(payload)) {
  console.error('ERROR: stage9.2-payload was not found beside this script. Copy the whole folder first.');
  process.exit(1);
}

const requiredBase = [
  'apps/api/src/routes/academic.ts',
  'apps/api/migrations/1727000019000_academic_structure.sql',
  'apps/web/src/components/AcademicManager.tsx',
];
for (const file of requiredBase) {
  if (!fs.existsSync(path.join(root, file))) {
    console.error(`ERROR: ${file} is missing. Stage 9.2 must be applied on top of Stage 9.1.`);
    process.exit(1);
  }
}

const backupRoot = path.join(root, '.morni-step9.2-backup');
fs.mkdirSync(backupRoot, { recursive: true });

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

for (const source of walk(payload)) {
  const rel = path.relative(payload, source);
  const target = path.join(root, rel);
  if (fs.existsSync(target)) {
    const backup = path.join(backupRoot, rel);
    fs.mkdirSync(path.dirname(backup), { recursive: true });
    if (!fs.existsSync(backup)) fs.copyFileSync(target, backup);
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
  console.log(`Applied: ${rel}`);
}

console.log('');
console.log('Morni Stage 9.2 Bulk Management applied successfully.');
console.log('Backup of replaced files: .morni-step9.2-backup');
console.log('Next: npm.cmd run typecheck');
