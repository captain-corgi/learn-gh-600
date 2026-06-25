package handlers

import (
	"net/http"

	"github.com/captain-corgi/agentic-workflow-demo/responses"
)

// BuggyHandler demonstrates a data race bug that review agents should catch.
// Uses a plain int counter instead of atomic — NOT thread-safe.
type BuggyHandler struct {
	count int // intentional data race for demo purposes
}

// NewBuggyHandler creates a handler with an intentionally racy counter.
func NewBuggyHandler() *BuggyHandler {
	return &BuggyHandler{}
}

// ServeHTTP increments and returns the counter value.
// BUG: the count++ operation is not thread-safe — data race on concurrent access.
func (h *BuggyHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h.count++ // intentional data race — NOT atomic
	responses.WriteJSON(w, http.StatusOK, map[string]int{
		"count": h.count,
	})
}
