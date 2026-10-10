import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";
export const metadata: Metadata = { title: "সাইন আপ" };
export default function SignUpPage() { return <main className="auth-page"><AuthForm mode="signup" /></main>; }
