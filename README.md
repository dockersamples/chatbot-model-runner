# hello-genai

A simple chatbot web application built in Go, Python and Node.js that connects to a local LLM service (llama.cpp) to provide AI-powered responses.

## Environment Variables

The application uses the following environment variable defined in the `.env` file:

- `LLM_MODEL_NAME`: The model name to use

To change these settings, simply edit the `.env` file in the root directory of the project.

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/docker/hello-genai
   cd hello-genai
   ```

2. Run the application using the script:
   ```bash
   docker compose up --build
   ```

3. Open your browser and visit the following links:

   http://localhost:8080 for the GenAI Application in Go

   http://localhost:8081 for the GenAI Application in Python

   http://localhost:8082 for the GenAI Application in Node


