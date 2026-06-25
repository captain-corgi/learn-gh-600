package handlers

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGreetHandler(t *testing.T) {
	tests := []struct {
		name     string
		query    string
		wantBody string
	}{
		{
			name:     "with name",
			query:    "?name=World",
			wantBody: `{"message":"Hello, World!"}` + "\n",
		},
		{
			name:     "empty name defaults to stranger",
			query:    "?name=",
			wantBody: `{"message":"Hello, stranger!"}` + "\n",
		},
		{
			name:     "no name param defaults to stranger",
			query:    "",
			wantBody: `{"message":"Hello, stranger!"}` + "\n",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			req := httptest.NewRequest(http.MethodGet, "/greet"+tt.query, nil)
			rec := httptest.NewRecorder()

			GreetHandler(rec, req)

			if rec.Code != http.StatusOK {
				t.Errorf("expected status 200, got %d", rec.Code)
			}
			if rec.Body.String() != tt.wantBody {
				t.Errorf("expected body %q, got %q", tt.wantBody, rec.Body.String())
			}
		})
	}
}

func TestGreetHandler_NonGetReturns405(t *testing.T) {
	req := httptest.NewRequest(http.MethodPost, "/greet", nil)
	rec := httptest.NewRecorder()

	GreetHandler(rec, req)

	if rec.Code != http.StatusMethodNotAllowed {
		t.Errorf("expected status 405 for POST, got %d", rec.Code)
	}
}
