// Chrome Manifest V3 Service Worker
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "brandledger_verify_selection",
    title: "Verify with BrandLedger Guard",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "brandledger_verify_selection" && info.selectionText) {
    chrome.action.openPopup();
  }
});
