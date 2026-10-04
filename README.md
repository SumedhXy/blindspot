# 🧠 BlindSpot — AI Decision Stress-Testing & Reasoning Audit Engine

> **PromptWars 2026 Submission**  
> An adversarial multi-agent cognitive stress-testing engine that audits the hidden assumptions, reasoning tensions, and fragile dependencies in high-stakes human decisions.

[![CI/CD](https://github.com/promptwars-kit/actions/workflows/ci.yml/badge.svg)](.github/workflows/ci.yml)
[![Tests: 39 Passed](https://img.shields.io/badge/Tests-39%20Passed%20(100%25)-success)](backend/tests/)
[![Python: 3.11+](https://img.shields.io/badge/Python-3.11%2B-blue)](backend/)
[![React: 18 + Vite](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-orange)](project_blindspot/frontend/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 📖 Table of Contents
1. [Executive Summary & The Problem](#-executive-summary)
2. [Multi-Agent Architecture Pipeline](#-multi-agent-architecture-pipeline)
3. [The 6 Cognitive Lenses](#-the-6-cognitive-lenses)
4. [Counterfactual Stress-Testing ("The Magic Moment")](#-the-magic-moment)
5. [Document Grounding Layer](#-document-grounding-layer)
6. [Design System (Mastercard Editorial)](#-design-system)
7. [Repository Structure](#-repository-structure)
8. [Quick Start & Deployment](#-quick-start)
9. [Automated Test Suite (39 Tests)](#-automated-tests)
10. [Negative Constraints Compliance](#-negative-constraints)

👉 **For the full architectural deep dive, see [PROJECT_INTRO.md](PROJECT_INTRO.md).**

---

## 🌟 Executive Summary

When humans make high-stakes life, career, or startup decisions, they are vulnerable to cognitive blind spots, unexamined optimism, and unstated assumptions. Standard AI chatbots worsen this by providing sycophantic validation or prescriptive commands.

**BlindSpot** provides an adversarial cognitive reasoning audit across 6 analytical lenses, grounds claims against raw documents, and subjects core premises to interactive counterfactual stress-testing.

---

## 🏛️ Multi-Agent Architecture Pipeline

```
    USER INPUT (Decision + Rationale + Optional Document Context)
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

1. **Hidden Assumptions**: Unproven premises treated as axiomatic facts, scored with normalized sensitivity (0.0 to 1.0).
2. **Missing Information**: Unknown variables omitted from rationale that materially alter the risk profile.
3. **Reasoning Tensions**: Direct friction between stated top priorities and daily operational reality.
4. **Alternative Perspectives**: Reframed through Academic, Opportunity Cost, Future Self (1-Year), and Counterparty viewpoints.
5. **Evidence Gaps**: Distinguishes verified facts from subjective beliefs and outlines concrete validation tasks.
6. **Sensitivity Quantification**: Normalized impact ranking across key risk vectors.

---

## ⚡ The Magic Moment: Counterfactual Stress-Testing

- **Targeted Counterfactual Scenario**: Generated dynamically for the user's highest-sensitivity assumption.
- **Interactive Breakpoint Options**: `YES`, `MAYBE (Threshold-Dependent)`, or `NO (Reverses Decision)`.
- **Dynamic Tolerance Slider**: Test tolerance thresholds from `0%` to `100%`.
- **Live Socratic Feedback**: Pinpoints what the response reveals about underlying decision anchors.

---

## 🎨 Design System: Mastercard Editorial Magazine

Built with a bespoke editorial design system:
- **Canvas Cream**: `#F3F0EE`
- **Lifted Surface**: `#FCFBFA`
- **Ink Black**: `#141413`
- **Signal Orange**: `#CF4500`
- **Mastercard Red**: `#EB001B`
- **Radii**: 20px cards, 40px hero panels, 999px stadium pills.
- **Typography**: Large legible 18.5px base body text with Sofia Sans & JetBrains Mono.

---

## 📁 Repository Structure

```
promptwars-kit/
├── .github/workflows/ci.yml   # GitHub Actions CI pipeline
├── Dockerfile                 # Multi-stage production container
├── requirements.txt           # Python dependencies
├── .env.example               # Environment template
├── PROJECT_INTRO.md           # Full project architecture guide
│
├── backend/                   # FastAPI Backend Infrastructure
│   ├── main.py                # Server entry point
│   ├── core/                  # Config, security middleware & error handlers
│   ├── db/                    # SQLAlchemy database session
│   ├── api/                   # Health & API route mounting
│   └── tests/                 # 39 Pytest test suites across 5 domains
│
├── google/adapters/           # Google Gemini AI Adapters
│   └── gemini_adapter.py      # GenAI SDK with structured JSON parsing
│
└── project_blindspot/         # Standalone BlindSpot Application Core
    ├── ai_engine.py           # 3-Agent Debate Kernel & multi-scenario engine
    ├── router.py              # FastAPI endpoints (/analyze, /stress-test, /challenge)
    ├── schemas.py             # Pydantic v2 schemas for all 6 lenses
    ├── prompts.py             # System instructions & negative constraints
    ├── types.ts               # Shared TypeScript interface definitions
    ├── theme.ts               # Editorial design tokens
    └── frontend/              # Standalone React + Vite SPA
        ├── src/               # Components, pages, services, index.css
        └── dist/              # Pre-compiled production bundle
```

---

## 🚀 Quick Start

### 1. Backend Server
```bash
# Install requirements
pip install -r requirements.txt

# Start FastAPI server
python -m uvicorn backend.main:app --port 8000 --reload
```
Server runs at `http://127.0.0.1:8000/`. OpenAPI Docs at `/docs`.

### 2. Standalone Frontend UI
```bash
cd project_blindspot/frontend
npm install
npm run dev
```
UI available at `http://localhost:5173/`.

### 3. Run Automated Tests
```bash
# All 39 test suites pass 100%
python -m pytest backend/tests/ -v
```

---

## 🔒 Security & Privacy

- **Prompt Injection Defense**: Sanitizes system override tokens (`ignore previous instructions`, `[SYSTEM_PROMPT_OVERRIDE]`).
- **OWASP Headers**: Strict `nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection`, and CSP headers.
- **Zero-Leak Policy**: All keys managed strictly via `.env` and excluded from git.
- **Resilient Fallback**: 100% operational offline across all 20 benchmark test scenarios.
