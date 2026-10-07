import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const payloadRoot = path.join(here, 'stage9.3.5b-payload');
const projectRoot = process.cwd();

function die(message) {
  console.error(`\nERROR: ${message}\n`);
  process.exit(1);
}

const packagePath = path.join(projectRoot, 'package.json');
if (!fs.existsSync(packagePath)) die('Run this installer from the Morni project root (the folder that contains package.json).');
let pkg;
try { pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8')); } catch { die('Could not read package.json.'); }
if (pkg?.name !== 'morni') die('This does not look like the Morni project root.');

const requiredBase = [
  'apps/api/migrations/1727000021000_dynamic_subscription_pricing.sql',
  'apps/api/src/routes/reports.ts',
  'apps/web/src/components/Reports.tsx',
];
for (const rel of requiredBase) if (!fs.existsSync(path.join(projectRoot, rel))) die(`Stage 9.3.5A/current 9.3 base is missing: ${rel}`);

const targets = [
  'apps/api/migrations/1727000022000_product_catalog.sql',
  'apps/api/src/routes/commerceCatalog.ts',
  'apps/api/src/app.ts',
  'apps/web/src/components/ProductCatalogManager.tsx',
  'apps/web/src/pages/AdminHome.tsx',
  'apps/web/src/brand/BrandProvider.tsx',
  'STEP9.3.5B-PRODUCT-CATALOG.md',
  'STEP9.3.5B-TEST-PLAN.md',
];
for (const rel of targets) {
  const source = path.join(payloadRoot, rel);
  if (!fs.existsSync(source)) die(`Installer payload is incomplete: ${rel} is missing.`);
}

const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupRoot = path.join(projectRoot, `.morni-step9.3.5b-backup-${stamp}`);
let backedUp = 0;
let installed = 0;
for (const rel of targets) {
  const source = path.join(payloadRoot, rel);
  const target = path.join(projectRoot, rel);
  if (fs.existsSync(target)) {
    const existing = fs.readFileSync(target);
    const incoming = fs.readFileSync(source);
    if (Buffer.compare(existing, incoming) === 0) {
      console.log(`Already current: ${rel}`);
      continue;
    }
    const backup = path.join(backupRoot, rel);
    fs.mkdirSync(path.dirname(backup), { recursive: true });
    fs.copyFileSync(target, backup);
    backedUp += 1;
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
  console.log(`Installed: ${rel}`);
  installed += 1;
}

console.log('\nMorni Stage 9.3.5B Product Catalog & Categories applied successfully.');
if (backedUp) console.log(`Backup of replaced files: ${path.basename(backupRoot)}`);
console.log('New migration: 1727000022000_product_catalog.sql');
console.log('Next: npm.cmd run typecheck');
console.log('Then: npm.cmd run build');
console.log('After a fresh PostgreSQL backup: npm.cmd run migrate:up');
