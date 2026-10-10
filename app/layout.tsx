import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: { default: "বাজার দর | প্রতিদিনের বাজারদর", template: "%s | বাজার দর" },
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর এক নজরে দেখুন।",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="bn"><body><Providers><Navbar />{children}<footer className="site-footer"><div className="container footer-inner"><p><strong>বাজার দর</strong> — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p><p className="footer-note">সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p></div></footer></Providers></body></html>;
}
