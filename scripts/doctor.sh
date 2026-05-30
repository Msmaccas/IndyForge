#!/usr/bin/env bash
set -u

failures=0

check_file() {
  if [ -f "$1" ]; then
    echo "OK: $1"
  else
    echo "MISSING: $1"
    failures=$((failures + 1))
  fi
}

check_dir_or_ignored() {
  if [ -d "$1" ]; then
    echo "OK: $1/ exists"
  else
    echo "INFO: $1/ does not exist yet. Run ./scripts/bootstrap-agent-lab.sh"
  fi
}

echo "Agent YOLO Lab doctor check"
echo "Repo folder: $(pwd)"
echo

check_file "README.md"
check_file "AGENTS.md"
check_file ".gitignore"
check_file "start-codex-safe.sh"
check_file "start-codex-yolo.sh"
check_file "run-canslim-yolo.sh"
check_file "prompts/canslim-global-yolo.md"
check_file "scripts/bootstrap-agent-lab.sh"

echo
check_dir_or_ignored "data"
check_dir_or_ignored "reports"
check_dir_or_ignored "screenshots"
check_dir_or_ignored "fixtures"
check_dir_or_ignored "evals"
check_dir_or_ignored "traces"
check_dir_or_ignored "browser-profile"
check_dir_or_ignored "secrets"

echo
if command -v codex >/dev/null 2>&1; then
  echo "OK: codex is installed: $(codex --version 2>/dev/null || echo version check failed)"
else
  echo "MISSING: codex command not found. Install Codex CLI before running Codex scripts."
fi

echo
if git check-ignore -q .env data/example.csv screenshots/example.png reports/example.md secrets/example.key browser-profile/profile 2>/dev/null; then
  echo "OK: sensitive/local paths are ignored by git."
else
  echo "WARNING: one or more sensitive/local paths may not be ignored by git."
  failures=$((failures + 1))
fi

echo
if [ "$failures" -eq 0 ]; then
  echo "Doctor result: PASS for repo structure."
  exit 0
else
  echo "Doctor result: ATTENTION NEEDED. Failures: $failures"
  exit 1
fi
