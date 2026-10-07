import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const payload = path.join(root, 'stage9.3-payload');
const packageJson = path.join(root, 'package.json');
const backupRoot = path.join(root, '.morni-step9.3-backup');

if (!fs.existsSync(packageJson) || !fs.existsSync(path.join(root, 'apps', 'api')) || !fs.existsSync(path.join(root, 'apps', 'web'))) {
  console.error('This does not look like the Morni project root.');
  console.error('Run the script from the folder that contains package.json, apps and packages.');
  process.exit(1);
}
if (!fs.existsSync(payload)) {
  console.error('Could not find stage9.3-payload beside this script.');
  console.error('Copy both the script and the entire stage9.3-payload folder into the Morni project root.');
  process.exit(1);
}

function walk(dir) {
  const result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...walk(full));
    else result.push(full);
  }
  return result;
}

let applied = 0;
for (const source of walk(payload)) {
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
  applied += 1;
}

console.log('');
console.log(`Morni Stage 9.3 Reports & Analytics applied successfully (${applied} files).`);
console.log('Backup of replaced files: .morni-step9.3-backup');
console.log('No database migration is required for Stage 9.3.');
console.log('Next: npm.cmd run typecheck');
