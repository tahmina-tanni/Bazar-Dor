# 🛒 বাজার দর (BazarDor)

A responsive Bengali market-price dashboard. Check today's essential-commodity prices, see what went up or down, and compare prices across markets.

**Live:** https://bazar-c3mti7fzx-tahmina-tanni.vercel.app/ 
**Repo:** https://github.com/tahmina-tanni/Bazar-Dor.git
## Features

- **Price dashboard**: scrolling price ticker, top risers and fallers, full product grid with colour-coded change badges
- **Product details** (login required): min / max / average price and a market-by-market table
- **Category pages**: skeleton loaders, numeric price sorting (Bengali digits supported), 404-style empty state
- **Authentication**: email/password plus Google and GitHub login via Better Auth
- **Profile**: view and update your name
- **Polished UX**: toast notifications, custom 404 page, fully responsive on mobile, tablet and desktop

## Tech Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Better Auth · Prisma · PostgreSQL (Neon) · react-hot-toast · Vercel

## Run Locally

```bash
git clone https://github.com/your-username/BazarDor.git
cd BazarDor
npm install
cp .env.example .env     # Windows: copy .env.example .env
npx prisma db push
npm run dev
```

Open http://localhost:3000

## Environment Variables

Set these in `.env` (never commit it):

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | Random 32+ character secret |
| `BETTER_AUTH_URL` | App URL, e.g. `http://localhost:3000` |
| `NEXT_PUBLIC_APP_URL` | Same URL, for the client |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Optional, enables Google login |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | Optional, enables GitHub login |

OAuth callback URLs: `{APP_URL}/api/auth/callback/google` and `{APP_URL}/api/auth/callback/github`

## Deployment

Deployed on Vercel. Add the variables above in Vercel settings, set `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to the production URL, then redeploy.

## Data

Prices come from the BazarDor API. Sample fallback data is used only if the API is unreachable and is not live market data.