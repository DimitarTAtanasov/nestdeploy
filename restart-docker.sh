#!/bin/bash

# Stop all running containers
echo "Stopping all running containers..."
docker stop $(docker ps -q) 2>/dev/null || true

# Remove all stopped containers
echo "Removing all stopped containers..."
docker rm $(docker ps -a -q) 2>/dev/null || true

# Kill any process using port 3000
echo "Killing any process using port 3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# Kill any process using port 3001
echo "Killing any process using port 3001..."
lsof -ti:3001 | xargs kill -9 2>/dev/null || true

# Start containers
echo "Starting containers with docker compose..."
docker compose up -d

# Show logs
echo "Showing logs (press Ctrl+C to exit)..."
docker compose logs -f 