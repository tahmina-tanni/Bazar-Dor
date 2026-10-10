"use client";
import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";
export default function SortedProductList({ products }: { products: Product[] }) {
  const [sort, setSort] = useState("default");
  const sorted = useMemo(() => {
    const copy = [...products];
    if (sort === "low") copy.sort((a, b) => a.price - b.price);
    if (sort === "high") copy.sort((a, b) => b.price - a.price);
    return copy;
  }, [products, sort]);
  return <><div className="sort-row"><label htmlFor="sort-products">সাজান:</label><select id="sort-products" value={sort} onChange={e => setSort(e.target.value)}><option value="default">ডিফল্ট</option><option value="low">দাম: কম থেকে বেশি</option><option value="high">দাম: বেশি থেকে কম</option></select></div><div className="product-grid">{sorted.map(p => <ProductCard key={p.id} product={p} />)}</div></>;
}
