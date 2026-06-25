package responses

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

// silence import linter — httptest is used via NewRecorder.

func TestWriteJSON(t *testing.T) {
	t.Run("encodes JSON with correct status", func(t *testing.T) {
		rec := httptest.NewRecorder()

		WriteJSON(rec, http.StatusOK, map[string]string{"key": "value"})

		if rec.Code != http.StatusOK {
			t.Errorf("expected status 200, got %d", rec.Code)
		}

		ct := rec.Header().Get("Content-Type")
		if ct != "application/json" {
			t.Errorf("expected Content-Type application/json, got %s", ct)
		}

		var result map[string]string
		if err := json.NewDecoder(rec.Body).Decode(&result); err != nil {
			t.Fatalf("failed to decode JSON: %v", err)
		}
		if result["key"] != "value" {
			t.Errorf("expected key=value, got %v", result)
		}
	})

	t.Run("sets custom status code", func(t *testing.T) {
		rec := httptest.NewRecorder()

		WriteJSON(rec, http.StatusCreated, map[string]string{"id": "123"})

		if rec.Code != http.StatusCreated {
			t.Errorf("expected status 201, got %d", rec.Code)
		}
	})
}
