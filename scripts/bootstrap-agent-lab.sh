#!/usr/bin/env bash
set -euo pipefail

mkdir -p skills fixtures evals reports traces screenshots downloads browser-profile secrets

echo "Agent lab folders are ready."
echo "Current folder: $(pwd)"

echo
echo "Folder check:"
ls -la
