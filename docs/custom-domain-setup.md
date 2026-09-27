# Custom domain setup

Use this guide after purchasing a domain. Recommended layout:

- Website: `www.example.com`
- Admin API: `api.example.com`
- Optional redirect: `example.com` to `www.example.com`

Replace `example.com` with your actual domain. Use the DNS targets shown in GitHub and Vercel for your project.

## GitHub Pages website

1. In the repository, open **Settings → Pages** and set the custom domain to `www.example.com`.
2. At your DNS provider, add the CNAME record GitHub requests. For this repository it will normally point `www` to `snehithlal.github.io`. If you use the apex domain as the website instead, use GitHub's current A/AAAA records or your DNS provider's ALIAS/ANAME feature.
3. Add `public/CNAME` containing only `www.example.com`. Vite copies this file to the deployed `dist` folder.
4. Wait for DNS verification, then enable **Enforce HTTPS** in Pages.
5. Pick one canonical hostname and redirect the other to it. Keep existing MX/TXT records if the domain is used for email.

## Vercel API

1. In the Vercel API project, open **Settings → Domains** and add `api.example.com`.
2. Create the DNS record Vercel provides for the `api` hostname, usually a CNAME. Use the exact target shown in the Vercel dashboard.
3. Wait for Vercel to verify DNS and issue HTTPS.
4. Set Vercel's Production `ALLOWED_ORIGIN` to the exact site origin, for example `https://www.example.com` (no path or trailing slash), then redeploy the API.
5. Keep existing GitHub credentials, admin password, and session secret in Vercel's secure environment settings; they do not change just because the domain changes.

Using sibling subdomains such as `www.example.com` and `api.example.com` keeps the site and API same-site for browser session-cookie behavior. The API still requires exact credentialed CORS configuration; do not use a wildcard origin.

## GitHub Pages frontend configuration

In GitHub **Settings → Secrets and variables → Actions → Variables**, set:

- `VITE_CONTENT_API_URL=https://api.example.com/api`
- Keep the current `VITE_ADMIN_ROUTE`, or set a new private route if rotating it.

These are public frontend settings, not secrets. Push the configuration changes to `main` and confirm the Pages workflow succeeds. The production admin URL is `https://www.example.com/<VITE_ADMIN_ROUTE>/`.

## SEO and crawler URLs

Update every old GitHub Pages URL to the chosen canonical HTTPS website URL in:

- `index.html`: canonical, Open Graph URL/image, Twitter image, and JSON-LD URL/logo/image.
- `public/robots.txt`: sitemap URL.
- `public/sitemap.xml`: page URL.

The build prerenders homepage and package content, so rebuild and deploy after changing these values. Verify the new page source contains the canonical domain and package markup.

## Final checks

- Website loads over HTTPS; the alternate hostname redirects to the canonical one.
- `robots.txt` and `sitemap.xml` load from the new domain and use the new canonical URL.
- Vercel shows the custom API domain as verified with a valid HTTPS certificate.
- Admin can sign in, load packages, edit and save one, and show the related Pages deployment status.
- Verify the new domain in Google Search Console using its DNS TXT record and submit the sitemap.
- Keep the old domain/property during transition and monitor redirects and indexing before removing it.
