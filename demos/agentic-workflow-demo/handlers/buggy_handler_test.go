package handlers

import (
	"net/http"
	"net/http/httptest"
	"sync"
	"testing"
)

func TestBuggyHandler_RaceCondition(t *testing.T) {
	h := NewBuggyHandler()

	// Concurrent increments should expose the race when run with -race flag
	var wg sync.WaitGroup
	for i := 0; i < 100; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			req := httptest.NewRequest(http.MethodGet, "/buggy-counter", nil)
			rec := httptest.NewRecorder()
			h.ServeHTTP(rec, req)
		}()
	}
	wg.Wait()
}
