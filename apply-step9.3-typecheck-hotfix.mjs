import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const rel = path.join('apps', 'web', 'src', 'components', 'Reports.tsx');
const file = path.join(root, rel);

if (!fs.existsSync(file)) {
  console.error(`Could not find ${rel}. Run this script from the Morni project root (beside package.json).`);
  process.exit(1);
}

const original = fs.readFileSync(file, 'utf8');
const before = 'function OverviewView({state}:{state:any}){return <DataState state={state} onRetry={state.reload}>';
const after = 'function OverviewView({state}:{state:any}){return <DataState<Overview> state={state} onRetry={state.reload}>';

if (original.includes(after)) {
  console.log('Stage 9.3 typecheck hotfix is already applied.');
  process.exit(0);
}

if (!original.includes(before)) {
  console.error('Expected Stage 9.3 OverviewView code was not found. No file was changed.');
  process.exit(1);
}

const backupDir = path.join(root, '.morni-step9.3-typecheck-backup');
const backupFile = path.join(backupDir, rel);
fs.mkdirSync(path.dirname(backupFile), { recursive: true });
fs.copyFileSync(file, backupFile);

const updated = original.replace(before, after);
fs.writeFileSync(file, updated, 'utf8');

console.log(`Fixed: ${rel}`);
console.log('Overview DataState is now explicitly typed as Overview.');
console.log('Backup created: .morni-step9.3-typecheck-backup');
console.log('Next: npm.cmd run typecheck');
