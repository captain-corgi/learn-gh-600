# Walkthrough: Agentic Workflow Demo

Step-by-step guide through 3 demo scenarios of increasing complexity.

## Overview

You will learn:
- How to trigger a Copilot custom agent from a GitHub Issue
- How CI, Claude Code, and Crush automatically review PRs
- How multi-agent review catches bugs a single reviewer might miss

---

## Scenario 1: Trivial Feature (Health Endpoint)

**Goal:** Watch the full PR lifecycle with a simple feature.

### Steps

1. **Create an issue:**
   ```bash
   gh issue create \
     --title "Add /health endpoint" \
     --body "Add a GET /health endpoint that returns {status: ok}" \
     --label "agent-task"
   ```

2. **Observe:** The `issue-to-pr.yml` workflow triggers, assigns the Copilot agent.

3. **Watch:** Copilot reads the issue, plans, implements, tests, opens a PR.

4. **Review the PR:**
   - CI runs: `go vet`, `go test -race`, `go build`
   - Claude posts a code review comment
   - Crush posts a code review comment

5. **Merge:** Review agent suggestions, approve and merge.

### What you learned
- Basic issue → PR lifecycle with 3 agent harnesses
- Each harness plays a different role (implement, review, review)

---

## Scenario 2: Moderate Feature (Request-ID Middleware)

**Goal:** See how agents handle multi-file changes.

### Steps

1. **Create an issue:**
   ```bash
   gh issue create \
     --title "Add X-Request-ID middleware" \
     --body "Add middleware that injects X-Request-ID header on all requests. If client sends one, preserve it." \
     --label "agent-task"
   ```

2. **Observe:** Copilot needs to modify both `middleware/` and `main.go`.

3. **Review:** Check if Claude and Crush catch:
   - Missing test coverage for the new middleware
   - Whether UUID generation is cryptographically secure
   - Header preservation logic

### What you learned
- Agents handle multi-file scoped changes
- Reviewers may flag different aspects of the same change

---

## Scenario 3: Failure Scenario (Buggy Counter)

**Goal:** See how review agents catch an intentional bug.

### Background
The `buggy-counter` handler uses a plain `int++` instead of `atomic.Add` — a data race.

### Steps

1. **Create a PR that touches the buggy handler:**
   ```bash
   gh issue create \
     --title "Fix /buggy-counter race condition" \
     --body "The /buggy-counter endpoint has a data race. Fix it by using atomic operations." \
     --label "agent-task"
   ```

2. **Watch both Claude AND Crush flag the race condition.**

3. **Expected review comments:**
   - "CRITICAL: data race on `h.count++` — use `sync/atomic` or mutex"
   - Both agents should independently identify the same issue

4. **Fix:** Replace `h.count++` with `atomic.AddInt64(&h.count, 1)`

5. **Re-push:** Watch CI pass with `-race` flag.

### What you learned
- Multi-agent review provides redundancy
- Same bug, two independent perspectives
- CI with `-race` flag catches data races automatically

---

## Key Corrections from Scaffold

This demo corrects 3 common errors found in learning materials:

| Error | Correction |
|-------|-----------|
| Copilot agents as `.yml` files | Must be `.md` with YAML frontmatter |
| Tools: `github`, `filesystem`, `shell-readonly` | Actual tools: `read`, `edit`, `search`, `execute` |
| `gh agent-task create` CLI command | Use REST API: `POST /agents/repos/{owner}/{repo}/tasks` |

---
*Last updated: 2026-05-30*
