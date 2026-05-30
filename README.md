# Agent YOLO Lab

A disposable lab for running coding and research agents inside a controlled workspace.

The main example is a global CAN SLIM / O'Neil-style stock research agent. It can read watchlists, CSV files, chart screenshots, and public data, then write ranked reports for human review.

It does not place trades.

## Current safety posture

This repository is public. Treat everything committed here as visible.

Do not commit:

- real broker exports
- API keys
- account IDs
- private screenshots
- real customer data
- Gmail, Stripe, LinkedIn, or production data
- private notes that you do not want public

The `.gitignore` blocks common local/private folders such as `.env`, `data/`, `screenshots/`, `reports/`, `traces/`, `browser-profile/`, and `secrets/`.

## What this repo is for

Use it when you want an agent to:

- inspect a repo
- create or improve code
- run tests
- read chart screenshots
- process global stock watchlists
- write reports
- leave evidence of what it did

The first serious example is:

> CAN SLIM multimodal trading analyst agent for global equities.

It ranks names by setup quality. It does not place trades.

## Folder shape

```text
agent-yolo-lab/
  AGENTS.md
  README.md
  .gitignore
  prompts/
    canslim-global-yolo.md
  scripts/
    bootstrap-agent-lab.sh
    doctor.sh
  run-canslim-yolo.sh
  start-codex-safe.sh
  start-codex-yolo.sh
  data/              # ignored, local only
  screenshots/       # ignored, local only
  reports/           # ignored, local only
  traces/            # ignored, local only
  browser-profile/   # ignored, local only
  secrets/           # ignored, local only
```

## First-time setup in GitHub Codespaces

1. Open the repo on GitHub.
2. Press the green `Code` button.
3. Press `Codespaces`.
4. Press `Create codespace on main`.
5. Wait until VS Code in the browser opens.
6. Open `Terminal` -> `New Terminal`.

Then run:

```bash
cd /workspaces/agent-yolo-lab
git pull
chmod +x *.sh scripts/*.sh 2>/dev/null || true
./scripts/bootstrap-agent-lab.sh
./scripts/doctor.sh
```

If `doctor.sh` says Codex is missing, install Codex CLI, reopen the terminal, then run the doctor check again.

## Codex CLI check

Run:

```bash
codex --version
```

If that prints a version, continue.

If it says `codex: command not found`, install Codex CLI using the current official OpenAI Codex CLI instructions, then open a new terminal and run:

```bash
codex --version
```

## Safer high-power mode

Use this first:

```bash
cd /workspaces/agent-yolo-lab
./start-codex-safe.sh
```

This runs Codex with workspace-write permissions and approval on request.

Use this mode for normal repo repair, app building, prompt improvement, tests, docs, and report generation.

## True YOLO mode

Use this only inside a disposable runner such as a Codespace, VM, VPS snapshot, or throwaway container.

```bash
cd /workspaces/agent-yolo-lab
export AGENT_YOLO_ISOLATED_RUNNER=YES
./start-codex-yolo.sh
```

This runs:

```bash
codex --yolo --search
```

Do not run YOLO from your Mac home folder, Desktop, Documents, Downloads, iCloud, normal browser profile, broker folder, production app, or anything with live money.

## Run the CAN SLIM global agent

From the repo root:

```bash
cd /workspaces/agent-yolo-lab
export AGENT_YOLO_ISOLATED_RUNNER=YES
./run-canslim-yolo.sh
```

That feeds this prompt into Codex:

```text
prompts/canslim-global-yolo.md
```

Expected local outputs:

```text
reports/watchlist_ranked.md
reports/watchlist_ranked.csv
reports/telegram_summary.md
reports/data_quality_matrix.md
reports/chart_rubric.md
reports/symbols/<symbol>.json
```

These outputs are ignored by git by default because reports may contain private watchlist information.

## Give it a watchlist

Create a local-only watchlist:

```bash
mkdir -p data/tickers
cat > data/tickers/global_watchlist.csv <<'EOF'
symbol,exchange,notes
AAPL,NASDAQ,US mega-cap example
ASML,AMS,Europe semiconductor example
9988,HKEX,Hong Kong example
7203,TSE,Japan example
BHP,ASX,Australia example
EOF
```

Then run:

```bash
export AGENT_YOLO_ISOLATED_RUNNER=YES
./run-canslim-yolo.sh
```

## Give it OHLCV data

Put CSV files here:

```text
data/ohlcv/
```

Suggested format:

```csv
date,open,high,low,close,volume
2025-01-02,100,105,99,104,1234567
```

Example filenames:

```text
data/ohlcv/AAPL.csv
data/ohlcv/ASML.AS.csv
data/ohlcv/9988.HK.csv
```

The agent should prefer your CSV over weaker public fallback data.

## Give it fundamentals

Put fundamentals here:

```text
data/fundamentals/
```

Suggested format:

```csv
symbol,eps_growth,sales_growth,annual_eps_trend,roe,debt_equity,fund_sponsorship,buyback
AAPL,12,6,UP,135,1.7,UNKNOWN,UNKNOWN
```

Missing fields should stay missing. The report should mark them as `UNKNOWN`, `NOT_AVAILABLE`, `LOW_CONFIDENCE`, or `MANUAL_REVIEW`.

## Give it chart screenshots

Put screenshots here:

```text
screenshots/
```

Useful names:

```text
screenshots/AAPL_weekly.png
screenshots/ASML_daily.png
screenshots/9988HK_weekly.png
```

Good screenshots show:

- ticker
- timeframe
- price axis
- volume bars
- moving averages
- at least six months of history

The agent should say when a screenshot is too poor to trust.

## What the CAN SLIM agent checks

For each symbol, it should classify:

- current price
- distance from 52-week high
- relative strength proxy
- EPS growth
- sales growth
- annual EPS trend
- ROE
- debt/equity
- fund sponsorship
- buyback
- industry or group strength
- market direction
- base type
- base quality
- pivot
- buy zone
- extension from pivot
- volume dry-up
- accumulation or distribution
- moving average alignment
- relative strength line behaviour
- sell and risk flags

For screenshots, it should look for:

- cup with handle
- flat base
- double bottom
- high tight flag
- IPO base
- late-stage failed base
- too wide and loose
- wedging handle
- obvious distribution
- extended or climax risk

## Ranking labels

Each stock should end with one label:

```text
ACTIONABLE
WATCH
TOO_EXTENDED
BROKEN
FUNDAMENTALLY_WEAK
DATA_INSUFFICIENT
REJECT
```

The label is not enough. The report must give the reason.

Good output looks like this:

```text
Rank | Symbol | Label | Confidence | Why
1    | ASML   | WATCH | 0.72       | Near pivot, volume still thin, fundamentals partly missing
2    | AAPL   | TOO_EXTENDED | 0.68 | Strong trend, but stretched past clean entry
3    | 9988.HK | DATA_INSUFFICIENT | 0.41 | Missing fundamentals and chart timeframe unclear
```

## Use GPT agent on this repo

Give a coding agent this instruction:

```text
Open the latest version of Msmaccas/agent-yolo-lab. Read README.md, AGENTS.md, and prompts/canslim-global-yolo.md first. Then run the CAN SLIM global research task exactly as described. Keep all work inside this repo. Create or update tests and reports. Do not touch broker accounts, emails, public posting, production services, or live trading. End with files changed, tests run, ranked report path, missing data, and the next command I should run.
```

If the agent can run shell commands, tell it to run:

```bash
export AGENT_YOLO_ISOLATED_RUNNER=YES
./run-canslim-yolo.sh
```

If it cannot run shell commands, tell it to edit the repo and create a pull request.

## Paste-ready YOLO prompt

Use this when you want to give the job to a coding agent directly:

```text
You are running inside the latest version of this repository. Work only inside this workspace. Move fast, but leave evidence.

Build or run a global CAN SLIM / O'Neil-style diagnostic engine for equity watchlists. It must work across global markets, not just US tickers. It should accept ticker lists, exchange suffixes, TradingView-style symbols, chart screenshots, OHLCV CSVs, fundamentals CSVs, broker tradability CSVs, and notes.

First inspect the repo: code, configs, tests, docs, scripts, prompts, reports, and prior outputs. If an engine exists, improve it. If not, bootstrap a serious MVP.

Use provider interfaces. Support manual CSV override, screenshot-only mode, a free public data fallback, optional Polygon, optional Financial Modeling Prep, optional Alpha Vantage, and optional IBKR read-only tradability checks. Do not build around one US-only provider.

For missing data, write UNKNOWN, NOT_AVAILABLE, LOW_CONFIDENCE, or MANUAL_REVIEW. Do not guess.

For each symbol, classify current price, distance from 52-week high, relative strength proxy, EPS growth, sales growth, annual EPS trend, ROE, debt/equity, sponsorship, buyback, industry or group strength, market direction, base type, base quality, pivot, buy zone, extension from pivot, volume dry-up, accumulation or distribution, moving average alignment, relative strength line behaviour, and sell/risk flags.

For chart screenshots, look for cup with handle, flat base, double bottom, high tight flag, IPO base, late-stage failed base, too wide and loose, wedging handle, obvious distribution, and extended or climax risk. State uncertainty when the screenshot lacks timeframe, price scale, volume, or enough history.

Each symbol must end with one label: ACTIONABLE, WATCH, TOO_EXTENDED, BROKEN, FUNDAMENTALLY_WEAK, DATA_INSUFFICIENT, or REJECT. Include confidence and exact reasons. Do not call any stock a buy. Use “meets setup criteria” only if the criteria actually pass.

Create or update reports/watchlist_ranked.md, reports/watchlist_ranked.csv, reports/telegram_summary.md, reports/data_quality_matrix.md, reports/chart_rubric.md, and per-symbol JSON files under reports/symbols/.

Add tests and fixtures. Include a fixture ticker list, OHLCV CSV, fundamentals CSV, data-quality tests, ranking-label tests, report-generation tests, and at least three synthetic chart cases if real images are unavailable.

If IBKR environment variables exist, detect them without printing secrets. Do not connect unless an explicit read-only flag is set. Keep ENABLE_LIVE_TRADING=false. Never submit an order.

Run the tests and demo. Finish with: what changed, commands run, files created or updated, ranked table, provider coverage, missing data, test evidence, remaining risks, and the next command to run with real data.
```

## Telegram / Hermes later

The local reports come first.

A Telegram or Hermes layer can come later as a queue:

```text
Telegram message
  -> task queue
  -> repo runner
  -> report files
  -> short reply with links or summary
```

Do not wire Telegram straight into a live shell. Queue tasks. Keep logs. Return summaries.

## Browser agents

Use Playwright Chromium or a dedicated Chromium profile.

Keep it away from your normal Chrome profile.

Recommended folders:

```text
browser-profile/
downloads/
screenshots/
traces/
```

Useful permissions:

- repo folder
- test browser profile
- downloads folder
- screenshots folder
- `.env` outside git

## Critic agents

Use a second model to review the work.

Good critic tasks:

- find missing tests
- check data leakage
- check hallucinated fundamentals
- check whether labels match evidence
- check whether chart claims are too confident
- check whether reports are reproducible

A cheap critic can be Qwen through an OpenAI-compatible endpoint. A stronger critic can be Claude Code or a Claude Agent SDK workflow.

## Output standard

Every agent run should leave this behind:

```text
reports/watchlist_ranked.md
reports/watchlist_ranked.csv
reports/telegram_summary.md
reports/data_quality_matrix.md
reports/chart_rubric.md
reports/symbols/*.json
```

The final message should answer:

```text
What changed?
What ran?
What passed?
What failed?
What data was missing?
What should I do next?
```

## One clean demo

```bash
cd /workspaces/agent-yolo-lab

git pull
chmod +x *.sh scripts/*.sh 2>/dev/null || true
./scripts/bootstrap-agent-lab.sh
./scripts/doctor.sh

mkdir -p data/tickers
cat > data/tickers/global_watchlist.csv <<'EOF'
symbol,exchange,notes
AAPL,NASDAQ,US mega-cap example
ASML,AMS,Europe semiconductor example
9988,HKEX,Hong Kong example
7203,TSE,Japan example
BHP,ASX,Australia example
EOF

export AGENT_YOLO_ISOLATED_RUNNER=YES
./run-canslim-yolo.sh
```

Then open:

```text
reports/watchlist_ranked.md
```

That is the main file to read.
