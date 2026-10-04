# 🧠 BlindSpot — AI Decision Stress-Testing & Reasoning Audit Engine

> **PromptWars Submission**: An adversarial, multi-agent cognitive stress-testing engine that audits the hidden assumptions, reasoning tensions, and fragile dependencies in high-stakes human decisions. Built with Google Gemini 2.5 Flash, strict reasoning audit constraints, document grounding, and a Mastercard-inspired editorial design system.

---

## 🏛️ Multi-Agent Architecture Pipeline

```
    USER INPUT (Decision + Logic)
               │
               ▼
┌──────────────────────────────┐
│  AGENT 1: THE DISSECTOR      │ 🔍 Extracts claims, hidden inferences, 
│  (Analytical / Grounded)     │    and baseline structural assumptions.
└──────────────┬───────────────┘
               │ (Passes Structured Claims JSON)
               ▼
┌──────────────────────────────┐
│  AGENT 2: THE ANTAGONIST     │ ⚔️ Actively challenges every claim, finds
│  (The Ruthless Cynic)        │    tensions, and maps missing variables.
└──────────────┬───────────────┘
               │ (Passes Debated Claims + Risks)
               ▼
┌──────────────────────────────┐
│  AGENT 3: THE RISK AUDITOR   │ 📊 Evaluates data volatility, scores impact,
│  (Executive / Objective)     │    and builds the dynamic Stress-Test.
└──────────────────────────────┘
               │
               ▼
     FINAL UI VISUALIZATION
```

---

## 📁 Self-Contained Project Structure

```
project_blindspot/
├── ai_engine.py          # Multi-Agent Debate Kernel (Agent 1 Dissector, Agent 2 Antagonist, Agent 3 Risk Auditor)
├── router.py             # FastAPI Endpoints (/analyze, /stress-test, /challenge, /sample)
├── schemas.py            # Pydantic v2 schemas for all 6 cognitive lenses & agent traces
├── prompts.py            # System prompts with negative constraints (No scores, No advice)
├── types.ts              # TypeScript interface definitions matching backend schemas
├── theme.ts              # Design tokens and presets
├── blindspotbrif.md      # Specification & Winner Architecture Guide
└── frontend/             # Complete Standalone React + Vite Frontend App
    ├── src/
    │   ├── components/blindspot/   # ReasoningMap, StressTestSection, AgentTerminalTrace, etc.
    │   ├── pages/BlindSpotApp.tsx  # Master Editorial Audit Page
    │   ├── services/blindspotApi.ts# API client service
    │   └── index.css               # Mastercard Editorial Design System Stylesheet
    ├── package.json
    ├── vite.config.ts
    └── dist/                       # Pre-built production bundle
```

---

## 🚀 Quick Start & Deployment

### 1. Run Backend Server (FastAPI)
```bash
# From workspace root
python -m uvicorn backend.main:app --port 8000 --reload
```
Endpoints mounted at: `http://127.0.0.1:8000/api/v1/blindspot/`

### 2. Run Standalone Frontend
```bash
cd project_blindspot/frontend
npm run dev
```
Access the interactive UI at `http://localhost:5173/`.

### 3. Build for Production (SPA)
```bash
cd project_blindspot/frontend
npm run build
```

---

## 🧪 Running Test Suite
```bash
python -m pytest backend/tests/test_blindspot.py -v
```
All 7/7 test suites verify multi-agent reasoning, schema parsing, document grounding, and endpoint responses.
