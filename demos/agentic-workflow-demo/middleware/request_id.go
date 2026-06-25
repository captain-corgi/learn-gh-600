package middleware

import (
	"crypto/rand"
	"encoding/hex"
	"log"
	"net/http"
	"regexp"
	"time"
)

// validRequestID matches the format of a request ID we are willing to echo
// back: 1-64 characters of ASCII letters, digits, and hyphens. This rejects
// control characters, header separators, and oversized values that a client
// could otherwise use to forge or pollute log/trace correlation.
var validRequestID = regexp.MustCompile(`^[A-Za-z0-9-]{1,64}$`)

// RequestID injects an X-Request-ID header into the response.
// Preserves an existing client-supplied ID only when it matches a safe,
// bounded format; otherwise a fresh server-generated ID is used.
func RequestID(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		id := r.Header.Get("X-Request-ID")
		if !validRequestID.MatchString(id) {
			id = generateID()
		}
		w.Header().Set("X-Request-ID", id)
		next.ServeHTTP(w, r)
	})
}

// generateID creates a 16-byte random hex string.
// Falls back to timestamp-based ID if crypto/rand fails.
func generateID() string {
	b := make([]byte, 16)
	if _, err := rand.Read(b); err != nil {
		log.Printf("crypto/rand failed: %v, falling back to timestamp", err)
		return time.Now().Format("20060102150405.999999999")
	}
	return hex.EncodeToString(b)
}
