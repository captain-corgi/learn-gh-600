#!/usr/bin/env bash
set -euo pipefail

# setup-demo.sh — Create 3 sample GitHub Issues for the agentic workflow demo.
# Requires: gh CLI authenticated and connected to the repo.

command -v gh >/dev/null 2>&1 || { echo "Install gh CLI first: https://cli.github.com/"; exit 1; }

echo "Creating demo issues..."

gh issue create \
  --title "Add /health endpoint" \
  --body "Add a GET /health endpoint that returns \`{status: ok}\` with Content-Type application/json. Include tests." \
  --label "agent-task" || echo "Issue 1 may already exist, skipping."

gh issue create \
  --title "Add X-Request-ID middleware" \
  --body "Add middleware that injects X-Request-ID header on all requests. If client sends one, preserve it. Generate random ID via crypto/rand. Include tests." \
  --label "agent-task" || echo "Issue 2 may already exist, skipping."

gh issue create \
  --title "Fix /buggy-counter race condition" \
  --body "The /buggy-counter endpoint has a data race (plain int++ instead of atomic). Fix it by using sync/atomic. The review agents should catch this. Include a test that verifies the fix." \
  --label "agent-task" || echo "Issue 3 may already exist, skipping."

echo ""
echo "3 issues created with label 'agent-task'."
echo "Watch the Copilot agent pick them up via issue-to-pr.yml workflow."
echo "See docs/walkthrough.md for detailed instructions."
