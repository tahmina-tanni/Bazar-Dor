import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";

const socialProviders: Record<string, any> = {};
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  socialProviders.github = {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  };
}

// "Invalid origin" fix: je je URL theke site khola hobe segulo ekhane thakte hobe
const trustedOrigins = new Set<string>([
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:3001",
  "http://192.168.0.103:3000",
  "https://*.vercel.app",
]);
for (const url of [process.env.BETTER_AUTH_URL, process.env.NEXT_PUBLIC_APP_URL]) {
  if (url) trustedOrigins.add(url.replace(/\/$/, ""));
}
if (process.env.VERCEL_URL) {
  trustedOrigins.add(`https://${process.env.VERCEL_URL}`);
}
if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
  trustedOrigins.add(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
}

export const auth = betterAuth({
  appName: "BazarDor",
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000",
  trustedOrigins: Array.from(trustedOrigins),
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "local-development-secret-change-before-production-2026",
  emailAndPassword: { enabled: true, autoSignIn: true },
  socialProviders,
  user: { additionalFields: {} },
});