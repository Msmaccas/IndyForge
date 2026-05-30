#!/usr/bin/env bash
set -euo pipefail

echo "Current folder:"
pwd
echo

if [ "$PWD" = "$HOME" ] || [ "$PWD" = "/" ] || [ "${PWD:-}" = "/Users/${USER:-}" ]; then
  echo "STOP: You are not inside a disposable repo."
  exit 1
fi

if ! command -v codex >/dev/null 2>&1; then
  echo "STOP: codex command not found."
  echo
  echo "Install Codex CLI first, then run this script again."
  echo "Check the official Codex CLI install instructions for the current package name."
  exit 127
fi

echo "Starting Codex in safer high-power mode..."
echo "Mode: workspace-write + approval on request + search"
echo

codex --sandbox workspace-write --ask-for-approval on-request --search
