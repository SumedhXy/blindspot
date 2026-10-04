# 🧠 BlindSpot — AI Decision Stress-Testing & Reasoning Audit Engine

> **PromptWars 2026 Submission**  
> An adversarial multi-agent cognitive stress-testing engine that audits the hidden assumptions, reasoning tensions, and fragile dependencies in high-stakes human decisions without giving prescriptive advice or fake scores.

---

## 🌟 Executive Summary

When humans face high-stakes life and career dilemmas, standard LLMs fail them by acting as either:
1. **Sycophantic Yes-Men**: Validating the user's existing biases and unexamined optimism.
2. **Prescriptive Oracles**: Generating generic pros/cons lists and telling the user what to do with fake confidence scores (`"Quality: 82/100"`).

**BlindSpot** is fundamentally different. It is an **adversarial, 3-agent reasoning auditor** that dissects human rationale across **6 cognitive lenses**, grounds claims against raw documents, and subjects core premises to interactive counterfactual stress-testing.

---

## 🏛️ Multi-Agent Architecture Pipeline

BlindSpot executes a bounded, sequential 3-agent debate kernel:

```
    USER INPUT (Decision + Logic + Optional Document Context)
                             │
                             ▼
┌────────────────────────────────────────────────────────┐
│  AGENT 1: THE DISSECTOR                                │ 🔍 Extracts explicit claims, hidden inferences,
│  (Analytical / Grounded)                               │    and baseline structural assumptions.
└────────────────────────────┬───────────────────────────┘
                             │ (Passes Structured Claims JSON)
                             ▼
┌────────────────────────────────────────────────────────┐
│  AGENT 2: THE ANTAGONIST                               │ ⚔️ Actively challenges every claim, identifies
│  (The Ruthless Cynic)                                  │    internal tensions, and maps missing variables.
└────────────────────────────┬───────────────────────────┘
                             │ (Passes Debated Claims + Risk Vectors)
                             ▼
┌────────────────────────────────────────────────────────┐
│  AGENT 3: THE RISK AUDITOR                             │ 📊 Evaluates data volatility, scores impact,
│  (Executive / Objective)                               │    and synthesizes the dynamic Stress-Test.
└────────────────────────────┬───────────────────────────┘
                             │
                             ▼
        FINAL 6-LENS EDITORIAL UI VISUALIZATION
```

---

## 🔍 The 6 Cognitive Lenses

| Lens | Name | Core Audit Function |
|:---:|---|---|
| **Lens 1** | **Hidden Assumptions** | Uncovers unproven premises treated as axiomatic facts, scored with normalized sensitivity (0.0 to 1.0). |
| **Lens 2** | **Missing Information** | Maps unknown variables omitted from rationale that materially alter the risk profile. |
| **Lens 3** | **Reasoning Tensions** | Pinpoints direct friction between stated top priorities and daily operational reality. |
| **Lens 4** | **Alternative Perspectives** | Reframes the dilemma through Academic, Opportunity Cost, Future Self (1-Year), and Counterparty lenses. |
| **Lens 5** | **Evidence Gaps** | Segregates verified facts from subjective beliefs and outlines concrete validation tasks. |
| **Lens 6** | **Sensitivity Quantification** | Ranks decision volatility across key vectors (Burnout, Market Risk, Liquidity, Lock-in). |

---

## ⚡ The "Magic Moment": Counterfactual Stress-Testing

BlindSpot constructs a targeted, plausible counterfactual simulation against the user's highest-sensitivity assumption:

- **Interactive Breakpoint Options**: `[ YES, I WOULD STILL CHOOSE THIS ]`, `[ MAYBE / THRESHOLD-DEPENDENT ]`, `[ NO, THIS REVERSES MY DECISION ]`.
- **Dynamic Sensitivity Slider**: Test tolerance thresholds from `0%` (Zero Tolerance) to `100%` (Maximum Fragility).
- **Real-Time Socratic Interrogation**: Uncovers whether the user's commitment is load-bearing on that premise or anchored in secondary unstated motivations.

---

## 📄 Document Grounding Layer

Users can paste raw offer letters, job descriptions, academic syllabi, or investment term sheets:
- Cross-references stated user beliefs directly against contractual clauses.
- Detects discrepancies between perceived benefits and legal reality.
- Highlights ungrounded assumptions in distinct warning badges.

---

## 🎨 Mastercard Editorial Design System

- **Warm Editorial Canvas**: Cream backdrop (`#F3F0EE`), Lifted Bone surfaces (`#FCFBFA`), Ink Black text (`#141413`).
- **Signal Accents**: Signal Orange (`#CF4500`) and Mastercard Fire (`#EB001B`).
- **Signature Geometry**: Stadium pill badges (`999px`), 40px hero radii, 20px card curvatures, no sharp box corners.
- **Enhanced Typography**: Large legible 18.5px body scale, Sofia Sans / Inter font stacks, JetBrains Mono terminal offsets.
- **Accessibility**: 100% WCAG AA contrast compliant with keyboard focus rings.

---

## 📁 Repository Structure

```
promptwars-kit/
├── .github/workflows/ci.yml   # Automated GitHub Actions CI pipeline (Pytest + Vite Build)
├── Dockerfile                 # Multi-stage production container
├── requirements.txt           # Production Python dependencies
├── .env.example               # Safe environment configuration template
├── .gitignore                 # Zero-leak secret & artifact isolation
│
├── backend/                   # FastAPI Backend Infrastructure
│   ├── main.py                # Server entry point with OWASP headers & CORS
│   ├── core/                  # Config, security middleware & error handlers
│   ├── db/                    # SQLAlchemy database session & initialization
│   ├── api/                   # Health check & API route mounting
│   └── tests/                 # 39 Pytest suites across 5 decision domains
│
├── google/adapters/           # Google Cloud & Gemini AI Adapters
│   ├── gemini_adapter.py      # Google GenAI client with structured JSON parsing
│   └── cloud_storage_adapter.py # Cloud storage integration
│
├── project_blindspot/         # Standalone BlindSpot Application Core
│   ├── ai_engine.py           # 3-Agent Debate Kernel & dynamic multi-scenario engine
│   ├── router.py              # FastAPI endpoints (/analyze, /stress-test, /challenge)
│   ├── schemas.py             # Pydantic v2 schemas for all 6 lenses
│   ├── prompts.py             # System instructions & negative constraints
│   ├── types.ts               # Shared TypeScript interface definitions
│   ├── theme.ts               # Editorial design tokens
│   ├── README.md              # Standalone package guide
│   └── frontend/              # Standalone React + Vite SPA
│       ├── src/
│       │   ├── components/blindspot/ # ReasoningMap, StressTest, AgentTrace, etc.
│       │   ├── pages/BlindSpotApp.tsx# Master Editorial Audit Page
│       │   ├── services/blindspotApi.ts # Typed HTTP API client
│       │   └── index.css      # Mastercard Editorial Design System
│       └── dist/              # Pre-compiled production bundle
```

---

## 🚀 Quick Start Guide

### 1. Configure Environment
```bash
# Copy example env
cp .env.example .env

# Add your Gemini API Key in .env (Optional: runs in offline dynamic mode if omitted)
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-3.8-flash
```

### 2. Start Backend Server
```bash
python -m uvicorn backend.main:app --port 8000 --reload
```
API docs available at: `http://127.0.0.1:8000/docs`

### 3. Start Frontend UI
```bash
cd project_blindspot/frontend
npm install
npm run dev
```
Open browser at: `http://localhost:5173/`

---

## 🧪 Automated Testing & Verification

```bash
# Run all 39 test suites (100% pass)
python -m pytest backend/tests/ -v

# Run production build validation
cd project_blindspot/frontend && npm run build
```

---

## 🚫 Negative Constraints Compliance

BlindSpot strictly complies with all competition negative constraints:
- ❌ **NO fake decision scores** (e.g. "Decision Quality: 85/100").
- ❌ **NO prescriptive advice** (e.g. "You should take the job").
- ❌ **NO personality diagnoses** (e.g. "You suffer from FOMO").
- ✅ **Pure, objective reasoning audit and Socratic interrogation**.
