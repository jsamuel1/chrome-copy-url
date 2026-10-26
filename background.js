// Copies the active tab's URL to the clipboard on the "copy-url" shortcut or a toolbar click.
// MV3 service workers have no DOM, so the clipboard write happens in an offscreen document.

async function ensureOffscreen() {
  if (await chrome.offscreen.hasDocument()) return;
  await chrome.offscreen.createDocument({
    url: "offscreen.html",
    reasons: ["CLIPBOARD"],
    justification: "Write the current page URL to the clipboard",
  });
}

async function flashBadge(tabId, text, color) {
  await chrome.action.setBadgeBackgroundColor({ tabId, color });
  await chrome.action.setBadgeText({ tabId, text });
  setTimeout(() => chrome.action.setBadgeText({ tabId, text: "" }), 1500);
}

async function copyUrl(tab) {
  if (!tab?.url) {
    await flashBadge(tab?.id, "!", "#d93025");
    return;
  }
  await ensureOffscreen();
  const ok = await chrome.runtime.sendMessage({ type: "copy", text: tab.url });
  await flashBadge(tab.id, ok ? "✓" : "!", ok ? "#188038" : "#d93025");
}

chrome.commands.onCommand.addListener(async (command, tab) => {
  if (command !== "copy-url") return;
  tab ??= (await chrome.tabs.query({ active: true, currentWindow: true }))[0];
  await copyUrl(tab);
});

chrome.action.onClicked.addListener(copyUrl);
