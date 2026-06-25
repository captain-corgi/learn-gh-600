package responses

import (
	"bytes"
	"encoding/json"
	"net/http"
)

// WriteJSON encodes v as JSON and writes it to w with the given status code.
// Buffers the JSON before writing headers to avoid corrupt output on encode failure.
func WriteJSON(w http.ResponseWriter, status int, v any) {
	buf := &bytes.Buffer{}
	if err := json.NewEncoder(buf).Encode(v); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"error":"internal server error"}`))
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	w.Write(buf.Bytes())
}
