#!/bin/bash

# Set default environment variables
export PORT=${PORT:-8081}
export DEBUG=${DEBUG:-false}
export LOG_LEVEL=${LOG_LEVEL:-INFO}

# Print configuration
echo "Starting Hello-GenAI Python application"
echo "Port: $PORT"
echo "Debug mode: $DEBUG"
echo "Log level: $LOG_LEVEL"

# Run the application
python app.py
