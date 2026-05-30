# IndyForge Runbook

This runbook explains how to operate IndyForge day‑to‑day, from local development to production deployments. It assumes familiarity with Node.js, Prisma, Redis and Docker. Future agents should read this file before making changes or automating any operations.

## Installation

### Local Development

1. **Clone the repository** (or ensure it is mounted in your workspace).
2. **Install dependencies**: run `npm install` or `pnpm install` inside the `indyforge` directory.
3. **Copy `.env.example` to `.env`** and fill in any provider keys you wish to use. For local development you can leave them blank.
4. **Generate the Prisma client**:

   ```sh
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Start the API server**: `npm run dev` (uses ts-node). The server listens on `PORT` (default 3000).
6. **Start the workers**: run each worker in its own terminal:

   ```sh
   npx ts-node src/workers/triage.ts
   npx ts-node src/workers/decision.ts
   npx ts-node src/workers/verifier.ts
   ```

7. **Queue messages**: POST to `/ingest` with `{ "content": "..." }` and monitor `/cards` for results. Use `/cards/:id/process` and `/cards/:id/verify` to trigger downstream workers.

### Running with Docker Compose

The upcoming `docker-compose.yml` will define services for the API, workers, database and Redis. To run IndyForge in a reproducible environment:

1. Ensure Docker and Docker Compose are installed.
2. Copy `.env.example` to `.env` and adjust as needed.
3. Run `docker-compose up --build`.
4. Access the API at `http://localhost:3000` and check the worker logs in other containers.

### Production Deployment

For production you should:

1. Use Postgres instead of SQLite by setting `DATABASE_URL` to a Postgres connection string and updating `prisma/schema.prisma` accordingly.
2. Run Redis externally (e.g. AWS ElastiCache, Upstash). Update `REDIS_HOST`/`REDIS_PORT` accordingly.
3. Build the API and worker images using the provided `Dockerfile` and deploy them on separate processes or containers. Ensure each worker has enough concurrency to handle expected load.
4. Protect the `/ingest` and other endpoints with authentication (e.g. JWT, API keys or OAuth). IndyForge ships with no authentication by default for demonstration purposes.
5. Provide logging and monitoring (e.g. using pino, Prometheus, Grafana). The Fastify server already uses a basic logger.

## Approval Gates & Safety

IndyForge is designed to keep irreversible actions behind approval gates. The verifier worker should be extended to enforce policies and require human intervention for:

- Trading actions (placing orders, executing trades)
- Real‑estate offers and purchases
- Sending emails, messages or posts on behalf of the user
- Modifying data in GitHub or other connected systems
- Any domain with regulatory or ethical implications (medical advice, legal advice, financial promotions)

External connectors (Telegram, GitHub, Activepieces, etc.) must respect environment variables like `ENABLE_LIVE_TRADING` and ask for explicit approval before performing actions. In the absence of these variables, connectors should operate in dry‑run mode.

## Extending IndyForge

To add a new domain or workflow:

1. **Update `classify.ts`** with patterns or integrate an LLM to recognise the new domain.
2. **Add a worker** or extend the existing decision worker to generate options and actions for the new domain.
3. **Update the schema** if the domain requires storing additional fields on the DecisionCard or separate models. Run `npx prisma migrate dev` to generate new migrations.
4. **Expand the verifier** to enforce domain‑specific rules and require approvals.
5. **Integrate connectors** by adding modules under `src/connectors/` and adding hooks in the workers.

## Maintenance Tasks

Regular maintenance includes:

- Running database migrations when the schema changes (`npx prisma migrate deploy` in production).
- Clearing or pruning the queues if jobs accumulate unexpectedly.
- Rotating API keys and secrets in the `.env` file and any secret manager.
- Updating dependencies (`npm update`) and checking for security advisories.
- Adding tests to cover new behaviour and running `npm run test` regularly.

## Troubleshooting

- **Worker cannot connect to Redis**: Ensure Redis is running and the `REDIS_HOST`/`REDIS_PORT` env vars are correct. Without Redis the queues will not process jobs.
- **Database errors**: Ensure the database file or server is writable. With SQLite, the file must exist and be accessible by the Node process.
- **API returns 400 on /ingest**: The JSON body must include a `content` field. Check that your client is sending valid JSON with the correct header (`Content-Type: application/json`).
- **No decisions being generated**: Check the worker logs. Ensure the workers are running and that jobs are being enqueued. Use BullMQ tooling or Redis CLI to inspect the queue state.

Refer to `README.md`, `ARCHITECTURE.md` and `AGENTS.md` for more details.