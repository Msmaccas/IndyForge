# IndyForge

IndyForge is a private agent operations cockpit designed for high‑agency operators who span multiple domains: trading, real estate, software, research and medical workflows, content/brand building, and personal administration. Instead of providing a simple chatbot, IndyForge continuously ingests messy inputs from various sources, classifies them, generates **decision cards** with ranked options and next actions, and runs background jobs to triage, enrich and verify those decisions. A web dashboard surfaces the inbox, decision board, approval queue and job status.

> **Important:** IndyForge runs in **local/mock mode** by default. All external tool integrations (LLMs, brokers, messaging platforms, GitHub, Telegram, etc.) are stubbed or disabled until you provide API keys and explicitly enable them. Never enable live trading or external mutations without reviewing the code and understanding the consequences.

## Features

- **Multiple domains:** Classify inputs as trading, real‑estate, software/business, research/medical, brand/content or unknown using simple heuristics. Replace `src/classify.ts` with LLM-powered classifiers for higher accuracy.
- **Decision cards:** Each input becomes a structured card containing the source text, domain, urgency, reversibility, risk tier, missing data, options, next action and approval-required action. Cards are persisted via Prisma in an SQLite database by default.
- **Queue-based processing:** BullMQ-backed queues (`triage`, `decision` and `verifier`) coordinate background jobs. Schedulers and workers run asynchronously. Swap BullMQ for another queue system by adjusting `src/queue.ts`.
- **Fastify API:** A small Fastify server exposes `/ingest`, `/cards`, `/cards/:id/process` and `/cards/:id/verify`. Extend with your own routes or GraphQL/REST endpoints.
- **Testable & typed:** Written in TypeScript, with Vitest providing a sample unit test for the domain classifier. Prisma schema ensures type‑safe database access. Add more tests in the `tests/` folder.
- **Environment-driven:** Secrets and config live in `.env`. A `.env.example` file documents required variables. Use SQLite in development and override `DATABASE_URL` for Postgres in production.
- **Dockerizable:** A `Dockerfile` and `docker-compose.yml` (to be added) make it easy to run IndyForge along with Redis and Postgres in development or production. Local development works without Redis; queues will idle until a Redis server is available.

## Getting Started

1. **Install dependencies:**

   ```sh
   cd indyforge
   npm install
   # or pnpm install
   ```

2. **Generate the Prisma client and database:**

   ```sh
   npx prisma generate
   npx prisma migrate dev --name init
   ```

3. **Run the development server and workers:**

   ```sh
   # start Fastify API
   npm run dev
   # in separate terminals, start workers
   npx ts-node src/workers/triage.ts
   npx ts-node src/workers/decision.ts
   npx ts-node src/workers/verifier.ts
   ```

4. **Send an input for processing:**

   ```sh
   curl -X POST http://localhost:3000/ingest -H 'Content-Type: application/json' -d '{"content":"Review this property listing in Jurong."}'
   ```

5. **See the decision card:**

   ```sh
   curl http://localhost:3000/cards
   ```

6. **Process and verify the card:**

   ```sh
   # Suppose the returned card id is 1
   curl -X POST http://localhost:3000/cards/1/process
   curl -X POST http://localhost:3000/cards/1/verify
   ```

## Project Structure

- `src/index.ts` – entry point for the Fastify API server
- `src/routes.ts` – API route definitions
- `src/prisma.ts` – Prisma client instantiation
- `src/queue.ts` – BullMQ queue & scheduler setup
- `src/classify.ts` – simple heuristic domain classifier
- `src/workers/` – asynchronous job processors for triage, decision and verification
- `src/models/` – type definitions for domain objects
- `prisma/schema.prisma` – database schema
- `tests/` – Vitest unit tests
- `AGENTS.md` – guidance for future automated agents (to be added)
- `PRODUCT.md`, `RUNBOOK.md`, `ARCHITECTURE.md` – high‑level docs (to be added)

## Next Steps

This skeleton is intentionally simple. To evolve IndyForge into a production-grade agent operations cockpit:

1. **Replace the heuristic classifier with a call to an LLM or fine‑tuned classifier.** Introduce batching, caching and fallback logic.
2. **Expand the Decision worker** to call out to external tools (LLMs, data providers, trading research APIs) for ranking options, risk assessment and next actions.
3. **Implement the verifier worker** to enforce policy, require approvals and maintain an audit log. Integrate with Telegram or email for human approvals.
4. **Add a frontend dashboard** using Next.js or another framework. Visualise the inbox, decision board, approval queue and job status. Provide a review interface for each card.
5. **Introduce persistent job tables** and a scheduler for recurring tasks. Use BullMQ repeatable jobs or a cron scheduler.
6. **Dockerize** the app with a `docker-compose.yml` containing services for the API, workers, database and Redis.

## Disclaimer

IndyForge is a proof of concept. It does **not** provide investment, medical, legal or other professional advice. Always consult qualified professionals before making decisions. Use at your own risk.