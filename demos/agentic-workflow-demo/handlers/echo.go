package handlers

import (
	"io"
	"net/http"

	"github.com/captain-corgi/agentic-workflow-demo/responses"
)

// maxEchoBodyBytes caps how much of the request body /echo reads and echoes
// back (1 MiB). It bounds memory use so a client cannot exhaust it with an
// oversized body.
const maxEchoBodyBytes = 1 << 20

// EchoHandler mirrors the request body back as JSON.
func EchoHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		responses.WriteJSON(w, http.StatusMethodNotAllowed, map[string]string{
			"error": "method not allowed",
		})
		return
	}

	// Bound the body so a single request cannot exhaust server memory.
	r.Body = http.MaxBytesReader(w, r.Body, maxEchoBodyBytes)
	body, err := io.ReadAll(r.Body)
	if err != nil {
		responses.WriteJSON(w, http.StatusRequestEntityTooLarge, map[string]string{
			"error": "request body too large",
		})
		return
	}
	defer r.Body.Close()

	if len(body) == 0 {
		responses.WriteJSON(w, http.StatusBadRequest, map[string]string{
			"error": "empty body",
		})
		return
	}

	// Re-encode through responses.WriteJSON instead of reflecting the raw
	// bytes verbatim. This guarantees a valid, HTML-escaped JSON response and
	// avoids content-confusion when the inbound body is not actually JSON.
	responses.WriteJSON(w, http.StatusOK, map[string]string{
		"echo": string(body),
	})
}
