# BlindSpot — PromptWars Pitch & Demo Playbook

> **The Definitive Hackathon Battle Script, Live Demo Guide, and Technical Defense Manual**  
> *Repository: `SumedhXy/blindspot` | Stack: React 18 + Vite + FastAPI + Google Gemini + Pydantic v2*

---

## 1. Executive Summary & Product Positioning

### 🎯 Core Positioning (The One Sentence)
> **"BlindSpot does not make the decision for you. It stress-tests the reasoning behind your decision and identifies what you may need to investigate before deciding."**

### 🚫 What BlindSpot is NOT:
- **NOT** a recommendation engine (it will never tell you *"You should accept this job"* or *"Decline this offer"*).
- **NOT** a decision-scoring system (no fake *"8.5/10 Decision Quality"* numbers).
- **NOT** a prediction engine or fortune teller.
- **NOT** a generic conversational chatbot.

### 💡 Why It Exists:
People fail at decision-making not because they lack intelligence, but because of **visibility bias**: they optimize for what is immediately visible (stipend, company brand, commute distance) while ignoring unstated assumptions, missing variables, and internal reasoning conflicts. BlindSpot acts as an adversarial cognitive auditor, breaking down rationales into 6 structured analytical lenses.

---

## 2. Problem Statement Breakdown

### The Visibility Trap
When considering high-stakes personal, academic, or professional commitments:
1. **Salience Bias**: Visible metrics (e.g. ₹25,000 stipend, 15 km distance) overshadow invisible structural terms (e.g. Discretionary PPO clause, 100% bug-triage workload, lack of mentorship).
2. **Axiomatic Assumptions**: Unverified beliefs are treated as established facts (*"Well-known company = high engineering mentorship"*).
3. **Internal Friction**: Stated core priorities (*"Deep career growth"*) directly clash with daily operational realities (*"9.5 hour shifts of manual ticket triage"*).
4. **Failure of Pros & Cons Lists**: Traditional pros/cons lists merely list visible opinions side-by-side with equal weight; they cannot audit **fragility**, quantify **sensitivity**, or cross-examine **external contract grounding**.

---

## 3. Implemented Solution & Workflow

BlindSpot implements a deterministic, multi-agent cognitive audit pipeline:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           BLINDSPOT USER WORKFLOW                           │
└─────────────────────────────────────────────────────────────────────────────┘

 1. USER INPUT           • Decision Statement (e.g., "Accept 6-month internship?")
                         • Context & Rationale (Stipend, distance, beliefs)
                         • Ranked Priorities (Career growth, Learning, Money)
                         • Optional Document Grounding (Offer letter / Contract text)
                                         ↓
 2. MULTI-AGENT          • Agent 1 (Dissector): Extracts atomic claims & assumptions
    KERNEL TRACE         • Agent 2 (Antagonist): Probes fragility & maps friction
                         • Agent 3 (Risk Auditor): Quantifies volatility & grounds text
                                         ↓
 3. 6-LENS REASONING     [Lens 1] Assumptions & Sensitivity Ranking
    AUDIT MATRIX         [Lens 2] Missing Information & Investigative Questions
                         [Lens 3] Reasoning Tensions (Priority vs. Reality)
                         [Lens 4] Alternative Perspectives (Opportunity Cost, Future Self)
                         [Lens 5] Evidence Gaps & Contract Clause Grounding
                         [Lens 6] Counterfactual Stress-Test Simulation
                                         ↓
 4. INTERACTIVE          • User tests conviction against high-impact premise flip
    STRESS-TEST          • Answers YES / MAYBE / NO → Receives Socratic feedback
                                         ↓
 5. INVESTIGATION        • Dynamic, actionable verification tasks to resolve BEFORE signing
    CHECKLIST            • User makes their OWN fully informed decision with clarity
```

---

## 4. The Magic Moment: Counterfactual Stress-Testing

### ⚡ The Single Strongest Feature
In traditional AI tools, asking *"Should I take this internship?"* yields generic advice (*"Make a list of goals and talk to your mentor"*).

**In BlindSpot, the magic moment is the Counterfactual Stress Test:**
1. BlindSpot identifies the user's **#1 load-bearing unstated assumption**:  
   *Assumption: "Company reputation guarantees high engineering learning quality."* (Sensitivity: 92%)
2. It generates a **plausible high-friction counterfactual scenario**:  
   *"During your first month, you discover 75% of your time is assigned to manual QA ticket triage with zero senior engineering code reviews."*
3. It asks the decisive stress-test question:  
   *"If the daily work consists primarily of manual backlog triage, would you still accept this 6-month commitment?"*
4. The user clicks **YES**, **MAYBE**, or **NO** → Triggering real-time Socratic feedback that reveals whether their decision logic is resilient, threshold-sensitive, or decoupled from their stated goals.

---

## 5. The Six Reasoning Lenses

| Lens | What It Detects | Why It Matters | Implemented Output |
|---|---|---|---|
| **1. Assumptions** | Unproven beliefs taken as facts | Decisions collapse when foundation assumptions fail | Title, explanation, impact badge (HIGH/MED/LOW), sensitivity score %, adversary challenge |
| **2. Missing Information** | Critical unknown variables | Unknown unknowns carry the highest downside risk | Missing item, why it matters, specific investigative question to resolve |
| **3. Reasoning Tensions** | Friction between priorities & choices | Reveals self-deception and hidden compromises | Stated Priority vs. Conflicting Reason side-by-side with probing Socratic question |
| **4. Alternative Perspectives** | Viewpoints outside the user's frame | Breaks tunnel vision | Lenses: *Opportunity Cost, 5-Year Future Self, Senior Engineer, Employer View* |
| **5. Evidence Gaps** | Unevidenced claims vs. verified facts | Separates wishful thinking from verifiable proof | Stated claim, current evidence, proof items to seek, and raw document citations |
| **6. Interactive Stress Test** | Fragility of top assumption | Forces user to test conviction against adverse scenarios | Interactive YES / MAYBE / NO scenario with dynamic feedback & checklist expansion |

---

## 6. Live Demo Pitch Scripts

### ⏱️ 30-Second Elevator Pitch
> *"When people make big career or financial decisions, they almost always optimize for what is visible—like salary or prestige—while ignoring unstated assumptions and contract traps. BlindSpot is an AI-powered cognitive auditor. You share your decision rationale and optional offer letter, and BlindSpot runs a 3-agent audit across 6 analytical lenses—uncovering hidden assumptions, reasoning tensions, and missing variables. Most importantly, it never tells you what to do—it subjects your reasoning to counterfactual stress-tests so you can make an informed decision yourself."*

---

### ⏱️ 60-Second Standard Pitch
> *"Every day, students and professionals make life-altering decisions based on incomplete reasoning. Take an internship: you see a ₹25,000 stipend and a big brand name, so you assume you’ll get great mentorship. But is that evidenced anywhere in your contract?*  
>  
> *BlindSpot solves this. Instead of asking AI 'What should I do?', you submit your rationale and offer letter to BlindSpot. Our Multi-Agent kernel extracts atomic claims, cross-references them against raw document clauses, and identifies critical blind spots across 6 lenses—including unstated assumptions, evidence gaps, and reasoning tensions.*  
>  
> *The magic moment is our interactive Counterfactual Stress Test: BlindSpot identifies your most sensitive assumption and tests what happens if that premise fails. We adhere strictly to a zero-recommendation gate: BlindSpot never decides for you—it equips you with the exact investigative questions you must answer before signing."*

---

### ⏱️ 2–3 Minute Technical Deep-Dive Pitch
> *"Hello judges. I'm presenting BlindSpot, an enterprise-grade AI decision stress-testing platform built with React, FastAPI, and Google Gemini.*  
>  
> *The core technical problem in building a cognitive decision auditor is preventing the LLM from taking the easy way out: generic advice and sycophantic agreement. We solved this with a 4-layer architecture:*  
>  
> *First, our **Multi-Agent Deliberation Kernel** structures the prompt into 3 adversarial personas: The Dissector extracts atomic claims; The Antagonist aggressively stress-tests fragility; and The Risk Auditor quantifies volatility and builds the stress-test.*  
>  
> *Second, our **Document Grounding Engine** parses raw text contracts and offer letters, automatically contrasting user beliefs against verified clauses—like showing that an assumed PPO is actually discretionary per Clause 4.1.*  
>  
> *Third, our **Deterministic Guardrail Layer** enforces strict non-prescriptive compliance. Even if a model slips into directive phrasing, our guardrail intercepts and neutralizes it into Socratic inquiry.*  
>  
> *Finally, on the engineering side, we implemented in-memory SHA256 LRU caching (<1ms response on repeat audits), GZip payload compression, non-blocking asynchronous FastAPI endpoints, sliding-window rate limiting, and complete OWASP security headers.*  
>  
> *Let's jump into the live demo."*

---

## 7. Step-by-Step Live Click Demo Script

```
========================================================================================
                               LIVE DEMO BATTLE PLAN
========================================================================================
```

### 📍 Step 1: Open the App & Load Benchmark Dilemma
- **Action**: Click the **"Load Flagship Internship Benchmark"** preset button at the top of the form.
- **What Appears**: 
  - Decision: *"Should I accept this 6-month software engineering internship?"*
  - Context: *"The company is well known. The stipend is ₹25,000 per month. It is 15 km from my home. I believe it will give me valuable industry experience."*
  - Priorities: `Career growth`, `Learning`, `Education`, `Money`, `Convenience`.
  - Raw Document Context: Active with clauses (Clause 1.1 Bug Triage, Schedule B Stipend, Clause 4.1 Discretionary PPO).
- **Spoken Narration**:  
  *"We’re loading the classic hackathon dilemma: a student considering a 6-month internship because of good stipend and brand prestige. Notice we also attach the raw offer letter clauses."*

---

### 📍 Step 2: Trigger Audit & Inspect Agent Terminal Trace
- **Action**: Click the orange **"Run Multi-Agent Reasoning Audit"** button.
- **What Appears**: The audit completes in <1 second. The top **Multi-Agent Kernel Trace** expands showing the 3 debate turns (Dissector → Antagonist → Risk Auditor) with millisecond offsets and grounding status.
- **Spoken Narration**:  
  *"Behind the scenes, our 3-agent kernel executed the audit. Agent 1 dissected the raw claims, Agent 2 found the friction against 'Career Growth', and Agent 3 grounded the findings against the contract clauses."*

---

### 📍 Step 3: Show the 1-View Executive Clarity Matrix
- **Action**: Scroll down slightly to the **"Executive 1-View Clarity Matrix"**.
- **What Appears**: 
  - Side-by-side comparison of **Path A (Proceed / Commit)** vs. **Path B (Recharge / Hold Buffer)**.
  - The **Socratic Litmus Test**: *"If you commit to Path A, what is the single irreversible downside you are willing to accept? If you choose Path B, what high-leverage milestone will you achieve instead?"*
- **Spoken Narration**:  
  *"Notice our 1-View Clarity Matrix. Crucially, it does not tell the user which path to pick. Instead, it frames the fundamental trade-off and asks the Socratic litmus question."*

---

### 📍 Step 4: Explore the 6 Analytical Lenses
- **Action**: Click between the Lens Tabs:
  - **Lens 1 (Assumptions)**: Point out *"Company Reputation = High Learning Quality"* with **92% Sensitivity Leverage**.
  - **Lens 3 (Reasoning Tensions)**: Point out the friction between *"Priority: Deep Career Growth"* vs. *"Reason: 15 km commute & ₹25,000 stipend"*.
  - **Lens 5 (Evidence Gaps)**: Show the orange box citing **Clause 4.1** from the raw document proving PPO is discretionary.
- **Spoken Narration**:  
  *"Under Lens 5, look at how document grounding works: the user assumed guaranteed career growth, but BlindSpot extracted Clause 4.1 showing PPO is discretionary, highlighting the evidence gap."*

---

### 📍 Step 5: Execute the Magic Moment (Stress Test)
- **Action**: Scroll to the **Interactive Stress-Test Section**.
- **Action**: Read the scenario premise: *"During your first month, you discover 75% of your time is assigned to manual QA ticket triage with zero mentorship."*
- **Action**: Click **"YES (Changes My Mind)"**.
- **What Appears**: Dynamic Socratic verdict appears: *"High Sensitivity Confirmed — Pivot Triggered"*, generating targeted investigation items.
- **Action**: Click **"Add to Action Checklist"**.
- **Spoken Narration**:  
  *"This is the magic moment. By testing what happens when the core assumption fails, the user discovers their decision is hyper-sensitive to task quality, adding concrete questions to their pre-signing checklist."*

---

### 📍 Step 6: Trigger Adversarial Challenger Modal
- **Action**: Click the **"Adversarial Challenge"** button in the header.
- **Action**: Show the modal analyzing the *Strongest Argument*, *Weakest Assumption*, and *The Socratic Litmus Test*.
- **Action**: Press the <kbd>Escape</kbd> key to close the modal cleanly.
- **Spoken Narration**:  
  *"Our adversarial challenger cross-examines the user's convictions without giving advice. And the modal is fully keyboard-accessible."*

---

## 8. Technical Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       BLINDSPOT SYSTEM ARCHITECTURE                         │
└─────────────────────────────────────────────────────────────────────────────┘

 [ Client Browser ] (React 18 + TypeScript + Vite + Mastercard Aesthetic Theme)
       │
       │ HTTP / JSON (GZip Compressed, <1ms Cached / <1.2s Live)
       ▼
 [ FastAPI Gateway ] (Port 8000 / Single-Container Production Runtime)
       │
       ├──► SecurityHeadersMiddleware (CSP, HSTS, X-XSS: 0, Permissions-Policy)
       ├──► SlidingWindowRateLimiter (Per-IP Sliding Window Throttling)
       ├──► CORSMiddleware (Fail-Closed in Production on Wildcards)
       ├──► Static SPA File Handler (Path-traversal safe fallback + strict API 404s)
       │
 [ Project BlindSpot Router ] (/api/v1/blindspot)
       │
       ├──► async def non-blocking endpoints (asyncio.to_thread)
       ├──► Pydantic v2 Request Validation (BlindSpotAnalyzeRequest)
       │
 [ BlindSpotAIEngine ]
       │
       ├──► SimpleLRUCache (Thread-Safe SHA-256 In-Memory LRU Cache)
       ├──► Unicode NFKC Prompt Sanitizer (Zero-width strip, override defense)
       │
       ├──► [ Online Branch ] ──► GeminiAdapter (google-genai SDK / Structured JSON)
       │                                │
       └──► [ Offline Branch ] ─► fallback_audit.py (20 Deterministic Benchmark Dilemmas)
                                        │
                                        ▼
                         [ Guardrails Validation Layer ] (guardrails.py)
                         - Neutralizes any directive phrasing ("you should" -> Socratic)
                         - Validates zero numerical decision score
                         - Attaches source metadata ('ai' | 'offline_fallback')
                                        │
                                        ▼
 [ Pydantic Response Envelope ] (BlindSpotAnalysisResponse across 6 Lenses)
```

---

## 9. AI Engineering & Prompt Architecture

### Why Google Gemini?
1. **Native Structured Output**: Gemini natively adheres to strict Pydantic JSON schemas without requiring regex extraction or flaky JSON repair libraries.
2. **Document Context Ingestion**: Easily swallows 15,000+ character raw contracts, offer letters, and syllabi for grounding.
3. **Sub-second Latency**: Fast time-to-first-token allows the 6-lens multi-agent audit to complete in ~1.2 seconds.

### Prompt Architecture & Negative Constraints
Here is the core sanitized system instruction architecture implemented in [project_blindspot/prompts.py](file:///c:/Users/sumed/promptwars-kit/project_blindspot/prompts.py):

```
SYSTEM INSTRUCTION:
You are BlindSpot, an expert analytical cognitive auditor.
Your job is to stress-test the user's decision reasoning across 6 structured lenses.

STRICT NEGATIVE CONSTRAINTS (VIOLATIONS WILL BE REJECTED):
1. NEVER tell the user what decision to make (NO "You should...", NO "I recommend...").
2. NEVER output a single decision score (NO "8/10 decision quality").
3. NEVER take a side. Maintain rigorous, neutral, Socratic objectivity.
4. If raw document text is provided, CROSS-REFERENCE all claims against verified clauses.
5. All outputs must match the requested Pydantic JSON schema precisely.
```

---

## 10. Security & Hardening Matrix

| Security Domain | Implemented Mechanism | Why It Matters |
|---|---|---|
| **CORS Policy** | Fails closed in production; rejects `*` when credentials enabled | Prevents cross-origin credential theft and unauthorized API access |
| **Rate Limiting** | Per-IP sliding-window limiter in `rate_limiter.py` | Defends AI endpoints against denial-of-service and quota exhaustion |
| **Prompt Sanitization** | `unicodedata.normalize("NFKC")` + zero-width strip + regex filter | Neutralizes prompt injection, delimiter breakout, and system spoofing |
| **OWASP Headers** | `X-XSS: 0`, `HSTS`, `CSP`, `COOP`, `Permissions-Policy` | Comprehensive browser security against XSS, clickjacking, and sniffing |
| **Secrets Management** | Dynamic loading from `.env` / Render env vars; zero hardcoded keys | Eliminates credential leakage risks in source control |
| **API Boundary** | Strict JSON HTTP 404 for unknown `/api/*` paths | Prevents SPA routing from swallowing API errors or returning fake 200s |

---

## 11. Reliability & Graceful Failure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        FAILURE MODE & RECOVERY PLAN                         │
└─────────────────────────────────────────────────────────────────────────────┘

 SCENARIO 1: Gemini API Rate Limit / Network Outage
 ➔ ACTION: Engine seamlessly routes to `fallback_audit.py` with 20 pre-calibrated 
    deterministic dilemmas. Zero UI crash, zero 500 error.

 SCENARIO 2: Malformed JSON from Model
 ➔ ACTION: Pydantic v2 validation catches schema errors; engine falls back to 
    safe dynamic reasoning structure with 100% type safety.

 SCENARIO 3: Repeated User Submissions
 ➔ ACTION: In-memory SHA-256 LRU Cache intercepts duplicate queries and returns 
    instantaneous cached response in < 1ms.

 SCENARIO 4: Prompt Injection Attack in User Input
 ➔ ACTION: Sanitizer strips `<|im_start|>`, `SYSTEM:`, and override instructions, 
    treating all user text as raw unprivileged data strings.
```

---

## 12. Top 25 Toughest Judge Questions & Answers

### 1. "Isn't this just ChatGPT with a nice UI?"
- **Best Answer**: *"No. ChatGPT is an unconstrained conversational chatbot optimized to give advice and agree with the user. BlindSpot is a structured cognitive audit pipeline. It decomposes reasoning into 6 specialized analytical lenses, grounds claims against raw contract text, quantifies sensitivity leverage, and runs an interactive counterfactual stress-test. Most importantly, it enforces a strict negative constraint gate: it is architecturally prevented from telling you what to do."*
- **Short Version**: *"ChatGPT gives conversational advice; BlindSpot audits reasoning structure and runs counterfactual stress-tests."*
- **Do NOT Say**: *"Yes, but our prompt is really long."*

### 2. "How do you prevent the AI from making the decision for the user?"
- **Best Answer**: *"Through a two-tier defense: First, strict negative constraints in the system prompt prohibiting directive language ('you should', 'you must'). Second, an automated deterministic post-processing guardrail in `guardrails.py` that scans the output and rewrites any accidental prescriptive phrases into open Socratic inquiry questions."*
- **Short Version**: *"Prompt-level negative constraints + deterministic code guardrails that convert directives into Socratic questions."*
- **Do NOT Say**: *"We just asked Gemini nicely not to give advice."*

### 3. "What if the AI hallucinates or gives wrong assumptions?"
- **Best Answer**: *"BlindSpot is designed around user reflection, not ground-truth oracle prediction. Even an imperfect counterfactual assumption serves its cognitive purpose: it forces the user to ask, 'Is this premise true, and does my decision depend on it?' Furthermore, for factual verification, our Document Grounding layer ties claims directly to citations in the user's uploaded contract."*
- **Short Version**: *"Assumptions are prompts for human reflection, and contract citations are grounded in raw text."*
- **Do NOT Say**: *"Gemini never hallucinates."*

### 4. "Why is there no single numerical score (like 85/100 Decision Score)?"
- **Best Answer**: *"Because a single numerical score for a personal life decision is fundamentally unscientific and misleading. High-stakes dilemmas involve subjective value trade-offs (e.g. money vs. mental health). Assigning a score would falsely imply the AI knows the 'correct' decision. Instead, we show sensitivity percentages per individual factor."*
- **Short Version**: *"Complex life trade-offs cannot be reduced to a single number without being fake."*
- **Do NOT Say**: *"We didn't have time to write a scoring algorithm."*

### 5. "What Google services are you using and why?"
- **Best Answer**: *"We use Google Gemini via the official `google-genai` SDK. We chose Gemini specifically for its native Pydantic structured output capabilities, fast inference latency, and large context window for ingesting raw legal and employment contracts for grounding."*
- **Short Version**: *"Google Gemini for native structured JSON outputs and document grounding."*
- **Do NOT Say**: *"We used Maps and Firebase even though they aren't in the demo."*

### 6. "What happens if the Gemini API goes down during the demo?"
- **Best Answer**: *"We engineered the AI layer as an isolated adapter. If Gemini is unreachable, our system immediately falls back to our deterministic multi-scenario engine in `fallback_audit.py`, which supports 20 rich real-world dilemmas with 100% schema parity."*
- **Short Version**: *"Our offline fallback engine seamlessly takes over with zero downtime."*
- **Do NOT Say**: *"The demo will fail."*

### 7. "How do you handle prompt injection?"
- **Best Answer**: *"In `backend/core/security.py`, `sanitize_prompt_input()` normalizes Unicode with NFKC, strips zero-width obfuscation characters, removes system override markers like `<|im_start|>` and `SYSTEM:`, and encapsulates user input within explicit data fences."*
- **Short Version**: *"Unicode normalization, zero-width stripping, pattern filtering, and data fencing."*
- **Do NOT Say**: *"FastAPI automatically stops prompt injection."*

### 8. "How does your Document Grounding work?"
- **Best Answer**: *"When a user pastes an offer letter or contract, the text is fed into the grounding pipeline. Gemini cross-references each user claim against the document clauses, identifying contradictions—such as a user claiming 'guaranteed PPO' when Clause 4.1 explicitly states 'discretionary subject to headcount'."*
- **Short Version**: *"It extracts clauses from the document and contrasts them against user assumptions."*
- **Do NOT Say**: *"We built a full vector database RAG pipeline in 3 hours."*

### 9. "Why not just use a Pros and Cons list?"
- **Best Answer**: *"Pros and cons lists only capture visible, top-of-mind metrics and treat all items with equal, static weight. BlindSpot audits what is invisible: unstated assumptions, missing variables, internal priority conflicts, and sensitivity leverage."*
- **Short Version**: *"Pros/cons lists track visible opinions; BlindSpot uncovers invisible assumptions and tests fragility."*
- **Do NOT Say**: *"Pros and cons lists are completely useless."*

### 10. "How does the Counterfactual Stress-Test work?"
- **Best Answer**: *"The engine identifies the assumption with the highest sensitivity score, flips that premise into an adverse scenario (e.g. 'What if mentorship is zero?'), and prompts the user for their reaction (YES/MAYBE/NO), generating targeted investigation tasks."*
- **Short Version**: *"It flips the user's #1 most sensitive assumption to test if their rationale holds."*
- **Do NOT Say**: *"It predicts the future."*

### 11. "Where is your dataset?"
- **Best Answer**: *"The problem statement specified that no organizer dataset would be provided. BlindSpot is reasoning-driven: it operates on the user's context and uploaded contracts in real time rather than querying a static database."*
- **Short Version**: *"It evaluates real-time user rationale and contracts dynamically."*
- **Do NOT Say**: *"We forgot to train a model."*

### 12. "How would you scale this to 100,000 users?"
- **Best Answer**: *"Our FastAPI backend is fully asynchronous (`asyncio.to_thread`) and stateless. For production scale, we would move our in-memory LRU cache and rate limiter to Redis clusters, deploy workers on Kubernetes/Cloud Run, and leverage Gemini's batched API endpoints."*
- **Short Version**: *"Stateless async architecture + Redis caching + Cloud Run auto-scaling."*
- **Do NOT Say**: *"A single free Render instance is enough."*

### 13. "What is the biggest limitation of BlindSpot today?"
- **Best Answer**: *"BlindSpot relies on the quality of context provided by the user. If a user completely omits a critical fact and provides no document, the AI can only probe based on domain heuristics. Our future scope addresses this with automated external verification APIs."*
- **Short Version**: *"Output quality depends on context and document completeness."*
- **Do NOT Say**: *"There are no limitations."*

### 14. "What tests do you have in the codebase?"
- **Best Answer**: *"We have 46 passing pytest tests covering API endpoints, Pydantic schemas, security headers, rate limiting, prompt sanitization, LRU cache performance, and 20 real-world benchmark scenario audits."*
- **Short Version**: *"46 backend tests with 100% pass rate covering security, performance, and reasoning."*
- **Do NOT Say**: *"We tested it manually in the browser."*

### 15. "Why did you choose React + Vanilla CSS / Theme tokens instead of Tailwind?"
- **Best Answer**: *"We built a custom Mastercard-inspired editorial design system using CSS variables and tokens for precise typography, WCAG AA high-contrast ratios, and responsive glassmorphism without bloated build dependencies."*
- **Short Version**: *"Custom design tokens gave us pixel-perfect control and WCAG AA contrast."*
- **Do NOT Say**: *"We didn't know how to install Tailwind."*

### 16. "Is the multi-agent debate running separate LLM calls?"
- **Best Answer**: *"To stay within hackathon latency constraints (~1.2s response time), we execute the 3-agent debate kernel within a single structured prompting pipeline that returns explicit execution traces for each agent role."*
- **Short Version**: *"A single-pass multi-persona pipeline to guarantee sub-2-second latency."*
- **Do NOT Say**: *"We make 15 sequential API calls."*

### 17. "How do you ensure accessibility (a11y)?"
- **Best Answer**: *"We use semantic HTML, ARIA dialog roles with keyboard <kbd>Escape</kbd> traps, high-contrast color tokens, clear focus rings, and proper form labeling."*
- **Short Version**: *"Semantic markup, ARIA modals, keyboard traps, and WCAG AA contrast."*
- **Do NOT Say**: *"Accessibility was our lowest priority."*

### 18. "How do you handle API timeouts?"
- **Best Answer**: *"All AI requests are bounded by `AI_TIMEOUT_SECONDS=30`. If an invocation times out, the backend gracefully catches the exception and falls back to our local reasoning engine."*
- **Short Version**: *"Bounded async timeouts with automatic fallback."*
- **Do NOT Say**: *"The request hangs forever."*

### 19. "Why did you use FastAPI over Node/Express?"
- **Best Answer**: *"FastAPI provides native Python integration with the Google Gemini SDK, automatic OpenAPI documentation, and strict Pydantic v2 data validation with high-performance async throughput."*
- **Short Version**: *"Python AI ecosystem integration + Pydantic v2 validation + async speed."*
- **Do NOT Say**: *"We just prefer Python."*

### 20. "What makes your UI design 'editorial'?"
- **Best Answer**: *"We used a high-contrast serif/sans typography pairing, card borders inspired by financial audit magazines, clear badge hierarchies, and minimal cognitive clutter."*
- **Short Version**: *"Financial audit magazine aesthetic optimized for cognitive clarity."*
- **Do NOT Say**: *"We copied a template."*

### 21. "Can this be used for enterprise decisions (like hiring or acquisitions)?"
- **Best Answer**: *"Yes. The underlying cognitive architecture—extracting claims, identifying missing variables, finding priority conflicts, and running counterfactual stress-tests—applies directly to vendor selection, hiring, and M&A diligence."*
- **Short Version**: *"The reasoning audit framework is completely domain-agnostic."*
- **Do NOT Say**: *"It's only for students."*

### 22. "What happens if someone enters malicious code in the input?"
- **Best Answer**: *"All text is sanitized against HTML/XSS injection in `sanitize_text()`, and React automatically escapes JSX text expressions. On the backend, inputs are parsed as strict Pydantic strings."*
- **Short Version**: *"XSS escaping + strict Pydantic string validation + React JSX escaping."*
- **Do NOT Say**: *"Nothing, because Python is secure."*

### 23. "How did you build this in 3 hours?"
- **Best Answer**: *"We prioritized architecture first: defined the Pydantic schemas and 6-lens structure in the first 45 minutes, implemented the Gemini adapter and guardrails in hour 2, and built the React UI and test suite in hour 3."*
- **Short Version**: *"Schema-first design + rapid component assembly + rigorous test suite."*
- **Do NOT Say**: *"We copy-pasted everything."*

### 24. "What would you build next with more time?"
- **Best Answer**: *"1) Longitudinal decision tracking to compare predicted assumptions against real-world 6-month outcomes. 2) Direct PDF upload parsing for contracts. 3) Multi-model cross-verification (Gemini + Claude consensus auditing)."*
- **Short Version**: *"Outcome feedback loops, PDF contract uploads, and multi-model consensus."*
- **Do NOT Say**: *"Add a blockchain token."*

### 25. "What is your closing thought for the judges?"
- **Best Answer**: *"BlindSpot proves that AI is most powerful not when it replaces human judgment, but when it elevates it. BlindSpot doesn't tell you what decision to make—it tells you what your decision may be missing."*
- **Short Version**: *"AI should elevate human judgment, not replace it."*
- **Do NOT Say**: *"Please give us 1st place."*

---

## 13. Limitations & Future Scope

### ⚠️ Honest Limitations
1. **Context Dependency**: The audit relies on the completeness of user rationale and uploaded text.
2. **Subjective Boundary**: Socratic questions guide thinking but cannot guarantee human follow-through.
3. **Model Non-Determinism**: Minor phrasing variations may occur across live LLM calls (mitigated by Pydantic schema validation).

### 🚀 Future Roadmap (Post-Hackathon)
- **Phase 1**: Native PDF/DOCX drag-and-drop parsing for enterprise contracts.
- **Phase 2**: Multi-Model Consensus Engine (Cross-verifying assumptions between Gemini and Claude).
- **Phase 3**: Outcome Feedback Loop (Tracking decisions 6 months later to calibrate personal cognitive biases).

---

## 14. Emergency Demo Failure Backup Plan

| If This Happens... | Here Is The Exact Plan: |
|---|---|
| **Gemini API Down / Offline** | The app automatically uses `fallback_audit.py`. The demo continues without interruption. Point out: *"Our architecture is resilient: we built an offline multi-scenario fallback."* |
| **Render Cloud Free Instance Sleeping** | Open the local dev server (`http://localhost:5173`) which is already running and identical to the deployed build. |
| **Internet Outage** | Run locally on `127.0.0.1:8000` and `localhost:5173` in offline mode. All 46 tests and fallback scenarios work 100% offline. |
| **Accidental Bad Input Entered** | Click the **"Load Flagship Internship Benchmark"** button to instantly restore the pristine demo state in 1 click. |

---

## 15. Final 15-Second Closing Statement

> **"Judges, BlindSpot proves that AI is at its best when it elevates human judgment rather than replacing it.  
> BlindSpot doesn't tell you what decision to make.  
> It tells you what your decision may be missing.  
> Thank you."**

---

## 16. PromptWars One-Screen Battle Card

```
========================================================================================
                              PROMPTWARS BATTLE CARD
========================================================================================

 📌 POSITIONING:      BlindSpot does not make decisions for you. It stress-tests 
                      reasoning across 6 lenses to uncover blind spots.

 📌 MAGIC MOMENT:     Interactive Counterfactual Stress-Test (flips #1 assumption).

 📌 TECH STACK:       React 18 + Vite + FastAPI + Google Gemini (google-genai) + Pydantic v2.

 📌 PERFORMANCE:      SHA-256 LRU Cache (<1ms hit) + GZip compression + async concurrency.

 📌 SECURITY:         CORS fail-closed + rate limiting + Unicode NFKC prompt sanitization + OWASP.

 📌 TESTS:            46 / 46 passing pytest tests (100% pass rate).

 📌 KEY DIFFERENTIATOR: Zero recommendations, zero fake scores, document grounding.

 📌 CLOSING LINE:     "BlindSpot doesn't tell you what decision to make. It tells you 
                      what your decision may be missing."
========================================================================================
```
