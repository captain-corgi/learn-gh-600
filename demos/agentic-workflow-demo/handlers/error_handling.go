package handlers

import "fmt"

// AppError represents a structured application error with HTTP status code.
type AppError struct {
	status int
	msg    string
}

// StatusCode returns the HTTP status code for this error.
func (e *AppError) StatusCode() int {
	return e.status
}

// Error implements the error interface.
func (e *AppError) Error() string {
	return e.msg
}

// NotFoundError creates a 404 error for a missing resource.
func NotFoundError(resource string) *AppError {
	return &AppError{
		status: 404,
		msg:    fmt.Sprintf("%s not found", resource),
	}
}

// ValidationError creates a 400 error for invalid input.
func ValidationError(msg string) *AppError {
	return &AppError{
		status: 400,
		msg:    msg,
	}
}
