# Architecture of IndyForge

This document provides a high‑level overview of the IndyForge architecture, including its major components, data flow and suggested extensions. Future developers and autonomous agents should refer to this when modifying or extending the system.

## Components

### Fastify API Server (`src/index.ts`)

The API server exposes HTTP endpoints for ingesting inputs, retrieving decision cards and triggering processing/verification. It is implemented with [Fastify](https://www.fastify.io/) for lightweight performance and built‑in logging. Routes are defined in `src/routes.ts`. The API validates input using [zod](https://github.com/colinhacks/zod) to prevent malformed requests.

### Prisma ORM (`prisma/schema.prisma`, `src/prisma.ts`)

Persistent state is managed using [Prisma](https://www.prisma.io/), which provides a type‑safe ORM on top of the underlying database (SQLite by default). The schema defines a single `DecisionCard` model capturing the essential fields for each piece of work. Prisma migrations handle schema evolution.

### Queue System (`src/queue.ts`)

Asynchronous processing is orchestrated with [BullMQ](https://docs.bullmq.io/). There are three named queues:

- **triage** – raw inputs are classified into domains and initial DecisionCards are created.
- **decision** – DecisionCards are enriched with options, proposed actions and risk assessments.
- **verifier** – DecisionCards are checked for policy compliance and approval requirements. In production this queue should integrate with human review flows.

Each queue has an associated [QueueScheduler](https://docs.bullmq.io/guide/queues/scheduler) to handle retries and delayed jobs. Workers run in separate processes (or threads) and connect to Redis via environment variables.

### Workers (`src/workers/`)

Workers are simple processes that consume jobs from their respective queues. They use the shared Prisma client to read and write `DecisionCard` records. The triage worker calls a heuristic classifier (`src/classify.ts`) to determine the domain. The decision worker populates action fields based on the domain. The verifier worker checks whether an approval is required.

In a full implementation, workers would call external services (LLMs, data providers, connectors) and may spawn sub‑workers or sub‑agents. The design intentionally keeps workers small and composable.

### Classifier (`src/classify.ts`)

The classifier module encapsulates domain classification logic. Currently it uses regular expressions to detect keywords. This abstraction makes it easy to swap in a more sophisticated model or LLM call without changing the worker logic. The classifier should remain deterministic and side‑effect free.

### Routes (`src/routes.ts`)

Routes provide a minimal REST API. Additional routes can be added for authentication, dashboards, exports or webhooks. The `POST /ingest` endpoint is the primary entry point for new inputs. Jobs are enqueued asynchronously; the HTTP request returns as soon as the job has been accepted.

### Tests (`tests/`)

Unit tests verify the correctness of internal logic. The provided `classify.test.ts` covers domain classification. Future tests should cover routes (using Fastify’s `inject` method), worker functions (with mocked dependencies) and high‑level workflows. Tests are run with [Vitest](https://vitest.dev/).

## Data Flow

1. **Ingest**: A client sends a POST request to `/ingest` with a JSON body containing `content`. The API enqueues a job on the triage queue.
2. **Triage Worker**: Consumes jobs from the triage queue. It classifies the content and persists a new `DecisionCard` in the database.
3. **Decision Worker**: Triggered manually via `/cards/:id/process` (automated triggers can be added). It enriches the selected card with options, next actions and approval actions.
4. **Verifier Worker**: Optionally runs via `/cards/:id/verify`. It flags cards requiring approval and can forward them to a human review channel.
5. **Dashboard**: Clients fetch the list of cards via `/cards` and display them. A future frontend will consume these APIs and present a unified dashboard.

## Future Extensions

- **Front‑end dashboard**: A Next.js or React app that uses websockets or polling to display the state of the inbox, decision board and approval queue. Workers can emit events via Redis or a pub/sub system.
- **LLM & skill integration**: Use a tool registry to call GPT‑4, Claude, Qwen or local models. Use skills from skills.sh to implement domain‑specific logic. Parameterize prompts and keep them versioned in `prompts/`.
- **Connector framework**: Implement connectors for GitHub (issues, PRs), Slack/Telegram (messages), email, calendar and broker APIs. Each connector should respect dry‑run mode and approval gates.
- **Audit & tracing**: Persist job traces, tool calls and model outputs. Provide a UI to inspect past runs and debug failures. Consider using OpenTelemetry or a custom trace format.
- **Security & compliance**: Add role‑based access control, encryption at rest, rate limiting and content moderation. The verifier worker should embed policy rules and call out to external compliance services where required.

IndyForge is a starting point for building serious agentic systems. Keep the architecture modular and explicit to accommodate new domains and ensure safety.