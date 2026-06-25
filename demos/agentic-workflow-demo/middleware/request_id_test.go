package middleware

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestRequestID_SetsHeader(t *testing.T) {
	handler := RequestID(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Just check header was set
	}))

	req := httptest.NewRequest(http.MethodGet, "/", nil)
	rec := httptest.NewRecorder()

	handler.ServeHTTP(rec, req)

	got := rec.Header().Get("X-Request-ID")
	if got == "" {
		t.Error("expected X-Request-ID header to be set")
	}
}

func TestRequestID_PreservesExisting(t *testing.T) {
	existingID := "test-123-abc"
	handler := RequestID(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	req := httptest.NewRequest(http.MethodGet, "/", nil)
	req.Header.Set("X-Request-ID", existingID)
	rec := httptest.NewRecorder()

	handler.ServeHTTP(rec, req)

	got := rec.Header().Get("X-Request-ID")
	if got != existingID {
		t.Errorf("expected X-Request-ID %q, got %q", existingID, got)
	}
}

func TestRequestID_RejectsUnsafeClientID(t *testing.T) {
	// A client-supplied X-Request-ID containing characters outside the safe
	// set must be replaced by a server-generated ID rather than echoed back,
	// to prevent header/log forging.
	malicious := "abc\r\nX-Forged: yes"
	handler := RequestID(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	req := httptest.NewRequest(http.MethodGet, "/", nil)
	req.Header.Set("X-Request-ID", malicious)
	rec := httptest.NewRecorder()

	handler.ServeHTTP(rec, req)

	got := rec.Header().Get("X-Request-ID")
	if got == malicious {
		t.Errorf("unsafe client ID must not be echoed back, got %q", got)
	}
	if !validRequestID.MatchString(got) {
		t.Errorf("expected a valid server-generated ID, got %q", got)
	}
	if rec.Header().Get("X-Forged") != "" {
		t.Error("expected no X-Forged header — possible header injection")
	}
}

func TestRequestID_RejectsOversizedClientID(t *testing.T) {
	handler := RequestID(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	}))

	req := httptest.NewRequest(http.MethodGet, "/", nil)
	req.Header.Set("X-Request-ID", "a"+repeat("b", 80))
	rec := httptest.NewRecorder()

	handler.ServeHTTP(rec, req)

	got := rec.Header().Get("X-Request-ID")
	if len(got) > 64 {
		t.Errorf("expected ID capped at 64 chars, got len %d", len(got))
	}
}

func repeat(s string, n int) string {
	out := make([]byte, 0, len(s)*n)
	for i := 0; i < n; i++ {
		out = append(out, s...)
	}
	return string(out)
}
