# Development and deployment

## Local development

Use Node.js 22.12 or later, matching the current build tooling and GitHub Actions runtime.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

`npm run build` runs the strict TypeScript check and creates the production site. `npm run typecheck` runs the check on its own. The admin API runs separately with the Vercel CLI (`vercel dev`); configure the server-only values below in Vercel's local environment or `.env.local`. Never commit real credentials.

## Project structure

- `src/App.tsx`: public page and configured admin route.
- `src/admin/`: admin dashboard and its responsive styling.
- `src/components/`: public package gallery and existing site components.
- `src/services/packageRepository.ts`: frontend data and authentication API boundary.
- `src/types.ts`: shared travel package model.
- `data/packages/`: package JSON records used as the source data in GitHub.
- `api/`: Vercel function entrypoints for authentication and package API routes.
- `serverless/contentHandler.ts`: shared API authentication, session validation, package validation, and GitHub operations.
- `public/images/`: website images, including uploaded package covers.
- `src/styles.ts` and `src/index.css`: reusable utility presets and global styling.
- `vite.config.ts`: Vite and Pages base path configuration.
- `.github/workflows/deploy.yml`: existing GitHub Pages build and deployment, with an SPA `404.html` fallback.

## Frontend and API configuration

Copy `.env.example` for local values. Only public values beginning with `VITE_` are compiled into the site:

- `VITE_ADMIN_ROUTE`: private path segment chosen by the administrator. Configure the same value in the GitHub repository's Actions variables. The app does not register an admin path if this variable is unset.
- `VITE_CONTENT_API_URL`: base URL of the separately deployed API, including `/api`.

The GitHub Pages workflow reads these from repository Actions variables. Set the repository Pages source to **GitHub Actions**; the workflow configures Vite's base path, builds, copies the entry page to `404.html` for direct SPA paths, and deploys `dist`.

## Server-side API deployment

GitHub Pages remains the only public website. Vercel is only one option for hosting the trusted API; it does not need to host a second copy of the React site. If using Vercel, deploy the repository's `api/` functions with the Framework Preset set to **Other** and the static build/output disabled. The function entrypoints expose the auth, package, and deployment-status endpoints and delegate to a shared handler; `vercel.json` sets their timeout. Set these in the Vercel project's server-side environment settings:

- `GITHUB_OWNER`, `GITHUB_REPO`, `GITHUB_BRANCH`: target repository and branch.
- `GITHUB_TOKEN`: fine-grained GitHub token with metadata read and repository contents read/write permission for that repository.
- The same token also needs Actions read permission so the admin can check the matching Pages workflow run. Use a fine-grained personal access token; commits made using GitHub Actions' automatic `GITHUB_TOKEN` do not trigger another Actions workflow.
- `ADMIN_PASSWORD`: administrator password; use a long, unique value.
- `SESSION_SECRET`: long, random signing key for the HTTP-only session cookie.
- `ALLOWED_ORIGIN`: exact public origin of the GitHub Pages website (scheme and host, no path).

The API uses a secure, HTTP-only cookie across the frontend/API origin boundary. For reliable browser session behavior, use a custom domain for the Pages site and a sibling API hostname on the same site (for example, `www.example.com` and `api.example.com`). Default `github.io` and `vercel.app` hosts are cross-site, and browsers that block third-party cookies can prevent the session cookie from being sent.

Set the GitHub repository Actions variables `VITE_ADMIN_ROUTE` and `VITE_CONTENT_API_URL` to the private route segment and API deployment URL. These values are public configuration. Do not add server-side values to Actions variables used by the frontend build, `VITE_*` variables, GitHub Pages secrets, or static files. The API deployment is independent of GitHub Pages.

The API validates image type and a 3 MB size limit. It commits image and package changes together using one GitHub commit. It does not resize images; prepare a reasonably sized WebP, PNG, or JPEG before upload. A successful API write triggers the configured branch's existing Pages workflow. The admin checks that commit's workflow run and reports pending, running, success, or failure with a link to the run.

## Package model and services

The existing `TourPackage` shape is stored as one JSON record per package. `displayOrder` controls public listing order, with lower numbers shown first; older records without it retain their existing relative order until edited. The public gallery and admin UI call `packageRepository`; they do not call GitHub. The serverless API owns authentication and GitHub operations, so a future database/object-storage adapter can replace it without changing the UI.

The current tests/linter are not configured in this repository. `npm run build` includes type checking.

## Existing public site

The public sections, branding, package display, inquiry flows, destination dialogs, styling, and Pages workflow are retained. Destination cards remain inspiration rather than fixed packages. Package prices remain per person; confirm operational details and final rates before publishing.
