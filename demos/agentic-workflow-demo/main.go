package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/captain-corgi/agentic-workflow-demo/handlers"
	"github.com/captain-corgi/agentic-workflow-demo/middleware"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	handler := newMux()

	addr := fmt.Sprintf(":%s", port)
	// Use an explicit *http.Server with timeouts so slow clients cannot hold
	// connections open indefinitely (mitigates Slowloris-style resource
	// exhaustion). ReadHeaderTimeout is always set to guard header reads.
	srv := &http.Server{
		Addr:              addr,
		Handler:           handler,
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       10 * time.Second,
		WriteTimeout:      30 * time.Second,
		IdleTimeout:       120 * time.Second,
	}

	// Serve over TLS when a cert and key are provided via the TLS_CERT and
	// TLS_KEY environment variables; otherwise fall back to plaintext HTTP.
	// For local development this serves plaintext on localhost; for any
	// networked or production deployment, terminate TLS here or at a reverse
	// proxy in front of this service.
	certFile := os.Getenv("TLS_CERT")
	keyFile := os.Getenv("TLS_KEY")
	if certFile != "" && keyFile != "" {
		log.Printf("agent-demo-server listening on %s (TLS)", addr)
		if err := srv.ListenAndServeTLS(certFile, keyFile); err != nil {
			log.Fatalf("server failed: %v", err)
		}
		return
	}

	log.Printf("agent-demo-server listening on %s (HTTP)", addr)
	if err := srv.ListenAndServe(); err != nil {
		log.Fatalf("server failed: %v", err)
	}
}

// newMux creates the HTTP mux with all routes and middleware wired.
func newMux() http.Handler {
	mux := http.NewServeMux()
	metrics := handlers.NewMetrics()

	mux.HandleFunc("/health", handlers.HealthHandler)
	mux.HandleFunc("/greet", handlers.GreetHandler)
	mux.HandleFunc("/version", handlers.VersionHandler)
	mux.HandleFunc("/echo", handlers.EchoHandler)
	mux.HandleFunc("/metrics", metrics.Handler)

	// Buggy handler for review demo — contains intentional data race
	buggy := handlers.NewBuggyHandler()
	mux.Handle("/buggy-counter", buggy)

	// Wrap with middleware: recovery → security-headers → logging → request-id → metrics-counter
	var handler http.Handler = mux
	handler = metricsCounter(metrics, handler)
	handler = middleware.Logging(handler)
	handler = middleware.RequestID(handler)
	handler = middleware.SecurityHeaders(handler)
	handler = middleware.Recovery(handler)

	return handler
}

// metricsCounter increments the metrics counter on every request.
func metricsCounter(m *handlers.Metrics, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		m.Increment()
		next.ServeHTTP(w, r)
	})
}
