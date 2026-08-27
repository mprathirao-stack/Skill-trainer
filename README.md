# Skill Mastery Scheduler

Enter any skill, and the app searches the web for current certifications and learning resources,
then builds an interactive day-by-day study schedule based on hours/day you can commit.

- **Search backend**: [SearXNG](https://github.com/searxng/searxng) — a real open-source
  metasearch engine you self-host locally. No API key, no account, no credit card.
- **Backend**: Node/Express, queries your local SearXNG instance
- **Frontend**: React (Vite) — fully interactive: reorder resources by drag, include/exclude,
  edit hours estimates, and change hours/day/start date/weekends, all recomputing the schedule live

## 1. Set up SearXNG (one-time)

```bash
./scripts/setup-searxng.sh
```

This clones SearXNG into `searxng-instance/` (gitignored — it's a full third-party repo, not
part of this project's history) and configures it to run locally with JSON output enabled.
Takes a few minutes depending on your connection.

## 2. Run everything

Terminal 1 — start SearXNG:

```bash
./searxng-instance/run.sh
```

Leave this running. It serves on http://127.0.0.1:8888.

Terminal 2 — install deps and start the app:

```bash
npm run install:all
npm run dev
```

- Backend: http://localhost:5001
- Frontend: printed in the Vite output (defaults to 5173/5174/5175 depending what's free)

Vite proxies `/api/*` requests to the backend, so the frontend just calls `/api/plan`.

No `.env` values are required — `server/.env.example` only has a `SEARXNG_URL` override in case
you run SearXNG on a different host/port.

## How the schedule is built

1. The backend queries your local SearXNG for `"<skill> certification <year>"` and
   `"<skill> learning roadmap course tutorial"`, dedupes results, classifies each as a
   certification/course/resource, and estimates hours (parsed from the listing's text when it
   mentions a duration, otherwise a sane default per type).
2. The frontend lets you edit that list — reorder, exclude, adjust hours — and a pure client-side
   scheduler packs the resources into days based on your hours/day, skipping weekends if you
   choose, splitting a resource across multiple days when it doesn't fit in one.

Hour estimates are heuristic starting points, not authoritative — that's why they're editable.

## Notes

- SearXNG must be running (step 1/2) before you click "Find & Schedule" — if it's down, the
  backend returns a clear error telling you to start it.
- This setup runs SearXNG unauthenticated on localhost only, which is fine for personal local
  use. Don't expose it to the public internet without adding the rate limiter back and reviewing
  SearXNG's own deployment docs.
# Skill-trainer
