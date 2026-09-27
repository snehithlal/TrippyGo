# Run TrippyGo locally

This guide is for previewing the website and working on its admin interface on your computer. Local admin changes are saved only in your browser; they do not update the live website.

## Requirements

- Node.js 22.12 or later
- npm

## Start the website

From the repository folder, install dependencies and start the development server:

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open the local URL printed in the terminal. It is usually `http://localhost:5173/`. If that port is already being used, Vite prints a different URL.

## Open the local admin

The example configuration enables the browser-only admin at `/admin`:

- Website: `http://localhost:5173/`
- Admin: `http://localhost:5173/admin`

For local admin, `.env.local` should contain these frontend settings:

```dotenv
VITE_ADMIN_ROUTE=admin
VITE_LOCAL_ADMIN=true
VITE_LOCAL_ADMIN_PASSWORD=admin
VITE_CONTENT_API_URL=
```

The example password is for local development only. Change it if other people can access your computer, and never use this local adapter or password in production.

Package edits, images, order changes, and the login session are stored in this browser's `localStorage`. They do not reach GitHub, the content API, or the deployed website. To start again with the committed sample package data, clear the `trippygo.local-packages` and `trippygo.local-admin-session` entries from browser storage and reload.

## Work on the real API locally (optional)

Most website and admin UI work does not need the API. The local browser-only adapter is enough to try creating, editing, deleting, and reordering packages.

To run the serverless API as well, install and configure the Vercel CLI for this repository, set the required API environment variables in a local-only environment file, and run:

```sh
vercel dev
```

Use this only when you need to test API authentication or GitHub-backed saves. API credentials must stay out of source files and must not be committed. Do not copy production credentials into a shared file or expose them in frontend variables. When testing the real API, turn off the local adapter and configure `VITE_CONTENT_API_URL` for the local environment.

## Check changes

```sh
npm run typecheck
npm run build
```

The build command also runs the TypeScript check.

## More project documentation

- [Development and deployment](development.md)
- [Admin and package flow](admin-operations.md)
