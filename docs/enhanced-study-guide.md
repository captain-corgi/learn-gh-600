# GH-600 Enhanced Study Guide: Developing in Agentic AI Systems

> **Exam:** GH-600 -- GitHub Certified: Agentic AI Developer (Beta)
> **Last Updated:** May 2026
> **Purpose:** This guide goes *beyond* the existing labs (0-7) with deep-dive conceptual frameworks, anti-pattern identification, decision trees, cross-domain synthesis, and exam strategy. Use alongside the hands-on labs, not as a replacement.

---

## Table of Contents

1. [Exam Overview](#1-exam-overview)
2. [Domain 1 Deep Dive: Agent Architecture & SDLC](#2-domain-1-deep-dive-agent-architecture--sdlc-1520)
3. [Domain 2 Deep Dive: Tool Use & Environment](#3-domain-2-deep-dive-tool-use--environment-2025)
4. [Domain 3 Deep Dive: Memory & State](#4-domain-3-deep-dive-memory--state-1015)
5. [Domain 4 Deep Dive: Evaluation & Tuning](#5-domain-4-deep-dive-evaluation--tuning-1520)
6. [Domain 5 Deep Dive: Multi-Agent Coordination](#6-domain-5-deep-dive-multi-agent-coordination-1520)
7. [Domain 6 Deep Dive: Guardrails & Accountability](#7-domain-6-deep-dive-guardrails--accountability-1015)
8. [Cross-Domain Patterns](#8-cross-domain-patterns)
9. [Exam Strategy](#9-exam-strategy)
10. [Glossary](#10-glossary)

---

## 1. Exam Overview

### Format

| Attribute | Detail |
|---|---|
| **Exam code** | GH-600 |
| **Name** | Developing in Agentic AI Systems |
| **Provider** | Microsoft (delivered via Pearson VUE), maintained by GitHub |
| **Status** | Beta (scores released ~8 weeks after beta closes) |
| **Questions** | 40-60 questions |
| **Duration** | 120 minutes |
| **Passing score** | 700 / 1000 |
| **Question types** | Multiple choice, multi-select, drag-and-drop, case studies, artifact reading (YAML, JSON, logs, audit events) |
| **Languages** | English (additional 30 min available for non-English locales) |

### Domain Weights

| # | Domain | Weight | Priority |
|---|---|---|---|
| 1 | Prepare agent architecture and SDLC processes | 15-20% | High |
| 2 | Implement tool use and environment interaction | **20-25%** | **Highest** |
| 3 | Manage memory, state, and execution | 10-15% | Medium |
| 4 | Perform evaluation, error analysis, and tuning | 15-20% | High |
| 5 | Orchestrate multi-agent coordination | 15-20% | High |
| 6 | Implement guardrails and accountability | 10-15% | Medium |

### Scoring Strategy

- **700/1000** to pass (roughly 70% but questions are weighted differently).
- Beta scoring is delayed -- you will not see results immediately.
- Case-study blocks may contain 4-8 related questions tied to a single scenario with YAML/JSON/log artifacts.
- Partial credit may apply on multi-select questions: select all that apply, but wrong selections reduce score.

### Registration Tips

- Use a **personal MSA account** (not organizational AAD) to avoid losing records if you leave your org.
- Register via Pearson VUE through the Microsoft Learn certification page.

---

## 2. Domain 1 Deep Dive: Agent Architecture & SDLC (15-20%)

### Key Concepts & Definitions

| Term | Definition |
|---|---|
| **Agent** | An AI system that autonomously performs multi-step tasks using tools, within scoped permissions, producing inspectable artifacts. |
| **SDLC integration** | Embedding agent workflows into standard software delivery: issue, branch, commit, PR, checks, review, merge. |
| **Planning phase** | Agent produces a structured, reviewable plan *before* making state changes. Reviewable intent. |
| **Execution phase** | Agent modifies repository state (files, branches, PRs). Changes state. |
| **Inspectable artifact** | Any durable, reviewable output: plans, diffs, logs, PRs, comments, workflow artifacts, check runs. |
| **Autonomy level** | The degree of independence an agent has, bounded by tool access and human approval gates. |
| **Anti-pattern** | A common approach that *sounds* correct but violates exam principles (e.g., "tell the agent to be careful" as a control). |

### Planning vs. Execution Separation Patterns

The exam expects you to understand *why* planning must be distinct from execution and *how* to enforce it.

```
PLANNING PHASE                    EXECUTION PHASE
+-------------------+             +-------------------+
| Agent reads issue |             | Agent edits files |
| Agent inspects    |   APPROVE   | Agent runs tests  |
| codebase          |----------->| Agent commits     |
| Agent writes plan |   (human    | Agent opens PR    |
| Plan posted as    |    or       | Checks run        |
| PR comment/file   |   policy)   | Review required   |
+-------------------+             +-------------------+
```

**Enforcement mechanisms:**

| Mechanism | How it enforces |
|---|---|
| Label gate (`plan-approved`) | Agent stops after planning; human applies label to proceed |
| `tools` restriction in planning agent | Planning agent gets `read` + `search` only; execution agent gets `edit` + `execute` |
| Separate custom agents | One agent plans (`.github/agents/planner.agent.md`), another executes (`.github/agents/implementer.agent.md`) |
| Instructions | `copilot-instructions.md` says: "Produce a structured plan. Stop. Wait for approval." |
| Branch rulesets | Require plan artifact in PR before allowing further commits |

**Planning-first is mandatory for:**
- Large refactors spanning many files
- Security-sensitive changes (auth, crypto, secrets)
- Workflow/deployment modifications
- Cross-repository changes
- Multi-agent coordination scenarios
- Any task where human approval of scope is required before edits

### Agent Inputs / Outputs / Success Criteria Templates

**Inputs:**

| Input Source | Example |
|---|---|
| GitHub Issue | Title, body, labels, assignee |
| PR comment | `@copilot fix the failing test` |
| Workflow log | Failed job output |
| Sentry/Jira (via MCP) | Error details, ticket context |
| Failing test output | `go test ./...` exit code + stderr |
| Prompt file | `.github/prompts/*.prompt.md` |

**Outputs (Inspectable Artifacts):**

| Artifact | Storage Location | Audit Quality |
|---|---|---|
| Structured plan | PR comment, `plan.md`, workflow artifact | High |
| Code changes | Branch + PR diff | High |
| Test results | Check run, workflow artifact | High |
| Session log | `~/.copilot/session-state/` or cloud agent session | Medium |
| Review findings | PR review comments | High |
| Audit log events | Enterprise/org audit log | High |

**Success criteria template:**

```markdown
Goal: [Specific, measurable outcome]

Scope:
- [Explicit in-scope boundaries]
- [Explicit out-of-scope boundaries]

Success criteria:
- [Test command] passes
- [Scan] reports no new findings
- [Reviewer] approves
- [Artifact] is produced at [path]

Controls:
- Required checks: [list]
- Required review: [who]
- Forbidden actions: [list]
```

### Inspectable Artifacts Taxonomy

```
Inspectable Artifacts
+-- Repository-level
|   +-- Branches (agent/*, copilot/*)
|   +-- Commits (with co-author attribution)
|   +-- Pull Requests (diff, comments, timeline)
|   +-- Issues (task definition, labels)
+-- CI/CD-level
|   +-- Check runs (test results, scan results)
|   +-- Workflow logs (command output)
|   +-- Workflow artifacts (uploaded files)
|   +-- $GITHUB_STEP_SUMMARY
+-- Agent-level
|   +-- Session logs (tool calls, decisions)
|   +-- Plan files (structured intent)
|   +-- Result files (outcome summary)
+-- Enterprise-level
    +-- Audit log events (admin actions, artifact.destroy)
    +-- Copilot usage metrics
```

### Human Intervention Escalation Patterns

| Escalation Type | Trigger | Response |
|---|---|---|
| **Plan approval** | Agent completes planning phase | Human reviews plan, applies label or approves |
| **PR review** | Agent opens PR with changes | Human reviews diff, checks, and session log |
| **Deployment gate** | Agent requests environment deployment | Required reviewers in environment settings approve |
| **Workflow approval** | Copilot pushes workflow changes | Reviewer clicks "Approve and run workflows" |
| **Blocked action** | Hook denies tool use or branch protection blocks push | Agent stops; human investigates and adjusts policy |
| **Stalled agent** | No progress on assigned task | Click "View session"; reassign; comment `@copilot` |

**Stalled agent recovery decision tree:**

```
Agent not making progress?
+-- Click "View session" on PR
|   +-- Session active but slow --> Wait
|   +-- Session ended without result --> Check session log
|       +-- Workflow approval needed --> "Approve and run workflows"
|       +-- Permission denied --> Check tool/branch scope
|       +-- Error in execution --> Fix environment/instructions
+-- No session exists
    +-- Issue-assigned --> Unassign and reassign Copilot
    +-- PR-assigned --> Comment @copilot on open PR
```

### Anti-Patterns to Avoid (Exam Traps)

> **TRAP:** "Tell the agent to be careful" -- Instructions are guidance, NOT enforceable controls.
> Correct answer: Use tool restrictions, branch protection, hooks, and required reviews.

> **TRAP:** "Let the agent approve its own output" -- An agent must never be its own reviewer.
> Correct answer: Require separate human or separate agent review.

> **TRAP:** "The agent generated a plan, so the implementation is safe" -- A plan proves intent, not safety.
> Correct answer: Validate with tests, scans, and human review of the actual diff.

> **TRAP:** "Give the agent all tools for flexibility" -- Overly broad tools violate least privilege.
> Correct answer: Grant only the minimum tools needed for the task.

> **TRAP:** "Store secrets in custom instructions" -- Instructions are visible, not encrypted.
> Correct answer: Use GitHub Secrets, Agents secrets/variables, or environment secrets.

> **TRAP:** "Use an agent for tasks with unclear success criteria" -- Agents need measurable outcomes.
> Correct answer: Define clear inputs, outputs, and validation before assigning.

### Quick Reference Table

| Concept | Key Artifact | Key File |
|---|---|---|
| Repository instructions | Markdown instructions | `.github/copilot-instructions.md` |
| Path-specific instructions | Markdown with frontmatter | `.github/instructions/*.instructions.md` |
| Agent-oriented instructions | Markdown | `AGENTS.md` |
| Custom agent profile | YAML frontmatter + markdown body | `.github/agents/*.agent.md` |
| Prompt template | Markdown | `.github/prompts/*.prompt.md` |
| Agent skill | SKILL.md | `.github/skills/<name>/SKILL.md` |
| Cloud agent setup | GitHub Actions workflow | `.github/workflows/copilot-setup-steps.yml` |
| SDLC pattern | Issue -> Branch -> PR -> Checks -> Review -> Merge | N/A |
| Planning gate | Label, PR comment, separate agent | N/A |

---

## 3. Domain 2 Deep Dive: Tool Use & Environment (20-25%)

> **This is the heaviest-weighted domain. Expect the most questions here.**

### MCP Architecture Deep Dive

**Model Context Protocol (MCP)** is the standard for connecting agents to external tools and data sources.

```
Agent (Copilot)
    |
    +-- Built-in Tools: read, search, edit, execute, agent, web, todo
    |
    +-- MCP Client
        |
        +-- MCP Server 1 (local process via stdio)
        |   +-- Tool: jira/get_issue
        |   +-- Tool: jira/search
        |
        +-- MCP Server 2 (remote HTTP)
        |   +-- Tool: context7/*
        |
        +-- MCP Server 3 (remote SSE - legacy)
            +-- Tool: cloudflare/*
```

**MCP Configuration Locations:**

| Surface | Config Key | File Location |
|---|---|---|
| Custom agent YAML | `mcp-servers` | `.github/agents/*.agent.md` |
| VS Code | `mcpServers` | `.vscode/mcp.json` |
| CLI user config | `mcpServers` | `~/.copilot/mcp-config.json` |
| Repository MCP | `mcpServers` | `.mcp.json` or `.github/mcp.json` |

> **EXAM TRAP:** `mcp-servers` (hyphenated, YAML) vs `mcpServers` (camelCase, JSON). These are NOT interchangeable -- they go in different file types.

### MCP Transport Decision Tree

```
MCP Server Configuration
|
+-- Has top-level `command` and `args`?
|   YES --> type: "local" or "stdio"
|   +-- URL appears inside `args` (e.g., npx bridge)?
|       YES --> Still "local" (subprocess wrapping remote)
|
+-- Has top-level `url`?
    YES --> type: "http" or "sse"
    +-- Options include "http"?
    |   YES --> Choose "http" (modern remote MCP)
    +-- Options do NOT include "http"?
        YES --> Choose "sse" (legacy SSE transport)

NEVER choose "stdio" or "local" for a top-level `url`.
```

| Transport | Config Shape | Required Fields | Use Case |
|---|---|---|---|
| `local` / `stdio` | `command`, `args` | `command`, `args` | Local subprocess over stdin/stdout |
| `http` | `url` | `url` | Modern remote MCP endpoint |
| `sse` | `url` | `url` | Legacy Server-Sent Events endpoint |

**Example -- Local MCP in custom agent YAML:**

```yaml
---
name: jira-triage
description: Reads Jira issue context and proposes repository changes.
tools:
  - read
  - search
  - jira/get_issue
mcp-servers:
  jira:
    type: local
    command: npx
    args:
      - -y
      - jira-mcp
    tools:
      - get_issue
    env:
      JIRA_TOKEN: ${{ secrets.COPILOT_MCP_JIRA_TOKEN }}
---
```

**Example -- Remote HTTP MCP:**

```json
{
  "mcpServers": {
    "context7": {
      "type": "http",
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "CONTEXT7_API_KEY": "$COPILOT_MCP_CONTEXT7_API_KEY"
      },
      "tools": ["*"]
    }
  }
}
```

**Example -- Local bridge wrapping a remote URL (still type: local):**

```json
{
  "mcpServers": {
    "atlassian": {
      "type": "local",
      "command": "npx",
      "args": [
        "mcp-remote@latest",
        "https://mcp.atlassian.com/v1/mcp",
        "--header",
        "Authorization: Basic $ATLASSIAN_API_KEY"
      ],
      "tools": ["*"]
    }
  }
}
```

> **EXAM TRAP:** A URL inside `args` with a `command` like `npx` is still a local transport because the MCP client launches a subprocess. The top-level key determines the type.

### Tool Selection Decision Tree

```
What does the agent need to do?
|
+-- Read file contents? --> tool: read
+-- Find code/files in repo? --> tool: search
+-- Modify or create files? --> tool: edit
+-- Run shell commands/tests? --> tool: execute
+-- Invoke another custom agent? --> tool: agent
+-- Access external service? --> MCP tool (e.g., jira/get_issue)
+-- Fetch web pages? --> tool: web (not available for cloud agent)
|
+-- Pure review/audit?
|   --> read + search ONLY (no edit, no execute)
|
+-- Code implementation?
|   --> read + search + edit + execute
|
+-- Orchestration/coordination?
    --> read + search + agent
```

### Tool Reference

| Tool | Capability | Hook `toolName` | Use When | Do NOT Use When |
|---|---|---|---|---|
| `read` | Read file contents | `view` | Agent must inspect files | Agent needs to modify files |
| `search` | Search repo files/text | `grep`, `glob` | Agent must find code/files | Agent needs web search |
| `edit` | Edit/create files | `edit`, `create` | Agent must modify files | Pure review/audit task |
| `execute` | Run shell commands | `bash`, `powershell` | Agent must run tests/scripts | Not needed for read-only work |
| `agent` | Invoke custom agent | `task` | Agent coordinates subagents | Single-agent task |
| `web` | Fetch URLs | `web_fetch` | Web content needed | Cloud agent (not supported) |
| `todo` | Task list management | N/A | Task tracking | Cloud agent (not supported) |

> **EXAM TRAP:** `search` = repository file search, NOT internet search. Do not confuse with `web`.
> **EXAM TRAP:** `tools: ["*"]` or omitting `tools` may enable ALL available tools -- violates least privilege.
> **EXAM TRAP:** `tools: []` explicitly DISABLES all tools.

### Permission Scoping Patterns

**Three levels of scope:**

| Scope | Mechanism | Example |
|---|---|---|
| **Repository** | Custom agent file location, `contents:read` | `.github/agents/reviewer.agent.md` in target repo |
| **Branch** | Branch patterns, rulesets | Agent works only on `agent/feature/*` branches |
| **Environment** | GitHub environments, runner labels | Agent deploys only to `staging` environment |

**Fine-grained permission layers:**

```
Permissions (most restrictive wins)
+-- Enterprise policies (broadest, org owners can restrict further)
|   +-- Organization policies
|       +-- Repository settings
|           +-- Workflow permissions (GITHUB_TOKEN)
|               +-- Agent tool lists (custom agent YAML)
|                   +-- MCP allowlists (server-level)
|                       +-- Firewall allowlists (network-level)
```

### Error Handling Patterns

| Pattern | When to Use | Example |
|---|---|---|
| **Retry** | Transient failures (network, rate limit) | Agent retries `npm install` up to 3 times |
| **Policy failure** | Permission denied, tool blocked | Agent stops and reports; human adjusts policy |
| **Rollback** | Agent made incorrect changes | Revert PR, restore artifact, `git revert` |
| **Escalation** | Agent cannot resolve autonomously | Post PR comment for human review, stop session |
| **Traceability** | Every action must be auditable | Session logs, audit log events, co-author attribution |

**Error handling decision tree:**

```
Agent encounters error
|
+-- Is it transient (network, timeout)?
|   YES --> Retry (with backoff, max 3 attempts)
|
+-- Is it a permission/policy denial?
|   YES --> Do NOT retry; report and escalate
|   +-- Hook returned "deny"? --> Stop, log, escalate
|   +-- Branch protection blocked? --> Open PR instead
|
+-- Is it a tool failure (wrong output)?
|   YES --> Re-read context, adjust approach
|   +-- Still failing? --> Escalate to human
|
+-- Is it environment failure (missing deps)?
    YES --> Fix setup steps, fix secrets, fix runner
```

### CI Invocation Patterns

**Pattern 1: Programmatic CLI invocation**

```yaml
name: Copilot report
on:
  workflow_dispatch:

permissions:
  contents: read

jobs:
  report:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v4
      - run: npm install -g @github/copilot
      - name: Run Copilot CLI
        env:
          COPILOT_GITHUB_TOKEN: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
        run: |
          copilot -p "Summarize the current branch in summary.md" \
            --allow-tool='read,search,edit,shell(git:*)' \
            --no-ask-user
          cat summary.md >> "$GITHUB_STEP_SUMMARY"
```

**Pattern 2: workflow_dispatch with inputs**

```yaml
on:
  workflow_dispatch:
    inputs:
      task:
        required: true
        type: string
```

**Pattern 3: PR event trigger**

```yaml
on:
  pull_request:
    types: [opened, synchronize]
```

**Key CLI flags for CI:**

| Flag | Purpose |
|---|---|
| `copilot -p "..."` | Non-interactive prompt mode |
| `--agent=NAME` | Use specific custom agent |
| `--allow-tool=PATTERN` | Allow specific tool patterns |
| `--deny-tool=PATTERN` | Deny specific tool patterns |
| `--no-ask-user` | **Critical for CI** -- prevents interactive hangs |
| `--output-format=json` | Machine-readable output |
| `--resume=ID` | Resume a specific session |
| `--continue` | Continue latest session |

### Agent YAML Configuration Reference

**Complete frontmatter reference:**

```yaml
---
# Required fields
description: "Required: purpose and capability description"

# Optional fields
name: "Display name for the agent"
model: "Model choice where supported"
target: "Surface: github-copilot, vscode"

# Tool configuration
tools:
  - read
  - search
  - edit
  - execute
  - agent

# MCP configuration (YAML key: mcp-servers)
mcp-servers:
  server-name:
    type: local  # or http, sse
    command: npx
    args: ["-y", "some-mcp"]
    tools: ["tool_name"]
    env:
      API_KEY: ${{ secrets.COPILOT_MCP_API_KEY }}

# Behavior flags
disable-model-invocation: false
user-invocable: true

# Metadata
metadata:
  version: "1.0"
  owner: "platform-team"
---
```

> **EXAM TRAP:** `description` is REQUIRED. `name` is optional. Questions may test whether you know which field is mandatory.

### Security: Allow Lists, Firewall, Fine-Grained Tokens

| Security Layer | What It Controls | Configuration |
|---|---|---|
| **MCP allowlist** | Which MCP servers agents can use | Org/enterprise policy: "Registry only" vs "Allow all" |
| **Firewall allowlist** | Network egress from agent environment | Agent firewall configuration |
| **Fine-grained tokens** | Repository/permission scope of agent's GitHub access | GitHub App or fine-grained PAT |
| **Agents secrets** | Secrets available to Copilot cloud agent | Must start with `COPILOT_MCP_` prefix |
| **Actions secrets** | Standard GitHub Actions secrets (NOT directly accessible to cloud agent) | Repository/org settings |
| **CODEOWNERS** | Who must review changes to specific files | `CODEOWNERS` file + ruleset requiring code owner review |

> **EXAM TRAP:** Firewall allowlist and MCP allowlist solve DIFFERENT problems. Firewall = network egress. MCP allowlist = which MCP servers are approved.
> **EXAM TRAP:** Copilot cloud agent secrets must start with `COPILOT_MCP_`. Standard Actions secrets are NOT automatically available to the cloud agent.
> **EXAM TRAP:** Copilot cloud agent does NOT currently support remote MCP servers relying on OAuth authorization.

### Customization File Inventory

| Path | Purpose |
|---|---|
| `.github/copilot-instructions.md` | Repository-wide instructions |
| `.github/instructions/*.instructions.md` | Path-specific instructions (with `applyTo` frontmatter) |
| `AGENTS.md` | Agent-oriented instructions; nearest file takes precedence |
| `.github/prompts/*.prompt.md` | Reusable prompt templates |
| `.github/agents/*.md` or `*.agent.md` | Custom agent profiles |
| `.github/skills/<name>/SKILL.md` | Agent skills |
| `.github/hooks/*.json` | CLI/cloud agent hooks |
| `.github/workflows/copilot-setup-steps.yml` | Cloud agent environment setup |
| `.mcp.json` / `.github/mcp.json` | Repository MCP config |
| `.vscode/mcp.json` | VS Code MCP config |
| `~/.copilot/mcp-config.json` | CLI user MCP config |

### Slash Commands Reference

| Command | Purpose |
|---|---|
| `/plan` | Plan first, do not execute |
| `/review` | Review current changes |
| `/pr` | Pull request workflow |
| `/mcp` | Inspect/configure MCP servers |
| `/agent` | Select/manage custom agents |
| `/session` | Inspect current session |
| `/ide` | Inspect/switch IDE connection |
| `/delegate` | Hand off task to cloud agent (background) |
| `/fleet` | Decompose work into parallel subagents |

---

## 4. Domain 3 Deep Dive: Memory & State (10-15%)

### Memory Type Taxonomy

| Type | Scope | Persistence | Use For | Exam Note |
|---|---|---|---|---|
| **Short-term context** | Current prompt/session | Ephemeral (lost when session ends) | Immediate task context | Not durable; cannot survive disconnect |
| **Copilot Memory** | Repository or user level | Persistent (stored by Copilot) | Repo conventions, user preferences | Must validate against current branch; can go stale |
| **Session state** | Per-session ID | Persistent until deleted | Resume agent work across disconnects | `~/.copilot/session-state/<id>/events.jsonl` |
| **External durable state** | Repository/org/enterprise | Persistent (GitHub-native) | Auditable artifacts, plans, results | PRs, issues, artifacts, commits, check runs, audit logs |

**Decision framework:**

```
What needs to persist?
|
+-- Must be auditable?
|   YES --> External durable state (PR, artifact, commit, audit log)
|
+-- Must survive across sessions?
|   YES --> Session state (sessionId for resume) or Copilot Memory
|
+-- Is it a repo convention?
|   YES --> Copilot Memory (repository facts) or instructions
|
+-- Only needed for current task?
    YES --> Short-term context (ephemeral)
```

### Session State Architecture

```
~/.copilot/
+-- agents/              # User custom agents
+-- config.json          # Account/auth metadata
+-- ide/                 # IDE connection state
+-- logs/                # Process logs
|   +-- process-{timestamp}-{pid}.log
+-- mcp-config.json      # User MCP config
+-- session-state/       # Per-session state
|   +-- <session-id>/
|       +-- events.jsonl # Session event log
+-- session-store.db     # Indexed session database
+-- settings.json        # User settings
```

**Environment overrides:**

| Variable | Overrides |
|---|---|
| `COPILOT_HOME` | Config/state root directory |
| `COPILOT_CACHE_HOME` | Cache location |

**Session identification in logs:**

```
# New session
session.id=run-101
resume=false

# Resumed session
session.id=run-101
loaded ~/.copilot/session-state/run-101/events.jsonl
resume=true

# IDE attached
ide=Visual Studio Code connected

# MCP loaded
mcp loaded ~/.copilot/mcp-config.json servers=[github,jira]

# MCP disabled
argv=["copilot","--disable-builtin-mcps","-p","review"]
```

### Drift Detection Patterns

**Drift** occurs when agent assumptions diverge from current reality.

| Drift Cause | Detection Signal | Fix |
|---|---|---|
| Stale Copilot Memory | Agent uses outdated conventions | Verify memory against current branch; update |
| Old instructions | Agent follows deleted rules | Review and update `.github/copilot-instructions.md` |
| Repository changed | Agent's cached file contents differ from HEAD | Re-read files before editing |
| Multiple agents edited same files | Merge conflicts, overwritten changes | Branch isolation, concurrency groups |
| Wrong session resumed | Agent continues from stale context | Check session ID matches current task |
| Missing handoff artifact | Next agent lacks prior agent's context | Store handoff in PR comment or workflow artifact |

**Drift detection checklist:**
1. Re-read target files before editing
2. Check current branch/ref matches expected
3. Store handoff notes in PR/artifact (not just chat memory)
4. Verify Copilot Memory facts against current codebase
5. Re-run tests/scans to validate assumptions
6. Use branch isolation and concurrency for multi-agent work

### Pruning and Expiration Strategies

| Strategy | Application | Example |
|---|---|---|
| **Memory pruning** | Remove outdated Copilot Memory entries | Delete stale repo conventions that no longer apply |
| **Session cleanup** | Delete completed session state | `deleteSession()` removes session data permanently |
| **Artifact retention** | Set `retention-days` on workflow artifacts | `retention-days: 7` in `upload-artifact` |
| **Instruction versioning** | Update instructions when conventions change | Keep instructions in git; review on branch |
| **Context window management** | Limit what agent reads | Use path-specific instructions; scope search queries |

### Multi-Tool State Sharing Risks

| Risk | Example | Mitigation |
|---|---|---|
| **State not persisted** | Agent reads context in CLI, expects it in cloud agent | Use durable artifacts for cross-surface handoff |
| **Conflicting memory** | Different users have contradictory Copilot Memories | Repository facts should be verified; user prefs are personal |
| **Secret leakage** | Agent stores secret in session state or comment | Never put secrets in memory, prompts, instructions, or comments |
| **Stale handoff** | Agent A writes plan, Agent B reads outdated version | Use immutable artifacts with version identifiers |
| **Cross-environment mismatch** | CLI has MCP tools that cloud agent lacks | Document MCP requirements in agent YAML |

> **EXAM TRAP:** Copilot Memory is NOT secret storage. Never store credentials, tokens, or sensitive data in memory.
> **EXAM TRAP:** Session persistence (resume) is NOT the same as Copilot Memory (long-term facts). They serve different purposes.
> **EXAM TRAP:** PR comments/artifacts are better handoff mechanisms than hidden session context when humans or other agents need the information.

### State Storage Decision Table

| Need | Store In | Why |
|---|---|---|
| Continue same CLI/SDK session | Session ID + `session-state/` | Enables `--resume` / `resumeSession()` |
| Share plan between workflow jobs | Workflow artifact or `$GITHUB_OUTPUT` | Durable, downloadable by next job |
| Preserve review decision | PR comment/review | Visible, auditable, tied to PR timeline |
| Preserve long-term repo convention | Instructions or Copilot Memory | Persists across sessions and users |
| Preserve audit trail | PR + session log + workflow log + audit log | Multiple evidence sources |
| Store secret | GitHub Secrets or Agents secrets | Encrypted, access-controlled |

---

## 5. Domain 4 Deep Dive: Evaluation & Tuning (15-20%)

### Quantitative vs. Qualitative Signals

| Signal Type | Signal | What It Proves | Source |
|---|---|---|---|
| **Quantitative** | Test pass/fail rate | Behavior correctness | CI check runs |
| **Quantitative** | Lint/type error count | Code quality | CI lint step |
| **Quantitative** | CodeQL alert count | Vulnerability detection | Code scanning |
| **Quantitative** | Secret scanning hits | Leaked secret detection | Secret scanning |
| **Quantitative** | Dependency vulnerabilities | Supply chain risk | Dependency review |
| **Quantitative** | Coverage percentage | Test completeness | Coverage tools |
| **Qualitative** | PR review comments | Human judgment on quality | PR timeline |
| **Qualitative** | Session log narrative | Agent decision-making rationale | Session logs |
| **Qualitative** | Plan coherence | Whether plan addresses requirements | Plan artifacts |
| **Qualitative** | Style convention adherence | Alignment with repo standards | Code review |
| **Qualitative** | Handoff artifact completeness | Multi-agent context quality | Review/audit artifacts |

### Failure Classification System

```
Agent Failure
|
+-- Reasoning Error
|   +-- Agent misunderstood the task
|   +-- Agent applied wrong logic/pattern
|   +-- Agent hallucinated nonexistent APIs or files
|   Fix: Revise instructions, improve task description
|
+-- Tool Misuse
|   +-- Agent used wrong tool for the job
|   +-- Agent had too broad tool access
|   +-- Agent ran destructive command
|   Fix: Narrow tool list, add hooks, restrict permissions
|
+-- Context/Environment Issue
|   +-- Agent lacks necessary context
|   +-- Stale memory or instructions
|   +-- Missing dependencies in setup
|   +-- Wrong runner/toolchain
|   Fix: Update setup steps, fix secrets, update instructions/memory
```

**Root Cause Table:**

| Symptom | Likely Root Cause | Fix |
|---|---|---|
| Agent edits wrong files | Scope/tools too broad | Narrow tools, add path-specific instructions |
| Agent cannot install dependencies | Setup/environment missing | Fix `copilot-setup-steps.yml`, package auth, runner |
| Agent cannot reach external service | MCP/secret/firewall issue | Check MCP config, secret name (`COPILOT_MCP_` prefix), firewall |
| Agent repeats work | Missing durable state | Add session persistence or artifacts |
| Agent asks questions in CI | Interactive prompt | Add `--no-ask-user` |
| Agent uses stale style | Stale instructions/memory | Update `.github/copilot-instructions.md` or Copilot Memory |
| Agents conflict on same branch | Shared mutable state | Branch isolation, concurrency groups |
| Workflow blocked after Copilot push | Approval required | "Approve and run workflows" |
| Artifact missing | Wrong path/retention/deletion | Check `path` in upload-artifact, use `if-no-files-found: error` |
| `npm ci` fails with E401 | Package registry auth | Fix setup steps, add registry auth secret |

### Tuning Lever Descriptions

| Lever | When to Tune | What to Change |
|---|---|---|
| **Instructions** | Style/convention wrong; agent ignores local patterns | Update `.github/copilot-instructions.md`, path-specific instructions, `AGENTS.md` |
| **Tools** | Agent lacks capability or has too much access | Add/remove tools in custom agent YAML; tighten MCP tool exposure |
| **Setup/Environment** | Dependency install fails; wrong runner/toolchain; firewall blocks | Update `copilot-setup-steps.yml`; fix secrets; change runner labels |
| **Workflow** | Missing validation; missing artifacts; runs overlap | Add check steps, artifact upload/download, concurrency groups |
| **Memory/State** | Agent repeats work; uses stale facts; needs session continuity | Update Copilot Memory; add session resume; store handoff artifacts |
| **Model** | Consistently wrong reasoning (last resort) | Change `model` in agent YAML -- tune this LAST |

**Tuning priority order (exam-relevant):**

1. Check prompt/task clarity
2. Check instructions
3. Check tool scope
4. Check setup/environment
5. Check current repo state
6. Check memory/session state
7. Check model choice (LAST, unless docs explicitly point there)

### Automated Scanning Tools Reference

| Tool | What It Detects | Configuration | Required Status |
|---|---|---|---|
| **CodeQL / Code scanning** | Code vulnerabilities (SQL injection, path traversal, etc.) | `.github/workflows/codeql.yml` or GitHub-native | Can be required check |
| **Secret scanning** | Leaked secrets, tokens, keys | Enabled in repo/org settings | Push protection blocks commits |
| **Push protection** | Secrets in pushes (real-time) | Enabled alongside secret scanning | Blocks push if secret detected |
| **Dependency review** | Vulnerable dependency changes | `dependency-review-action` in PR workflow | Can be required check |
| **Dependabot** | Outdated/vulnerable dependencies | `.github/dependabot.yml` | Creates PRs automatically |
| **Linting** | Code style/quality issues | ESLint, Pylint, etc. in CI | Can be required check |
| **Type checking** | Type errors | `tsc`, `mypy`, etc. in CI | Can be required check |

### Eval Workflow Design

```
Evaluation Workflow
+-- Trigger: Agent completes task (PR opened/updated)
|
+-- Automated Checks
|   +-- Tests run (required check)
|   +-- CodeQL scan (required check)
|   +-- Secret scanning (automatic)
|   +-- Dependency review (required check)
|   +-- Lint/type check (required check)
|
+-- Artifact Collection
|   +-- Upload test results
|   +-- Upload session log
|   +-- Upload plan artifact
|
+-- Human Review
|   +-- Review PR diff
|   +-- Review session log (what agent did and why)
|   +-- Review artifacts
|   +-- CODEOWNER approval
|
+-- Decision
    +-- All checks pass + human approves --> Merge
    +-- Checks fail --> Agent revises (or human takes over)
    +-- Human rejects --> Escalate and re-tune
```

**Artifact evaluation example:**

```yaml
- uses: actions/upload-artifact@v4
  with:
    name: review-output
    path: review.md
    retention-days: 7
    if-no-files-found: error  # Fail workflow if artifact missing
```

| Input | Meaning |
|---|---|
| `name` | Artifact name (for download reference) |
| `path` | Files/directories/globs to include |
| `retention-days` | How long to keep the artifact |
| `if-no-files-found` | `warn`, `error`, or `ignore` when no files match |
| `overwrite` | Replace same-name artifact if exists |
| `include-hidden-files` | Include hidden files in upload |

**Artifact deletion audit:**

```
action=artifact.destroy actor=octocat repo=org/app created_at=2026-05-24T09:14:22Z
```

Find in organization/enterprise audit logs by filtering for `artifact.destroy`.

---

## 6. Domain 5 Deep Dive: Multi-Agent Coordination (15-20%)

### Orchestration Patterns

| Pattern | Structure | Use When | Trade-off |
|---|---|---|---|
| **Sequential pipeline** | Plan -> Implement -> Review -> Consolidate | Tasks have clear ordering dependencies | Slower but ordered |
| **Parallel workers** | Multiple agents run simultaneously on disjoint work | Work splits cleanly by area | Faster but requires merge |
| **Coordinator/worker** | One orchestrator plans and integrates; workers execute bounded tasks | Different expertise needed | Good separation of concerns |
| **Reviewer/verifier** | One agent implements, another independently checks | Quality assurance critical | Catches more issues |
| **Matrix** | Same job template runs for multiple agents/areas | Uniform analysis across dimensions | Scales well (up to 256 jobs) |
| **/fleet** | CLI decomposes prompt into parallel subagents | Quick decomposition of complex tasks | Less control over individual agents |

**Pattern selection decision tree:**

```
Multiple agents needed?
|
+-- Is the task inherently sequential?
|   YES --> Sequential pipeline (needs-based ordering)
|
+-- Can work be split into independent areas?
|   YES --> Parallel workers with separate branches
|
+-- Do agents have different specialties?
|   YES --> Coordinator/worker pattern
|
+-- Is quality verification critical?
|   YES --> Reviewer/verifier pattern (separate review agent)
|
+-- Same analysis needed across multiple dimensions?
    YES --> Matrix strategy
```

### Isolation Strategies

| Strategy | Mechanism | Example |
|---|---|---|
| **Branch isolation** | Each agent works on its own branch | `agent/test-writer/<run-id>`, `agent/doc-writer/<run-id>` |
| **Artifact isolation** | Each agent uploads to uniquely named artifacts | `${{ matrix.agent }}-output` |
| **Concurrency groups** | Prevent overlapping runs on same branch | `concurrency.group: ${{ github.workflow }}-${{ github.head_ref }}` |
| **Disjoint file ownership** | Agents edit non-overlapping file sets | Test writer: `*_test.go`; doc writer: `*.md` |
| **Needs ordering** | Jobs wait for dependencies | `needs: [review, audit]` |

### GitHub Actions Orchestration Reference

**Sequential pipeline with artifacts:**

```yaml
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - run: copilot --agent=reviewer -p "Review" --no-ask-user > review.md
      - uses: actions/upload-artifact@v4
        with:
          name: review-output
          path: review.md

  audit:
    runs-on: ubuntu-latest
    steps:
      - run: copilot --agent=auditor -p "Audit" --no-ask-user > audit.md
      - uses: actions/upload-artifact@v4
        with:
          name: audit-output
          path: audit.md

  consolidate:
    needs: [review, audit]  # Waits for both to complete
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: review-output
      - uses: actions/download-artifact@v4
        with:
          name: audit-output
      - run: |
          echo "# Consolidated" >> "$GITHUB_STEP_SUMMARY"
          cat review.md audit.md >> "$GITHUB_STEP_SUMMARY"
```

**Matrix strategy for parallel agents:**

```yaml
jobs:
  agent-check:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false  # Don't cancel other agents if one fails
      matrix:
        agent: [reviewer, auditor, linter]
    steps:
      - run: |
          copilot --agent=${{ matrix.agent }} \
            -p "Analyze as ${{ matrix.agent }}" \
            --no-ask-user > "${{ matrix.agent }}.md"
      - uses: actions/upload-artifact@v4
        with:
          name: ${{ matrix.agent }}-output
          path: ${{ matrix.agent }}.md
```

**Key facts:**
- `matrix.agent` is an array/list of agent names
- `fail-fast: false` prevents one failed job from canceling others
- Maximum 256 matrix jobs per workflow run

### Concurrency Control

**Cancel stale runs (latest result matters):**

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.head_ref || github.run_id }}
  cancel-in-progress: true
```

**Queue all runs (every result matters):**

```yaml
concurrency:
  group: production-agent-work
  queue: max
```

> **EXAM TRAP:** Do NOT combine `queue: max` with `cancel-in-progress: true`. They are mutually exclusive strategies.

| Strategy | YAML | Use When |
|---|---|---|
| Cancel-in-progress | `cancel-in-progress: true` | Latest validation result is sufficient |
| Queue | `queue: max` | Every run must complete (e.g., production deployments) |

**Concurrency key components:**
- `github.workflow` -- avoids canceling OTHER workflows
- `github.head_ref` -- groups by PR source branch
- `github.run_id` -- fallback if `head_ref` is unset

### Conflict Detection and Resolution

| Conflict Type | Detection | Resolution |
|---|---|---|
| **Overlapping code changes** | Merge conflict in PR; CI failure | Disjoint file ownership per agent; separate branches |
| **Duplicated effort** | Same file edited by multiple agents | Assign clear ownership; use `needs` for ordering |
| **Contradictory outputs** | Agents produce incompatible recommendations | Coordinator agent resolves; human reviews |
| **Shared mutable state** | Agents read/write same data without locking | Branch isolation; artifacts for handoff; concurrency groups |

**Good handoff artifacts:**

| Artifact | Storage | Advantage |
|---|---|---|
| `plan.md` | Workflow artifact | Structured, versioned |
| `review.md` | Workflow artifact | Reviewable by next agent |
| PR comment | PR timeline | Visible, auditable |
| `$GITHUB_STEP_SUMMARY` | Workflow run summary | Human-readable in GitHub |
| Issue checklist | Issue body | Trackable completion status |

**Bad handoff:**

> "The first agent told the second agent in chat." -- Chat memory is ephemeral, not auditable, and not available across sessions or agents.

### Agent Lifecycle Management

| Phase | Action | Key Considerations |
|---|---|---|
| **Add** | Create new `.github/agents/<name>.agent.md` | Does not disrupt existing agents; test in isolation first |
| **Update** | Modify existing agent YAML/instructions | Active sessions use old config; new sessions get updated config |
| **Reconfigure** | Change tools, MCP servers, or scope | Validate that changes don't break dependent workflows |
| **Replace** | New agent takes over from retired agent | Update workflow references; preserve old agent for audit |
| **Retire** | Remove agent file or disable | Ensure no active workflows depend on it; preserve audit trail |

**Retirement checklist:**
1. Confirm no active sessions reference the agent
2. Update any workflow `--agent=NAME` references
3. Archive agent YAML for audit purposes
4. Update documentation to reflect the change
5. Verify that coordinator agents no longer try to invoke the retired agent

### Post-Hoc Analysis Framework

```
Post-Incident Analysis
+-- Collect Evidence
|   +-- Session logs for each agent
|   +-- Workflow logs and artifacts
|   +-- PR timeline (comments, reviews, commits)
|   +-- Audit log events
|
+-- Analyze Behavior
|   +-- Did each agent follow its plan?
|   +-- Were handoff artifacts complete?
|   +-- Did concurrency cause conflicts?
|   +-- Were there ordering failures?
|
+-- Classify Failure
|   +-- Coordination failure (ordering, handoff)
|   +-- Individual agent failure (reasoning, tools)
|   +-- Environment failure (setup, permissions)
|
+-- Apply Fixes
    +-- Update instructions/workflows
    +-- Adjust isolation/concurrency
    +-- Add/modify hooks
    +-- Retune agent configurations
```

---

## 7. Domain 6 Deep Dive: Guardrails & Accountability (10-15%)

### Autonomy Matrix Design

| Action | Operational Risk | Security Risk | Compliance Risk | Required Gate |
|---|---|---|---|---|
| Format markdown files | Low | Low | Low | **Auto** |
| Run linting | Low | Low | Low | **Auto** |
| Open draft PR | Medium | Low | Low | **Auto with trace** |
| Edit source code | Medium | Low | Low | **Auto + required checks** |
| Run tests | Medium | Low | Low | **Auto** |
| Deploy to staging | Medium | Medium | Low | **1 reviewer** |
| Deploy to production | High | Medium | Medium | **2 reviewers** |
| Modify workflows | Medium | High | Medium | **CODEOWNER review** |
| Access secrets | High | High | Medium | **Controlled path only** |
| Delete infrastructure | High | High | High | **Hard block** |
| Push to default branch | High | High | Medium | **Hard block** |
| Merge own PR | High | High | High | **Hard block** |

**Design principles:**
- If ANY risk dimension is High, the action routes to the most restrictive gate.
- Preserve velocity by auto-approving low-risk actions.
- "Auto with trace" means the action runs but produces an auditable artifact.

### Risk Classification

| Risk Category | Examples | Primary Controls |
|---|---|---|
| **Operational** | Service downtime, incorrect deployments, broken builds | Branch protection, environment gates, rollback procedures |
| **Security** | Secret exposure, privilege escalation, code injection | Secret scanning, CodeQL, tool restrictions, hooks, least privilege |
| **Compliance** | Policy violations, unauthorized changes, missing audit trail | Required reviews, audit logs, rulesets, environment approvals |

### Control Types

| Type | Mechanism | Examples |
|---|---|---|
| **Preventive** | Block unsafe actions before they happen | Least-privilege tools, branch protection, rulesets, MCP allowlists, firewall, hooks (`deny`), required reviews |
| **Detective** | Identify issues after they happen | Session logs, workflow logs, CodeQL, secret scanning, dependency review, audit logs |
| **Corrective** | Fix issues after detection | Revert PR, stop session, unassign/reassign Copilot, rotate secrets, remove MCP server, narrow tools |

**GitHub as the control plane:**

```
GitHub Controls (Defense in Depth)
+-- Issues: Define work
+-- Branches: Isolate changes
+-- PRs: Review changes
+-- Checks: Validate changes
+-- Rulesets/branch protection: Gate merge
+-- Environments: Gate deployment
+-- Hooks: Intercept agent actions
+-- Audit logs: Record administrative/security events
+-- Session logs: Explain agent behavior
+-- Co-author attribution: Trace agent contributions
```

### Least-Privilege Implementation

**Layer 1: Tool restrictions**

```yaml
# Reviewer: read-only, cannot modify anything
tools:
  - read
  - search
```

```yaml
# Implementer: can edit and test, cannot invoke other agents
tools:
  - read
  - search
  - edit
  - execute
```

**Layer 2: MCP tool scoping**

```yaml
mcp-servers:
  jira:
    tools:
      - get_issue    # Only one tool exposed, not "*"
```

**Layer 3: Branch protection**

- No direct pushes to `main`
- Require PR
- Require CODEOWNER review
- Require CI checks
- Agent cannot merge its own PR

**Layer 4: Environment gates**

```yaml
# staging: 1 required reviewer
# production: 2 required reviewers, branch limited to main
```

**Layer 5: Workflow permissions**

```yaml
permissions:
  contents: read  # Minimum required
```

**Layer 6: Fine-grained tokens**

- Use fine-grained PATs or GitHub Apps with minimal repository access
- Scope to specific repositories
- Grant only required permissions

### Hooks Deep Dive

**Two hook families:**

| Family | Format | Config Location | Events |
|---|---|---|---|
| **SDK hooks** | Code callbacks (TypeScript) | Application code | `onPreToolUse`, `onPostToolUse` |
| **CLI/Cloud hooks** | JSON files | `.github/hooks/*.json` | `preToolUse`, `postToolUse`, etc. |

**Hook configuration format:**

```json
{
  "version": 1,
  "hooks": {
    "preToolUse": [
      {
        "type": "command",
        "matcher": "bash|powershell",
        "bash": "scripts/check-tool.sh",
        "powershell": "scripts/check-tool.ps1",
        "timeoutSec": 30,
        "env": {
          "CHECK_MODE": "strict"
        }
      }
    ]
  }
}
```

**Hook event reference (high-yield for exam):**

| Event | Fires When | Key Notes |
|---|---|---|
| `sessionStart` | New or resumed session begins | Payload has `source`: `new` or `resume` |
| `sessionEnd` | Session terminates | Useful for cleanup/audit summaries |
| `userPromptSubmitted` | User prompt submitted | Cloud agent sees only initial job prompt |
| `preToolUse` | Before tool executes | Can `allow`, `deny`, or `ask` (CLI); cloud agent treats `ask` as deny |
| `postToolUse` | After successful tool use | Can modify result or add context |
| `postToolUseFailure` | After failed tool use | Can provide recovery context |
| `agentStop` | Main agent finishes a turn | Can block and force another turn |
| `permissionRequest` | Before CLI permission flow | **CLI only**; NOT for cloud-agent permissioning |
| `subagentStart` | Subagent starts | `matcher` filters by agent name |
| `subagentStop` | Subagent completes | Can block and force another turn |
| `errorOccurred` | Agent/runtime error | Diagnostics only; cannot approve/deny |

> **EXAM TRAP:** Use `preToolUse` for cloud-agent permission decisions. Do NOT pick `permissionRequest` -- that is CLI-only.

**Hook `toolName` mapping:**

| Hook `toolName` | Agent Tool | Meaning |
|---|---|---|
| `view` | `read` | Read file contents |
| `grep` | `search` | Search file contents |
| `glob` | `search` | Find files by pattern |
| `edit` | `edit` | Modify existing files |
| `create` | `edit` | Create new files |
| `bash` | `execute` | Run Unix shell commands |
| `powershell` | `execute` | Run Windows PowerShell (NOT cloud agent) |
| `task` | `agent` | Run subagent tasks |
| `web_fetch` | `web` | Fetch web pages |
| `ask_user` | user interaction | Not useful in cloud agent |

> **EXAM TRAP:** `toolName: "view"` = file reading, NOT web browsing.
> **EXAM TRAP:** `toolName: "grep"` = repository search, NOT internet search.

**Hook `preToolUse` decisions:**

| Decision | Effect |
|---|---|
| `"allow"` | Tool executes normally |
| `"deny"` | Tool blocked; must include `permissionDecisionReason` |
| `"ask"` | Ask user in interactive CLI; **treated as deny in cloud agent** |

**Hook output format (preToolUse):**

```json
{
  "permissionDecision": "deny",
  "permissionDecisionReason": "Open a pull request instead of pushing directly."
}
```

**Cloud-agent hook constraints:**
- Runs in Linux environment (`/workspace`)
- PowerShell-only hook entries are ignored
- Only `bash` or `command` fields are used
- Cloud agent does NOT load user-level hooks (`~/.copilot/hooks/`)
- Non-interactive: `ask` decision = denial
- Hooks do NOT replace branch protection or required reviews

**SDK hook example:**

```typescript
const session = await client.createSession({
  hooks: {
    onPreToolUse: async (input) => {
      if (input.toolName === "execute" &&
          String(input.toolArgs?.command).includes("git push")) {
        return {
          permissionDecision: "deny",
          permissionDecisionReason: "Open a PR instead of pushing directly.",
        };
      }
      return { permissionDecision: "allow" };
    },
  },
});
```

### Audit Trail Requirements

**Evidence sources:**

| Source | What It Records | Where to Find It |
|---|---|---|
| **PR timeline** | All comments, reviews, commits, labels, status checks | Pull request page |
| **Session logs** | Tool calls, decisions, reasoning | Agent session view |
| **Workflow logs** | Command output, step results | Actions tab |
| **Workflow artifacts** | Files produced by runs | Actions run page |
| **Commit history** | All commits with co-author attribution | Git log |
| **Check runs** | Test results, scan results | PR checks tab |
| **Audit log events** | Administrative/security events | Enterprise/org audit log |

**Key audit events:**

| Event | Meaning |
|---|---|
| `artifact.destroy` | Workflow artifact manually deleted |
| `actor` | User/app that performed the action |
| `created_at` / `@timestamp` | When the event happened |
| `repo` / `repository` | Affected repository |
| `operation_type` | Type of audit operation |
| `user_agent` | Client used to perform the action |

### Blocked Action Response Protocol

```
Agent action is blocked
|
+-- Hook returned "deny"?
|   +-- Check hook script logic
|   +-- If intentional: agent reports failure, human reviews
|   +-- If wrong: fix hook matcher or script
|
+-- Branch protection blocked push?
|   +-- Agent should open a PR instead of pushing directly
|   +-- Configure agent to use PR-based workflow
|
+-- Workflow approval needed?
|   +-- Reviewer clicks "Approve and run workflows"
|   +-- This is an accountability gate, NOT a build error
|
+-- Permission denied?
|   +-- Check GITHUB_TOKEN permissions
|   +-- Check fine-grained token scopes
|   +-- Check environment protection rules
```

---

## 8. Cross-Domain Patterns

### How Domains Connect

```
Domain 1: Architecture        Domain 2: Tooling
(Task design, autonomy)  -->  (Tools, MCP, environment)
         |                            |
         v                            v
Domain 3: Memory & State     Domain 4: Evaluation
(Persistence, drift)      -->  (Root cause, tuning)
         |                            |
         v                            v
Domain 5: Multi-Agent         Domain 6: Guardrails
(Coordination, isolation)  --> (Controls, accountability)
```

### Cross-Domain Scenario Connections

| Scenario | Domains Involved | Key Connections |
|---|---|---|
| **Agent produces plan, waits for approval, then implements** | D1 + D2 + D6 | Planning (D1) + tool restrictions for planner (D2) + autonomy matrix (D6) |
| **Agent runs in CI with MCP and produces artifacts** | D2 + D3 + D4 | CLI invocation (D2) + session state (D3) + evaluation signals (D4) |
| **Multiple agents edit code, need conflict prevention** | D2 + D3 + D5 | Branch isolation (D2) + state sharing (D3) + concurrency (D5) |
| **Agent output fails CodeQL, root cause analysis needed** | D2 + D4 + D6 | Tool scope review (D2) + failure classification (D4) + detective controls (D6) |
| **Agent stalls, human must recover** | D3 + D5 + D6 | Session state (D3) + stalled detection (D5) + escalation patterns (D6) |
| **Agent hook blocks destructive command** | D2 + D6 | Tool execution (D2) + preventive controls (D6) |
| **Coordinator agent consolidates specialist outputs** | D2 + D5 + D6 | Agent tool (D2) + orchestration (D5) + audit trail (D6) |
| **Copilot Memory causes drift in multi-agent scenario** | D3 + D4 + D5 | Memory staleness (D3) + drift detection (D4) + coordination (D5) |

### Universal Exam Patterns

1. **Least privilege is almost always the right answer.** If a question asks "what should you do," and one answer restricts tools/permissions and another broadens them, choose restriction.

2. **GitHub-native artifacts beat hidden state.** PRs, comments, artifacts, and audit logs are always preferred over chat memory, session context, or internal state.

3. **Enforceable controls beat instructions.** Branch protection, rulesets, hooks (`deny`), and required reviews enforce policy. Instructions only guide behavior.

4. **Planning before execution.** For any complex, security-sensitive, or cross-cutting task, the answer is to plan first, get approval, then execute.

5. **`--no-ask-user` for CI.** Any question about running agents in CI/automation requires `--no-ask-user` to prevent interactive hangs.

6. **`description` is required in agent YAML.** `name` is optional. If asked which field is mandatory, it is `description`.

7. **`mcp-servers` (YAML) vs `mcpServers` (JSON).** These go in different file types and are not interchangeable.

8. **Cloud agent runs on Linux.** PowerShell-only hooks, Windows paths, and user-level hooks do not apply.

9. **Secrets never go in memory, instructions, or comments.** Use GitHub Secrets, Agents secrets (`COPILOT_MCP_*` prefix), or environment secrets.

10. **Model choice is the LAST tuning lever.** Always check instructions, tools, environment, memory, and workflow first.

---

## 9. Exam Strategy

### Time Management

| Section | Questions | Suggested Time |
|---|---|---|
| Domain 2 (Tool Use & Environment) | ~10-14 | ~35 minutes |
| Domain 1 (Architecture & SDLC) | ~7-10 | ~20 minutes |
| Domain 4 (Evaluation & Tuning) | ~7-10 | ~20 minutes |
| Domain 5 (Multi-Agent) | ~7-10 | ~20 minutes |
| Domain 3 (Memory & State) | ~5-7 | ~12 minutes |
| Domain 6 (Guardrails) | ~5-7 | ~13 minutes |
| **Review** | -- | **~5 minutes** |
| **Total** | **40-60** | **~120 minutes** |

### Question Type Patterns

**Artifact Reading Questions:**
- Given a YAML/JSON/log snippet, identify what the agent can do
- Given a custom agent YAML, identify required fields, tool capabilities, MCP configuration
- Given a workflow YAML, identify job ordering, concurrency behavior, artifact flow
- Given a session log, identify new vs. resumed session, MCP status, tools used
- Given an audit event, identify who did what and when

**Scenario-Based Questions:**
- "Your agent needs to [task]. What should you configure?"
- "The agent [failed/errored]. What is the root cause?"
- "Multiple agents are [conflicting]. What should you change?"

**Best-Practice Questions:**
- "What is the recommended approach for [scenario]?"
- "Which control enforces [policy]?"

### Common Exam Traps (Summary)

| # | Trap | Correct Answer |
|---|---|---|
| 1 | "Tell the agent to be careful" as a control | Use enforceable controls: tools, hooks, branch protection |
| 2 | Agent approves its own output | Require separate human or agent review |
| 3 | Plan proves implementation is safe | Validate with tests, scans, and review of actual diff |
| 4 | `tools: ["*"]` for flexibility | Grant only minimum needed tools |
| 5 | `search` = web search | `search` = repository file search only |
| 6 | `mcp-servers` and `mcpServers` are interchangeable | Different keys for YAML vs JSON |
| 7 | Copilot Memory is secret storage | Never store secrets in memory |
| 8 | Firewall allowlist = MCP allowlist | Firewall = network; MCP = server access |
| 9 | `permissionRequest` for cloud agent | Use `preToolUse` for cloud-agent hooks |
| 10 | Model choice as first fix | Tune instructions, tools, environment first |
| 11 | `--no-ask-user` is optional in CI | Required to prevent interactive hangs |
| 12 | `cancel-in-progress` with `queue: max` | Mutually exclusive; choose one |
| 13 | `stdio` for top-level URL | URL at top level means `http` or `sse`, never `stdio`/`local` |
| 14 | `name` is required in agent YAML | `description` is required; `name` is optional |
| 15 | Chat memory as handoff between agents | Use durable artifacts: PR comments, workflow artifacts |

### Answer Elimination Strategy

1. **Eliminate answers that add tools/permissions** when the question is about security/control.
2. **Eliminate answers that rely on instructions alone** when the question asks about enforceable policy.
3. **Eliminate answers that mention "web search"** when `search` tool is referenced (it is repo-only).
4. **Eliminate answers that store secrets** in instructions, memory, or comments.
5. **Eliminate answers that let agents self-approve** their own output.
6. **Choose the most restrictive answer** when in doubt about permissions.
7. **Choose GitHub-native artifacts** over internal/chat state for handoff questions.
8. **Choose `preToolUse`** over `permissionRequest` for cloud-agent hook questions.

---

## 10. Glossary

| Term | Definition |
|---|---|
| **ACP** | Agent Communication Protocol; server reference for Copilot CLI |
| **Agent** | An AI system that autonomously performs multi-step tasks using tools within scoped permissions |
| **Agent YAML** | Custom agent configuration file (`.github/agents/*.agent.md`) with YAML frontmatter |
| **`agent` tool** | Built-in tool that enables one custom agent to invoke another custom agent |
| **Artifacts** | Durable files produced by GitHub Actions workflows, stored and downloadable |
| **Audit log** | Enterprise/organization log of administrative and security events |
| **Autonomy level** | Degree of agent independence, bounded by tool access and approval gates |
| **`bash` (hook toolName)** | Hook-level tool name for Unix shell execution, maps to agent `execute` tool |
| **Branch protection** | GitHub rules that restrict who can push to and merge into protected branches |
| **`cancel-in-progress`** | Concurrency setting that cancels older runs when a new run starts |
| **Check run** | CI result associated with a commit/PR (test results, scan results) |
| **Cloud agent** | Copilot agent that runs on GitHub Actions runners (not local CLI) |
| **`COPILOT_GITHUB_TOKEN`** | Environment variable for authenticating Copilot CLI in CI |
| **`COPILOT_HOME`** | Environment variable to override Copilot config/state root directory |
| **`COPILOT_MCP_*`** | Required prefix for secrets/variables accessible to Copilot cloud agent |
| **Copilot Memory** | Persistent fact/preference storage scoped to repository or user level |
| **`copilot-setup-steps.yml`** | Workflow file defining cloud agent environment setup; must have job name `copilot-setup-steps` |
| **Coordinator pattern** | Orchestration where one agent plans/integrates and others execute bounded tasks |
| **`create` (hook toolName)** | Hook-level tool name for file creation, maps to agent `edit` tool |
| **Custom agent** | User-defined agent with specific tools, MCP servers, and instructions |
| **Dependency review** | Security feature that checks dependency changes for vulnerabilities |
| **`deny` (hook decision)** | Hook blocks tool execution; must include reason |
| **`description`** | Required field in custom agent YAML frontmatter |
| **Drift** | When agent assumptions diverge from current repository reality |
| **`edit` tool** | Built-in tool for modifying and creating files |
| **Environment** | GitHub deployment environment with optional required reviewers and branch restrictions |
| **`execute` tool** | Built-in tool for running shell commands |
| **`fail-fast: false`** | Matrix strategy setting preventing one job failure from canceling others |
| **Fine-grained token** | GitHub PAT with repository and permission-level scoping |
| **Firewall allowlist** | Network egress control for agent environment |
| **`/fleet`** | CLI command that decomposes work into parallel subagents |
| **`glob` (hook toolName)** | Hook-level tool name for file pattern matching, maps to agent `search` tool |
| **`grep` (hook toolName)** | Hook-level tool name for text search, maps to agent `search` tool |
| **Hook** | Custom script that intercepts agent behavior at lifecycle points |
| **`http` (MCP type)** | Modern remote MCP transport connecting to an HTTP endpoint |
| **Inspectable artifact** | Any durable, reviewable output from agent work (plans, diffs, logs, PRs) |
| **`local` (MCP type)** | MCP transport that launches a local subprocess via stdin/stdout |
| **Matrix strategy** | GitHub Actions feature running the same job for multiple parameter values |
| **MCP (Model Context Protocol)** | Standard protocol for connecting agents to external tools and data sources |
| **`mcp-servers`** | YAML key for MCP configuration inside custom agent frontmatter |
| **`mcpServers`** | JSON key for MCP configuration in `.mcp.json`, `.vscode/mcp.json`, or `~/.copilot/mcp-config.json` |
| **`needs`** | GitHub Actions keyword defining job dependencies |
| **`--no-ask-user`** | CLI flag preventing interactive prompts; essential for CI |
| **Path-specific instructions** | Instructions scoped to specific file paths using `applyTo` frontmatter |
| **`permissions`** | GitHub Actions workflow field controlling `GITHUB_TOKEN` access |
| **`plan-approved`** | Label-based gate requiring human approval before agent execution |
| **`postToolUse`** | Hook event firing after successful tool use |
| **`postToolUseFailure`** | Hook event firing after failed tool use |
| **`preToolUse`** | Hook event firing before tool execution; can allow, deny, or ask |
| **`powershell` (hook toolName)** | Hook-level tool name for Windows PowerShell; NOT available on cloud agent |
| **`permissionRequest`** | CLI-only hook event; NOT for cloud-agent permissioning |
| **PR timeline** | Chronological record of all events on a pull request |
| **Prompt file** | Reusable prompt template stored in `.github/prompts/*.prompt.md` |
| **Push protection** | Real-time secret scanning that blocks pushes containing secrets |
| **`queue: max`** | Concurrency setting that queues runs instead of canceling |
| **`read` tool** | Built-in tool for reading file contents |
| **`/delegate`** | Command to hand off task to Copilot cloud agent |
| **Ruleset** | GitHub repository/organization rule enforcing branch protection, required checks, etc. |
| **`search` tool** | Built-in tool for searching repository files and text (NOT web search) |
| **Secret scanning** | GitHub feature detecting leaked secrets in code |
| **Session state** | Persistent execution state enabling session resume |
| **`sessionStart`** | Hook event firing when a session begins or resumes |
| **`sessionEnd`** | Hook event firing when a session terminates |
| **`session.id`** | Unique identifier for an agent session; enables `--resume` |
| **`sse` (MCP type)** | Legacy remote MCP transport using Server-Sent Events |
| **`stdio` (MCP type)** | Local MCP transport over stdin/stdout (same as `local`) |
| **Subagent** | Agent invoked by another agent using the `agent` tool |
| **`subagentStart`** | Hook event firing when a subagent begins |
| **`subagentStop`** | Hook event firing when a subagent completes |
| **`task` (hook toolName)** | Hook-level tool name for subagent invocation, maps to agent `agent` tool |
| **Tool list** | Set of built-in tools granted to a custom agent via `tools` in YAML |
| **`$GITHUB_OUTPUT`** | Actions environment file for step outputs |
| **`$GITHUB_STEP_SUMMARY`** | Actions environment file for workflow run summaries |
| **`github.head_ref`** | Actions context value for PR source branch |
| **`github.run_id`** | Actions context value for unique run identifier |
| **`github.workflow`** | Actions context value for workflow name |
| **`view` (hook toolName)** | Hook-level tool name for file reading, maps to agent `read` tool |
| **`web` tool** | Built-in tool for fetching web content; NOT available for cloud agent |
| **`web_fetch` (hook toolName)** | Hook-level tool name for web fetching |

---

## Official Source Map

| Resource | URL |
|---|---|
| GH-600 Study Guide | https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-600 |
| Certification Page | https://learn.microsoft.com/en-us/credentials/certifications/agentic-ai-developer/ |
| Cloud Agent Docs | https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent |
| CLI Command Reference | https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference |
| CLI Config Directory | https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference |
| Custom Agents Config | https://docs.github.com/en/copilot/reference/custom-agents-configuration |
| Customization Cheat Sheet | https://docs.github.com/en/copilot/reference/customization-cheat-sheet |
| Hooks Reference | https://docs.github.com/en/copilot/reference/hooks-reference |
| MCP Allowlist Enforcement | https://docs.github.com/en/copilot/reference/mcp-allowlist-enforcement |
| Workflow Syntax | https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax |
| Actions Contexts | https://docs.github.com/en/actions/reference/workflows-and-actions/contexts |
| Concurrency | https://docs.github.com/en/actions/concepts/workflows-and-actions/concurrency |
| Audit Log Events | https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/audit-log-events-for-your-enterprise |
| Build Guardrails Tutorial | https://docs.github.com/en/copilot/tutorials/cloud-agent/build-guardrails |
| Risks and Mitigations | https://docs.github.com/en/copilot/concepts/agents/cloud-agent/risks-and-mitigations |
