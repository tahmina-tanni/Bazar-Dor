"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

export default function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const isSignup = mode === "signup";
  const router = useRouter(); const searchParams = useSearchParams();
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [busy, setBusy] = useState(false);
  const redirectTo = searchParams.get("redirect") || "/";
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password.length < 8) { toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।"); return; }
    if (isSignup && !name.trim()) { toast.error("আপনার নাম লিখুন।"); return; }
    setBusy(true);
    try {
      const result = isSignup
        ? await authClient.signUp.email({ name: name.trim(), email: email.trim(), password })
        : await authClient.signIn.email({ email: email.trim(), password });
      if (result.error) { toast.error(result.error.message || (isSignup ? "অ্যাকাউন্ট তৈরি করা যায়নি।" : "ইমেইল বা পাসওয়ার্ড সঠিক নয়।")); return; }
      toast.success(isSignup ? "অ্যাকাউন্ট তৈরি হয়েছে! স্বাগতম।" : "সাইন ইন সফল হয়েছে!");
      router.push(isSignup ? "/signin?registered=1" : redirectTo); router.refresh();
    } catch { toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।"); }
    finally { setBusy(false); }
  }
  async function social(provider: "google" | "github") {
    setBusy(true);
    try {
      const result = await authClient.signIn.social({ provider, callbackURL: redirectTo });
      if (result.error) { toast.error(result.error.message || `${provider} login ব্যর্থ হয়েছে।`); setBusy(false); }
    } catch { toast.error(`${provider} login কনফিগার করা নেই অথবা ব্যর্থ হয়েছে।`); setBusy(false); }
  }
  return <div className="auth-layout"><div className="auth-aside"><Link className="brand auth-brand" href="/"><span className="brand-icon">🛒</span><span><strong>বাজার দর</strong><small>দাম জানুন, সচেতন থাকুন</small></span></Link><div className="auth-art">🧺</div><h2>প্রতিদিনের বাজার, এখন এক নজরে।</h2><p>সঠিক তথ্য দেখে বাজার করুন আরও আত্মবিশ্বাসের সঙ্গে।</p></div>
    <section className="auth-card"><Link href="/" className="back-link">← হোম পেজে ফিরুন</Link><p className="eyebrow">বাজার দর অ্যাকাউন্ট</p><h1>{isSignup ? "নতুন অ্যাকাউন্ট তৈরি করুন" : "আবার স্বাগতম!"}</h1><p className="muted">{isSignup ? "আপনার তথ্য দিয়ে রেজিস্ট্রেশন করুন।" : "আপনার অ্যাকাউন্টে সাইন ইন করুন।"}</p>
      <form onSubmit={submit} className="auth-form">{isSignup && <label>আপনার নাম<input autoComplete="name" value={name} onChange={e => setName(e.target.value)} placeholder="পূর্ণ নাম লিখুন" required /></label>}<label>ইমেইল<input type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required /></label><label>পাসওয়ার্ড<input type="password" autoComplete={isSignup ? "new-password" : "current-password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="কমপক্ষে ৮ অক্ষর" minLength={8} required /></label><button className="btn btn-primary auth-submit" disabled={busy}>{busy ? "অপেক্ষা করুন…" : isSignup ? "সাইন আপ করুন" : "সাইন ইন করুন"}</button></form>
      <div className="auth-divider"><span>অথবা</span></div><div className="social-buttons"><button className="btn btn-outline" disabled={busy} onClick={() => social("google")}><b>G</b> Google দিয়ে {isSignup ? "সাইন আপ" : "সাইন ইন"}</button><button className="btn btn-outline" disabled={busy} onClick={() => social("github")}><b>⌘</b> GitHub দিয়ে চালিয়ে যান</button></div>
      <p className="auth-switch">{isSignup ? "আগে থেকেই অ্যাকাউন্ট আছে?" : "অ্যাকাউন্ট নেই?"} <Link href={isSignup ? "/signin" : "/signup"}>{isSignup ? "সাইন ইন করুন" : "সাইন আপ করুন"}</Link></p>
    </section></div>;
}
