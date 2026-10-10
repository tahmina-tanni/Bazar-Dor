import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getProduct, taka, percent } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const product = await getProduct(slug); return { title: product?.name || "পণ্যের বিস্তারিত" }; }
export default async function ProductDetailsPage({ params }: Props) {
  const session = await auth.api.getSession({ headers: await headers() }).catch(() => null);
  if (!session?.user) redirect(`/signin?redirect=${encodeURIComponent(`/product/${(await params).slug}`)}&reason=auth-required`);
  const { slug } = await params; const product = await getProduct(slug); if (!product) notFound();
  const markets = product.markets.length ? product.markets : [{ name: "কারওয়ান বাজার", price: product.minPrice }, { name: "মিরপুর বাজার", price: product.avgPrice }, { name: "নিউ মার্কেট", price: product.maxPrice }];
  return <main className="container page-container detail-page"><div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><span>{product.categoryName}</span><span>/</span><span>{product.name}</span></div>
    <section className="detail-summary"><div className="detail-emoji">{product.emoji}</div><div className="detail-main"><div className="tag-row"><span className="tag">{product.categoryName}</span><span className="tag tag-muted">{product.unit}</span></div><h1>{product.name}</h1><p>{product.description}</p><div className="detail-current"><span>আজকের গড় দাম</span><strong>{taka(product.price)}</strong><span className={`change-badge ${product.change > 0 ? "change-up" : product.change < 0 ? "change-down" : "change-flat"}`}>{product.change > 0 ? "▲" : product.change < 0 ? "▼" : "—"} {percent(product.change)}%</span></div></div></section>
    <section className="section-block detail-prices"><div className="section-heading"><div><span className="eyebrow">PRICE SUMMARY</span><h2>দামের সারসংক্ষেপ</h2><p>বিভিন্ন বাজারের দামের তুলনামূলক চিত্র</p></div></div><div className="summary-grid"><div className="summary-card"><span>সর্বনিম্ন দাম</span><strong>{taka(product.minPrice)}</strong><small>কম দামের বাজার</small></div><div className="summary-card featured-summary"><span>গড় দাম</span><strong>{taka(product.avgPrice)}</strong><small>আনুমানিক গড়</small></div><div className="summary-card"><span>সর্বোচ্চ দাম</span><strong>{taka(product.maxPrice)}</strong><small>বেশি দামের বাজার</small></div></div></section>
    <section className="section-block market-section"><div className="section-heading"><div><span className="eyebrow">MARKET COMPARISON</span><h2>বাজারভিত্তিক আজকের দাম</h2><p>বাজার ও বিক্রেতাভেদে দাম আলাদা হতে পারে</p></div></div><div className="market-table-wrap"><table className="market-table"><thead><tr><th>বাজারের নাম</th><th>আজকের দাম</th><th>গড় দামের তুলনায়</th></tr></thead><tbody>{markets.map((market, i) => <tr key={`${market.name}-${i}`}><td><span className="market-pin">⌖</span>{market.name}</td><td className="market-price">{taka(market.price)}</td><td><span className={`market-diff ${market.price > product.avgPrice ? "change-down" : market.price < product.avgPrice ? "change-up" : "change-flat"}`}>{market.price > product.avgPrice ? "+" : market.price < product.avgPrice ? "−" : ""}{taka(Math.abs(market.price - product.avgPrice))}</span></td></tr>)}</tbody></table></div><p className="price-disclaimer">* এটি শিক্ষামূলক ডেমো ও API-নির্ভর তথ্য। কেনার আগে স্থানীয় বাজারে দাম যাচাই করুন।</p></section>
    <div className="detail-back"><Link href="/#সব-পণ্য" className="btn btn-outline">← সব পণ্যে ফিরে যান</Link></div>
  </main>;
}
