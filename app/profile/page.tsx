import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
export const metadata = { title: "আমার প্রোফাইল" };
export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() }).catch(() => null);
  if (!session?.user) redirect("/signin?redirect=%2Fprofile&reason=auth-required");
  return <main className="container page-container profile-page"><div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><span>আমার প্রোফাইল</span></div><section className="profile-card"><div className="profile-avatar">{(session.user.name || session.user.email || "ব").slice(0, 1).toLocaleUpperCase("bn-BD")}</div><span className="eyebrow">YOUR ACCOUNT</span><h1>{session.user.name || "ব্যবহারকারী"}</h1><p className="muted">{session.user.email}</p><div className="profile-info-row"><span>অ্যাকাউন্টের নাম</span><strong>{session.user.name || "—"}</strong></div><div className="profile-info-row"><span>ইমেইল</span><strong>{session.user.email}</strong></div><Link className="btn btn-primary" href="/profile/update">তথ্য আপডেট করুন ↗</Link></section></main>;
}
