# LEARNOS X
### Autonomous Career Intelligence & Learning OS

> "Existing platforms recommend what to learn. **LEARNOS X** engineers the optimal journey from who the learner is today to who they want to become."

---

## Key Features & Core Loop

1. **Conversational AI Onboarding**: Natural language extraction of career goals, background, weekly study budget, and learning preferences.
2. **Learner Digital Twin & Adaptive Learning DNA**: Evolving model tracking knowledge state, mastery scores, learning velocity, retention, and problem-solving metrics.
3. **Universal Skill Graph**: NetworkX-powered Directed Acyclic Graph (DAG) enforcing topological prerequisite order across 100+ skills and 300+ relationships.
4. **Career Digital Twin & Market Radar**: Company skill fingerprints and market demand scoring.
5. **Skill Gap Vector Engine**: Mathematical distance vector ranking missing competencies by priority, market relevance, and prerequisite weight.
6. **Future Path Simulator (Flagship Feature)**: Multi-trajectory trajectory scoring (Fast Track, Balanced Track, Deep Specialist Track).
7. **Socratic AI Tutor & RAG Engine**: RAG knowledge assistant with cited technical sources.
8. **Closed-Loop Adaptive Learning & Misconception Engine**: Root-cause diagnostic error matching that automatically modifies the active roadmap upon failure.
9. **Personalized Memory Engine**: Adaptive spaced-repetition retention scheduler.
10. **Proof-of-Skill Engine & Skill Passport**: Multi-modal evidence verification (quizzes, projects, interviews, practical tasks).
11. **AI Interview Simulator**: Technical and behavioral interview practice updating Digital Twin readiness.
12. **Hackathon 5-Minute WOW Demo Runner**: Interactive single-click sequence demonstrating closed-loop adaptation live.

---

## Quick Start & Installation

### Backend (FastAPI + Python 3.11)
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python -m pytest tests/test_all.py
uvicorn app.main:app --reload --port 8000
```

### Frontend (Next.js 14 + React)
```bash
cd frontend
npm install
npm run build
npm run dev
```

### Docker
```bash
docker-compose up --build
```
- Frontend UI: `http://localhost:3000`
- Backend API Docs: `http://localhost:8000/docs`

---

## Verification & Test Results
- **Backend Test Suite**: 7/7 Pytest tests passed in 1.55s.
- **Frontend Production Build**: 11/11 Next.js page routes compiled and statically prerendered with 0 errors.

---

## Tagline
**LEARNOS X — We don't recommend courses. We engineer learning journeys.**
