import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const rel = path.join('apps', 'api', 'src', 'routes', 'reports.ts');
const file = path.join(root, rel);

if (!fs.existsSync(file)) {
  console.error(`Could not find ${rel}. Run this script from the Morni project root beside package.json.`);
  process.exit(1);
}

let src = fs.readFileSync(file, 'utf8');

const overviewStart = src.indexOf("reportsRouter.get(\n  '/reports/overview'");
const studentsStart = src.indexOf("reportsRouter.get(\n  '/reports/students'", overviewStart + 1);
if (overviewStart === -1 || studentsStart === -1) {
  console.error('Could not locate the Stage 9.3 overview report route. No changes were made.');
  process.exit(1);
}

let block = src.slice(overviewStart, studentsStart);

const oldWhere = `        WHERE sc.school_id=$1 AND sc.archived_at IS NULL AND sc.status='active' AND ay.archived_at IS NULL
          AND ($2::uuid IS NULL OR sc.academic_year_id=$2) AND ($3::uuid IS NULL OR sc.id=$3)
        ORDER BY projects_completed DESC,average_xp DESC,sc.display_name LIMIT 8`;

const newWhere = `        WHERE sc.school_id=$1 AND sc.archived_at IS NULL AND sc.status='active' AND ay.archived_at IS NULL
          AND ($2::uuid IS NULL OR sc.academic_year_id=$2) AND ($3::uuid IS NULL OR sc.id=$3)
          AND ($5::uuid IS NULL OR EXISTS (
            SELECT 1 FROM teacher_class_assignments ta
            WHERE ta.class_id=sc.id AND ta.teacher_id=$5::uuid AND ta.archived_at IS NULL
          ))
        ORDER BY projects_completed DESC,average_xp DESC,sc.display_name LIMIT 8`;

if (block.includes(newWhere)) {
  console.log('Stage 9.3 school report hotfix is already applied.');
  process.exit(0);
}

if (!block.includes(oldWhere)) {
  console.error('Could not find the expected top-classes SQL block. No changes were made.');
  console.error('If you edited reports.ts manually, send that file/error so the patch can be adjusted safely.');
  process.exit(1);
}

block = block.replace(oldWhere, newWhere);

const backupDir = path.join(root, '.morni-step9.3-report-school-backup');
const backupFile = path.join(backupDir, rel);
fs.mkdirSync(path.dirname(backupFile), { recursive: true });
fs.copyFileSync(file, backupFile);

src = src.slice(0, overviewStart) + block + src.slice(studentsStart);
fs.writeFileSync(file, src, 'utf8');

console.log(`Fixed: ${rel}`);
console.log('Stage 9.3 Overview > Class activity now uses and types the teacher filter parameter $5.');
console.log('This fixes: could not determine data type of parameter $5.');
console.log('Works for both Founder school drill-down and Principal school reports.');
console.log('Backup created: .morni-step9.3-report-school-backup');
console.log('No database migration and no npm install are required.');
console.log('Next: npm.cmd run typecheck');
