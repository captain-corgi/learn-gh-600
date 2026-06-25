package middleware

import "net/http"

// SecurityHeaders sets baseline browser security headers on every response:
//
//   - X-Content-Type-Options: nosniff  — stops MIME sniffing so JSON/other
//     responses are not re-interpreted as HTML.
//   - X-Frame-Options: DENY           — prevents clickjacking via framing.
//   - Referrer-Policy: no-referrer    — avoids leaking the URL via Referer.
//   - Cache-Control: no-store          — disables caching of dynamic data.
//
// These are defense-in-depth measures appropriate for an API. When serving
// this service over TLS, add a Strict-Transport-Security header (see main.go).
func SecurityHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		h := w.Header()
		h.Set("X-Content-Type-Options", "nosniff")
		h.Set("X-Frame-Options", "DENY")
		h.Set("Referrer-Policy", "no-referrer")
		h.Set("Cache-Control", "no-store")
		next.ServeHTTP(w, r)
	})
}
