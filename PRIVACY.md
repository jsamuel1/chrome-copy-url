# Privacy policy — Copy Page URL

_Last updated: 2026-10-26_

Copy Page URL does not collect, store, transmit, or sell any data.

- When you press the shortcut (or click the toolbar icon), the extension reads the URL of the **current tab only** and writes it to your clipboard. Nothing else is read.
- The URL never leaves your device. The extension makes no network requests and has no analytics, tracking, or remote code.
- Nothing is saved: the extension has no storage permission and keeps no history.

Permissions used:

| Permission | Why |
|---|---|
| `activeTab` | Read the URL of the tab you are on, only at the moment you invoke the shortcut or click the icon. |
| `offscreen` | Manifest V3 background workers can't access the clipboard, so a hidden offscreen page performs the copy. |

Questions: open an issue at https://github.com/jsamuel1/chrome-copy-url/issues.
