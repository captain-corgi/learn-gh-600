package handlers

import (
	"net/http"

	"github.com/captain-corgi/agentic-workflow-demo/responses"
)

// GreetHandler returns a personalized greeting.
// Uses "stranger" as default when name is empty or missing.
func GreetHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		responses.WriteJSON(w, http.StatusMethodNotAllowed, map[string]string{
			"error": "method not allowed",
		})
		return
	}
	name := r.URL.Query().Get("name")
	if name == "" {
		name = "stranger"
	}
	responses.WriteJSON(w, http.StatusOK, map[string]string{
		"message": "Hello, " + name + "!",
	})
}
