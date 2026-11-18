# BrandLedger: every claim gets a receipt

BrandLedger checks every number, name, term and promise in a draft against a versioned Brand Source of Truth (each fact has an owner, a source and an expiry date), shows the approved source and a suggested fix, and lets a human decide. When it is unsure it abstains and asks the fact owner. When a fact changes, a reverse check finds published content that still carries the old claim. Every publish is sealed with a hash-linked receipt.

This package merges the Round 2 single-file prototype (`index.html`) with the corrected full-stack build.

## Quick start (no install)
Double-click `index.html`. Internet is needed for Google Fonts and, the first time you run OCR on your own image, to download the Tesseract.js reader. Pick a door on the sign-in page and enter your name.

Deploy as static: drag this folder to Vercel/Netlify or run `npx serve .`.

## What is inside
| Path | What it is |
|---|---|
| `index.html` | Complete working prototype: 3D animated landing page, door-style sign-in (4 roles, asks for your name), real in-browser OCR upload, 21 pages, light/dark, voice, hash-chained receipts. All data in localStorage. |
| `fullstack/backend` | FastAPI + SQLAlchemy: claim extractor, rules engine, retriever, cite-or-abstain verifier, validator, ledger, review and reverse-check APIs. |
| `fullstack/frontend` | React 19 + Vite source of the dashboard. |
| `extension/` | Chrome Manifest V3 "BrandLedger Guard" (talks to the backend on localhost:8000). |
| `docs/` | Architecture and Responsible AI disclosure. |

## Demo script (5 minutes)
1. Landing page: watch the draft type itself and get checked, apply the fixes and seal it, change F-021 on the pinboard to see stale items, click through the pipeline, try to cheat a receipt.
2. Open the **Writer** door and enter your name. Then: Check content > Load sample > Check claims. Click a highlighted claim to open the Evidence explorer.
3. Correction studio: Apply all fixes, or Dispute (reason dialog) / Ask owner. Submit for review.
4. Sign in as **Fact Owner**: Owner inbox > answer the ticket. Ledger: change F-021 and watch the reverse-check count rise.
5. Sign in as **Brand Manager**: Review queue (progress bar, trust score) > Approve and publish > Claim receipts > Simulate tampering > Export compliance report.
6. **Admin**: API playground, Browser extension simulator, Audit trail, Roles, Settings, Architecture and AI.

## Run the full stack (optional)
```
cd fullstack/backend && pip install -r requirements.txt && python -m uvicorn app.main:app --port 8000
cd fullstack/frontend && npm install && npm run dev
```
In `index.html` > API playground, "Send to live backend" calls `POST /api/v1/guard` on your running backend. Load `extension/` via chrome://extensions > Developer mode > Load unpacked.
For Vercel, deploy the `fullstack` folder as its own project; set `DATABASE_URL` to a managed Postgres for durable audit history.

## Responsible AI disclosure
Verification in `index.html` is deterministic rules plus keyword retrieval with no LLM call. OCR runs in your browser with Tesseract.js (script and language data load from a CDN); uploaded images are never sent anywhere, and the two sample banners fall back to their known text when offline. Sign-in is demo-only: the name you enter is stored in your browser and written to the audit trail. All data is fictional. The backend can use an LLM provider under a cite-or-abstain contract. Built with AI assistance (Claude).

Team NEXORA, Sri Krishna College of Engineering and Technology.
