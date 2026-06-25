package handlers

import (
	"net/http"
	"sync/atomic"

	"github.com/captain-corgi/agentic-workflow-demo/responses"
)

// Metrics tracks request counts using atomic operations for thread safety.
type Metrics struct {
	count atomic.Int64
}

// NewMetrics creates a new Metrics instance with zero count.
func NewMetrics() *Metrics {
	return &Metrics{}
}

// Increment atomically increments the request counter.
func (m *Metrics) Increment() {
	m.count.Add(1)
}

// Count returns the current request count.
func (m *Metrics) Count() int64 {
	return m.count.Load()
}

// Handler returns the current request count as JSON.
//
// Security note: this endpoint is intentionally unauthenticated for the demo
// (it aids request-count review practice). The exposed value is a simple
// counter with no sensitive data. For a production deployment, restrict this
// route (auth-gate or remove) so it cannot aid traffic-volume reconnaissance.
func (m *Metrics) Handler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		responses.WriteJSON(w, http.StatusMethodNotAllowed, map[string]string{
			"error": "method not allowed",
		})
		return
	}
	responses.WriteJSON(w, http.StatusOK, map[string]int64{
		"requests": m.Count(),
	})
}
