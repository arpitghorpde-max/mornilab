import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const rel = path.join('apps','api','migrations','1727000025000_teacher_material_requests.sql');
const file = path.join(root, rel);

if (!fs.existsSync(file)) {
  console.error(`Could not find ${rel}. Run this file from the Morni project folder beside package.json.`);
  process.exit(1);
}

const oldName = 'material_requests_requester_idx';
const newName = 'material_requests_school_requester_created_idx';
let text = fs.readFileSync(file, 'utf8');

if (text.includes(newName)) {
  console.log('Stage 9.3.5E migration index hotfix is already applied.');
  console.log(`Checked: ${rel}`);
  process.exit(0);
}

const occurrences = text.split(oldName).length - 1;
if (occurrences !== 2) {
  console.error(`Expected to find ${oldName} exactly 2 times in ${rel}, but found ${occurrences}.`);
  console.error('No file was changed. Please send the migration file/error so it can be reviewed safely.');
  process.exit(1);
}

const backupDir = path.join(root, '.morni-step9.3.5e-migration-hotfix-backup');
fs.mkdirSync(path.dirname(path.join(backupDir, rel)), { recursive: true });
fs.copyFileSync(file, path.join(backupDir, rel));

text = text.split(oldName).join(newName);
fs.writeFileSync(file, text, 'utf8');

console.log(`Fixed: ${rel}`);
console.log(`Renamed the new composite index to: ${newName}`);
console.log('The older material_requests_requester_idx from an earlier migration is preserved.');
console.log('The failed migration was rolled back, so run migrate:up again.');
console.log('No seed/reset/redo is needed.');
