# AgroSentinel Genesis AI

A scaffold for an agricultural AI platform with a Python FastAPI backend and a React frontend.

## Project structure

- `backend/`: Python FastAPI backend
  - `app/`: application package
  - `app/api/v1/`: API endpoints for crop diagnosis, weather alerts, voice assistant, and government schemes
  - `app/core/`: configuration and security
  - `app/services/`: external data service placeholders
  - `app/ai_agents/`: multi-agent reasoning placeholders
  - `app/ml_models/`: model pipeline placeholders
  - `app/database/`: vector DB, session, and memory engine placeholders
  - `requirements.txt`: Python dependencies
  - `Dockerfile`: container build file

- `frontend/`: React application
  - `public/`: static HTML entry point
  - `src/`: app source code
  - `src/components/`: shared UI components
  - `src/views/`: main app screens
  - `package.json`: frontend dependencies and scripts
  - `vite.config.js`: Vite config

## Setup

### Backend

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Notes

This scaffold contains placeholder endpoint implementations and component stubs. Add real AI model integrations, external API calls, and business logic as needed.
