# Harness Comparison: Copilot vs Claude Code vs Crush

Side-by-side comparison of the 3 agent harnesses used in this demo.

## Config Format

| Aspect | Copilot | Claude Code | Crush |
|--------|---------|-------------|-------|
| **Config file** | `.github/agents/*.md` | `.claude/CLAUDE.md` | `crush.json` + `AGENTS.md` |
| **Format** | Markdown + YAML frontmatter | Markdown | JSON + Markdown |
| **Location** | `.github/agents/` | `.claude/` | Project root |
| **Instructions file** | `.github/copilot-instructions.md` | `.claude/CLAUDE.md` | `AGENTS.md` |

## Capabilities

| Aspect | Copilot | Claude Code | Crush |
|--------|---------|-------------|-------|
| **Tools** | read, edit, search, execute | Full shell + API | File read + CLI |
| **Trigger** | Issue label + REST API | PR event → Anthropic API | PR event → CLI |
| **Max session** | 59 min | N/A (API call) | N/A (CLI) |
| **Model** | GitHub Copilot (fixed) | Configurable via `vars.REVIEW_MODEL` | Configurable via crush.json |
| **Code changes** | Yes (creates PRs) | No (review only) | No (review only) |

## Cost

| Harness | Cost Model | Estimated per review |
|---------|-----------|---------------------|
| Copilot | GitHub Copilot subscription | Included in subscription |
| Claude Code | Per-token (Anthropic) | ~$0.001 (Haiku, small diff) |
| Crush | Per-token (provider) | ~$0.001 (Haiku, small diff) |

## When to Use Each

| Scenario | Recommended | Why |
|----------|-------------|-----|
| Implement a new feature | Copilot | Creates branches, writes code, opens PRs |
| Code review on PRs | Claude Code | Structured review via API, posts comments |
| Alternative review perspective | Crush | Different harness, same or different model |
| Local interactive coding | Claude Code or Crush | Both support interactive terminal use |

## Key Corrections from Common Tutorials

| What tutorials get wrong | Correct approach |
|--------------------------|-----------------|
| Copilot agent files as `.yml` | Must be `.md` with YAML frontmatter |
| Tool names: `github`, `filesystem` | Actual tools: `read`, `edit`, `search`, `execute` |
| `gh agent-task create` CLI | Use REST API: `POST /agents/repos/{owner}/{repo}/tasks` |
| Copilot triggered from Actions | Triggered via issue assignment or REST API, not workflow_dispatch |

## GH-600 Exam Relevance

This demo covers:
- **Domain 1 (15-20%):** Agent architecture, SDLC integration, plan-first workflow
- **Domain 2 (20-25%):** Tool use (read/edit/search/execute), environment config, MCP
- **Domain 5 (15-20%):** Multi-agent coordination, isolated review, artifact sharing

---
*Last updated: 2026-05-30*
