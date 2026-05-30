#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

PROMPT_FILE="prompts/canslim-global-yolo.md"

if [ ! -f "$PROMPT_FILE" ]; then
  echo "Missing $PROMPT_FILE"
  exit 1
fi

if ! command -v codex >/dev/null 2>&1; then
  echo "Missing codex command. Install Codex CLI first, then open a new terminal."
  exit 127
fi

if [ "${AGENT_YOLO_ISOLATED_RUNNER:-}" != "YES" ]; then
  echo "STOP: CAN SLIM YOLO mode requires an isolated runner."
  echo
  echo "Use only inside a disposable Codespace, VM, VPS snapshot, or throwaway container."
  echo "Then run:"
  echo "  export AGENT_YOLO_ISOLATED_RUNNER=YES"
  echo "  ./run-canslim-yolo.sh"
  exit 1
fi

export ENABLE_LIVE_TRADING=false

mkdir -p data/tickers data/ohlcv data/fundamentals data/tradability screenshots reports/symbols fixtures evals traces

PROMPT="$(cat "$PROMPT_FILE")"

echo "Running CAN SLIM global research agent in YOLO mode."
echo "Workspace: $(pwd)"
echo "Live trading: ${ENABLE_LIVE_TRADING}"
echo "Prompt file: ${PROMPT_FILE}"
echo

if [ -t 0 ]; then
  echo "Starting interactive Codex TUI."
  echo "Fix applied: prompt is passed as an argument, not piped through stdin."
  echo
  exec codex --yolo --search "$PROMPT"
else
  echo "No interactive terminal detected. Starting headless Codex exec."
  echo "Note: headless exec mode does not use the interactive --search flag."
  echo
  exec codex exec --yolo "$PROMPT"
fi
