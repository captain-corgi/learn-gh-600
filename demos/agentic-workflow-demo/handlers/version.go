package handlers

import (
	"net/http"

	"github.com/captain-corgi/agentic-workflow-demo/responses"
)

// Version is set at build time via -ldflags.
var Version = "0.1.0"

// VersionHandler returns the current build version.
//
// Security note: this endpoint is intentionally unauthenticated for the demo
// (it aids version-fingerprinting review practice). The exposed value is a
// non-sensitive build tag. For a production deployment, restrict this route
// (auth-gate or remove) so it cannot aid reconnaissance.
func VersionHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		responses.WriteJSON(w, http.StatusMethodNotAllowed, map[string]string{
			"error": "method not allowed",
		})
		return
	}
	responses.WriteJSON(w, http.StatusOK, map[string]string{
		"version": Version,
	})
}
