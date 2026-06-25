package handlers

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestVersionHandler(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/version", nil)
	rec := httptest.NewRecorder()

	VersionHandler(rec, req)

	if rec.Code != http.StatusOK {
		t.Errorf("expected status 200, got %d", rec.Code)
	}

	body := rec.Body.String()
	want := `{"version":"0.1.0"}` + "\n"
	if body != want {
		t.Errorf("expected body %q, got %q", want, body)
	}
}

func TestVersionHandler_NonGetReturns405(t *testing.T) {
	req := httptest.NewRequest(http.MethodPost, "/version", nil)
	rec := httptest.NewRecorder()

	VersionHandler(rec, req)

	if rec.Code != http.StatusMethodNotAllowed {
		t.Errorf("expected status 405 for POST, got %d", rec.Code)
	}
}
