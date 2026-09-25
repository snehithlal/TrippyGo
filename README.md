# TrippyGo

React and Vite travel website deployed to GitHub Pages. The private package management interface uses a separately deployed serverless API.

## Development

Use Node.js 22. Install dependencies with `npm ci`, then run `npm run dev`. `npm run build` performs the TypeScript check and production build.

See [development and deployment](docs/development.md) for Pages and API setup. Configure the private route and API URL as deployment variables. Server credentials belong only in the API host's secure environment settings.

## Package content

Package records live in `data/packages/` and share the website's `TourPackage` model. Set a package's `displayOrder` to control its public listing position; lower numbers appear first. The admin API commits package and image changes to GitHub; pushes to the configured branch trigger the existing GitHub Pages workflow. The admin dashboard reports the matching deployment status.
