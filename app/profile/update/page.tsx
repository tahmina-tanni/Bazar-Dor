import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileUpdateForm from "@/components/ProfileUpdateForm";
export const metadata = { title: "প্রোফাইল আপডেট" };
export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() }).catch(() => null);
  if (!session?.user) redirect("/signin?redirect=%2Fprofile%2Fupdate&reason=auth-required");
  return <main className="container page-container profile-page"><div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><Link href="/profile">আমার প্রোফাইল</Link><span>/</span><span>তথ্য আপডেট</span></div><section className="profile-card update-card"><span className="eyebrow">PROFILE SETTINGS</span><h1>আপনার তথ্য আপডেট করুন</h1><p className="muted">আপনার অ্যাকাউন্টে প্রদর্শিত নাম পরিবর্তন করুন।</p><ProfileUpdateForm currentName={session.user.name || ""} /><Link href="/profile" className="back-link">← প্রোফাইলে ফিরে যান</Link></section></main>;
}
