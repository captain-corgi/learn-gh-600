package handlers

import (
	"net/http"

	"github.com/captain-corgi/agentic-workflow-demo/responses"
)

// HealthHandler returns service health status.
func HealthHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		responses.WriteJSON(w, http.StatusMethodNotAllowed, map[string]string{
			"error": "method not allowed",
		})
		return
	}
	responses.WriteJSON(w, http.StatusOK, map[string]string{
		"status": "ok",
	})
}
