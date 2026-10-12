# Cloth's Today Frontend

This directory contains the React + Vite frontend for the Cloth's Today e-commerce application. It provides the storefront, product browsing, cart, authentication routes, and catalog management screens that connect to the backend API.

## Project overview

The frontend is built as a single-page application using React and Vite. It is designed to work with a Laravel or similar backend that exposes product and catalog endpoints under `/api`.

Main responsibilities of this frontend include:

- Displaying featured products, collections, offers, and category pages
- Supporting shopping cart state across the app
- Fetching data from backend product APIs
- Showing product detail pages and related products
- Handling admin product creation with images and variants
- Allowing route-based navigation for shop, login, signup, and cart views

## Tech stack

- React 19
- Vite 6
- React Router DOM
- Native browser Fetch API for backend communication
- CSS-based styling in component files and page styles

## Project structure

```text
Frontend/
├── public/
├── src/
│   ├── assets/
│   ├── Components/
│   ├── Context/
│   ├── Pages/
│   ├── services/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.local
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── vite.config.js
└── package-lock.json
```

## Core frontend modules

### App routing
`src/App.jsx` defines the public routes for the storefront and admin flow:

- `/` -> shop home page
- `/men`, `/women`, `/kid` -> category pages
- `/product/:productId` -> product details
- `/login` -> login page
- `/signup` -> signup page
- `/cart` -> cart summary page
- `/admin/products/create` -> product creation form

### Global shop context
`src/Context/ShopContext.jsx` manages:

- product list loading
- cart item count and totals
- add/remove/update cart actions
- total price calculations

This context is used across components to keep cart behavior consistent.

### Product service layer
`src/services/products.js` centralizes all backend product requests. It contains:

- API base URL resolution from `VITE_API_BASE_URL`
- JSON fetch helper with Accept headers
- CSRF token extraction from cookies
- product creation logic using `FormData`
- product normalization for frontend display
- product list fetching from `/products`

### Product creation form
`src/Pages/ProductCreate.jsx` allows catalog management to create products through the backend API. It supports:

- basic product fields: name, slug, description, price, stock, SKU, category
- image uploads with metadata like alt text, sort order, and primary image
- product variants with stock and price data
- validation and success/error messages

## Environment configuration

The frontend reads the backend API URL from an environment variable:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

If the variable is not defined, the app falls back to:

```text
http://127.0.0.1:8000/api
```

The application assumes the backend is running and accessible before product data is loaded.

## Dependencies and scripts

From the `Frontend` directory, install dependencies:

```bash
npm install
```

Run the app in development mode:

```bash
npm run dev
```

Build the app for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run ESLint checks:

```bash
npm run lint
```

## API integration notes

The frontend uses the Fetch API and expects backend responses in JSON format. For product creation, it sends multipart form data because products can include images and variant metadata. The service layer also handles CSRF-based requests for authenticated or protected operations.

## Typical frontend workflow

1. Start the backend API on the configured host and port.
2. Set `VITE_API_BASE_URL` in `.env.local` if the backend runs elsewhere.
3. Start the frontend with `npm run dev`.
4. Browse the shop, category pages, and cart.
5. Use `/admin/products/create` to add new products to the catalog.

## Notes for contributors

- Keep API contracts aligned with the backend response shape.
- Do not hardcode API URLs inside components; use the service layer.
- Use the shared `ShopContext` for cart-state mutations instead of creating independent cart logic in multiple components.
- Preserve the existing routes when modifying navigation or product flows.

## Related project context

This frontend is part of the larger Cloth's Today e-commerce platform, where the backend provides catalog, authentication, and business logic and the frontend renders the customer and admin experience.
