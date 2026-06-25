#!/usr/bin/env bash
set -euo pipefail

# run-scenario.sh — Print instructions for a specific demo scenario.

SCENARIO=${1:?"Usage: run-scenario.sh <1|2|3>"}

case $SCENARIO in
  1)
    echo "=== Scenario 1: Trivial Feature (Health Endpoint) ==="
    echo "1. Create issue: gh issue create --title 'Add /health endpoint' --label 'agent-task'"
    echo "2. Watch Copilot implement → CI run → Claude review → Crush review"
    echo "3. Review and merge the PR"
    echo ""
    echo "Learning: basic issue → PR lifecycle with all 3 harnesses"
    ;;
  2)
    echo "=== Scenario 2: Moderate Feature (Request-ID Middleware) ==="
    echo "1. Create issue: gh issue create --title 'Add X-Request-ID middleware' --label 'agent-task'"
    echo "2. Watch Copilot handle multi-file changes (middleware/ + main.go)"
    echo "3. Check if Claude and Crush catch missing test coverage"
    echo ""
    echo "Learning: agents handle multi-file scoped changes"
    ;;
  3)
    echo "=== Scenario 3: Failure Scenario (Buggy Counter) ==="
    echo "1. Create issue: gh issue create --title 'Fix /buggy-counter race condition' --label 'agent-task'"
    echo "2. Watch BOTH Claude AND Crush flag the data race independently"
    echo "3. Expected: 'CRITICAL: data race on h.count++'"
    echo "4. Fix: replace h.count++ with atomic.AddInt64(&h.count, 1)"
    echo ""
    echo "Learning: multi-agent review catches bugs through independent perspectives"
    ;;
  *)
    echo "Unknown scenario: $SCENARIO"
    echo "Usage: run-scenario.sh <1|2|3>"
    exit 1
    ;;
esac

echo ""
echo "See docs/walkthrough.md for full step-by-step instructions."
