# Kaiju

Daily career-goal tracker with a Godzilla that grows as you grind.

Log one LeetCode problem, one system design session, at least 20 job
applications, and work on a GitHub project each day. XP feeds your companion
from egg to apex. Perfect days stack a streak.

## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS v4
- Postgres via Prisma
- Shared-password session auth (HMAC cookie)

## Local setup

```bash
cp .env.example .env
# set APP_PASSWORD and SESSION_SECRET (openssl rand -hex 32)
docker compose up -d
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sign in at `/login` with
`APP_PASSWORD`.

Postgres is mapped to host port **5433** so it does not collide with other
local databases.

## Daily XP

| Action | XP |
| --- | --- |
| LeetCode done | 25 |
| System design done | 25 |
| Each application (credited up to 20) | 2 |
| Project work done | 30 |
| Perfect day (all four) | +50 |

Stages: Egg (0) → Hatchling (100) → Juvenile (300) → City Stomper (700) → Apex (1500).

## Creature types

Godzilla is fully illustrated. Dragon is selectable in Settings as a stub for a
later art pass; XP and stages already apply to both.
