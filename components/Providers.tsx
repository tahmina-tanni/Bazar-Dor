"use client";
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
function AuthNotice() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("reason") === "auth-required") toast("এই পৃষ্ঠাটি দেখতে আগে সাইন ইন করুন।");
    if (params.get("auth") === "success") toast.success("সাইন ইন সফল হয়েছে!");
    if (params.get("registered") === "1") toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এবার সাইন ইন করুন।");
  }, []);
  return null;
}
export default function Providers({ children }: { children: React.ReactNode }) {
  return <><Toaster position="top-center" toastOptions={{ duration: 3200, style: { borderRadius: 14, fontFamily: "inherit" } }} /><AuthNotice />{children}</>;
}
