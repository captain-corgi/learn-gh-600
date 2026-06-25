package handlers

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestEchoHandler(t *testing.T) {
	t.Run("mirrors JSON body", func(t *testing.T) {
		body := `{"message":"hello","count":42}`
		req := httptest.NewRequest(http.MethodPost, "/echo", strings.NewReader(body))
		req.Header.Set("Content-Type", "application/json")
		rec := httptest.NewRecorder()

		EchoHandler(rec, req)

		if rec.Code != http.StatusOK {
			t.Errorf("expected status 200, got %d", rec.Code)
		}
	})

	t.Run("empty body returns 400", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodPost, "/echo", strings.NewReader(""))
		rec := httptest.NewRecorder()

		EchoHandler(rec, req)

		if rec.Code != http.StatusBadRequest {
			t.Errorf("expected status 400, got %d", rec.Code)
		}
	})

	t.Run("GET method returns 405", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/echo", nil)
		rec := httptest.NewRecorder()

		EchoHandler(rec, req)

		if rec.Code != http.StatusMethodNotAllowed {
			t.Errorf("expected status 405, got %d", rec.Code)
		}
	})

	t.Run("response is re-encoded as JSON, not raw reflection", func(t *testing.T) {
		// Non-JSON input must come back as valid JSON under the "echo" key,
		// not echoed verbatim with an HTML content confusion.
		req := httptest.NewRequest(http.MethodPost, "/echo", strings.NewReader("<script>alert(1)</script>"))
		rec := httptest.NewRecorder()

		EchoHandler(rec, req)

		if rec.Code != http.StatusOK {
			t.Fatalf("expected status 200, got %d", rec.Code)
		}
		if got := rec.Body.String(); !strings.Contains(got, "\"echo\"") {
			t.Errorf("expected re-encoded JSON with echo key, got %q", got)
		}
	})

	t.Run("oversized body returns 413", func(t *testing.T) {
		// A body larger than maxEchoBodyBytes must be rejected to prevent
		// memory-exhaustion denial of service.
		oversized := strings.Repeat("a", maxEchoBodyBytes+1)
		req := httptest.NewRequest(http.MethodPost, "/echo", strings.NewReader(oversized))
		rec := httptest.NewRecorder()

		EchoHandler(rec, req)

		if rec.Code != http.StatusRequestEntityTooLarge {
			t.Errorf("expected status 413 for oversized body, got %d", rec.Code)
		}
	})
}
