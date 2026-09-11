# Court Coach

[Open Court Coach](https://jirasaksaimekjijo.github.io/court-coach/)

Workout plans, morning weight/body-fat logs, five daily meals, nutrition goals and weekly progress. The original personal plan and content have been restored with the owner's approval to publish them in this public repository. Saved daily records remain in browser localStorage and are not uploaded to GitHub.

## Hosting and updates

GitHub Pages publishes `main` from `/ (root)`. HTML, CSS, JavaScript and images are prebuilt at the root. React/TypeScript source is in `source/`. Local use requires no backend or ChatGPT subscription. The optional Google Sheets backup uses a bound Apps Script receiver and a private device connection.

With Node 24+ and pnpm 11, run inside `source/`:

```sh
pnpm install --frozen-lockfile
pnpm test
pnpm build
node tests/check-static.mjs
```

Copy `source/dist/` contents to the repository root and push to `main`. Preserve documentation and the `source/` directory. GitHub Pages republishes automatically. For a new repository, enable **Settings → Pages → Deploy from a branch → main / (root)**.

## Local records

Use Save day after editing. The backup/import panel and first-run setup banner were removed as requested. Personal settings remain in Progress. Clearing browser/site data can erase local records and the connection key. Connected daily saves also back up to the restricted Google Sheet; sheet edits are not pulled into the app. See [SHEETS-SYNC.md](SHEETS-SYNC.md) for setup and behavior. See [DATA-MIGRATION.md](DATA-MIGRATION.md) for the current storage details and [AUTHENTICATION.md](AUTHENTICATION.md) for the original authentication architecture.

[Restoration checks](RESTORATION.md) · [Exercise image license](exercises/LICENSE.txt) · [GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

## Six-week foundation plan and personal menu

The current program follows the supplied 40-slot plan exactly: eight exercises each on Monday, Tuesday, Thursday, Friday and Sunday; Wednesday full rest; Saturday four hours of badminton including breaks and no weights. The Training page preserves the full original tables. Home applies the weeks 1–2 strength cap and week 6 deload; after week 6, deload remains until the start date is reviewed. Warm-ups, cooldowns and progression rules are included. See [the complete supplied plan](./FOUNDATION-PLAN.md) and [image sources](./IMAGE-SOURCES.md).

Food → **Add Menu Item** saves a named serving with optional calories, protein, carbohydrate, fat, ingredients and notes. Items persist in `court-coach:custom-foods:v1` in localStorage and appear in Home’s meal selector. Blank nutrient values stay unknown, not zero. Personal menu definitions are local to that browser; daily meal values continue to use the existing Google Sheets backup when connected. Existing saved days are not rewritten.

## Recipe editing and nutrition review

Food now includes **Edit recipe** for every built-in and personal menu. Change the serving, ingredients, preparation and per-serving nutrients. Ingredient text does not calculate nutrition automatically: update the nutrient fields from labels or reliable food data. Edits are local to this browser (`court-coach:recipe-edits:v1` for built-ins; existing custom-menu storage for personal items). They apply to future selections and never rewrite recorded meals. Recipe definitions are not synced to Google Sheets; saved daily meal snapshots retain the existing sync behaviour.

Home shows concise meal names and quantities. Expand **View / edit full details** to read or edit the original note. Existing full notes remain stored. New recipe selections no longer append the ingredient list.

The Food nutrition check compares intake with the saved target snapshot when present, otherwise the current calculated target. Its 14-day averages use only saved days marked food-complete, and comparisons with historical targets include only days with a saved target. Missing days are not zero. Weight trends require at least three measurements in each seven-day period. Required year-end pace is goal arithmetic, not a forecast. A 4/4/9 macro-energy cross-check prompts review when the difference exceeds both 50 kcal and 5%; it never changes entered values. Automated tests cover persistence, invalid writes, historical snapshots, summaries and incomplete-data handling.
