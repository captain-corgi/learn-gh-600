.PHONY: build test vet lint run coverage

build:
	go build ./...

test:
	go test -cover ./...

vet:
	go vet ./...

lint: vet build

coverage:
	go test -coverprofile=coverage.out ./...
	go tool cover -func=coverage.out

run:
	go run .
