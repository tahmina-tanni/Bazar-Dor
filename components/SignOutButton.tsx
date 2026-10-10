"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
export default function SignOutButton() {
  const router = useRouter();
  async function signOut() {
    const result = await authClient.signOut();
    if (result.error) { toast.error("সাইন আউট করা যায়নি।"); return; }
    toast.success("সাইন আউট সফল হয়েছে।"); router.push("/"); router.refresh();
  }
  return <button className="signin-link signout-button" onClick={signOut}>সাইন আউট</button>;
}
