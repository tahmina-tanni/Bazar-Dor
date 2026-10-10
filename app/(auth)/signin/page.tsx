import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";
export const metadata: Metadata = { title: "সাইন ইন" };
export default function SignInPage() { return <main className="auth-page"><AuthForm mode="signin" /></main>; }
