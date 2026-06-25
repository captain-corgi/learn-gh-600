package handlers

import (
	"net/http"
	"testing"
)

func TestAppError(t *testing.T) {
	t.Run("NotFoundError has correct status", func(t *testing.T) {
		err := NotFoundError("user")
		if err.StatusCode() != http.StatusNotFound {
			t.Errorf("expected 404, got %d", err.StatusCode())
		}
	})

	t.Run("ValidationError has correct status", func(t *testing.T) {
		err := ValidationError("name is required")
		if err.StatusCode() != http.StatusBadRequest {
			t.Errorf("expected 400, got %d", err.StatusCode())
		}
	})

	t.Run("Error message is preserved", func(t *testing.T) {
		err := NotFoundError("user")
		want := "user not found"
		if err.Error() != want {
			t.Errorf("expected %q, got %q", want, err.Error())
		}
	})
}
