# Agentic Workflow Demo Planning: Critical API Corrections

**Date:** 2026-05-30 11:34
**Severity:** High
**Component:** GitHub Agents Integration (Copilot, Claude Code, Crush)
**Status:** Resolved

## What Happened

During brainstorm and planning for a comprehensive agentic workflow demo, research revealed fundamental errors in GitHub Copilot agent configuration and API usage. Had to correct 3 critical misunderstandings before creating the implementation plan.

## The Brutal Truth

This is frustrating because the errors came from outdated scaffold documentation. We nearly designed an entire demo system around non-existent APIs. The embarrassing part: we initially assumed `gh agent-task` was a real CLI command and that agents used `.yml` configs. Neither is true. What saved us was the validation step — Full-tier audit caught these before we wrote a single line of implementation code.

## Technical Details

**Error 1: Copilot agent config format**
- Assumed: `.github/agents/*.yml` (YAML configuration)
- Reality: `.github/agents/*.md` (Markdown with YAML frontmatter)
- Impact: Entire config structure wrong

**Error 2: Available tools for Copilot agents**
- Assumed: `github`, `filesystem`, `git`, `bash` tools
- Reality: Only `read`, `edit`, `search`, `execute` tools
- Impact: Agent capabilities mischaracterized in workflow design

**Error 3: API invocation method**
- Assumed: `gh agent-task assign <agent-id> --issue <url>` (CLI command)
- Reality: Must use GitHub REST API `POST /repos/{owner}/{repo}/issues/{number}/assignments`
- Impact: Phase 3 workflow code block was invalid

## What We Tried

Initially planned workflows based on scaffold examples that hadn't been updated for current GitHub agent specifications. Caught these during Full-tier validation (20 claims) before implementation.

**Fixed in planning:**
- Changed all agent config references from `.yml` to `.md`
- Rewrote Copilot trigger workflow to use REST API with `curl` instead of fake `gh agent-task` command
- Corrected tool descriptions throughout educational docs

## Root Cause Analysis

Outdated scaffold documentation that served as our reference point. The `docs/labs/scaffold/` directory contained examples from earlier GitHub agent beta testing. We trusted it without verifying current API specs.

**Lesson:** Always validate against current official docs, not repository scaffolds. APIs change fast.

## Decisions Made

**Demo Scope:** Full PR lifecycle with 7 features (Go app)
- Features: health check, greeting, X-Request-ID middleware, version endpoint, echo, metrics, error recovery
- Includes buggy handler scenario with data race for review agents to catch

**Agent Configurations:**
- Copilot: Manual label trigger (`agent-task`), `.md` agent files, correct tool set
- Claude Code: Anthropic API integration, configurable model ID via `vars.REVIEW_MODEL`
- Crush: Same Anthropic API key as Claude Code, headless review mode

**Output Location:** `demos/agentic-workflow-demo/` subdirectory

## Lessons Learned

1. **Never trust scaffold examples as ground truth** — they rot
2. **Validate API assumptions before planning** — Full-tier audit saved hours of rework
3. **Document corrections explicitly** — wrote exact API formats in plan phases
4. **Manual triggers better for demos** — learners need to see the assignment happen

## Next Steps

Implementation ready to proceed with corrected specs:
- Plan approved at `plans/260530-0925-agentic-workflow-demo/`
- 6 phases, estimated 11.5 hours total
- Phase 1 starts with Go app scaffold (3h)

**Unresolved Questions:** None — all API specs verified, user decisions confirmed.
