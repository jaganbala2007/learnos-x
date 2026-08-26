# LEARNOS X: Deployment Guide

## Running Locally
```bash
# 1. Start Backend API
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload --port 8000

# 2. Start Frontend App
cd frontend
npm run dev
```

## Running with Docker Compose
```bash
docker-compose up --build
```
- Frontend: http://localhost:3000
- Backend API Docs: http://localhost:8000/docs
