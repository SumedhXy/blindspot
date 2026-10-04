# Multi-stage Dockerfile: Builds Frontend and serves with FastAPI Backend
# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 2: Python Backend Runtime
FROM python:3.11-slim
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Python requirements
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy Backend Code and Google Adapters
COPY backend/ ./backend/
COPY google/ ./google/

# Copy built frontend assets to static directory
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Expose Port
EXPOSE 8000

ENV APP_ENV=production
ENV DEBUG=false
ENV PORT=8000
ENV HOST=0.0.0.0

# Run FastAPI app
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
