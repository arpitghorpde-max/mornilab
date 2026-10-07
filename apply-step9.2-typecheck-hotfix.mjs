import fs from 'node:fs';
import path from 'node:path';

const target = path.join(process.cwd(), 'apps', 'api', 'src', 'routes', 'bulkManagement.ts');

if (!fs.existsSync(target)) {
  console.error('Could not find apps/api/src/routes/bulkManagement.ts');
  console.error('Run this script from the Morni project root, beside package.json.');
  process.exit(1);
}

const oldText = `  const fields = kind === 'student'\n    ? [['student_code', 'Student code'], ['email', 'Email'], ['username', 'Username']]\n    : [['email', 'Email'], ['employee_code', 'Employee code'], ['username', 'Username']];`;

const newText = `  const fields: ReadonlyArray<readonly [string, string]> = kind === 'student'\n    ? [['student_code', 'Student code'], ['email', 'Email'], ['username', 'Username']]\n    : [['email', 'Email'], ['employee_code', 'Employee code'], ['username', 'Username']];`;

let source = fs.readFileSync(target, 'utf8');

if (source.includes(newText)) {
  console.log('Stage 9.2 typecheck hotfix is already applied.');
  console.log('Next: npm.cmd run typecheck');
  process.exit(0);
}

if (!source.includes(oldText)) {
  console.error('Expected Stage 9.2 code block was not found. No file was changed.');
  process.exit(1);
}

source = source.replace(oldText, newText);
fs.writeFileSync(target, source, 'utf8');

console.log('Fixed: apps/api/src/routes/bulkManagement.ts');
console.log('Stage 9.2 duplicate-field tuple typing corrected.');
console.log('Next: npm.cmd run typecheck');
