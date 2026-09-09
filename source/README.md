# Court Coach

[Open Court Coach](https://jirasaksaimekjijo.github.io/court-coach/)

Workout plans, morning weight/body-fat logs, five daily meals, nutrition goals and weekly progress. The original personal plan and content have been restored with the owner's approval to publish them in this public repository. Saved daily records remain in browser localStorage and are not uploaded to GitHub.

## Hosting and updates

GitHub Pages publishes `main` from `/ (root)`. HTML, CSS, JavaScript and images are prebuilt at the root. React/TypeScript source is in `source/`. No backend, login, API key, or ChatGPT subscription is required.

With Node 24+ and pnpm 11, run inside `source/`:

```sh
pnpm install --frozen-lockfile
pnpm test
pnpm build
node tests/check-static.mjs
```

Copy `source/dist/` contents to the repository root and push to `main`. Preserve documentation and the `source/` directory. GitHub Pages republishes automatically. For a new repository, enable **Settings → Pages → Deploy from a branch → main / (root)**.

## Local records

Use Save day after editing. The backup/import panel and first-run setup banner were removed as requested. Personal settings remain in Progress. Clearing browser/site data can erase records; devices do not sync. See [DATA-MIGRATION.md](DATA-MIGRATION.md) for the current storage details and [AUTHENTICATION.md](AUTHENTICATION.md) for the original authentication architecture.

[Restoration checks](RESTORATION.md) · [Exercise image license](exercises/LICENSE.txt) · [GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
