# Admin and package flow

This document describes the current application flow and package data model. Environment-specific deployment links and credential values are maintained separately.

## Application architecture

- `src/App.tsx` renders the public landing page and registers the admin page only when `VITE_ADMIN_ROUTE` is configured.
- `src/components/Packages.tsx` renders the package gallery, filters, package detail dialogs, and enquiry links.
- `src/admin/AdminApp.tsx` provides package creation, editing, deletion, ordering, image selection, authentication UI, and deployment status.
- `src/services/packageRepository.ts` is the frontend boundary for package reads and writes, authentication, and deployment status.
- `src/types.ts` defines the shared `TourPackage` data shape.
- `data/packages/*.json` contains one package record per file.
- `api/` contains serverless API entrypoints; `serverless/contentHandler.ts` contains shared API handling and GitHub operations.

## Package content flow

1. The public gallery loads package records bundled from `data/packages/*.json`.
2. The gallery builds filters from each package's region, category, and tags. The Couples filter uses the package's dedicated `forCouples` flag.
3. Selecting a package opens its itinerary and enquiry form. The enquiry message uses the currently selected price option and opens WhatsApp.
4. The admin UI reads and updates packages through `packageRepository`; UI components do not call GitHub directly.
5. In local browser-only mode, package changes and the admin session are kept in browser `localStorage` and do not publish changes.
6. With the content API configured, the repository service sends authenticated requests to the serverless API. The API validates package data, commits JSON and image changes to the configured repository, and returns the commit ID.
7. A commit to the configured deployment branch starts the website deployment workflow. The admin can show the workflow status for the commit.

## Package fields and display behavior

- `displayOrder`: lower numbers appear earlier in the gallery.
- `region`: `India` or `International`.
- `category` and `tags`: add the package to category/tag filters. Multiple tags are supported.
- `price`: starting price per person. A `null` value displays as “On request.”
- `flightIncludedPrice`: optional per-person price for a flights-included option. When present, the card shows a Land only / Included selector.
- `forCouples`: includes the package in the Couples filter.
- `coupleStartingPrice`: total starting price for two travellers, separate from the per-person price.
- `rateNote`: explanatory text such as occupancy, validity, and exclusions.

The public rate is informational. Confirm dates, availability, occupancy, taxes, flight details, and inclusions before confirming a booking.

## Local development

Use Node.js 22 or later:

```sh
npm ci
npm run dev
npm run typecheck
npm run build
```

For local admin UI work, `.env.example` enables the browser-only adapter with the `/admin` route. Its example password is for local development only. Local changes affect only that browser's storage.

## Related documentation

- [Development and deployment](development.md)
- [README](../README.md)
