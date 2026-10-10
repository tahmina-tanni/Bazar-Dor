"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
export default function ProfileUpdateForm({ currentName }: { currentName: string }) {
  const [name, setName] = useState(currentName); const [busy, setBusy] = useState(false); const router = useRouter();
  async function submit(e: FormEvent) {
    e.preventDefault(); if (!name.trim()) { toast.error("নাম লিখুন।"); return; }
    setBusy(true);
    try { const result = await authClient.updateUser({ name: name.trim() }); if (result.error) { toast.error(result.error.message || "তথ্য আপডেট করা যায়নি।"); return; } toast.success("আপনার নাম আপডেট হয়েছে।"); router.push("/profile"); router.refresh(); }
    catch { toast.error("আপডেট ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"); }
    finally { setBusy(false); }
  }
  return <form className="auth-form profile-update-form" onSubmit={submit}><label>নাম<input value={name} onChange={e => setName(e.target.value)} required maxLength={80} /></label><button className="btn btn-primary" disabled={busy}>{busy ? "আপডেট হচ্ছে…" : "Update Information"}</button></form>;
}
