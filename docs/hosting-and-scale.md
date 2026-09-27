# Hosting and scaling plan

## Keep the current setup while it fits

The current split is a cost-conscious starting point:

- GitHub Pages serves the static React website. Static hosting is inexpensive and does not need an always-running application server.
- Vercel runs the admin API as serverless functions. This avoids managing a server while admin/API traffic is modest.
- GitHub stores package JSON and uploaded images. This is convenient for a small catalog and gives content changes a clear commit history.

There is no need to move providers just because traffic grows from a small to a moderate audience. First measure where time, reliability, or cost is actually becoming a problem.

## Signals to watch

Review these periodically:

- **Website:** page load time, image transfer size, availability, and static hosting limits.
- **API:** function duration, cold starts, timeout/error rate, concurrency, and monthly usage/cost.
- **GitHub-backed content:** API rate-limit responses, content read/write latency, repository size, image/binary growth, and Pages build time.
- **Operations:** failed deployments, admin save-to-live delay, support workload, and recovery time after a bad release.

A warning sign is sustained degradation, approaching a provider quota, repeated timeouts, growing deployment delays, or bills that are no longer predictable. Set provider budget alerts and review usage before changing architecture.

## Cost-conscious upgrade path

1. **Optimize the static site first.** Compress and resize images before upload, use WebP where practical, avoid bundling large media, and keep the site cached through its static host/CDN.
2. **Keep serverless for occasional admin writes.** Vercel functions remain a reasonable fit while API traffic is intermittent and GitHub is an adequate content store.
3. **Move images before moving everything.** If binary images make the Git repository or deployments grow quickly, move them to object storage with a CDN. Keep package metadata in GitHub initially if it remains manageable.
4. **Move package data to a database when GitHub becomes the bottleneck.** Consider a managed database with a free or low-cost starter tier when API limits, concurrent edits, content volume, or deploy-on-every-edit behavior becomes painful. Add a migration and backup plan before switching.
5. **Change API hosting only for a measured reason.** Compare actual monthly requests, execution time, bandwidth, storage, and egress on Vercel against alternatives such as Cloudflare Workers or a scale-to-zero container service. A new host requires an adapter/migration, monitoring, auth/cookie testing, and an operational owner; a low advertised compute price alone is not the whole cost.

Provider pricing and free tiers change. Compare current pricing pages for your region and expected usage before committing, including requests, execution, bandwidth/egress, storage, logs, custom domains, and overage rates.

## Readiness checklist before a larger launch

- **Data:** documented source of truth, regular backups, and a tested restore procedure.
- **Images:** object storage/CDN plan, size limits, cache headers, and a way to replace/remove images.
- **Security:** unique admin password, rotated API token, least-privilege token permissions, HTTPS, rate limits on login and write endpoints, and restricted admin access. Do not rely on an obscure URL as the only access control.
- **Sessions/domains:** test cookie behavior in target browsers. The current HTTP-only `SameSite=None` cookie crosses between the GitHub Pages and Vercel origins; browser third-party-cookie restrictions may block it. A custom website domain and sibling API hostname can make the sites same-site.
- **Reliability:** deployment alerts, API error monitoring, cost budgets, uptime checks, and a rollback owner/runbook.
- **Content publishing:** avoid unnecessary rebuilds if frequent package edits make deploy queues slow; decouple content delivery from frontend deploys only when that delay is a real issue.
- **Privacy and compliance:** define what customer data is collected, how long it is retained, who can access it, and how deletion requests are handled before adding booking or payment data.

## Practical next step

For the current scale, keep GitHub Pages for the public site, Vercel for the serverless admin API, and package files in the repository. Track usage and deployment delays. The first likely migration, if needed, is image storage; move package data or API hosting only when the metrics point there.
