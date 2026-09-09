# Restoration verification — 2026-09-09

Compared the GitHub Pages app against the original Sites source in the shared workspace.

- All main tab JSX is identical to the original: Home, Calendar, Training, Food, Progress and profile settings.
- Twenty shared content/calculation/style/component files match exactly, including Weekly Coach, recipes, workout plans, nutrition rules and weekly review logic.
- Exercise-image mappings match after the relative-path adjustment required by GitHub Pages.
- Restored original profile: 114 kg, 185 cm, age 26; plan/reference start 2026-09-08; BF baseline 112 kg / 30%.
- Original weekly projections and nutrition calculations match across six reference dates, all seven weekdays and three activity durations. The year-end reference is approximately 97.7 kg / 19.8% BF under the original assumptions.
- Restored activity details, original recipe-source link and page metadata.
- Removed the backup/import panel and first-run sample banner as requested.
- Seven storage tests pass, including placeholder-profile replacement, preserving customized profiles and preserving daily logs.

Necessary hosting differences: localStorage instead of the authenticated server API; truthful local-storage/save/error messages; relative asset paths; static HTML entry instead of a server layout. Server history is not fabricated or bundled. Personal baseline content is public with the owner's explicit approval.
