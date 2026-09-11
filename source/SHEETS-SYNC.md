# Google Sheets daily backup

Destination: https://docs.google.com/spreadsheets/d/1t8s8k8cOQHQ4QdlZJeZmvSQZcPBIfxcT8fRIcHkyWdE/edit

The spreadsheet is Restricted, as requested by the owner. `Court Coach Daily` contains one row per date. Saving the same date updates its row. Existing unrelated tabs are preserved. Meals have separate columns; exercise sets, loads, legacy lifts, nutrition target and profile snapshots are preserved in JSON columns. The full entry JSON preserves every saved field.

The web app first saves locally, then queues the complete daily entry and current saved profile. Queues survive reload. Reconnection and “ส่งรายการค้างอีกครั้ง” retry pending records. Historical local logs are not automatically uploaded; saving an old date uploads it. Editing the spreadsheet does not automatically update browser data.

`พลังงานเทียบเป้า` is written beside `พลังงาน (kcal)` for each saved day. It reports `ขาด N kcal`, `เกิน N kcal`, or `ตรงเป้า` using that day's saved nutrition target snapshot. If either value is unavailable, the cell is left blank. When the column is first added to an existing `Court Coach Daily` tab, the script inserts it automatically and backfills rows that contain a usable target snapshot; older rows are also refreshed whenever those dates are saved again.

The Apps Script `sheets-backend.gs` is bound to the spreadsheet and deployed as the owner. It accepts requests only with a random 64-hex-character bearer token. The token lives in private Script Properties and the owner's browser localStorage, never in GitHub. The script's connection menu opens the app with endpoint and token in a URL fragment; the app removes that fragment immediately. Do not share the connection link. Anyone with the token can write daily entries; revoke it by clearing SYNC_TOKEN in Script Properties and reconnecting trusted devices.

Anonymous deployment permits network access to the receiver, not public spreadsheet read access. No data-reading endpoint exists. POST uses text/plain to avoid CORS preflight. Because an opaque response is not proof of a write, the client polls an unpredictable request-ID receipt through JSONP. The server records success only after the row write and Sheets flush. Receipts expose no health data, expire after ten minutes, and carry only request ID, success and error text. Timeouts retain the queue. Script locks prevent duplicate rows. A queued entry older than the row's client timestamp is rejected instead of silently replacing it; device clocks should be correct.

Deploy the bound script as a web app, execute as owner, access Anyone. After authorizing the script, run `onOpen`, then use Court Coach → เชื่อมเว็บเครื่องนี้ in the spreadsheet. Each device needs its own connection setup. Keep the spreadsheet itself Restricted. The authorized script uses SpreadsheetApp.openById for this fixed spreadsheet and does not expose spreadsheet IDs supplied by callers.

Google account authorization/deployment must be completed before this feature can send records. Test a new date, re-save it, verify a single updated row, and test a failed network request before treating setup as complete.
