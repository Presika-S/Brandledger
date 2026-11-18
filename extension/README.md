# BrandLedger Guard Chrome Extension (Manifest V3)

The **BrandLedger Guard Extension** provides instant, in-browser pre-publish claim verification for content creators, copywriters, and AI generation tools (ChatGPT, Claude, Google Docs, Notion).

## Capabilities
- **Highlight & Verify**: Select any draft paragraph or AI output on any web page, right-click and choose "Verify with BrandLedger Guard", or click the extension icon and select "Grab Selection".
- **Real-Time Verification**: Connects to the local BrandLedger `/guard` endpoint (`http://localhost:8000/api/v1/guard`).
- **Claim Breakdown**:
  - 🟢 **VERIFIED**: Substantiated by active Brand Source of Truth facts.
  - 🔴 **FLAGGED**: Discrepancies (pricing, dates, SLAs, unauthorized terms) with approved suggested fixes.
  - 🟡 **ABSTAIN**: Unverified claims safely escalated to human Fact Owners.
- **Trust Score**: Real-time governance trust score gauge (0-100%).

## How to Install (Developer Mode)
1. Open Google Chrome or Microsoft Edge.
2. Navigate to `chrome://extensions` (or `edge://extensions`).
3. Toggle on **Developer mode** in the top-right corner.
4. Click **Load unpacked** in the top-left corner.
5. Select this folder (`C:\Users\meenu\.gemini\antigravity\scratch\brandledger\extension`).
6. The BrandLedger Guard extension is now active in your browser bar!
