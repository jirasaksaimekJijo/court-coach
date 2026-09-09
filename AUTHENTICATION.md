# Court Coach authentication and data flow

## Original Sites application

Paths below refer to the original project root, outside `github-pages/`.

| Component | Responsibility |
| --- | --- |
| `app/page.tsx` | Renders the Coach client; the page itself does not require a user. |
| `app/coach.tsx` | Fetches `/api/coach`; on HTTP 401 displays a ChatGPT sign-in link. Posts profile and daily log changes as JSON. |
| `app/chatgpt-auth.ts` | Reads request identity headers, constructs safe sign-in/out URLs, and exposes an optional redirecting guard. |
| `app/api/coach/route.ts` | Authenticates both GET and POST and scopes every database operation to the authenticated user ID. |
| `db/raw.ts`, `db/schema.ts` | Access the D1 binding and define profiles keyed by owner, and logs keyed by owner plus date. |

Request flow:

1. The browser loads the page and requests `GET /api/coach` on the same origin. Fetch uses its default same-origin credential behavior; the client does not attach a bearer token.
2. `getChatGPTUser()` reads `oai-authenticated-user-id` and `oai-authenticated-user-email`. Both must be present. The optional full name is decoded only when its encoding header declares percent-encoded UTF-8; invalid encoding falls back to the email for display.
3. Without identity, the API returns 401. The UI links to `/signin-with-chatgpt?return_to=%2F`. The helper also supports sign-out and redirects, but those helper functions are not called by the current page/API flow.
4. With identity, GET binds `user.userId` into the profile and log queries and returns up to 730 recent days. POST also derives owner from the headers, never from submitted JSON.
5. POST rejects a supplied foreign Origin and non-JSON content type, limits the parsed request text to 20,000 characters, validates the payload, and performs a parameterized upsert. Responses use `Cache-Control: no-store`. The Origin check permits a missing Origin; it is not a standalone authentication mechanism.

The helper only reads identity headers: it does not verify their signatures. The trust boundary therefore requires the hosting layer to authenticate requests and prevent callers from forging those headers. The implementation of that hosting layer is not in this repository, so its session cookie attributes, token lifetime, refresh/revocation, callback verification, and header sanitization cannot be verified from this code. Copying this API to an untrusted, directly reachable host would not preserve that trust boundary.

No application password store, OAuth client secret, JWT verifier, access-token store, or refresh-token logic appears in this flow. The sign-in/out/callback handlers are not implemented in the application source. The D1 database is accessed through a server runtime binding, not browser database credentials. Return-path helpers restrict redirects to the local origin and exclude reserved auth paths.

## GitHub Pages version

Paths here are relative to `github-pages/`.

`index.html` → `main.tsx` → `app/coach.tsx` → `lib/local-store.ts` → browser localStorage.

The published `dist/` contains HTML, CSS, JavaScript and assets. React remains bundled in the JavaScript to preserve the existing interface; there is no server runtime or build step on the host. This is a static deployment, not a rewrite of the source into framework-free JavaScript.

There is no application login, identity header, session token, password, backend API, or ChatGPT dependency. On load, the client reads `court-coach:local:v1:<site-path>`, validates its JSON, and restores the profile and daily logs. Saving validates and serializes the data before calling `localStorage.setItem`. The UUID revision identifies a saved version; it is not an authentication token. Web Locks, where available, serialize writes, and an expected-value comparison detects stale data from another tab. Without Web Locks that comparison is not an atomic cross-tab transaction.

Storage is local to the browser profile and origin. The site-path suffix separates app records but is not a security boundary: other JavaScript on the same origin can access them. Data is not encrypted by this app, is not automatically uploaded to GitHub, and does not sync between devices. JSON export/import provides backup and migration; anyone with access to the browser profile or backup can read the logs.

See [DATA-MIGRATION.md](DATA-MIGRATION.md) before leaving Sites. Existing server records are not included in the static package and must be exported while the original authenticated app remains accessible.

GitHub hosting behavior: [GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site). Application behavior above is derived from the listed source files; platform internals are explicitly unverified.
