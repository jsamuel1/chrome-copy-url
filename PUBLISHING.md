# Publishing to the Chrome Web Store

CI (`.github/workflows/ci.yml`) validates and packages every push and pull request; the zip is attached to the run as an artifact.

Releases (`.github/workflows/release.yml`) run on tags `v*`: they check the tag matches `manifest.json`, create a GitHub release with the zip, and upload + publish it to the Chrome Web Store when store credentials are configured.

## One-time setup

### 1. Register as a Chrome Web Store developer
Sign up at https://chrome.google.com/webstore/devconsole (one-time US$5 fee). Note your **publisher ID** from the dashboard's account settings.

### 2. First submission (manual — the store requires it)
1. Build the zip: `scripts/build.sh` (or download it from a CI run / GitHub release).
2. In the developer dashboard, **Add new item** → upload the zip.
3. Fill in the **Store listing**, **Privacy practices** and **Distribution** tabs using [`store/listing.md`](store/listing.md); upload `store/screenshot-1.png`.
4. **Submit for review.** Note the **extension ID** shown for the item.

### 3. API credentials for CI
Follow https://github.com/fregante/chrome-webstore-upload-keys to create a Google Cloud OAuth client (enable the *Chrome Web Store API*) and obtain a client ID, client secret and refresh token.

### 4. Configure the GitHub repository
Create an environment named **`chrome-web-store`** (Settings → Environments) and add:

| Type | Name | Value |
|---|---|---|
| Variable | `EXTENSION_ID` | the item's ID from step 2 |
| Variable | `PUBLISHER_ID` | your publisher ID from step 1 |
| Secret | `CWS_CLIENT_ID` | OAuth client ID |
| Secret | `CWS_CLIENT_SECRET` | OAuth client secret |
| Secret | `CWS_REFRESH_TOKEN` | OAuth refresh token |

Or from the CLI:

```bash
gh api -X PUT repos/jsamuel1/chrome-copy-url/environments/chrome-web-store
gh variable set EXTENSION_ID --env chrome-web-store --body "<extension id>"
gh variable set PUBLISHER_ID --env chrome-web-store --body "<publisher id>"
gh secret set CWS_CLIENT_ID --env chrome-web-store
gh secret set CWS_CLIENT_SECRET --env chrome-web-store
gh secret set CWS_REFRESH_TOKEN --env chrome-web-store
```

Until these are set, the release workflow still creates the GitHub release and skips the store step with a warning.

## Releasing an update

```bash
# bump "version" in manifest.json, e.g. 1.0.1
git commit -am "Release 1.0.1"
git tag v1.0.1
git push origin main v1.0.1
```

Each upload goes through Chrome Web Store review before it reaches users.
