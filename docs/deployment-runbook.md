# Deployment runbook

This runbook describes the routine release path for the public website, the admin API, and package content. Keep production URLs and secret values in the deployment provider settings, not in this document.

## Before a release

1. Make changes on a branch and review the diff.
2. Run the production build locally:

   ```sh
   npm ci
   npm run build
   ```

3. For package changes, check the JSON record and confirm its price units, inclusions, exclusions, route, itinerary, and images.
4. Confirm the GitHub Actions frontend variables and Vercel API environment variables are configured in their respective dashboards. Do not put credentials in the repository.
5. Merge or push the reviewed change to `main`.

## Public website deployment

The `.github/workflows/deploy.yml` workflow deploys the static site to GitHub Pages when `main` receives a push, or when manually triggered from GitHub Actions.

The workflow installs dependencies, runs `npm run build`, applies the Pages base path, copies the app entry point to `404.html` for direct SPA routes, and deploys the `dist` directory.

After deployment:

- Confirm the GitHub Actions run completed successfully.
- Open the public website and check the homepage, package filters, package details, and contact links.
- For a package or pricing change, confirm the correct card and selected price are visible.
- Test the admin route if the release affects admin or API configuration.

## API deployment

The Vercel project hosts the serverless API functions in `api/`, not the public frontend. With the repository connected, changes pushed to the configured production branch trigger a Vercel deployment. For API changes, check the Vercel deployment result and inspect function logs for startup or request errors.

Use [Vercel setup](vercel-setup.md) for project configuration and environment variables. Environment variable changes require a new Vercel deployment before they take effect.

## Publishing package content from admin

Production admin writes are commits to the configured GitHub branch:

1. Save the package change in admin.
2. Confirm the API response reports a commit and the admin shows a deployment state.
3. Check the GitHub Pages workflow for the matching commit.
4. Confirm deployment succeeded and inspect the changed package on the public site.

A package edit may also trigger Vercel's repository integration. The Vercel project should remain configured to deploy the API functions only.

## Failure and rollback

- If the GitHub Pages workflow fails, open the failed Actions run, inspect the build log, fix the issue, and push a corrective commit.
- If a content change is wrong, create a revert commit for the content commit and let the normal Pages workflow deploy the restored data. Prefer a revert over rewriting shared branch history.
- If an API code release fails, use Vercel's deployment history to inspect the failed function deployment and redeploy the last known-good version, or revert the code change and push a new commit.
- If an environment variable is wrong, correct it in the provider dashboard and redeploy the affected service.
- Verify the website, API login, package reads, and admin save flow after rollback.

## Release records

For each significant release, record the date, commit ID, reason for release, Pages and Vercel deployment results, and any rollback. Never record passwords, tokens, or session signing keys.
