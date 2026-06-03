# BenjShop -- E2E & API Tests

![Playwright Tests](https://github.com/venedictk-gif/benjshop/actions/workflows/playwright.yml/badge.svg)

Full-featured test automation framework for a WooCommerce shop built with **Playwright + TypeScript**.

## Key Features

- **Page Object Model** -- clean separation of test logic and UI selectors (Shop, Product, Cart, Checkout pages)
- **Fixtures** -- reusable authentication and shop page setup
- **Hybrid E2E Tests** -- combining API calls (create users, products, orders) with UI interactions
- **API Testing** -- full CRUD for WooCommerce REST API (customers, products, orders)
- **CI/CD** -- GitHub Actions with Playwright on push
- **Custom Commands** -- fillBillngForm, removeItem, addItemToCart, placeOrder etc.
- **Search & Filter Tests** -- product search and category filtering
- **Mock Testing** -- page.route for API error emulation
- **Visual Testing** -- toHaveScreenshot for visual regression
- **Data-Driven Tests** -- test.each with JSON data

## Stack

- **Playwright** -- browser automation
- **TypeScript** -- type-safe test code
- **WooCommerce** -- e-commerce platform
- **Docker** -- local test environment
- **GitHub Actions** -- CI/CD
- **Nginx + SSL** -- local HTTPS setup
- **Postman** -- API collection & mock server

## Project Structure

benjshop/
+-- specs/             # Test files
|   +-- shop/          # Shop page tests (search, filter, add to cart)
|   +-- cart/          # Cart tests (remove, change quantity, empty cart)
|   +-- checkout/      # Checkout tests (validation, place order)
|   +-- product/       # Product page & full user flow tests
|   +-- auth/          # Authentication tests (login, logout, lost password)
|   +-- e2e/           # Hybrid API + UI full flow tests
|   +-- api/           # REST API tests (customers, orders, products)
+-- pages/             # Page Object Models (Shop, Cart, Checkout, Product, Login)
+-- fixtures/          # Test fixtures (auth, shop, product)
+-- test-data/         # Test data (products.json, users.json)
+-- utils/             # Selectors, API helpers
+-- postman/           # Postman collection
+-- docs/              # Documentation (bugs)
+-- playwright.config.ts

## How to Run

### 1. Clone & install
git clone https://github.com/venedictk-gif/benjshop.git
cd benjshop
npm install
npx playwright install

### 2. Configure
Copy .env.example to .env and fill in your WooCommerce API keys:
WOOCOMMERCE_KEY=ck_your_key
WOOCOMMERCE_SECRET=cs_your_secret
BASE_URL=https://localhost

### 3. Start local environment
The Docker environment (WordPress + WooCommerce + nginx) is maintained separately.
Refer to the environment setup guide or use an existing WooCommerce instance.

### 4. Run tests
npx playwright test          # All tests
npm run test:smoke           # Smoke tests only
npm run test:api             # API tests only
npm run test:ui              # UI tests (Chromium + Firefox)
npm run test:mobile          # Mobile tests
npm run report               # View HTML report

## Test Coverage

| Area | Tests |
|------|-------|
| Shop (search, filter, add to cart) | OK |
| Cart (remove, change quantity, empty cart) | OK |
| Checkout (validation, place order) | OK |
| Product page | OK |
| API (customers, products, orders CRUD) | OK |
| Auth (login, logout, lost password) | OK |
| E2E Hybrid (API + UI full flow) | OK |
| Mock Testing (page.route) | OK |
| Visual Regression | OK |
| Data-Driven (test.each + JSON) | OK |
| Mobile | OK |
| Coupons | OK |
| Order lifecycle | OK |

## Scripts

| Command | Description |
|---------|-------------|
| npm run test:smoke | Run @smoke tests |
| npm run test:api | Run API tests (Petstore) |
| npm run test:ui | Run UI tests (Chromium + Firefox) |
| npm run test:mobile | Run mobile tests |
| npm run report | Open HTML report |

## Postman Collection

Postman collection for manual API testing is available in postman/BenjShop.postman_collection.json.

## CI/CD

Tests run automatically on every push to main via **GitHub Actions**.