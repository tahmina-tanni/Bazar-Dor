"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
type Category = { slug: string; name: string; icon: string };
export default function CategoryLinks({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  return <nav className="container nav-categories" aria-label="পণ্যের ক্যাটাগরি">
    <Link href="/" className={`category-link${pathname === "/" ? " active" : ""}`}>সব পণ্য</Link>
    {categories.map(c => <Link key={c.slug} href={`/category/${encodeURIComponent(c.slug)}`} className={`category-link${pathname === `/category/${c.slug}` ? " active" : ""}`}>{c.icon} {c.name}</Link>)}
    <Link href="/profile" className={`category-link profile-nav${pathname.startsWith("/profile") ? " active" : ""}`}>আমার প্রোফাইল</Link>
  </nav>;
}
