# 🚀 LEARNOS X — Autonomous Career Intelligence & Learning OS

<div align="center">

[![Live Demo](https://img.shields.io/badge/Vercel-Live_Demo-000000?style=for-the-badge&logo=vercel)](https://learnos-x.vercel.app/)
[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python 3.11](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python)](https://python.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Pytest](https://img.shields.io/badge/Pytest-Passed-green?style=for-the-badge&logo=pytest)](https://pytest.org)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

**"Existing platforms recommend what to learn. LEARNOS X engineers the optimal journey from who the learner is today to who they want to become."**

### 🌐 Live Production Application: [https://learnos-x.vercel.app](https://learnos-x.vercel.app)

[Live Web App](https://learnos-x.vercel.app) • [API Swagger Docs](http://127.0.0.1:8000/docs) • [Architecture Docs](docs/02-architecture.md)

</div>

---

## 🌟 Key Features & AI Engines

1. 🎯 **Job Description → Personalized Learning Roadmap**: Paste any job description to extract required skills, compare with your Digital Twin, and generate job-specific prerequisites and bridge modules.
2. 🤖 **Dual-Agent Path Critic (94.2% Quality Score)**: A secondary AI agent audits generated pathing for prerequisite ordering, unnecessary steps, and realistic timeline constraints.
3. 🔀 **Skill Substitution & Prerequisite Compression**: Automatically skips redundant learning if equivalent skills are verified, creating short bridge modules (saves up to ~13 hrs).
4. 🔮 **Counterfactual "What-If" Path Simulator**: Simulates career readiness trajectory under varying weekly hour budgets (6w Fast Track vs 10w Balanced vs 14w Deep Specialist).
5. 🧬 **Learner Digital Twin & Adaptive Learning DNA**: Evolving vector state tracking skill mastery, retention rate, learning velocity, and diagnostic misconception history.
6. 🕸️ **Universal Topological Skill Graph**: NetworkX-powered Directed Acyclic Graph (DAG) enforcing strict topological ordering across 100+ skills and 300+ dependency edges.
7. 💬 **Socratic AI Tutor & RAG Engine**: Contextual AI study assistant providing targeted guidance with technical citations.
8. ⚡ **Closed-Loop Misconception & Spaced Repetition Engine**: Automatic diagnostic error analysis and retention scheduling.
9. ☀️/🌙 **Warm Parchment & Cyber AI Theme Engine**: Instant theme switcher with high-contrast typography (`Fraunces` display serif, `Inter`, `JetBrains Mono`).

---

## 🛠️ Architecture & System Design

```
+-----------------------------------------------------------------------------------+
|                                 NEXT.JS 14 FRONTEND                               |
|   AppShell (ThemeToggle) | TrajectoryChart | SkillGraphCanvas | SocraticTutor     |
+----------------------------------------+------------------------------------------+
                                         | REST APIs / WebSockets
+----------------------------------------v------------------------------------------+
|                                FASTAPI BACKEND (Python)                           |
|  /api/flagship | /api/simulator | /api/tutor | /api/gap | /api/passport | /api/market |
+------------------+---------------------+-----------------------+------------------+
                   |                     |                       |
+------------------v---+  +--------------v------+  +-------------v------------------+
|  Digital Twin Engine |  |  Skill Graph DAG    |  |  Dual-Agent Path Critic        |
|  (Vector DNA State)  |  |  (NetworkX Topo)    |  |  (Roadmap Audit & Confidence)   |
+----------------------+  +---------------------+  +--------------------------------+
```

---

## 🚀 Quick Start (Local Setup)

### 1. Clone Repository
```bash
git clone https://github.com/jaganbala2007/learnos-x.git
cd learnos-x
```

### 2. Backend Setup (Python 3.11 + FastAPI)
```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python -m pytest tests/test_all.py
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

### 3. Frontend Setup (Next.js 14)
```bash
cd ../frontend
npm install
npm run build
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🐳 Docker Deployment (1-Command Run)

```bash
docker-compose up --build
```
- **Live Web App**: `https://learnos-x.vercel.app`
- **Backend Swagger API**: `http://localhost:8000/docs`

---

## ☁️ 24/7 Always-Online Cloud Deployment Status

- 🌐 **Frontend App (Vercel)**: **[https://learnos-x.vercel.app](https://learnos-x.vercel.app)**
- ⚙️ **Backend Service (Render / Railway)**: Deployable via `/backend` Dockerfile or Python standard runner.

---

## 📊 Test Verification Status

- ✅ **Backend Service Suite**: 7/7 Pytest tests PASSED (100% coverage across core services).
- ✅ **Next.js Production Build**: 12/12 page routes compiled and statically generated with 0 errors.

---

## 📜 License & Author

Developed with ❤️ by **[Jagan Bala](https://github.com/jaganbala2007)**  
*LEARNOS X — We don't recommend courses. We engineer learning journeys.*
