# BenjShop — E2E & API Tests

![Playwright Tests](https://github.com/venedictk-gif/benjshop/actions/workflows/playwright.yml/badge.svg)

Full-featured test automation framework for a WooCommerce shop built with **Playwright + TypeScript**.

## 🎯 Key Features

- **Page Object Model** — clean separation of test logic and UI selectors (Shop, Product, Cart, Checkout pages)
- **Fixtures** — reusable authentication and shop page setup
- **Hybrid E2E Tests** — combining API calls (create users, products, orders) with UI interactions
- **API Testing** — full CRUD for WooCommerce REST API (customers, products, orders)
- **CI/CD** — GitHub Actions with Playwright on push
- **Custom Commands** — `fillBillngForm`, `removeItem`, `addItemToCart`, `placeOrder` etc.
- **Search & Filter Tests** — product search and category filtering

## 🛠️ Stack

- **Playwright** — browser automation
- **TypeScript** — type-safe test code
- **WooCommerce** — e-commerce platform
- **Docker** — local test environment
- **GitHub Actions** — CI/CD
- **Nginx + SSL** — local HTTPS setup

## 🚀 How to Run
### 1. Clone & install
```bash
git clone https://github.com/venedictk-gif/benjshop.git
cd benjshop
npm install
npx playwright install
### 2. Configure
Copy `.env.example` to `.env` and fill in your WooCommerce API keys.
### Run specific tests
```bash
npx playwright test specs/shop/add-to-cart.spec.ts
npx playwright test specs/api/
npx playwright test --project=api