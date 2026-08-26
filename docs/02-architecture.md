# LEARNOS X: System Architecture & Monorepo Design

```mermaid
graph TD
    UI[Next.js 14 Cyber Frontend] --> API[FastAPI Backend Engine]
    API --> TWIN[Learner Digital Twin & DNA Service]
    API --> GRAPH[NetworkX Universal Skill Graph]
    API --> GAP[Skill Gap Vector Engine]
    API --> SIM[Future Path Simulator]
    API --> ORCH[Agentic AI Orchestrator - 8 Agents]
    API --> RAG[RAG Retrieval & Citation Engine]
    API --> MISC[Misconception & Closed-Loop Replanner]
    API --> PROOF[Proof-of-Skill & Passport Engine]
```

## Tech Stack
- **Frontend**: Next.js 14 (App Router) + React + Tailwind/Vanilla CSS + Lucide Icons + Recharts / Canvas.
- **Backend**: FastAPI + NetworkX + SQLAlchemy + SQLite / PostgreSQL + Pytest.
- **Orchestration**: Hybrid Dual Execution (Structured LLM + Deterministic Rule Fallbacks).
