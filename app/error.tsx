"use client";
import { useEffect } from "react";
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error("BazarDor route error:", error); }, [error]);
  return <main className="not-found container"><div className="not-found-art">🌿</div><span className="eyebrow">SOMETHING WENT WRONG</span><h1>দুঃখিত, একটি সমস্যা হয়েছে</h1><p>পৃষ্ঠাটি আবার লোড করে দেখুন। সমস্যা চলতে থাকলে কিছুক্ষণ পর চেষ্টা করুন।</p><button className="btn btn-primary" onClick={() => reset()}>আবার চেষ্টা করুন</button></main>;
}
