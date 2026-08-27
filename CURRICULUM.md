# Career Learning Curriculum — August 2026 to February 2027

A seven-month, self-paced curriculum to build the skills behind ten real Pinterest job postings, starting from zero. This is a reading/reference document, not software — track your own progress with a checklist, spreadsheet, or notebook, whatever you already use.

## How to use this

- Work top to bottom. Each month builds on the last — don't skip ahead to a specialty topic before its prerequisites are solid.
- "Why it matters" ties every topic back to a specific posting so you're never learning something arbitrary.
- "Proof of learning" is the bar for "I actually know this," not "I watched a video about this." Don't move on until you can do it.
- Default pace assumes ~20 hrs/week. If you have less time, keep everything in the **Foundational** months (Aug–Oct) at full depth and compress or postpone items marked **Stretch**. Don't compress the fundamentals — that's the part that compounds.

## Setting realistic expectations

Ten postings were analyzed to build this curriculum. They fall into four honest categories — don't let the later, more advanced material distort what's actually reachable by February 2027:

| Category | Postings | What it means |
|---|---|---|
| **Entry-level target** | Software Engineer I, Backend | A real, realistic goal for Feb 2027 if you build Project A well. |
| **Adjacent entry-level target** | Data Scientist (generalist); Performance Solutions Partner II | Junior/associate versions of these are realistic; the exact posting may still expect a bit more. |
| **Stretch target** (normally needs 1–3 yrs experience) | Data Scientist II (Experimentation); Data Scientist II (Infrastructure); Product Manager II (Trust & Safety); Product Designer II | Worth applying to selectively once your portfolio is strong, but don't count on it. |
| **Experience-dependent / long-term benchmark** (multi-year, often people-management) | Software Engineer II, MySQL Infrastructure; Manager II, Trends Engineering; Manager II, ML – Conversion Visibility | These shape what to keep learning *after* Feb 2027. A personal project cannot substitute for years of production infrastructure or team-management experience. Study them for direction, not as a near-term goal. |

**Pick one primary track before September.** Trying to become interview-ready for every one of these ten roles at once will delay your first job. The tracks below share a common foundation (Aug–Sep), then diverge:

1. **Backend Software Engineering** → Software Engineer I, Backend
2. **Data & Experimentation** → Data Scientist / Data Scientist II (Experimentation)
3. **Product & Trust & Safety** → Product Manager II (Trust & Safety Tools)
4. **Product Design** → Product Designer II
5. **Ads & Performance Solutions** → Performance Solutions Partner II

Pick a **primary** (where you'll go deep) and optionally a **secondary** (where overlapping skills already carry over). ML engineering and engineering/people management are not zero-prerequisite starting tracks — they're what Backend/Data grows into over years, not a parallel option for a beginner.

---

## August 2026 — Foundations

**Why it matters:** every posting assumes comfort with a terminal, Git, and basic programming logic. Skipping this is the #1 reason beginners stall out.

**Learn:**
- How a computer runs a program; files/folders; operating systems basics
- Terminal fundamentals: navigation, file operations, running scripts
- Git & GitHub: init/add/commit, branches, pull requests, merge conflicts, writing a real README
- Python fundamentals: variables, types, conditionals, loops, functions, collections (list/dict/set/tuple), exceptions, virtual environments
- Introductory SQL: SELECT, WHERE, GROUP BY, JOIN, basic schema concepts (tables, keys, relationships)
- HTML/CSS fundamentals and the client-server model (what happens when you load a webpage)
- Debugging: reading a traceback, isolating a bug, forming a hypothesis instead of guessing

**Practice:** Write 10+ small Python scripts (FizzBuzz, a number-guessing game, a CSV summarizer). Write 15+ SQL queries against a sample database (a free one like Sakila or Chinook works well). Push every exercise to a public GitHub repo with real commit messages — this becomes your public learning log.

**Proof of learning:** You can open a terminal, create a Git repo, write a 30-line Python script from scratch without copying, and explain in plain English what happens between typing a URL and seeing a page load.

---

## September 2026 — Core Software, Data, and Statistics

**Why it matters:** this is the last shared month before tracks diverge. Object-oriented Python and testing matter for backend; pandas/statistics matter for data; React fundamentals matter for design/PM/T&S tooling work.

**Learn:**
- Intermediate Python: OOP (classes, inheritance vs. composition), type hints, `pytest` testing, logging
- Data structures & algorithms (just enough for interviews, not a rabbit hole): arrays, hash maps, stacks/queues, trees, recursion, binary search, complexity analysis (Big-O)
- PostgreSQL + advanced SQL: window functions, CTEs, subqueries, indexes, transactions/ACID, schema design
- Probability & statistics: descriptive stats, distributions, the Central Limit Theorem, confidence intervals, hypothesis testing
- pandas & NumPy: loading, cleaning, filtering, grouping, joining real datasets
- JavaScript → TypeScript → React fundamentals: variables/functions/array methods, types/interfaces, components/props/state/hooks
- Set up your professional baseline: polish your GitHub profile, write a first-draft resume, create a LinkedIn profile

**Practice:** Solve 30+ DSA problems (easy/medium, timed, narrated out loud). Analyze a real public dataset end-to-end in pandas (clean it, answer 5 business questions, visualize the answers). Build a small React to-do app.

**Proof of learning:** You can solve a "two sum"-style problem in better than brute-force time and explain why. You can compute and correctly interpret a confidence interval. You can build a 3-screen React app with working state.

**Job search starts now:** Begin networking and applying to adjacent entry points — apprenticeships, junior analyst roles, technical support. Don't wait for a finished portfolio to start this habit.

---

## October 2026 — Backend Project (Track: Backend Software Engineering)

**Why it matters:** directly builds the skills for Software Engineer I, Backend — the single most realistic entry-level target in this list.

**Learn:**
- REST API design: resource-oriented URLs, HTTP methods/status codes, request/response lifecycle
- FastAPI: building typed endpoints, request/response validation with Pydantic, pagination, error handling
- Redis caching: cache-aside pattern, invalidation, TTL
- Docker & docker-compose: containerizing an app with its database and cache
- Automated + integration testing, plus basic load testing (p50/p95/p99 latency)
- Deployment: CI (run tests on every push), deploying to a live URL
- Reliability basics: structured logging, a simple metrics dashboard

**Build (Project 1 — "Inspiration Backend"):** A backend service for saving, organizing, searching, and getting simple recommendations for saved items. Full CRUD API, PostgreSQL schema, Redis caching on the expensive query, Dockerized, tested, deployed to a live URL, with a README explaining the architecture and how it would need to change at 100x the scale.

**Proof of learning:** A live, deployed URL. A test suite covering both success and failure paths. You can explain every schema decision and defend it in a mock interview.

**Job search:** start applying to junior backend, apprenticeship, and technically-adjacent roles now that you have something real to show.

---

## November 2026 — Experimentation & Data Science (Track: Data & Experimentation)

**Why it matters:** the core of the Data Scientist and Data Scientist II (Experimentation) postings — A/B testing is the single most-tested practical skill for these roles.

**Learn:**
- A/B test design: randomization units, sample-size/power calculation, primary vs. guardrail metrics
- Common pitfalls: Type I/II errors, multiple-comparisons problem, novelty effects, survivorship/selection bias, regression to the mean
- Variance reduction (CUPED, introductory) and sequential-testing awareness (why "peeking" invalidates a test)
- scikit-learn basics: train/val/test splits, regression, classification, precision/recall/F1, overfitting vs. underfitting
- Data pipelines: what ETL is, Airflow DAGs/scheduling/retries at a beginner level, automated data-quality checks
- Communicating findings: writing a one-page recommendation memo a non-technical stakeholder can act on

**Build (Project 2 — "Experimentation Lab"):** Simulate realistic (imperfect) A/B test data, compute metrics in SQL, run the full statistical analysis in Python (hypothesis test, confidence interval, guardrail check, bias checks), automate it with a simple Airflow pipeline, and write a real stakeholder recommendation memo — including at least one experiment you correctly flag as inconclusive rather than oversold.

**Proof of learning:** You can explain what a p-value of 0.03 actually means (and doesn't mean) without notes. You can catch a sample-ratio mismatch before trusting a result.

**Job search:** apply to data analyst, product analyst, experimentation analyst, and junior data-science-adjacent roles.

---

## December 2026 — Product, Design & Trust and Safety (Track: Product/T&S or Design)

**Why it matters:** builds toward Product Manager II (Trust & Safety Tools) and Product Designer II — and every track benefits from stronger product thinking and a polished React/TypeScript portfolio piece.

**Learn:**
- Product thinking: problem statements (not feature requests), user stories with acceptance criteria, writing a real PRD, prioritization frameworks
- Trust & Safety fundamentals: review queues, escalation/appeals design, risk-based prioritization, operational metrics (handling time, throughput, backlog, quality rate)
- AI-assisted workflows done responsibly: human-in-the-loop review, showing model confidence honestly, never letting "AI suggested it" replace a real decision
- Figma fundamentals, UX research basics, information architecture, a small design system, accessibility (contrast, keyboard navigation, focus states)
- React/TypeScript refinement: generics, reusable components, routing, accessible forms

**Build (Project 3 — "Trust & Safety Console"):** A polished internal tool (React + TypeScript) for a content-review workflow: prioritized queue, item detail with a mock AI-assisted summary (clearly labeled as a suggestion, not a decision), escalation/appeals flow, and an operational-metrics dashboard. Document the full design process (research → wireframes → high-fidelity → usability test) as a real case study.

**Proof of learning:** You can walk someone through your PRD and defend a scoping trade-off. Your interface is fully usable by keyboard alone.

**Job search:** keep applying; start at least one mock interview per week from this month on.

---

## January 2027 — Ads Measurement & Intro ML Systems (Track: Ads & Performance Solutions)

**Why it matters:** builds toward Performance Solutions Partner II, and gives you literate exposure to the ML-systems vocabulary in the manager-level postings (identity matching, attribution, conversion prediction) without pretending you're ready to own that work.

**Learn:**
- Digital advertising vocabulary: CTR, CPC, CPM, CPA, ROAS, and how they trade off
- Event tracking: browser pixels vs. server-side conversion APIs, why browser-only tracking is unreliable
- Deduplication (deterministic matching on a shared event ID) and attribution windows (why they're a modeling choice, not an objective fact)
- Identity matching / entity resolution at an introductory level; precision/recall trade-offs
- Funnel analysis and building a metrics dashboard for a non-technical audience
- Client-facing communication: explaining a technical tracking issue without jargon

**Build (Project 4 — "Ads Measurement System"):** A small, clearly-labeled *educational simulation* (not a real ad platform) of event collection → validation → deduplication → attribution → a campaign/funnel dashboard, plus a written troubleshooting playbook for 3 common "why aren't my conversions showing up" scenarios, written for a non-technical client.

**Proof of learning:** You can explain, to someone with no technical background, why the same campaign can report different numbers under a 1-day vs. 7-day attribution window.

**Job search:** narrow down to your single most promising track and tailor everything toward it.

---

## February 2027 — Portfolio Polish & Hiring Sprint

**Why it matters:** skills and projects only convert to a job if they're presentable and you can perform live under time pressure.

**Do:**
- Polish every project's README, fix any flaky deployments, tighten documentation
- Build a simple personal portfolio site linking your resume, GitHub, and all four projects
- Produce 2–3 resume versions tailored to different role types
- Prepare 6 STAR-format behavioral stories (failure, conflict, ambiguity, initiative, teamwork, a technical challenge) — draw them from your real projects
- Drill weak spots: timed SQL/coding problems, statistics interview questions, a system-design walkthrough of Project A at 100x scale, a rehearsed design-portfolio presentation
- Run 2+ mock interviews per week
- Write a short "next 12 months" plan: which stretch/long-term skills (from the table above) you'll keep developing after this sprint

**Target outcome:** at least two excellent flagship projects, two supporting case studies, a clean GitHub profile, a tailored resume, and a portfolio site — plus a realistic, honest sense of which of the ten roles you're actually ready to interview for.

---

## Interview prep, ongoing from December

Practice across these areas weekly, not just in February: Python, SQL, data structures & algorithms, backend/API design fundamentals, system-design basics, probability & statistics, experimentation, product sense & execution, Trust & Safety case questions, design-portfolio presentation, advertising measurement, and behavioral. For each, keep a running list of questions you got wrong and revisit them — don't just grind new ones.

## Reference: full skill-to-role map

| Skill area | Feeds these postings |
|---|---|
| Python, Git, terminal, SQL fundamentals | All ten |
| DSA / coding interviews | SWE I, SWE II, both DS II roles |
| FastAPI, REST, Docker, caching, reliability | SWE I Backend, SWE II MySQL Infra |
| PostgreSQL/MySQL internals, replication, partitioning | SWE II MySQL Infra, DS II Infrastructure |
| Statistics, A/B testing, CUPED | Data Scientist, DS II Experimentation |
| Root-cause analysis, SLIs/SLOs, infra metrics | DS II Infrastructure |
| PRDs, prioritization, stakeholder management | PM II Trust & Safety |
| Review queues, escalation design, moderation metrics | PM II Trust & Safety |
| Figma, UX research, design systems, accessibility | Product Designer II |
| Ads metrics, tracking/tagging, attribution | Performance Solutions Partner II |
| Identity matching, conversion prediction, ML serving | Manager II ML (long-term), Performance Solutions Partner II (intro level) |
| Ranking/recommendation fundamentals | Manager II Trends Engineering (long-term) |
| People management, hiring, org-level roadmap ownership | Both Manager II roles — **not buildable in 7 months; multi-year track** |

---

## Tracking your own progress

No app needed. Pick whichever of these you'll actually keep up:
- A copy of this file with checkboxes added under each month's bullet list
- A simple spreadsheet: one row per skill, columns for status / date / evidence link
- A Notion or plain-text log where you note, weekly: what you learned, what you built, what's still shaky

The one habit worth keeping regardless of tool: **write down evidence, not just a checkmark.** "Learned SQL joins ✅" proves nothing to you in month 6 or to an interviewer in month 7. "Wrote 5 join queries against a real dataset, repo link: ___" does.
