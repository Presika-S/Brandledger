const API_URL = "http://localhost:8000/api/v1/guard";

document.getElementById("grabBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { action: "GET_SELECTION" }, (response) => {
    if (response && response.text) {
      document.getElementById("draftText").value = response.text;
      document.getElementById("verifyBtn").click();
    } else {
      alert("Please highlight text on the web page first!");
    }
  });
});

document.getElementById("verifyBtn").addEventListener("click", async () => {
  const text = document.getElementById("draftText").value.trim();
  if (!text) {
    alert("Please enter or highlight text to verify.");
    return;
  }

  const btn = document.getElementById("verifyBtn");
  btn.disabled = true;
  btn.innerText = "Verifying...";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: text,
        title: "Browser Extension Selection"
      })
    });

    if (!res.ok) throw new Error("API call failed: " + res.statusText);
    const data = await res.json();
    renderResults(data);
  } catch (err) {
    alert("Could not reach BrandLedger local server at localhost:8000. Ensure the FastAPI backend is running!");
    console.error(err);
  } finally {
    btn.disabled = false;
    btn.innerText = "Verify Claims";
  }
});

function renderResults(data) {
  const resultsArea = document.getElementById("resultsArea");
  resultsArea.style.display = "block";

  const scoreVal = document.getElementById("scoreVal");
  scoreVal.innerText = `${data.trust_score}%`;
  scoreVal.className = "score-number " + (
    data.trust_score >= 85 ? "score-high" : (data.trust_score >= 50 ? "score-mid" : "score-low")
  );

  document.getElementById("claimsSummary").innerHTML = `
    <div><b>${data.verified_claims}</b> Verified</div>
    <div style="color: #f87171"><b>${data.flagged_claims}</b> Flagged</div>
    <div style="color: #facc15"><b>${data.abstained_claims}</b> Abstained</div>
  `;

  const list = document.getElementById("claimsList");
  list.innerHTML = "";

  if (data.claims.length === 0) {
    list.innerHTML = `<div style="text-align: center; color: #94a3b8; padding: 10px;">No factual claims detected.</div>`;
    return;
  }

  data.claims.forEach(c => {
    const item = document.createElement("div");
    item.className = `claim-item ${c.status}`;
    item.innerHTML = `
      <div class="claim-header">
        <span>${escapeHtml(c.claim_text)}</span>
        <span class="badge badge-${c.status}">${c.status}</span>
      </div>
      <div style="color: #cbd5e1; font-size: 11px;">${escapeHtml(c.explanation)}</div>
      ${c.suggested_fix ? `<div class="fix-box">💡 Suggested fix: <b>${escapeHtml(c.suggested_fix)}</b></div>` : ""}
      ${c.source_quote ? `<div class="source-cite">📖 Source [${c.source_id}]: "${escapeHtml(c.source_quote)}" (Owner: ${c.source_owner})</div>` : ""}
    `;
    list.appendChild(item);
  });
}

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
