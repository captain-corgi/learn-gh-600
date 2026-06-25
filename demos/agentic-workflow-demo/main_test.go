package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestNewMux_ReturnsNonNil(t *testing.T) {
	mux := newMux()
	if mux == nil {
		t.Error("expected non-nil mux")
	}
}

func TestNewMux_UnknownRoute_Returns404(t *testing.T) {
	mux := newMux()

	req := httptest.NewRequest(http.MethodGet, "/nonexistent", nil)
	rec := httptest.NewRecorder()

	mux.ServeHTTP(rec, req)

	if rec.Code != http.StatusNotFound {
		t.Errorf("expected status 404, got %d", rec.Code)
	}
}

func TestNewMux_HealthRoute_Registered(t *testing.T) {
	mux := newMux()

	req := httptest.NewRequest(http.MethodGet, "/health", nil)
	rec := httptest.NewRecorder()

	mux.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Errorf("expected status 200 for /health, got %d", rec.Code)
	}
}
