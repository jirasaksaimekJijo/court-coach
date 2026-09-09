# Court Coach

Workout plans, morning weight/body-fat logs, five daily meals, nutrition goals and weekly progress, stored in your browser.

**Live site:** https://jirasaksaimekJijo.github.io/court-coach/

## Hosting

GitHub Pages publishes `main` from `/ (root)`. The root contains the prebuilt HTML, CSS, JavaScript and exercise images. `.nojekyll` disables Jekyll processing. No backend, login, API key, paid hosting or ChatGPT subscription is needed to run this version.

## Data and backups

Use the Progress tab to set up your profile or import existing records. Save daily changes and export JSON backups regularly. Data stays in this browser and does not automatically sync between devices. Clearing site data can erase logs. Never commit personal backups to this public repository.

Existing Sites records are not included: follow [DATA-MIGRATION.md](DATA-MIGRATION.md) to export/import them while the original site remains accessible.

## Edit and rebuild

Editable React/TypeScript source is in `source/`; the deployed JavaScript bundles React. With Node 24+ and pnpm 11:

```sh
cd source
pnpm install --frozen-lockfile
pnpm test
pnpm build
node tests/check-static.mjs
```

Copy the contents of `source/dist/` to the repository root and commit/push to `main` to publish updates. Preserve the root documentation and `source/` directory. Preview locally with `pnpm preview --host 127.0.0.1` from `source/`.

[Authentication and data-flow walkthrough](AUTHENTICATION.md) explains the original Sites API and the localStorage replacement. Exercise images retain their [original license](exercises/LICENSE.txt).

[GitHub Pages deployment documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)