# Claude Code instructions for agent-demo-server

## Project
Go HTTP service demonstrating agentic AI workflows.
Standard library only. Zero external dependencies.

## Review criteria
When reviewing code, check for:
- Race conditions (especially in metrics/counter code)
- Missing error returns
- Input validation gaps
- Test coverage for new handlers
- Go idioms and stdlib usage

## Go conventions
- Use http.ServeMux (Go 1.22+ pattern)
- JSON responses: Content-Type: application/json
- Errors: return structured JSON {error: message}
- Tests: use net/http/httptest
- Files: kebab-case names, under 200 lines

## Do not
- Add external dependencies
- Modify CI/CD workflows unless explicitly asked
- Approve or merge PRs
