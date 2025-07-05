FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Make sure templates directory exists
RUN mkdir -p templates

# Create the template directory 
COPY templates/index.html templates/

# Expose port 8080
EXPOSE 9090

# Run the application
CMD ["python", "app.py"]