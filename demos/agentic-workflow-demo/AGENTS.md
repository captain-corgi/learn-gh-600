# Agent guide for agent-demo-server

Go HTTP service demonstrating agentic AI code review workflows.

## Scope
- Application: small Go HTTP service (stdlib only)
- 7 endpoints: health, greet, version, echo, metrics, buggy-counter
- Middleware: request-id, logging, panic recovery

## Review focus
- Race conditions in shared state (metrics counter, buggy-counter)
- Missing error handling or nil checks
- Input validation on user-supplied data
- Test coverage gaps for new code

## Go conventions
- Standard library only — no external dependencies
- JSON responses with Content-Type: application/json
- kebab-case file names, snake_case Go symbols
- Files under 200 lines

## Do not
- Suggest external dependencies
- Push to main
- Store credentials in files
- Delete resources
- Ignore existing test patterns
