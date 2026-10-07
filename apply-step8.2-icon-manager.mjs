import { copyFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = process.cwd();
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const payload = path.join(scriptDir, 'payload');
const backup = path.join(root, '.morni-step8.2-icon-backup');
const files = [
  'apps/api/src/lib/publicMedia.ts',
  'apps/api/src/routes/publicSite.ts',
  'apps/api/migrations/1727000018000_custom_icon_manager.sql',
  'apps/web/src/brand/BrandProvider.tsx',
  'apps/web/src/components/WebsiteManager.tsx',
  'apps/web/src/pages/PublicHome.tsx',
  'apps/web/src/pages/AdminHome.tsx',
  'apps/web/src/pages/SchoolHome.tsx',
  'apps/web/src/pages/TeacherHome.tsx',
  'apps/web/src/pages/StudentHome.tsx',
];

async function exists(file) { try { await access(file); return true; } catch { return false; } }
if (!(await exists(path.join(root, 'package.json'))) || !(await exists(path.join(root, 'apps', 'web')))) {
  throw new Error('Run this script from your Morni project root (the folder containing package.json and apps).');
}

for (const rel of files) {
  const src = path.join(payload, rel);
  if (!(await exists(src))) throw new Error(`Upgrade payload is missing ${rel}`);
  const dest = path.join(root, rel);
  if (await exists(dest)) {
    const backupFile = path.join(backup, rel);
    await mkdir(path.dirname(backupFile), { recursive: true });
    await copyFile(dest, backupFile);
  }
  await mkdir(path.dirname(dest), { recursive: true });
  await copyFile(src, dest);
  console.log(`Updated: ${rel}`);
}

console.log('\nMorni Step 8.2 Custom Icon Manager applied.');
console.log(`Source backup: ${backup}`);
console.log('Next: npm.cmd run typecheck');
console.log('Then: npm.cmd run build');
console.log('Then back up your database and run: npm.cmd run migrate:up');
