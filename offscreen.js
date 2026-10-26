// navigator.clipboard needs a focused document, which an offscreen page never is,
// so use the textarea + execCommand("copy") path that offscreen CLIPBOARD documents support.
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg?.type !== "copy") return;
  const buffer = document.getElementById("buffer");
  buffer.value = msg.text;
  buffer.select();
  sendResponse(document.execCommand("copy"));
});
