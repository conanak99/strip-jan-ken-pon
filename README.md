# Strip Janken

Rock–paper–scissors mini game built with **React 19**, **Vite**, **styled-components 6**, and **nes.css**. Linted and formatted by **Biome**.

## Tech stack

- React 19 (with the modern `createRoot` API)
- Vite 8 (dev server, HMR, production bundling)
- TypeScript 5.9
- styled-components 6 (transient `$props`)
- Biome 2 (lint + format, replaces ESLint + Prettier)
- Vitest + Testing Library (jsdom)

## Available Scripts

### `yarn dev` (or `yarn start`)

Starts the Vite dev server at [http://localhost:3000](http://localhost:3000) with HMR.

### `yarn build`

Type-checks with `tsc --noEmit` and produces an optimized production build in `build/`.

### `yarn preview`

Serves the production build locally for verification.

### `yarn test`

Runs the Vitest test suite.

### `yarn lint`

Runs Biome lint over the codebase.

### `yarn format`

Formats the codebase with Biome.

### `yarn check`

Runs Biome's combined lint + format + import-organize check, applying safe fixes.

### `yarn build-prod`

Builds with `PUBLIC_URL=https://strip.toidicodedao.com` for GitHub Pages deploys.

## Project layout

- `index.html` — Vite entry HTML at the project root
- `src/main.tsx` — React entry (uses `createRoot`)
- `src/App/` — Top-level reducer, game loop, layout chrome
- `src/screens/` — Per-screen UI (`ChoiceScreen`, `ResultScreen`, `VideoScreen`, `GameOverScreen`)
- `src/components/` — Shared components (`Video`, `ChoiceImg`)
- `src/model.ts` — Game state, actions, and enums
- `src/context.ts` — App-wide React context with default state
- `public/` — Static assets (images, videos, sounds) served as-is
