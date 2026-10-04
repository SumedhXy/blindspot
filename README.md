# PromptWars Competition Kit ⚡

> **A high-speed, production-quality foundation for competitive 3-hour AI-assisted coding events.**

---

## 1. What This Kit Is
The **PromptWars Competition Kit** is a reusable, lightweight engineering foundation designed to build, test, deploy, and submit a high-scoring web application when an unknown problem statement is revealed and only 3 hours are available.

It provides pre-built infrastructure for the 7 official AI Evaluator criteria:
1. **Code Quality** (Clean modular architecture, typed schemas)
2. **Security** (Prompt injection defense, OWASP headers, secret isolation)
3. **Efficiency** (Lightweight runtime, instant SQLite/Postgres persistence)
4. **Testing** (Pytest suite for unit, API, AI validation, failure states)
5. **Accessibility** (Semantic HTML, WCAG AA contrast, keyboard navigation)
6. **Problem Alignment** (Decomposition matrices, fast MVP blueprints)
7. **Google Services** (Modular adapters for Gemini, Maps, Firebase, Translate, GCS)

---

## 2. Architecture Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (React + Vite + TS)           │
│  - AppShell, Header, Sidebar, MainContent, UI Components    │
│  - Layouts: Dashboard | Workflow | AI Workspace             │
│  - Central Theme Config: frontend/src/config/theme.ts       │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / JSON
┌──────────────────────────────▼──────────────────────────────┐
│                   BACKEND (FastAPI + Pydantic)              │
│  - Root Health Endpoint: GET /health                        │
│  - SecurityHeadersMiddleware & Prompt Sanitizer             │
│  - SQLite (dev) / PostgreSQL (prod) via SQLAlchemy          │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                      AI & GOOGLE SERVICES                   │
│  - AI Service Layer (Structured, Grounded, Multimodal, Tool)│
│  - Google Adapters (Gemini, Maps, Firebase, Translate, GCS) │
│  - Safe Mock/Fallback Mode for Offline Testing              │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Quick Start

### Frontend
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (if not already installed)
npm install

# Start local dev server
npm run dev

# Build for production
npm run build
```

### Backend
```bash
# Install backend requirements
pip install -r backend/requirements.txt

# Run FastAPI backend server (port 8000)
uvicorn backend.main:app --reload --port 8000

# Run automated test suite
python -m pytest backend/tests -v
```

---

## 4. Environment Variables

Copy `backend/.env.example` to `backend/.env`:

```env
# Server
APP_NAME="PromptWars Starter Backend"
APP_ENV=development
DEBUG=true
PORT=8000
HOST=0.0.0.0

# Database
DATABASE_URL=sqlite:///./app_data.db

# Google AI (Gemini)
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
AI_MOCK_FALLBACK=true

# Google Services (Optional)
GOOGLE_MAPS_API_KEY=
FIREBASE_PROJECT_ID=
GOOGLE_CLOUD_PROJECT=

# Security
SECRET_KEY=dev-promptwars-insecure-secret-key-change-in-prod
RATE_LIMIT_PER_MINUTE=120
MAX_UPLOAD_SIZE_MB=10
```

---

## 5. Reusable AI Patterns

The AI layer in `backend/services/ai_service.py` provides 4 production-grade patterns:

### Pattern 1: Structured Output with Pydantic Validation
```text
User Input ➔ Prompt Sanitization ➔ Gemini API ➔ Pydantic Schema Validation ➔ Typed Response
```
- Endpoint: `POST /api/v1/ai/structured`
- Handles missing fields, JSON errors, and fallback recovery.

### Pattern 2: Grounded Assistant with Source Citation
```text
User Query + Approved Context ➔ Gemini Isolation ➔ Grounded Response + Missing Notes
```
- Endpoint: `POST /api/v1/ai/grounded`
- Instructs model never to hallucinate unavailable facts.

### Pattern 3: Multimodal Asset Processing
```text
Visual Input (Base64) ➔ Gemini Multimodal ➔ Structured Observations ➔ Human Confirmation Gate
```
- Endpoint: `POST /api/v1/ai/multimodal`

### Pattern 4: Controlled Deterministic Tools
```text
AI Tool Proposal ➔ Whitelist Check ➔ Deterministic Tool Execution ➔ Return Output
```
- Endpoint: `POST /api/v1/ai/tool`
- Strictly whitelisted; zero arbitrary code or shell execution.

### Bounded Agent Kernel
- Endpoint: `POST /api/v1/ai/workflow`
- Provides multi-stage reasoning (`Analyzer` ➔ `Planner` ➔ `Action Proposal`) with bounded step limits (`max_steps`) and safe execution traces.

---

## 6. Google Service Adapters

Located in `google/adapters/`:
- `GeminiAdapter`: Text, structured JSON, and multimodal vision processing.
- `GoogleMapsAdapter`: Geocoding and distance matrix calculation.
- `FirebaseAdapter`: Token verification and user auth simulation.
- `GoogleTranslateAdapter`: Language translation and detection.
- `GoogleCloudStorageAdapter`: Asset upload and public URL resolution.

### Google Service Decision Rule:
> *"We use [SERVICE] because without it the user cannot [REQUIRED OUTCOME]."*
> *If this cannot be justified, do not include the service.*

---

## 7. Security Layer

- **Prompt Injection Defense**: Sanitizes input via `sanitize_prompt_input()`.
- **OWASP Headers**: `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, and CSP enabled.
- **Secrets Isolation**: No keys committed to repository; strictly loaded via environment variables.
- **Checklist**: See [security/SECURITY_CHECKLIST.md](file:///c:/Users/sumed/promptwars-kit/security/SECURITY_CHECKLIST.md).

---

## 8. Testing Suite

Run backend test suite with Pytest:
```bash
python -m pytest backend/tests -v
```
Covers:
- Root `/health` and `/api/v1/ping`
- All 4 AI Patterns and Agent Kernel
- Security, prompt injection filters, and OWASP headers
- CRUD operations for database records
- Checklist: See [testing/TESTING_CHECKLIST.md](file:///c:/Users/sumed/promptwars-kit/testing/TESTING_CHECKLIST.md).

---

## 9. Deployment

- Multi-stage production container: [deployment/Dockerfile](file:///c:/Users/sumed/promptwars-kit/deployment/Dockerfile).
- Docker Compose config: [deployment/docker-compose.yml](file:///c:/Users/sumed/promptwars-kit/deployment/docker-compose.yml).
- Deployment instructions: See [deployment/DEPLOYMENT_CHECKLIST.md](file:///c:/Users/sumed/promptwars-kit/deployment/DEPLOYMENT_CHECKLIST.md).

---

## 10. Competition Workflow (3-Hour Plan)

Follow the structured workflow during the hackathon:
1. **00–10 min**: Decode problem with [prompts/PROBLEM_DECODER.md](file:///c:/Users/sumed/promptwars-kit/prompts/PROBLEM_DECODER.md).
2. **10–20 min**: Formulate architecture with [prompts/ARCHITECTURE_PLANNER.md](file:///c:/Users/sumed/promptwars-kit/prompts/ARCHITECTURE_PLANNER.md) and customize `theme.ts`.
3. **20–90 min**: Build core vertical slice with [prompts/BUILD_PROMPT.md](file:///c:/Users/sumed/promptwars-kit/prompts/BUILD_PROMPT.md).
4. **90–110 min**: Integrate AI Pattern and Google Adapter.
5. **110–125 min**: Run tests and review with [prompts/CODE_REVIEW.md](file:///c:/Users/sumed/promptwars-kit/prompts/CODE_REVIEW.md).
6. **125–135 min**: Verify accessibility with [accessibility/ACCESSIBILITY_CHECKLIST.md](file:///c:/Users/sumed/promptwars-kit/accessibility/ACCESSIBILITY_CHECKLIST.md).
7. **135–145 min**: Deploy and verify public `/health` endpoint.
8. **145–150 min**: Submit with [competition/FIRST_SUBMISSION.md](file:///c:/Users/sumed/promptwars-kit/competition/FIRST_SUBMISSION.md).
9. **150–165 min**: Analyze feedback using [prompts/EVALUATOR_FIX.md](file:///c:/Users/sumed/promptwars-kit/prompts/EVALUATOR_FIX.md).
10. **165–175 min**: Implement top High-ROI fixes.
11. **175–180 min**: Final verification and submit with [competition/SECOND_SUBMISSION.md](file:///c:/Users/sumed/promptwars-kit/competition/SECOND_SUBMISSION.md).

Full timeline details: [competition/THREE_HOUR_PLAN.md](file:///c:/Users/sumed/promptwars-kit/competition/THREE_HOUR_PLAN.md).
