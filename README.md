# Copy Page URL — a Chrome extension for Arc refugees

If you came to Chrome from the [Arc browser](https://arc.net/) (which The Browser Company has stopped developing), your fingers probably still reach for **⌘⇧C** to copy the current page's URL. Chrome has no built-in command for this, so this tiny extension brings Arc's shortcut back.

| Platform | Shortcut |
|---|---|
| macOS | **⌘ Cmd + Shift + C** |
| Windows / Linux | **Ctrl + Shift + C** |

Press it and the current tab's URL is copied to your clipboard. A green ✓ flashes on the toolbar icon to confirm. Clicking the toolbar icon does the same thing.

> **Note:** in Chrome this shortcut normally opens DevTools' *Inspect element*. The extension takes it over, just as Arc did. You can still inspect elements with ⌘⌥C on macOS (F12 on Windows / Linux), or rebind the extension (see below).

## Install

The extension isn't on the Chrome Web Store, so you load it from this folder:

1. Clone or download this repository.
2. Open `chrome://extensions` and switch on **Developer mode** (top right).
3. Click **Load unpacked** and choose the repository folder.
4. Press ⌘⇧C (Ctrl+Shift+C) on any page, then paste somewhere to check it worked.

Chrome may show a reminder about developer-mode extensions when it starts; you can dismiss it.

## Shortcut not working?

Chrome only applies an extension's default shortcut on first install, and skips it if something else already claims the keys. Open `chrome://extensions/shortcuts`, find **Copy Page URL → Copy the current page URL**, and set the shortcut there. You can choose any other combination there too.

## How it works

- `manifest.json` registers a keyboard command (`copy-url`) and requests only two permissions:
  - `activeTab` — lets the extension read the URL of the tab you're on, only when you press the shortcut or click the icon.
  - `offscreen` — Manifest V3 service workers have no DOM, so the clipboard write happens in a hidden offscreen document.
- `background.js` handles the shortcut, reads the tab URL, and shows the ✓ (or ! on failure) badge.
- `offscreen.js` writes the text to the clipboard.

The extension does not read page content, make network requests, or store anything.

## License

[Apache License 2.0](LICENSE)
