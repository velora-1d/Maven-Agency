# MAVEN Forge

Neo-brutalist bilingual agency website plus internal admin panel, built with Next.js App Router, Tailwind CSS, Drizzle ORM, Neon-ready PostgreSQL wiring, and NextAuth credentials auth.

## Highlights

- Bilingual public routes: `/id` and `/en`
- Neo-brutal landing page with services, portfolio, testimonials, team, and contact sections
- Public catalog page with search and filters
- Internal admin panel for services, portfolio, team, testimonials, catalog, and site settings
- Lightweight internal analytics for page views, unique visitors, and referrers
- Upload endpoint for admin media to `public/uploads`
- Drizzle schema ready for Neon/Postgres migration
- Seed-memory fallback so the UI can run before a database is configured

## Stack

- Next.js 15 App Router
- React 19
- Tailwind CSS
- Drizzle ORM + Drizzle Kit
- Neon serverless Postgres client
- NextAuth credentials provider
- Zod validation

## Local Setup

1. Install dependencies

```bash
npm install
```

2. Copy the environment template

```bash
cp .env.example .env.local
```

3. Update environment values

- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `DATABASE_URL` if you want to move beyond seed-memory mode
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `NEXT_PUBLIC_SITE_URL`

4. Start development

```bash
npm run dev
```

Open:

- Public site: `http://localhost:3000/id`
- English site: `http://localhost:3000/en`
- Admin login: `http://localhost:3000/admin/login`

## Default Admin Credentials

If you do not change env vars, the development fallback login is:

- Email: `admin@mavenforge.com`
- Password: `forge-admin`

Change these before any real deployment.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run db:generate
npm run db:push
```

## Database Notes

The current implementation includes a full Drizzle schema under [drizzle/schema.ts](./drizzle/schema.ts), but the content layer intentionally falls back to an in-memory seeded store when `DATABASE_URL` is not configured. This keeps the app demoable immediately while preserving a clean path to Neon-backed persistence.

When you are ready to switch to Neon:

1. Fill `DATABASE_URL`
2. Generate migrations with `npm run db:generate`
3. Push schema with `npm run db:push`
4. Replace or extend the in-memory store adapter with Drizzle-backed repositories

## Repo Preparation

This workspace is ready to be initialized and connected to:

`https://github.com/velora-1d/Maven-Agency`

Suggested commands:

```bash
git init
git branch -M main
git remote add origin https://github.com/velora-1d/Maven-Agency.git
git add .
git commit -m "Initial MAVEN Forge MVP"
git push -u origin main
```
