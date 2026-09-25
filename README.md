# TrippyGo

## Update prices and packages

Edit **[src/data/packages.ts](src/data/packages.ts)**:

- **Change a price:** update `price` with the amount in rupees per person, for example `price: 14999`.
- **Change package details:** edit `title`, `destination`, `route`, `days`, `nights`, `description`, `features`, and `itinerary`.
- **Add a package:** copy an existing entry in `packages`, give it a unique `id`, and update its details. Category filters update automatically.
- **Change a photo:** update `image` and its descriptive `alt` text. Put your own photos in `public/images/` and use a path such as `./images/kerala.webp`.

Developer setup and deployment: **[docs/development.md](docs/development.md)**.
