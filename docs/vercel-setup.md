# Deploy the TrippyGo API to Vercel

This project serves the public website from GitHub Pages. Vercel hosts the serverless API used by the private admin; it should not host a second public copy of the website.

## 1. Create the Vercel project

1. Import the TrippyGo GitHub repository into Vercel.
2. Set **Framework Preset** to **Other**.
3. Keep the project root at the repository root.
4. Do not configure a static output directory or a frontend build for this API project. The API functions are discovered from `api/`; `vercel.json` sets their maximum duration to 30 seconds.
5. Add the environment variables listed below to the **Production** environment. Add separate Preview values only if preview deployments need to be tested.
6. Deploy and copy the resulting Vercel project URL. The API base URL ends in `/api`.

## 2. Configure Vercel environment variables

Add these as server-side Vercel project environment variables. Never prefix these values with `VITE_` or put secrets in GitHub Actions variables.

| Variable         | Value / purpose                                                                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `GITHUB_OWNER`   | GitHub account or organization that owns the repository. For this project: `snehithlal`.                                                       |
| `GITHUB_REPO`    | Repository name. For this project: `TrippyGo`.                                                                                                 |
| `GITHUB_BRANCH`  | Branch that package changes should commit to. For this project: `main`.                                                                        |
| `GITHUB_TOKEN`   | Fine-grained personal access token described below. Keep it secret.                                                                            |
| `ADMIN_PASSWORD` | A strong, unique password used to sign in to production admin. Do not reuse the local example password.                                        |
| `SESSION_SECRET` | Long, random key used to sign admin sessions. Generate one with `openssl rand -base64 32`. Keep it secret.                                     |
| `ALLOWED_ORIGIN` | Exact website origin, scheme and hostname only. For the current GitHub Pages domain: `https://snehithlal.github.io` (do not add `/TrippyGo/`). |

After changing Vercel environment variables, redeploy the API for the new values to take effect.

## 3. Create the GitHub fine-grained token

Create a fine-grained personal access token restricted to the `TrippyGo` repository. Grant only these repository permissions:

- **Metadata: Read-only** (GitHub requires this and usually selects it automatically).
- **Contents: Read and write** (read and commit package JSON and image files).
- **Actions: Read-only** (read Pages deployment status for the commit).

Store the token only as Vercel's `GITHUB_TOKEN` environment variable. Do not paste the token into this document, commit it, or add it to frontend variables. If exposed, revoke it and create a replacement.

The API uses this token to commit content. A commit made with the fine-grained PAT triggers the existing GitHub Pages workflow; the API also uses Actions read permission to report that deployment's status in admin.

## 4. Configure the GitHub Pages frontend

In the GitHub repository, open **Settings → Secrets and variables → Actions → Variables** and set:

| Variable               | Value / purpose                                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `VITE_ADMIN_ROUTE`     | A chosen admin path segment, for example `manage-trips-<random-suffix>`. This path is not a replacement for password authentication. |
| `VITE_CONTENT_API_URL` | The Vercel API base URL, for example `https://<your-vercel-project>.vercel.app/api`.                                                 |

These are public frontend configuration values, not secrets. The Pages workflow reads them when building the website. Do not set `VITE_LOCAL_ADMIN=true` in a production build; the browser-only local adapter must only be used for development.

Once the Pages workflow finishes, the admin URL is the public site URL followed by the configured route segment, for example:

`https://snehithlal.github.io/TrippyGo/<VITE_ADMIN_ROUTE>/`

## 5. Browser cookie and domain note

The API sets an HTTP-only, secure session cookie and allows credentialed requests only from `ALLOWED_ORIGIN`. The default GitHub Pages hostname (`github.io`) and Vercel hostname (`vercel.app`) are cross-site. Some browsers block third-party cookies, which can prevent production admin sessions from working reliably across these domains.

For reliable production sessions, use a custom website domain and a sibling API subdomain on the same site (for example, `www.example.com` and `api.example.com`), then set `ALLOWED_ORIGIN` to the exact website origin and `VITE_CONTENT_API_URL` to the API hostname. Do not use a wildcard origin.

## 6. Verify deployment

- Confirm the Vercel deployment completed and its API functions were built.
- Confirm GitHub Pages has the `VITE_ADMIN_ROUTE` and `VITE_CONTENT_API_URL` Actions variables and its latest deployment succeeded.
- Open the admin route and sign in with `ADMIN_PASSWORD`.
- Confirm package records load. Any package save, reorder, image upload, or deletion in production commits to the configured GitHub branch and starts a Pages deployment.
- Check the admin deployment status for the saved commit.

API entrypoints are in `api/auth/`, `api/packages/`, and `api/deploy/`; they delegate shared request handling to `serverless/contentHandler.ts`.
