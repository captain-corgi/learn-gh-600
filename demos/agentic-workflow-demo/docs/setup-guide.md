# Setup Guide

Prerequisites and configuration for the agentic workflow demo.

## Prerequisites

- **GitHub account** with Copilot access (for Copilot agent features)
- **Anthropic API key** — [console.anthropic.com](https://console.anthropic.com/)
- **Go 1.22+** — [go.dev](https://go.dev/)
- **Crush CLI** (optional) — [github.com/charmbracelet/crush](https://github.com/charmbracelet/crush)

## Fork and Clone

```bash
git clone https://github.com/YOUR_USERNAME/learn-gh-600.git
cd learn-gh-600/demos/agentic-workflow-demo
```

## Configure GitHub Secrets

1. Go to repo **Settings → Secrets and variables → Actions**
2. Add secret: `ANTHROPIC_API_KEY` = your Anthropic API key
3. Add variable (optional): `REVIEW_MODEL` = model ID (default: `claude-3-5-haiku-20241022`)

## Enable Copilot Custom Agents

1. Go to repo **Settings → Copilot → Agents**
2. Enable custom agents for the repository
3. Ensure `feature-implementer.md` appears in `.github/agents/`

## Verify Setup

```bash
go vet ./...
go test -cover ./...
go build ./...
```

Expected: all tests pass, coverage >80%.

## Run Demo Scenarios

```bash
# Create sample issues for demo
bash scripts/setup-demo.sh

# Or follow the walkthrough manually
# See docs/walkthrough.md
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Copilot agent not triggering | Ensure Copilot agents enabled in repo settings |
| Claude review workflow fails | Check `ANTHROPIC_API_KEY` secret is set |
| Crush not installing | Requires Go 1.22+: `go install github.com/charmbracelet/crush@latest` |
| Tests fail locally | Run `go vet ./...` first; ensure Go 1.22+ |

---
*Last updated: 2026-05-30*
