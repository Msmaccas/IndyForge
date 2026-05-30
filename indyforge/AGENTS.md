# Guide for Future Agents

Welcome, fellow agent or automated contributor! This repository powers **IndyForge**, a private decision‑operating cockpit. To help you navigate and extend this codebase safely, this document lays out the rules, commands and boundaries you must respect when acting on behalf of a user. Read this carefully before writing code or performing actions.

## High‑Level Principles

1. **Stay inside the workspace**: Only modify files within the `indyforge` directory. Do not touch system files or parent directories. Do not write secrets to version control.
2. **Respect approvals**: Any action that could have irreversible external effects (sending messages, posting on social media, placing trades, buying property) must be gated behind explicit user approval. You may draft such actions but must not execute them.
3. **Mock first, integrate second**: When adding connectors (GitHub, Telegram, Activepieces, brokers, etc.), build a mock adapter and tests before enabling live calls. Ensure environment variables and feature flags control connectivity.
4. **Leave evidence**: Write logs, traces and decision records so that humans (and other agents) can understand what you did. Use Prisma, files under `logs/`, or other persistent stores.
5. **Version your prompts and skills**: Place prompt files under `prompts/` with version numbers. Skills should live under `skills/` with a clear description, tests and a security scan summary.
6. **Run tests and lint**: Before committing changes, run `npm run test` and `npm run build`. Do not push code that fails to compile or breaks existing tests. Add new tests for new functionality.
7. **Do not expose secrets**: Keep API keys in `.env` (or the secret manager in production). Never print them to logs or commit them to Git.

## Setup Commands

For convenience, here are common commands to run in this repository. Use them via the container or your preferred shell.

- **Install dependencies:**

  ```sh
  cd indyforge
  npm install
  ```

- **Generate the Prisma client and run migrations:**

  ```sh
  npx prisma generate
  npx prisma migrate dev --name init
  ```

- **Start the API server:**

  ```sh
  npm run dev
  ```

- **Start the workers:**

  ```sh
  npx ts-node src/workers/triage.ts
  npx ts-node src/workers/decision.ts
  npx ts-node src/workers/verifier.ts
  ```

- **Run tests:**

  ```sh
  npm run test
  ```

## Extending IndyForge

When adding new features or domains:

1. **Write or update a skill** in `skills/`. Each skill should include a `README.md`, `SKILL.md`, tests and fixtures. Use the security scanner to detect prompt injections or unsafe code.
2. **Update the classifier** or add a new classifier module if the domain requires special handling. Keep deterministic logic outside of prompts when possible.
3. **Add new database models** in `prisma/schema.prisma` and run migrations.
4. **Implement new workers** or extend existing ones. Place them under `src/workers/`. Each worker should be small and do one thing. Use queues to coordinate complex workflows.
5. **Add tests** under `tests/` using Vitest. Tests should be deterministic and avoid external network calls.
6. **Update documentation**: README.md, PRODUCT.md, ARCHITECTURE.md and RUNBOOK.md should reflect your changes. Consider creating a changelog.

## Unsafe Actions to Avoid

You **must not**:

- Push directly to protected branches without opening a pull request and obtaining approvals.
- Delete data or files without explicit instruction.
- Publish packages, deploy to production or modify domain settings.
- Execute arbitrary shell commands outside of the repository context.
- Call live trading APIs, transfer funds or sign legal documents.
- Release personal data or secrets into logs, reports or responses.

When in doubt, ask for human confirmation or create an approval task in the queue.

Thank you for contributing to IndyForge! Your careful adherence to these guidelines will ensure the system remains reliable, secure and user‑centric.