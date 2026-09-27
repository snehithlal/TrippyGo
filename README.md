# TrippyGo

React and Vite travel website deployed to GitHub Pages. The private package management interface uses a separately deployed serverless API.

## Development

Use Node.js 22. Install dependencies with `npm ci`, then run `npm run dev`. `npm run build` performs the TypeScript check and production build.

See [development and deployment](docs/development.md) for project setup and the [admin and package flow](docs/admin-operations.md) for the current application architecture and content lifecycle. Deployment URLs, admin access details, and credentials are maintained separately from this public README.

## Package content

Package records live in `data/packages/` and share the website's `TourPackage` model. Set a package's `displayOrder` to control its public listing position; lower numbers appear first. The admin API commits package and image changes to GitHub; pushes to the configured branch trigger the existing GitHub Pages workflow. The admin dashboard reports the matching deployment status.
