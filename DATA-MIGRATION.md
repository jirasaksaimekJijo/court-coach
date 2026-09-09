# Local data after content restoration

The backup/import panel and initial setup banner have been removed at the owner's request. There are no in-app import/export buttons in this version. The older source component remains available for a future developer to re-enable, but it is not rendered.

Daily logs and saved profile settings still use `court-coach:local:v1:/court-coach/` in browser localStorage on the live GitHub Pages origin. Existing daily logs are preserved. A profile that exactly matches the generic 80 kg placeholder from the first static release uses the restored original defaults; customized profiles remain unchanged. This does not create or alter dated weight/meal records.

Browser storage does not sync across devices and can be lost when site data is cleared. Advanced users can inspect or copy the stored JSON through their browser developer tools (Application/Storage → Local Storage). Keep any copied records private; do not upload them to the public repository.

Historical records from the original Sites database are not included in the static files. While the old site remains accessible, its authenticated `/api/coach` endpoint returns the latest 730 days as JSON. Save that JSON privately if needed. This version has no import UI; restoring that history requires a separate migration step.
