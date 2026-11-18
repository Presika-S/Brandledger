# BrandLedger

**Every claim gets a receipt.**

BrandLedger is a content-verification system that checks every number, name, term and promise in a marketing draft against a single, versioned source of truth before anything is published. Each approved fact carries an owner, a source and an expiry date. Each publish is sealed with a tamper-evident receipt.

**Live demo:** [brandledger-nexora.vercel.app](https://brandledger-nexora.vercel.app/)

---

## The problem

Brand and marketing teams publish at speed, and the facts they rely on change just as quickly: prices, discounts, product specifications, legal terms, partner names, campaign dates. In most organisations those facts live in scattered documents and in people's memory. The result is predictable:

- A draft goes live with a figure that was correct last quarter.
- A promotion keeps running after its terms have expired.
- When a fact changes, nobody can say which published pages, banners or emails still carry the old version.
- When something goes wrong, there is no reliable record of who approved what, and on what evidence.

Generic AI writing assistants do not solve this. They can produce fluent text, but they cannot show where a claim came from, and they tend to answer confidently even when they do not know.

## Our solution

BrandLedger treats every statement in a draft as a claim that must be supported by evidence. It works in four steps:

1. **Extract.** The system identifies each checkable claim in the draft: numbers, names, terms and promises.
2. **Verify.** Each claim is compared with the Brand Source of Truth. The reviewer sees the approved source and a suggested correction beside the original text.
3. **Decide.** A person makes the final call. Where the evidence is insufficient, BrandLedger abstains and routes the question to the fact owner instead of guessing (a *cite-or-abstain* policy).
4. **Seal.** On publication, the content is recorded in a hash-linked ledger. Any later change to a sealed record is detectable.

When a fact is updated, a **reverse check** scans previously published content and flags every item that still carries the outdated claim, so corrections can be made before they cause harm.

## Key capabilities

| Capability | What it gives the team |
|---|---|
| **Versioned Brand Source of Truth** | One authoritative fact base. Each fact has a named owner, a cited source and an expiry date. |
| **Claim checking with evidence** | Every flagged claim shows the approved source and a suggested fix, so reviewers do not have to search for proof. |
| **Cite-or-abstain verification** | When evidence is missing or ambiguous, the system declines to answer and asks the fact owner. |
| **Human-in-the-loop review** | Writers, fact owners and brand managers each have a defined role. Nothing is published without a person's approval. |
| **Reverse check** | When a fact changes, published content that still uses the old claim is identified automatically. |
| **Hash-linked receipts** | Each publication is sealed in a chained ledger. Tampering is detected and can be demonstrated. |
| **Audit trail and compliance export** | Every action is attributed to a named user and can be exported as a compliance report. |
| **Image and banner checking** | In-browser OCR reads text from uploaded images, so banners are verified in the same way as copy. |
| **Browser extension** | BrandLedger Guard brings the same checks into the page where content is written. |

## Roles

| Role | Responsibility |
|---|---|
| **Writer** | Submits drafts, reviews flagged claims, applies fixes or disputes them, and submits for review. |
| **Fact Owner** | Maintains facts in the ledger and answers questions the system could not resolve. |
| **Brand Manager** | Reviews submissions, approves and publishes, and inspects receipts and compliance reports. |
| **Admin** | Manages roles and settings, and has access to the audit trail, API playground and architecture notes. |

## Try it

The prototype runs entirely in the browser and needs no account. Open the [live demo](https://brandledger-nexora.vercel.app/), choose a role on the sign-in page and enter your name.

**Suggested five-minute walkthrough**

1. **Landing page.** Watch a draft being checked and corrected, then sealed with a receipt. Change fact F-021 on the pinboard to see stale content appear.
2. **Writer.** Go to *Check content*, load the sample and run *Check claims*. Select a highlighted claim to open the Evidence explorer.
3. **Correction studio.** Apply all fixes, dispute a claim with a reason, or ask the fact owner. Then submit for review.
4. **Fact Owner.** Answer the ticket in the owner inbox. In the Ledger, change F-021 and watch the reverse-check count rise.
5. **Brand Manager.** Work through the review queue, approve and publish, open *Claim receipts*, use *Simulate tampering* to see detection, and export the compliance report.
6. **Admin.** Explore the API playground, browser extension simulator, audit trail, roles, settings and architecture pages.

## Architecture

BrandLedger is delivered in two complementary forms.

**Single-file prototype (`index.html`).** A complete, working demonstration with a 3D animated landing page, role-based sign-in, in-browser OCR, 21 pages, light and dark themes, voice input and hash-chained receipts. Verification is deterministic: rules plus keyword retrieval, with no language-model call. All data is stored in the browser's `localStorage`.

**Full-stack build (`fullstack/`).** The production-oriented design:

- **Backend:** FastAPI and SQLAlchemy, providing the claim extractor, rules engine, retriever, cite-or-abstain verifier, validator, ledger, and the review and reverse-check APIs.
- **Frontend:** React 19 and Vite, implementing the dashboard.
- **Extension:** a Chrome Manifest V3 extension, *BrandLedger Guard*, which calls the backend on `localhost:8000`.

The backend may use a language-model provider for reasoning, but only under the cite-or-abstain contract: an answer must point to a source in the ledger, or the system abstains.

## Repository structure

| Path | Contents |
|---|---|
| `index.html` | The complete single-file prototype. |
| `fullstack/backend` | FastAPI service and verification pipeline. |
| `fullstack/frontend` | React and Vite dashboard source. |
| `extension/` | Chrome extension (Manifest V3). |
| `docs/` | Architecture notes and the Responsible AI disclosure. |
| `vercel.json` | Static deployment configuration. |

## Getting started

### Run the prototype locally

Open `index.html` in a modern browser. An internet connection is needed for web fonts and, the first time you run OCR on your own image, to download the Tesseract.js reader.

To serve it over HTTP instead:

```bash
npx serve .
```

### Run the full stack

```bash
# Backend
cd fullstack/backend
pip install -r requirements.txt
python -m uvicorn app.main:app --port 8000

# Frontend (in a second terminal)
cd fullstack/frontend
npm install
npm run dev
```

In the prototype, the **API playground** has a *Send to live backend* action that calls `POST /api/v1/guard` on your running backend.

### Install the browser extension

1. Open `chrome://extensions` and enable **Developer mode**.
2. Choose **Load unpacked** and select the `extension/` folder.
3. Keep the backend running on port 8000.

### Deploy

The prototype is static and can be deployed to Vercel or Netlify as is. To deploy the full stack on Vercel, publish the `fullstack` folder as its own project and set `DATABASE_URL` to a managed PostgreSQL instance so that audit history is durable.

## Responsible AI

- **Deterministic by default.** The prototype's verification uses rules and keyword retrieval only. No language model is called.
- **Evidence over fluency.** The backend's model-assisted path must cite a ledger source or abstain.
- **People decide.** The system suggests and flags; humans approve, dispute and publish.
- **Privacy.** OCR runs in the browser with Tesseract.js. Uploaded images are never sent anywhere. The script and language data load from a CDN, and the two sample banners fall back to their known text when offline.
- **Demo sign-in.** Sign-in is for demonstration only. The name you enter is stored in your browser and written to the audit trail.
- **Fictional data.** All brands, facts and figures in this project are invented for demonstration.
- **Disclosure.** This project was built with AI assistance (Claude).

## Team

**Team NEXORA**, Sri Krishna College of Engineering and Technology.
