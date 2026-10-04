# 🔑 BlindSpot — Credentials & Setup Guide

This guide walks you through setting up credentials for **BlindSpot (Multi-Agent Reasoning Audit Engine)**.

---

## 1. 🤖 Google Gemini AI Key Setup (Primary)

BlindSpot uses Google's latest **Gemini 2.5 Flash** (`gemini-2.5-flash`) via the `google.genai` SDK for structured JSON multi-agent reasoning.

### How to get your API Key:
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Sign in with your Google account.
3. Click **"Create API Key"** (choose or create a Google Cloud Project).
4. Copy your API Key.

### Where to add your API Key:
Open the [.env](file:///c:/Users/sumed/promptwars-kit/.env) file in the root directory and paste your key:

```env
GEMINI_API_KEY=AIzaSyYourGeminiApiKeyHere...
GEMINI_MODEL=gemini-2.5-flash
AI_MOCK_FALLBACK=true
```

> **Note on Offline Fallback**: If `GEMINI_API_KEY` is left blank, BlindSpot automatically falls back to its dynamic multi-scenario reasoning engine, so all 20 benchmark test scenarios and UI features work out of the box even without an active internet connection.

---

## 2. 🌐 Frontend API Connection

The frontend connects to the FastAPI backend via `VITE_API_BASE_URL`.

### Local Development:
File: [.env](file:///c:/Users/sumed/promptwars-kit/frontend/.env) and [project_blindspot/frontend/.env](file:///c:/Users/sumed/promptwars-kit/project_blindspot/frontend/.env)
```env
VITE_API_BASE_URL=http://localhost:8000
```

### Production Deployment (e.g., Cloud Run / Vercel / Render):
```env
VITE_API_BASE_URL=https://your-backend-api-url.a.run.app
```

---

## 3. ☁️ Optional Google Cloud Services (Kit Starter Adapters)

If using Google Cloud Storage or Google Maps adapters from the starter kit:

```env
GOOGLE_CLOUD_PROJECT=your-gcp-project-id
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
FIREBASE_PROJECT_ID=your-firebase-project-id
```

---

## 4. 🚀 Verification Checklist

Run the verification test suite to ensure all credentials and endpoints are functioning:

```bash
# Run 27/27 integration and scenario tests
python -m pytest backend/tests/test_scenario_bank.py backend/tests/test_blindspot.py -v
```
