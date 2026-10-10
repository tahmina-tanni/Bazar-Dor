import Link from "next/link";
import { getCategories, getProducts, taka, percent } from "@/lib/products";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignOutButton from "@/components/SignOutButton";

function banglaDate() {
  return new Intl.DateTimeFormat("bn-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Dhaka" }).format(new Date());
}
export default async function Navbar() {
  const [categories, products, session] = await Promise.all([getCategories(), getProducts(), auth.api.getSession({ headers: await headers() }).catch(() => null)]);
  const tickerItems = [...products].sort((a, b) => Math.abs(b.change) - Math.abs(a.change)).slice(0, 8);
  return <>
    <header className="site-header">
      <div className="container nav-main">
        <Link className="brand" href="/" aria-label="বাজার দর হোম পেজ"><span className="brand-icon">🛒</span><span><strong>বাজার দর</strong><small>{banglaDate()}</small></span></Link>
        <nav className="top-actions" aria-label="প্রধান নেভিগেশন">{session?.user ? <><Link href="/profile" className="signin-link">{session.user.name || "আমার প্রোফাইল"}</Link><SignOutButton /></> : <><Link href="/signin" className="signin-link">সাইন ইন</Link><Link href="/signup" className="btn btn-primary btn-small">সাইন আপ</Link></>}</nav>
      </div>
      <div className="nav-categories-wrap"><nav className="container nav-categories" aria-label="পণ্যের ক্যাটাগরি"><Link href="/" className="category-link active">সব পণ্য</Link>{categories.map(c => <Link key={c.slug} href={`/category/${encodeURIComponent(c.slug)}`} className="category-link">{c.icon} {c.name}</Link>)}<Link href="/profile" className="category-link profile-nav">আমার প্রোফাইল</Link></nav></div>
    </header>
    <div className="ticker" aria-label="আজকের বাজারদর ticker"><div className="ticker-track">{[...tickerItems, ...tickerItems].map((p, i) => <span className="ticker-item" key={`${p.id}-${i}`}><span>{p.emoji}</span><b>{p.name}</b><span>{taka(p.price)}/{p.unit.replace("প্রতি ", "")}</span><span className={p.change > 0 ? "change-up" : p.change < 0 ? "change-down" : "change-flat"}>{p.change > 0 ? "▲" : p.change < 0 ? "▼" : "—"} {percent(p.change)}%</span></span>)}</div></div>
  </>;
}
