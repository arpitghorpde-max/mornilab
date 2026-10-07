import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = process.cwd();
const payload = path.join(here, 'payload');

const required = [
  path.join(root, 'package.json'),
  path.join(root, 'apps', 'web'),
  path.join(root, 'apps', 'api'),
];

if (!required.every(fs.existsSync)) {
  console.error('Run this from the root of your working Morni Stage 8 folder (the folder containing package.json, apps and packages).');
  process.exit(1);
}
if (!fs.existsSync(payload)) {
  console.error('The payload folder is missing. Keep payload beside this installer file.');
  process.exit(1);
}

const files = [
  'apps/api/src/routes/publicSite.ts',
  'apps/web/src/brand/BrandProvider.tsx',
  'apps/web/src/pages/PublicHome.tsx',
  'apps/web/src/pages/Login.tsx',
  'apps/web/src/components/WebsiteManager.tsx',
  'apps/web/src/components/ui.tsx',
  'apps/web/src/styles.css',
  'apps/web/public/morni-logo.jpg',
];

const backupRoot = path.join(root, '.morni-step8.1-backup');
fs.mkdirSync(backupRoot, { recursive: true });

for (const rel of files) {
  const src = path.join(payload, rel);
  const dest = path.join(root, rel);
  if (!fs.existsSync(src)) {
    console.error(`Missing patch file: ${rel}`);
    process.exit(1);
  }

  if (fs.existsSync(dest)) {
    const backup = path.join(backupRoot, rel);
    if (!fs.existsSync(backup)) {
      fs.mkdirSync(path.dirname(backup), { recursive: true });
      fs.copyFileSync(dest, backup);
    }
  }

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`Updated: ${rel}`);
}

console.log('\nMorni Stage 8.1 UI upgrade applied successfully.');
console.log('Backup of the pre-upgrade source files: .morni-step8.1-backup');
console.log('No database migration is required.');
console.log('\nNext run:');
console.log('  npm.cmd run typecheck');
console.log('  npm.cmd run build');
