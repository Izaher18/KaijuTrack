# Contributing to Kaiju

Thanks for taking an interest. This started as a personal grind tracker, but
small improvements are welcome.

## Development

1. Fork and clone the repo
2. Copy `.env.example` → `.env` and set `APP_PASSWORD`, `SESSION_SECRET`, and
   `DATABASE_URL`
3. Start Postgres (Homebrew or `docker compose up -d`)
4. Install and migrate:

```bash
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
```

## Checks before opening a PR

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

CI runs the same suite on every push and pull request.

## Guidelines

- Prefer small, focused PRs (helpers + tests, then UI wiring)
- Keep Server Actions and pure helpers easy to unit test
- Don’t commit `.env` or secrets
- Match the existing light UI language (teal accent, charcoal text)

## Feature ideas

Milestones, CSV export, and the yesterday nudge are in place. Good next areas:

- Deploy a public demo
- Public read-only streak page
- Milestone toast when a badge unlocks mid-session
