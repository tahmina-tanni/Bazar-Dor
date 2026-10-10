import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SortedProductList from "@/components/SortedProductList";
import { getCategories, getCategoryProducts } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const category = (await getCategories()).find(c => c.slug === slug); return { title: category?.name || "ক্যাটাগরি" }; }
export default async function CategoryPage({ params }: Props) {
  const { slug } = await params; const [categories, products] = await Promise.all([getCategories(), getCategoryProducts(slug)]);
  const category = categories.find(c => c.slug === slug);
  if (!category || products.length === 0) notFound();
  return <main className="container page-container"><div className="breadcrumbs"><Link href="/">হোম</Link><span>/</span><span>{category.name}</span></div><section className="category-hero"><div className="category-icon-large">{category.icon}</div><div><span className="eyebrow">PRODUCT CATEGORY</span><h1>{category.name}</h1><p>এই ক্যাটাগরির পণ্যের আজকের দাম দেখুন এবং তুলনা করুন।</p></div></section><div className="section-heading category-heading"><div><h2>{category.name} এর পণ্য</h2><p>দাম নিয়মিত পরিবর্তিত হতে পারে</p></div><span className="section-count">{products.length.toLocaleString("bn-BD")} পণ্য</span></div><SortedProductList products={products} /></main>;
}
