# TrippyGo

A responsive travel website built with React, Vite, Tailwind CSS, custom CSS, and Lucide icons. The visual identity follows TrippyGo’s supplied Instagram screenshots: cream paper, forest green, golden yellow, condensed destination lettering, handwritten accents, and the “Pack your Dreams” tagline. No backend or paid service is required.

## Run locally

Use Node.js 22 (also used by the deployment workflow).

```sh
npm ci
npm run dev
```

Production checks:

```sh
npm run build
npm run preview
```

## Update trips and contact details

Edit `src/data/content.js`. The `trips` array controls the cards, destination selector, filters, and itinerary dialogs. Each trip needs a unique `id`, title, destination, region, category, duration, tag, image, alt text, description, highlights, and itinerary. Current categories are `Mountains`, `Backwaters`, and `Beaches`; add new filter options in `src/App.jsx` if you introduce another category.

The current trips are sample inspiration, not confirmed offers. Prices are intentionally quote-only. Confirm descriptions and itineraries with the owner before launch. No fabricated reviews, ratings, booking counts, phone numbers, or email addresses are used.

Update `site.instagram`, `site.handle`, `site.whatsapp` (international digits only), `site.phones`, and `site.email`. The current contact details are transcribed from the supplied Instagram profile: +91 80752 95734, +91 70251 93391, and trippygo.in@gmail.com. With WhatsApp configured, enquiry links open a prefilled WhatsApp conversation. Otherwise they open Instagram, and itinerary dialogs offer an enquiry message to copy and paste. Opening a link does not send a message or make a booking. There is no form that silently discards customer data.

Update questions in `faqs`. Layout and remaining page copy are in `src/App.jsx`; styling is in `src/App.css` and `src/index.css`.

## Images and fonts

The logo, treehouse, woodland stay, wildlife, and sunset photographs in `public/images/` are cropped from the supplied Instagram screenshots. They are used in the hero, Wayanad card, story, and photo journal. Replace these screenshot crops with original high-resolution assets when available. Other destination cards still use remote Unsplash placeholders; replace those with approved destination photographs before launch. Put images in `public/images/` and reference them as `./images/your-photo.webp` in the content file. Use descriptive alt text and compressed WebP/JPEG files. The about image is currently in `src/App.jsx`; photo journal entries are in the `gallery` array in `src/data/content.js`. Brand colours and font families are also available in `tailwind.config.js`. Remote images and Google Fonts require a network connection; system font fallbacks are provided.

## Deploy to GitHub Pages

1. Push this project to a GitHub repository with a `main` branch, including `package-lock.json`.
2. In the repository, open **Settings → Pages → Build and deployment → Source**, and choose **GitHub Actions**.
3. Push to `main`, or run **Deploy to GitHub Pages** manually in the Actions tab.
4. The workflow builds `dist` and deploys it. The deployment job displays the live URL.

Vite uses `base: './'`, supporting both a repository subpath (`username.github.io/repository/`) and a root/custom domain. Navigation uses section anchors, so no server-side route fallback is required. If your default branch has a different name, update `.github/workflows/deploy.yml`.

This workspace did not contain the supplied reference workflow directory, so a standalone GitHub Actions Pages deployment is included. Deployment has not been triggered and no repository has been created automatically.

## Accessibility and behaviour

Includes keyboard-visible focus, a skip link, native modal focus handling and Escape dismissal, labelled filters and selectors, expandable FAQs, reduced-motion support, and mobile layouts. Trip availability and booking confirmation happen through a direct conversation with the business.
