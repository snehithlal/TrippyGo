# Code standards

Use this guide for changes to the TrippyGo codebase. Keep edits focused, typed, and consistent with the existing React/Vite structure.

## TypeScript and React

- TypeScript strict mode is enabled. Keep `noUnusedLocals` and `noUnusedParameters` clean; do not weaken `tsconfig.json` to silence errors.
- Prefer typed package interfaces from `src/types.ts`. Avoid `any`; validate data at external boundaries such as API requests and JSON content.
- Use function components and hooks. Keep side effects in effects or event handlers, not during render.
- Keep package fetching/mutations behind `src/services/packageRepository.ts`; components should not call GitHub or the API directly.
- Use stable package IDs as React keys. Keep public package prices and units explicit in UI and enquiry text.
- Keep server credentials out of `VITE_*` variables, committed files, and browser code.

## Formatting and styles

- Prettier is the formatter. Run `npm run format:check` before review and `npm run format` to apply formatting.
- Use the existing `cx` utility presets and Tailwind conventions for frontend styling. Admin-specific styles live in `src/admin/admin.css`.
- Prefer semantic elements and accessible names/labels. Buttons should have explicit types when inside forms and meaningful accessible text when icon-only.
- Use ASCII for code and configuration unless a character is required for user-facing copy or domain data.

## Package-content changes

When changing package fields or behavior, check all of these together:

- `src/types.ts` shared model.
- `data/packages/*.json` records and package ordering.
- `src/admin/AdminApp.tsx` editing controls.
- `src/admin/packageValidation.ts` client validation.
- `serverless/contentHandler.ts` API-side validation and persistence.
- `src/components/Packages.tsx` filters, labels, pricing units, and WhatsApp enquiry content.
- Relevant handover or deployment docs.

Do not invent rates, flight status, inclusions, or validity dates. Use `null` for unquoted rates and `rateNote` to communicate important conditions.

## Required checks

```sh
npm run check
npm run build
```

`npm run check` runs strict TypeScript validation, ESLint, Prettier verification, and Vitest. `npm run build` runs that check suite before creating and prerendering the production site. The test suite currently covers core package sorting, formatting, and validation; UI, browser, and end-to-end API tests are not configured yet.
