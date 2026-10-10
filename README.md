# 🛒 বাজার দর (BazarDor)

**বাজার দর** is a responsive Bengali-language market-price dashboard for checking everyday essentials, comparing approximate prices, and seeing which products have gone up or down. It is built with the Next.js App Router and uses the supplied BazarDor API when available.

## Features

1. **Responsive home page** with a Bengali date, category navigation, scrolling price ticker, hero section, rising/falling price sections, and a product grid.
2. **Product detail pages** with price summary (minimum, maximum, average) and market-by-market comparisons. Product detail pages require sign-in.
3. **Category pages** with loading skeletons, empty/invalid-category handling, and numeric low-to-high/high-to-low sorting.
4. **Better Auth** email/password registration and login, plus optional Google and GitHub OAuth.
5. **Profile and update information** route to update the signed-in user's name.
6. **Toast notifications**, loading states, custom 404 page, and a responsive layout for mobile, tablet, and desktop.
7. **API fallback data** so the UI can still be reviewed if the external API is temporarily unreachable. Demo fallback prices are illustrative, not live market quotes.

## Technology stack

- Next.js App Router (Next.js 16)
- React + TypeScript
- Tailwind CSS v4 (with custom responsive CSS)
- Better Auth
- Prisma ORM + PostgreSQL
- `react-hot-toast`
- BazarDor products/categories API

## Requirements

- Node.js 20.9 or later (Node.js 22 recommended)
- A PostgreSQL database (Neon, Supabase, or another hosted PostgreSQL provider is suitable for Vercel)
- Google/GitHub OAuth credentials if you want social login enabled

## Run locally in VS Code

1. Extract the project ZIP and open the **BazarDor** folder in VS Code.
2. Open VS Code Terminal → New Terminal.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Copy `.env.example` to `.env.local`.
5. Fill in `DATABASE_URL` and `BETTER_AUTH_SECRET`. For local development, set `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to `http://localhost:3000`.
6. Create the database tables:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

7. Start the app:

   ```bash
   npm run dev
   ```

8. Open `http://localhost:3000`.

> If you don't configure PostgreSQL, product pages can still show the API/demo data, but Better Auth login, signup, profile, and protected pages will not work. Use a real database for authentication.

## API endpoints

Default base URL: `https://api.api-store.workers.dev/api/bazardor`  
Alternative: `https://api.abcz.workers.dev/api/bazardor`

- `GET /products`
- `GET /products?category=chal`
- `GET /products/1`
- `GET /categories`
- `GET /categories/chal`

Set `BAZARDOR_API_BASE_URL` in `.env.local` if you need to use the alternative API. The data adapter handles several common API field names; if the live API's response schema changes, update `lib/products.ts` accordingly.

## Better Auth setup

1. Configure `DATABASE_URL` and `BETTER_AUTH_SECRET`.
2. In Google Cloud Console, add your local and production callback URI. Better Auth's default callback path is usually `/api/auth/callback/google`.
3. In GitHub OAuth App settings, add the callback URI shown by Better Auth for GitHub (typically `/api/auth/callback/github`).
4. Add `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, and `GITHUB_CLIENT_SECRET` to `.env.local` and to your Vercel project's Environment Variables.
5. Make sure `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` use your deployed HTTPS domain in production.

Social-login buttons are shown in the UI even when credentials are not set; the provider flow will fail until valid OAuth credentials are added. Never commit `.env.local` or real secrets to GitHub.

## Deploy to Vercel

1. Push the project to your own GitHub repository.
2. Import that repository into Vercel.
3. Add the environment variables from `.env.example` in Vercel → Settings → Environment Variables.
4. Use a hosted PostgreSQL database and run `npx prisma db push` against that database once before testing auth.
5. Deploy, then test `/`, `/category/chal`, `/signin`, `/signup`, `/profile`, and a product detail URL after refreshing the page.
6. Add the production callback URLs to Google/GitHub OAuth settings. Callback URLs must match exactly.

## Suggested Git commit sequence

The assignment asks for at least eight meaningful commits. Make each commit after the matching milestone rather than one large final commit:

```bash
git add package.json tsconfig.json next.config.ts postcss.config.mjs && git commit -m "chore: initialize Next.js and TypeScript project"
git add app/globals.css public && git commit -m "style: add responsive BazarDor design system and assets"
git add lib/products.ts components/ProductCard.tsx && git commit -m "feat: connect product and category data with fallback"
git add components/Navbar.tsx app/layout.tsx app/page.tsx && git commit -m "feat: build market home page and price ticker"
git add app/category components/SortedProductList.tsx && git commit -m "feat: add category pages and price sorting"
git add prisma lib/auth.ts lib/auth-client.ts app/api/auth proxy.ts && git commit -m "feat: configure Better Auth and protected routes"
git add app/\(auth\) components/AuthForm.tsx components/Providers.tsx && git commit -m "feat: add email and social authentication UI"
git add app/product app/profile app/not-found.tsx README.md .env.example && git commit -m "feat: add product details, profile, 404 and deployment docs"
```

## Important note about prices

Prices in the local fallback list are sample values to keep the UI usable during an API outage. They are not guaranteed live or official market prices. Verify the live API response before presenting the app as a real-time market data service.
