import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const payload = path.join(root, 'stage9.3.5d-payload');
const packageJson = path.join(root, 'package.json');

if (!fs.existsSync(packageJson) || !fs.existsSync(path.join(root, 'apps', 'api')) || !fs.existsSync(path.join(root, 'apps', 'web'))) {
  console.error('This does not look like the Morni project root. Run this beside package.json.');
  process.exit(1);
}
if (!fs.existsSync(payload)) {
  console.error('Missing stage9.3.5d-payload folder. Copy the complete folder beside this installer.');
  process.exit(1);
}

const backupRoot = path.join(root, '.morni-step9.3.5d-backup');
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

const files = walk(payload);
for (const source of files) {
  const rel = path.relative(payload, source);
  const target = path.join(root, rel);
  if (fs.existsSync(target)) {
    const backup = path.join(backupRoot, rel);
    fs.mkdirSync(path.dirname(backup), { recursive: true });
    fs.copyFileSync(target, backup);
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
  console.log(`Applied: ${rel}`);
}

console.log('');
console.log('Morni Stage 9.3.5D Commerce Checkout applied successfully.');
console.log('Backup of replaced files: .morni-step9.3.5d-backup');
console.log('Next: npm.cmd run typecheck');
console.log('Then: npm.cmd run build');
console.log('After a fresh PostgreSQL backup: npm.cmd run migrate:up');
