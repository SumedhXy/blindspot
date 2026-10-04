# Deployment Checklist & Production Guide

A working, accessible, public deployment is mandatory for both submission windows. Keep deployment simple, tested, and reproducible.

---

## 1. Pre-Deployment Configuration
- [ ] **Environment Variables Prepared**:
  - `APP_ENV=production`
  - `DEBUG=false`
  - `GEMINI_API_KEY=...` (set in host dashboard, NOT in code)
  - `DATABASE_URL=sqlite:///./app_data.db` (or managed Postgres URL)
  - `CORS_ORIGINS=https://your-frontend-domain.vercel.app`
- [ ] **Build Check Passed**:
  ```bash
  cd frontend && npm run build
  cd ../backend && python -m pytest backend/tests
  ```
- [ ] **Public Health Endpoint**: `/health` verified returning HTTP 200 OK.

---

## 2. Deployment Strategies

### Option A: Cloud Run / Docker (Recommended Single-Container)
```bash
# Build unified container
docker build -f deployment/Dockerfile -t promptwars-app .

# Run container locally to verify
docker run -p 8000:8000 --env-file backend/.env promptwars-app

# Deploy to Google Cloud Run
gcloud run deploy promptwars-solution \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars="APP_ENV=production,DEBUG=false,GEMINI_API_KEY=$GEMINI_API_KEY"
```

### Option B: Vercel / Netlify (Frontend) + Render / Fly.io (Backend)
1. **Frontend (Vercel / Netlify)**:
   - Root directory: `frontend`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Set environment variable: `VITE_API_URL=https://your-backend.onrender.com`
2. **Backend (Render / Railway / Fly.io)**:
   - Build command: `pip install -r backend/requirements.txt`
   - Start command: `uvicorn backend.main:app --host 0.0.0.0 --port 8000`
   - Set environment variable: `GEMINI_API_KEY=...`

---

## 3. Post-Deployment Verification (Run Within 5 Minutes of Deploy)
- [ ] **Live URL Loads**: Frontend displays themed interface and interactive components.
- [ ] **Health Check OK**: `https://<backend-url>/health` returns `{"status":"healthy",...}`.
- [ ] **CORS Verified**: Frontend can send queries and receive responses without browser CORS blocks.
- [ ] **AI Endpoint Working**: Structured analysis / grounded queries complete successfully.
- [ ] **Mobile Responsive**: Verified on mobile browser / responsive emulator.
