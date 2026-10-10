import Link from "next/link";
export default function NotFound() { return <main className="not-found container"><div className="not-found-art">🧺</div><span className="eyebrow">404 · PAGE NOT FOUND</span><h1>এই পৃষ্ঠাটি খুঁজে পাওয়া যায়নি!</h1><p>লিংকটি ভুল হতে পারে অথবা পৃষ্ঠাটি আর নেই।</p><Link href="/" className="btn btn-primary">হোম পেজে ফিরে যান</Link></main>; }
