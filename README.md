# Currency Converter - Part 1: Idea & Planning

## Project Overview

Build a responsive React app that converts amounts between currencies using live exchange rates from a public API. The app will be simple, fast, and mobile-friendly using Tailwind CSS, and deployed to Vercel.

## Objectives

- Fetch live exchange rates from a public API.

- Allow users to pick a source and target currency and enter an amount.

- Show real-time converted value and optionally historical or reciprocal rates.

- Provide a clean, accessible UI responsive on desktop and mobile.

## Target Users

- Travelers needing quick currency conversions.

- Shoppers comparing prices across currencies.

- Developers learning API integration and frontend deployment.


## User Stories

- As a user, I can select a source currency, target currency, and input an amount so I can see the converted result.

- As a user, I can swap source and target currencies quickly.

- As a user, I can see the exchange rate used for the conversion.

- As a user on mobile, I can use the app comfortably with a responsive layout.


## Core Features (MVP)

- Fetch latest exchange rates from a public API (e.g., ExchangeRate-API, exchangerate.host, or Frankfurter).

- Currency selection dropdowns populated dynamically from API-supported currencies.

- Amount input (with validation) and converted result display.

- Swap button to switch currencies.

- Rate display and last-updated timestamp.

## Nice-to-Have Features (Phase 2)

- Caching rates locally to reduce API calls.

- Historical chart for selected currency pair (small chart using Recharts).

- Save favorite currency pairs to localStorage.

- Keyboard-friendly and accessible component focus states.

## Tech Stack

- Frontend: React (Vite or Create React App)

- Styling: Tailwind CSS

- Fetching: native fetch or axios

- Deployment: Vercel (primary), alternative: Netlify

- Optional: Recharts for small historical charts

## API Options

- ExchangeRate-API: paid tiers, easy to use.

- `exchangerate.host`: free, no API key required, reliable for development.

- `Frankfurter.app`: free, supports EUR base only (useful but limiting).

## Pages & Components

- `App`: root and routing

- `Converter`: main component handling UI and conversion logic.

- `CurrencySelect`: reusable dropdown for currency choices.

- `AmountInput`: number input with formatting/validation.

- `RateInfo`: small component showing current rate and last-updated.

- `Header` / `Footer`: app title and attribution (API credit).

## Data Flow

- On mount, fetch supported currency symbols and (optionally) base rates.

- When user changes amount or currencies, fetch conversion rate for the pair (or use base rates + calculation).

- Show loading states and error handling for failed requests.

## Milestones & Deliverables (5 Weeks)
- Phase 1 (this doc): Idea & planning (done). (1 Week)

- Phase 2 (Design): Wireframes / mockups + component layout (done). (1 Week)

- Phase 3 (Start building): Basic UI + currency fetching, initial conversion working. (1 Week)

- Phase 4 (Continue building): Add caching, polishing, README, push to GitHub.(1 Week)

- Phase 5 (Deployment): Deploy to Vercel and provide live URL. (1 Week)

## Acceptance Criteria (MVP)

- User can convert between any two supported currencies by entering an amount.

- Conversion uses current exchange rates fetched from the API.

- UI responsive and styled with Tailwind.

- App deployed to Vercel with a working live URL.

## Risks & Mitigations

- API rate limits or downtime: mitigate by caching rates and using a free public API that doesn’t require a key for development (exchangerate.host).

- Cross-origin errors: choose APIs with CORS enabled (exchangerate.host supports CORS).

- Decimal rounding / formatting: format outputs to two decimal places and handle very large/small numbers.




