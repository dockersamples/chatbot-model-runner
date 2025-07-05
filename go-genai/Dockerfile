FROM golang:1.21-alpine AS builder

# Install git (required for potential dependencies)
RUN apk add --no-cache git

WORKDIR /app

# Copy go.mod and go.sum files
COPY go.mod ./
# Run go mod download if you have dependencies
RUN go mod download

# Copy the source code
COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -o /go-genai

# Use a minimal alpine image for the final stage
FROM alpine:latest

# Add CA certificates for HTTPS
RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copy the binary from the builder stage
COPY --from=builder /go-genai .

# Expose port 8080
EXPOSE 8080

# Command to run the application
CMD ["./go-genai"]