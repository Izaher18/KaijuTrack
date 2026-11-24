# Kaiju

[![CI](https://github.com/Izaher18/KaijuTrack/actions/workflows/ci.yml/badge.svg)](https://github.com/Izaher18/KaijuTrack/actions/workflows/ci.yml)

Personal daily grind tracker with a companion that grows as you do.

Log **one LeetCode**, **one system design**, **20+ job applications**, and
**GitHub project work** each day. XP feeds Godzilla or Dragon from egg to apex.
Perfect days stack streaks. A heatmap and weekly stats show whether you’re
actually consistent.

## Why this exists

Job search + interview prep is a streak game. Kaiju turns four daily habits into
visible progress: a creature that levels up, a calendar of effort, and a short
feedback loop when you nail a perfect day.

## Features

- Shared-password login (HMAC session cookie)
- Daily checklist with live XP
- Godzilla **and** Dragon art with stage-based growth
- Perfect-day celebration + stage-up flash
- 16-week activity heatmap
- Weekly stats (completion %, apps, XP, perfect days)
- History archive of past days
- Creature name + type in Settings

## Stack

- **Next.js** (App Router) + **React** + **TypeScript**
- **Tailwind CSS v4**
- **Postgres** via **Prisma**
- Server Actions for auth and goal updates
- GitHub Actions CI (lint, typecheck, tests, build)

## Architecture

```
Browser
  └─ /login  → HMAC cookie session
  └─ /dashboard
        ├─ Creature (Godzilla | Dragon) + XP bar + streak
        ├─ Today’s goals (Server Action → DailyLog upsert)
        ├─ Heatmap (last ~16 weeks)
        └─ Weekly stats
  └─ /history · /settings
```

`DailyLog` is one row per calendar day. `Creature` is a singleton whose
`totalXp` / `stage` are recomputed from all logs. Auth is env-password only so
the schema stays ready for multi-user later without forcing accounts now.

## Local setup

### Option A — Homebrew Postgres (no Docker)

```bash
brew install postgresql@16
brew services start postgresql@16
export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"
createuser -s kaiju
psql postgres -c "ALTER ROLE kaiju WITH LOGIN PASSWORD 'kaiju';"
createdb -O kaiju kaiju

cp .env.example .env
# set APP_PASSWORD and SESSION_SECRET (openssl rand -hex 32)
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
```

### Option B — Docker

```bash
cp .env.example .env
# use the Docker DATABASE_URL (port 5433) from .env.example
docker compose up -d
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sign in at `/login` with
`APP_PASSWORD`.

## Daily XP

| Action | XP |
| --- | --- |
| LeetCode done | 25 |
| System design done | 25 |
| Each application (credited up to 20) | 2 |
| Project work done | 30 |
| Perfect day (all four) | +50 |

Stages: Egg (0) → Hatchling (100) → Juvenile (300) → Titan (700) → Apex (1500).

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
```

## Deploy notes

Set `DATABASE_URL`, `APP_PASSWORD`, and `SESSION_SECRET` in your host (e.g.
Vercel). Run migrations against the production database before the first
deploy. `vercel.json` marks the project as Next.js.
