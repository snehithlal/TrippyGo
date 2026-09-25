# Development and deployment

## Setup

Use Node.js 22, matching GitHub Actions.

```sh
npm ci
npm run dev
```

```sh
npm run typecheck
npm run build
npm run preview
```

`build` runs strict TypeScript checks before generating `dist`. `npm run format` formats the source and documentation.

## Project structure

- `src/App.tsx`: page sections, destination filters, and destination dialogs.
- `src/components/Packages.tsx`: package filters, itinerary dialogs, and enquiry forms.
- `src/types.ts`: shared package, destination, contact, and gallery types.
- `src/data/packages.ts`: prices and package details.
- `src/data/content.ts`: business information and other editable content.
- `src/styles.ts`: reusable Tailwind utility presets. All class strings are static so Tailwind can scan them. `cx` composes the presets and keeps semantic class names as animation hooks.
- `src/index.css`: Tailwind layers, document defaults, and reduced-motion support only.
- `tailwind.config.ts`: colours, typography, and animation keyframes.
- `src/hooks/usePageMotion.ts`: one-time scroll reveals. Content remains visible without animation support, and reduced-motion preferences are respected.
- `vite.config.ts`: React, Tailwind/PostCSS, and relative asset paths for GitHub Pages.

React components use `.tsx`; data, hooks, and configuration without JSX use `.ts`. The former component CSS files and JavaScript source files have been removed.

## GitHub Pages

1. Push the project, including `package-lock.json`, to the repository's `main` branch.
2. In **Settings → Pages → Build and deployment → Source**, choose **GitHub Actions**.
3. Push to `main` or manually run **Deploy to GitHub Pages** in the Actions tab.
4. The workflow type-checks, builds, and publishes `dist`. The deployment job provides the live URL.

The workflow is in `.github/workflows/deploy.yml`. Change its branch trigger if necessary. Vite's `base: './'` supports a repository subpath or root domain. Section anchors do not require server-side route handling.

## Content and enquiries

The initial package amounts are design placeholders. Update them with the business's final rates; public sample labels were removed at the user's request. Standard rates are per person, while custom changes are priced separately. Check itinerary length, duration, inclusions, occupancy, and taxes when editing an offer.

Package enquiry forms open WhatsApp with the selected package, dates, traveller count, price, and optional customisation request. They do not automatically send messages, store customer information, collect payment, or confirm bookings.

Destination cards are inspiration rather than fixed packages. If adding a new destination category, update the corresponding filter options in `App.tsx`.

## Assets

Local logo, treehouse, woodland, wildlife, and sunset assets were cropped from the supplied Instagram screenshots. Replace them with original high-resolution files when available. Some destination/package photos remain remote Unsplash images. Google Fonts and remote photos require network access; font fallbacks are provided.

Use compressed WebP or JPEG images in `public/images/`, relative paths such as `./images/photo.webp`, and descriptive alt text.

## Accessibility

Native dialogs provide focus containment and Escape dismissal. Navigation, forms, and filters have accessible labels; interactive controls have visible keyboard focus. Responsive layouts use Tailwind breakpoints, and animation honours `prefers-reduced-motion`.
