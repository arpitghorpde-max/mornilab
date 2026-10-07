# Morni Step 8 — changes

## Public Morni website
- Root `/` is now a public Morni homepage instead of redirecting immediately to login.
- Editable hero, About Morni, How it Works, skills showcase, testimonials, statistics, contact details and social links.
- Principal login and Free Trial calls-to-action.
- Public contact form supports school enquiries, partnerships, support and general enquiries.
- Public showcase gallery with skill filters.
- Only Founder-approved gallery items become public; teacher evidence photos are not automatically exposed.

## Trial and enquiry funnel
- Public school/free-trial requests are stored in Morni.
- Founder receives them in **Website & leads**.
- CRM states: new, contacted, demo scheduled, trial requested, trial approved, converted, closed, rejected.
- Founder can add notes/status updates.
- Founder can approve a trial, select months, create the school, create/connect the principal account and activate the existing free-trial access system.
- Duplicate recent public requests are rate-limited/deduplicated.

## Founder website CMS
- Main Morni logo.
- Login logo.
- Certificate logo.
- Receipt logo.
- Favicon/app icon.
- Primary/accent colors.
- Hero/About/How It Works copy.
- Skills showcase.
- Testimonials.
- Live or custom homepage statistics.
- Contact details and HTTPS social links.
- SEO title/description.
- Opening animation on/off, style, duration.
- Student achievement celebration on/off.
- Custom opening MP4/WebM upload (max 8 MB) or HTTPS video URL.

## Gallery manager
- Upload public showcase image.
- Title, description, skill, school and privacy-conscious student display name.
- Featured/visible controls.
- Display order.
- Edit, hide or remove existing gallery items.

## Student experience / gamification
- XP milestone progress.
- Platform badges for first verified level, 10 levels, 500/1000/2500 XP.
- Skill/stage achievement badges derived from earned stage trophies.
- Trophy + certificate vault.
- School learner leaderboard (first-name-only display).
- Class leaderboard.
- School-vs-school league using verified XP totals.
- Achievement timeline.
- New-achievement celebration, controlled by Founder.
- Printable student portfolio view.
- Existing teacher-verified project photos remain the evidence source.

## Branding and opening experience
- Dynamic Morni brand name/tagline and logos are used across public site, login and application shell.
- Opening animation is shown once per browser session instead of on every page change.
- Custom public website media is stored separately under `uploads/public`.

## Security/privacy
- Public gallery is explicit opt-in content, not automatic portfolio publishing.
- Student leaderboards expose first names only, class/standard and verified progress.
- Public site settings, gallery and enquiry tables use super-admin-only database RLS policies; public API writes run through narrowly scoped server routes.
- Social links and external opening-video URLs require HTTPS.
- Public enquiry endpoint is rate-limited.
- Uploaded images are validated/re-encoded; opening videos are limited and signature-checked.

## Database
New migration:

`1727000017000_public_site_crm_gamification`

Adds:
- `public_site_settings`
- `public_gallery_items`
- `public_inquiries`
- starter badge catalogue entries
- privacy-safe student/class/school leaderboard functions
