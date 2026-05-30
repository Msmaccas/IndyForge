#!/usr/bin/env bash
set -euo pipefail

echo "Current folder:"
pwd
echo

if [ "$PWD" = "$HOME" ] || [ "$PWD" = "/" ] || [ "${PWD:-}" = "/Users/${USER:-}" ]; then
  echo "STOP: You are not inside a disposable repo."
  exit 1
fi

if [ "${AGENT_YOLO_ISOLATED_RUNNER:-}" != "YES" ]; then
  echo "STOP: true YOLO mode requires an isolated runner."
  echo
  echo "Only continue inside a disposable Codespace, VM, VPS snapshot, or throwaway container."
  echo "Then run:"
  echo "  export AGENT_YOLO_ISOLATED_RUNNER=YES"
  echo "  ./start-codex-yolo.sh"
  exit 1
fi

if ! command -v codex >/dev/null 2>&1; then
  echo "STOP: codex command not found."
  echo
  echo "Install Codex CLI first, then run this script again."
  echo "Check the official Codex CLI install instructions for the current package name."
  exit 127
fi

echo "Starting Codex in TRUE YOLO mode."
echo "This should only be used in an isolated disposable runner."
echo

codex --yolo --search
