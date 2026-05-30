# YOLO configuration baseline

Use this only inside a disposable repo, Codespace, VM, or VPS snapshot.

Do not run YOLO against:

- main Mac home folder
- real Gmail
- broker account
- Stripe
- production database
- anything with live money
- real customer accounts
- public posting surfaces

## Safer high-power default

```bash
codex --sandbox workspace-write --ask-for-approval on-request --search
```

Use this as the normal default. It allows useful repo work while keeping approval friction for riskier actions.

## True YOLO mode

```bash
codex --yolo --search
```

Use this only in an isolated runner. In this repo, `start-codex-yolo.sh` requires this deliberate confirmation first:

```bash
export AGENT_YOLO_ISOLATED_RUNNER=YES
```

Then:

```bash
./start-codex-yolo.sh
```

## Practical agent stack

- Primary executor: Codex CLI or Codex Web
- Secondary critic: Claude Code / Claude Agent SDK if available
- Cheap parallel critic: Qwen Code via OpenRouter, Alibaba, Fireworks, or NVIDIA OpenAI-compatible endpoint
- Workflow bus: Activepieces self-hosted, or n8n only if Activepieces MCP coverage is insufficient
- Local operator shell: Goose or OpenClaw
- Browser engine: Playwright Chromium, not normal Chrome
- Mobile interface: Telegram -> Hermes/OpenClaw gateway -> queued task runner
- Knowledge/memory: Obsidian vault + repo `AGENTS.md` + skills folders
- Verification: tests, evals, golden fixtures, traces, screenshots, generated reports

## Hard stop

No live trading, financial transaction, email send, LinkedIn post, legal/medical/customer-facing mutation, production data mutation, or customer-data access without explicit approval.

## Browser/computer-use rules

For browser/computer-use agents, use a dedicated Chromium profile, not a personal Chrome profile.

Enable only the minimum permissions:

- repo folder
- test browser profile
- screenshots folder
- downloads folder
- API keys in `.env` outside git

For macOS GUI agents, grant Accessibility and Screen Recording only to the dedicated agent app, terminal, or browser runner.

For Telegram-first operation, queue tasks rather than interrupting a live Hermes session.

## Evidence standard

The agent must not say success, fixed, complete, or passed unless it can show evidence from:

- tests
- logs
- screenshots
- generated reports
- changed files
- reproducible terminal commands

If data is missing, mark it `UNKNOWN` rather than guessing.
