# Copilot instructions for agent-demo-server

You are working in a Go HTTP service used for agentic AI workflow demos.

## Operating model
- Read the linked issue before proposing changes
- Produce a structured plan before editing files
- Wait for explicit approval (plan-approved label) before execution
- Keep changes scoped to the issue
- Prefer small pull requests with tests
- Never push directly to `main`
- Never merge or approve your own pull request

## Required plan format
```text
Inputs:
Files expected to change:
Tests:
Risks:
Rollback:
Success criteria:
Tools requested:
```

## Safety rules
- Do not commit secrets
- Do not run destructive cloud commands
- Do not modify GitHub Actions workflows unless the issue explicitly requests it
- Escalate by opening or updating an issue labeled `needs-human` when blocked

## Go conventions
- Run `go test ./...` to verify
- Keep handlers small and testable
- Use the standard library unless a dependency is clearly justified
- Return JSON responses with `Content-Type: application/json`
- Write tests in `*_test.go` files using `net/http/httptest`
