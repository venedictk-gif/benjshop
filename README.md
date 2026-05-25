# BenjShop — E2E Tests

![Playwright Tests](https://github.com/venedictk-gif/benjshop/actions/workflows/playwright.yml/badge.svg)

E2E and API tests for a WooCommerce shop built with **Playwright + TypeScript**.

## 🛠️ Stack

- **Playwright** — browser automation
- **TypeScript** — type-safe test code
- **WooCommerce** — e-commerce platform (Docker)
- **GitHub Actions** — CI/CD

## 📦 Project Structure
benjshop/
├── specs/ # Test files
│ ├── shop/ # Shop page tests
│ ├── cart/ # Cart tests
│ ├── product/ # Product page & full flow tests
│ └── api/ # API tests (Petstore)
├── pages/ # Page Object Models
├── fixtures/ # Test fixtures
├── test-data/ # Test data (JSON)
├── utils/ # Selectors, helpers
└── playwright.config.ts


## 🚀 How to Run
### 1. Install dependencies
```bash
npm install
npx playwright install

cd local-site
docker-compose up -d

npx playwright test
npx playwright show-report