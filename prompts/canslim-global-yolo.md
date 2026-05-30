# CAN SLIM global research agent — YOLO prompt

You are running inside this repository. Work fast, but keep the work auditable.

## Goal

Build or run the strongest local CAN SLIM / O'Neil-style diagnostic engine you can for a global equity watchlist.

The engine must combine:

- chart pattern diagnosis
- chart screenshot reasoning, when screenshots are supplied
- OHLCV data, when available
- fundamentals, when available
- group and industry strength
- market context
- risk flags
- data-quality scoring
- ranked decision cards

It should work for global stocks, not only US tickers. Accept TradingView-style symbols when possible, but do not depend on a private TradingView API. Use public data, paid-provider hooks, manual CSVs, and screenshot-only mode as separate paths.

## Hard limits

- No live trades.
- No broker orders.
- No broker setting changes.
- No email sending.
- No public posting.
- No account IDs or secrets in logs.
- `ENABLE_LIVE_TRADING=false` stays false.
- Never call a stock a buy. Use `meets setup criteria` only when the criteria actually pass.

## First pass

Inspect the repo first:

- files
- configs
- tests
- scripts
- docs
- prior reports
- existing outputs

If the repo already has an engine, improve it. If it has no engine, bootstrap a serious MVP.

## Inputs to support

The engine must accept any mix of:

- ticker list
- exchange suffixes
- TradingView-style symbols
- chart screenshots
- exported OHLCV CSV
- fundamentals CSV
- broker tradability CSV
- notes

Use these folders unless a better structure already exists:

- `data/tickers/`
- `data/ohlcv/`
- `data/fundamentals/`
- `data/tradability/`
- `screenshots/`
- `reports/`
- `fixtures/`
- `evals/`
- `traces/`

## Data providers

Create provider interfaces. Keep them swappable.

Required paths:

- manual CSV override
- screenshot-only chart mode
- yfinance or another free fallback
- optional Polygon
- optional Financial Modeling Prep
- optional Alpha Vantage
- optional IBKR read-only tradability check

Do not hard-code the system around one US-only data source.

If data is missing, mark it as one of:

- `UNKNOWN`
- `NOT_AVAILABLE`
- `LOW_CONFIDENCE`
- `MANUAL_REVIEW`

Do not fill gaps with guesses.

## CAN SLIM / O'Neil fields

For each symbol, calculate or classify:

- current price
- distance from 52-week high
- relative strength proxy
- EPS growth
- sales growth
- annual EPS trend
- ROE, if available
- debt/equity, if available
- fund sponsorship, if available
- buyback, if available
- industry or group strength
- market direction placeholder
- base type
- base quality
- pivot
- buy zone
- extension from pivot
- volume dry-up
- accumulation / distribution
- moving average alignment
- relative strength line behaviour
- sell and risk flags

For chart screenshots, classify likely patterns when the image quality allows it:

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

State uncertainty when the screenshot lacks timeframe, price scale, volume bars, or enough history.

## Ranking labels

Each symbol must end with one label:

- `ACTIONABLE`
- `WATCH`
- `TOO_EXTENDED`
- `BROKEN`
- `FUNDAMENTALLY_WEAK`
- `DATA_INSUFFICIENT`
- `REJECT`

Include confidence and exact reasons.

## Required reports

Create or update:

- `reports/watchlist_ranked.md`
- `reports/watchlist_ranked.csv`
- `reports/telegram_summary.md`
- `reports/data_quality_matrix.md`
- `reports/chart_rubric.md`
- `reports/symbols/<symbol>.json`

The ranked markdown report should show:

- rank
- symbol
- market or exchange
- label
- confidence
- setup notes
- fundamental notes
- technical notes
- risk flags
- missing data
- next manual check

## Tests and fixtures

Add tests and fixtures.

Minimum test coverage:

- fixture ticker list
- fixture OHLCV CSV
- fixture fundamentals CSV
- at least three synthetic chart cases if real images are unavailable
- data-quality classification
- ranking labels
- report generation

Run the tests. If a test cannot run, explain exactly why.

## IBKR handling

If IBKR environment variables exist, detect them without printing secrets.

Do not connect unless an explicit read-only flag is set.

If tradability is checked, return tradability status only. Never alter account settings. Never submit an order.

## Final answer format

End with:

1. What changed.
2. Commands run.
3. Files created or updated.
4. Ranked table.
5. Provider coverage.
6. Missing data.
7. Tests and evidence.
8. Remaining risks.
9. The next command to run with real data.

Be strict. Be useful. Say `UNKNOWN` when the data is not there.
