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
