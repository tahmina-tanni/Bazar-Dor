import Link from "next/link";
import type { Product } from "@/lib/products";
import { percent, taka } from "@/lib/products";
export default function ProductCard({ product }: { product: Product }) {
  const changeClass = product.change > 0 ? "change-up" : product.change < 0 ? "change-down" : "change-flat";
  return <Link href={`/product/${product.id}-${product.slug}`} className="product-card">
    <div className="product-card-top"><span className="product-emoji">{product.emoji}</span><span className="product-category">{product.categoryName}</span></div>
    <h3>{product.name}</h3><p className="product-unit">{product.unit}</p>
    <div className="price-row"><div><span className="price-label">আজকের দাম</span><strong className="price-value">{taka(product.price)}</strong></div><span className={`change-badge ${changeClass}`}>{product.change > 0 ? "▲" : product.change < 0 ? "▼" : "—"} {percent(product.change)}%</span></div>
    <span className="card-more">বিস্তারিত দেখুন <span aria-hidden="true">↗</span></span>
  </Link>;
}
