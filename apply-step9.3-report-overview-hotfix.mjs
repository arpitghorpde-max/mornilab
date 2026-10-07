import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const rel = path.join('apps','api','src','routes','reports.ts');
const file = path.join(root, rel);

if (!fs.existsSync(file)) {
  console.error(`Could not find ${rel}. Run this script from the Morni project root beside package.json.`);
  process.exit(1);
}

let src = fs.readFileSync(file, 'utf8');
const startMarker = "reportsRouter.get(\n  '/reports/overview'";
const nextMarker = "reportsRouter.get(\n  '/reports/students'";
const start = src.indexOf(startMarker);
const end = src.indexOf(nextMarker, start + startMarker.length);

if (start === -1 || end === -1) {
  console.error('Could not locate the Stage 9.3 overview route. No changes were made.');
  process.exit(1);
}

let block = src.slice(start, end);

if (!block.includes('const reportValues = v.slice(0, 8);')) {
  const needle = '    const v = values(schoolId, query);\n';
  if (!block.includes(needle)) {
    console.error('Could not locate the overview report values declaration. No changes were made.');
    process.exit(1);
  }
  block = block.replace(needle, needle + '    // Overview SQL uses placeholders $1 through $8. $9 is reserved for list limits in other report routes.\n    const reportValues = v.slice(0, 8);\n');
}

let replaced = 0;
block = block.replace(/, v\);/g, (m) => {
  replaced += 1;
  return ', reportValues);';
});

// The overview route has exactly three queries: metrics, trend and topClasses.
if (replaced !== 3 && !block.includes(', reportValues);')) {
  console.error(`Expected to update 3 overview queries but updated ${replaced}. No changes were made.`);
  process.exit(1);
}

const backupDir = path.join(root, '.morni-step9.3-report-overview-backup');
fs.mkdirSync(path.dirname(path.join(backupDir, rel)), { recursive: true });
fs.copyFileSync(file, path.join(backupDir, rel));

src = src.slice(0, start) + block + src.slice(end);
fs.writeFileSync(file, src, 'utf8');

console.log(`Fixed: ${rel}`);
console.log('Stage 9.3 overview report now sends 8 SQL parameters to queries that use $1-$8.');
console.log('This fixes: bind message supplies 9 parameters, but prepared statement requires 8.');
console.log('Backup created: .morni-step9.3-report-overview-backup');
console.log('Next: npm.cmd run typecheck');
