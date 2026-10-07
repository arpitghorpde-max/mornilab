# MORE 9.3.5G — Group Projects

## Purpose
Students can complete a skill level collaboratively while MORE continues to store progress, marks, XP and portfolio evidence individually for every learner.

## Rules
- Group size: minimum **2**, maximum **20**, including the creator.
- The creator is automatically member 1 and selects 1–19 additional learners.
- Members may be from different grades/classes/sections, but must belong to the same school and be eligible for the selected skill level.
- A learner cannot be in two active groups for the same level.
- A learner who already completed the level cannot join a group for it.
- The group is created directly in `pending_review`; no member invitation/acceptance flow is required in this version.
- Teacher reviews the project only once.
- Teacher uploads one evidence photo, enters marks out of 100 and XP, and optionally adds a note.
- The same marks, XP and evidence are written to every group member's individual progress/portfolio.
- Duplicate teacher review is blocked so XP cannot be awarded twice.
- Certificates and stage trophies continue to work individually for every member based on their own progress.

## Student flow
Skill → Stage → Level → Group Project → Search same-school students → Select members → Create group → Teacher notification queue → Physical project review → Individual progress updated.

## Teacher flow
Teacher → Group Activities → Pending queue → Open group → View all members → Upload one project photo → Enter marks + XP → Complete group.

## Database
Migration: `apps/api/migrations/1727000028000_group_projects.sql`

New tables:
- `group_projects`
- `group_project_members`

New `student_progress` fields:
- `group_project_id`
- `score`

## API
Student:
- `GET /learning/group-projects/candidates`
- `GET /learning/group-projects/mine`
- `POST /learning/group-projects`
- `POST /learning/group-projects/:id/cancel`

Teacher:
- `GET /learning/teacher/group-projects`
- `GET /learning/teacher/group-projects/:id`
- `POST /learning/teacher/group-projects/:id/complete`

## Windows dev launcher
`scripts/dev.mjs` was also updated so `npm.cmd run dev` starts API + Web on Windows via `cmd.exe`, avoiding the earlier `spawn EINVAL` problem.
