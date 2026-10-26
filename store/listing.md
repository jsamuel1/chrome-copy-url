# Chrome Web Store listing — copy/paste into the developer dashboard

## Store listing

**Name:** Copy Page URL (from `manifest.json`)

**Summary** (from `manifest.json` description, ≤132 chars):
Copy the current tab's URL with Arc's shortcut: Cmd+Shift+C on macOS, Ctrl+Shift+C elsewhere.

**Description:**

Moved to Chrome from the Arc browser? Your fingers still reach for ⌘⇧C to copy the page URL — this extension makes that work again.

• ⌘ Cmd + Shift + C on macOS, Ctrl + Shift + C on Windows and Linux
• The current tab's URL is copied to your clipboard and a ✓ flashes on the toolbar icon
• Click the toolbar icon to do the same thing
• Rebind to any shortcut at chrome://extensions/shortcuts

Note: in Chrome this shortcut normally toggles DevTools' "Inspect element". The extension takes it over, just as Arc did. Use ⌘⌥C (macOS) or F12 to open DevTools instead, or pick a different shortcut.

Private by design: reads only the current tab's URL when you press the shortcut, makes no network requests, and stores nothing.

Open source (Apache 2.0): https://github.com/jsamuel1/chrome-copy-url

**Category:** Tools
**Language:** English

**Graphic assets:**
- Store icon: `icons/icon-128.png` (taken from the package)
- Screenshot: `store/screenshot-1.png` (1280×800)

**Additional fields:**
- Homepage URL: https://github.com/jsamuel1/chrome-copy-url
- Support URL: https://github.com/jsamuel1/chrome-copy-url/issues

## Privacy practices tab

**Single purpose:**
Copy the URL of the current tab to the clipboard with a keyboard shortcut.

**Permission justifications:**
- `activeTab`: Needed to read the URL of the tab the user is on at the moment they press the shortcut or click the toolbar icon. No other tabs or page content are accessed.
- `offscreen`: Manifest V3 service workers cannot access the clipboard; a hidden offscreen document performs the clipboard write.
- `clipboardWrite`: The offscreen document is never focused, so Chrome only allows it to write to the clipboard with this permission. Used solely to write the current tab's URL; the clipboard is never read.

**Remote code:** No, I am not using remote code.

**Data usage:** Collects none of the listed data types. Certify all three disclosures (not sold, not used for unrelated purposes, not used for creditworthiness).

**Privacy policy URL:** https://github.com/jsamuel1/chrome-copy-url/blob/main/PRIVACY.md

## Distribution tab
- Visibility: Public
- Regions: All regions
