# Use an official lightweight Ubuntu base image
FROM ubuntu:latest

# Set non-interactive mode for package installation
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    build-essential \
    python3 \
    python3-pip \
    python3-venv \
    nodejs \
    npm \
    && apt-get clean

# Create a working directory
WORKDIR /app

# Copy the entire monorepo
COPY . .

# Install Supervisor to run multiple services
RUN apt-get install -y supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose ports (React: 3000, Node.js: 5000, FastAPI: 8000)
EXPOSE 3000 5000 8000

# Start all services
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
