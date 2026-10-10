export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryName: string;
  emoji: string;
  unit: string;
  price: number;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  change: number;
  description: string;
  markets: { name: string; price: number }[];
};

const API_BASE = (process.env.BAZARDOR_API_BASE_URL || "https://api.api-store.workers.dev/api/bazardor").replace(/\/$/, "");
const EMOJIS: Record<string, string> = { chal: "🍚", rice: "🍚", vegetables: "🥬", sobji: "🥬", fish: "🐟", mach: "🐟", meat: "🍗", mangsho: "🍗", oil: "🫙", dal: "🫘", onion: "🧅", potato: "🥔", egg: "🥚", fruits: "🍎" };
const DEMO: Product[] = [
  { id: "1", slug: "miniket-chal", name: "মিনিকেট চাল", category: "chal", categoryName: "চাল ও ডাল", emoji: "🍚", unit: "প্রতি কেজি", price: 75, minPrice: 70, maxPrice: 82, avgPrice: 75, change: 2.1, description: "বিভিন্ন বাজারে মিনিকেট চালের আজকের আনুমানিক দাম।", markets: [{ name: "কারওয়ান বাজার", price: 72 }, { name: "মিরপুর বাজার", price: 76 }, { name: "নিউ মার্কেট", price: 77 }] },
  { id: "2", slug: "peyaj", name: "পেঁয়াজ", category: "sobji", categoryName: "সবজি", emoji: "🧅", unit: "প্রতি কেজি", price: 65, minPrice: 58, maxPrice: 72, avgPrice: 65, change: -2.9, description: "দেশি পেঁয়াজের বাজারদর ও বাজারভিত্তিক তুলনা।", markets: [{ name: "কারওয়ান বাজার", price: 60 }, { name: "মিরপুর বাজার", price: 66 }, { name: "নিউ মার্কেট", price: 69 }] },
  { id: "3", slug: "alu", name: "আলু", category: "sobji", categoryName: "সবজি", emoji: "🥔", unit: "প্রতি কেজি", price: 35, minPrice: 30, maxPrice: 40, avgPrice: 35, change: -1.8, description: "আলুর সাম্প্রতিক বাজারদরের সারসংক্ষেপ।", markets: [{ name: "কারওয়ান বাজার", price: 32 }, { name: "মিরপুর বাজার", price: 36 }, { name: "নিউ মার্কেট", price: 37 }] },
  { id: "4", slug: "ilish-mach", name: "ইলিশ মাছ", category: "mach", categoryName: "মাছ", emoji: "🐟", unit: "প্রতি কেজি", price: 1850, minPrice: 1600, maxPrice: 2200, avgPrice: 1850, change: 3.4, description: "আকার ও বাজারভেদে ইলিশ মাছের দাম পরিবর্তিত হতে পারে।", markets: [{ name: "কারওয়ান বাজার", price: 1750 }, { name: "মিরপুর বাজার", price: 1900 }, { name: "নিউ মার্কেট", price: 1900 }] },
  { id: "5", slug: "soybean-oil", name: "সয়াবিন তেল", category: "oil", categoryName: "তেল ও মসলা", emoji: "🫙", unit: "প্রতি লিটার", price: 170, minPrice: 165, maxPrice: 180, avgPrice: 170, change: 0, description: "বোতলজাত সয়াবিন তেলের আনুমানিক বাজারদর।", markets: [{ name: "কারওয়ান বাজার", price: 168 }, { name: "মিরপুর বাজার", price: 170 }, { name: "নিউ মার্কেট", price: 172 }] },
  { id: "6", slug: "dim", name: "ডিম", category: "protein", categoryName: "মাছ-মাংস ও ডিম", emoji: "🥚", unit: "প্রতি ডজন", price: 145, minPrice: 138, maxPrice: 155, avgPrice: 145, change: 1.5, description: "প্রতি ডজন ডিমের বাজারদরের ধারণা।", markets: [{ name: "কারওয়ান বাজার", price: 140 }, { name: "মিরপুর বাজার", price: 145 }, { name: "নিউ মার্কেট", price: 150 }] },
  { id: "7", slug: "mosur-dal", name: "মসুর ডাল", category: "dal", categoryName: "চাল ও ডাল", emoji: "🫘", unit: "প্রতি কেজি", price: 125, minPrice: 115, maxPrice: 135, avgPrice: 125, change: 2.7, description: "মসুর ডালের সাম্প্রতিক আনুমানিক বাজারদর।", markets: [{ name: "কারওয়ান বাজার", price: 120 }, { name: "মিরপুর বাজার", price: 126 }, { name: "নিউ মার্কেট", price: 129 }] },
  { id: "8", slug: "roshun", name: "রসুন", category: "moshla", categoryName: "তেল ও মসলা", emoji: "🧄", unit: "প্রতি কেজি", price: 220, minPrice: 200, maxPrice: 240, avgPrice: 220, change: -3.2, description: "রসুনের বাজারভিত্তিক দামের তুলনা।", markets: [{ name: "কারওয়ান বাজার", price: 210 }, { name: "মিরপুর বাজার", price: 220 }, { name: "নিউ মার্কেট", price: 230 }] },
  { id: "9", slug: "morich", name: "কাঁচা মরিচ", category: "sobji", categoryName: "সবজি", emoji: "🌶️", unit: "প্রতি কেজি", price: 90, minPrice: 75, maxPrice: 110, avgPrice: 90, change: 4.1, description: "কাঁচা মরিচের বাজারদর দ্রুত পরিবর্তিত হতে পারে।", markets: [{ name: "কারওয়ান বাজার", price: 82 }, { name: "মিরপুর বাজার", price: 90 }, { name: "নিউ মার্কেট", price: 98 }] },
  { id: "10", slug: "murgi", name: "ব্রয়লার মুরগি", category: "protein", categoryName: "মাছ-মাংস ও ডিম", emoji: "🍗", unit: "প্রতি কেজি", price: 195, minPrice: 185, maxPrice: 210, avgPrice: 195, change: -1.2, description: "ব্রয়লার মুরগির আনুমানিক বাজারদর।", markets: [{ name: "কারওয়ান বাজার", price: 190 }, { name: "মিরপুর বাজার", price: 195 }, { name: "নিউ মার্কেট", price: 200 }] },
  { id: "11", slug: "begun", name: "বেগুন", category: "sobji", categoryName: "সবজি", emoji: "🍆", unit: "প্রতি কেজি", price: 55, minPrice: 45, maxPrice: 65, avgPrice: 55, change: 1.9, description: "বেগুনের বাজারভিত্তিক আনুমানিক দাম।", markets: [{ name: "কারওয়ান বাজার", price: 50 }, { name: "মিরপুর বাজার", price: 55 }, { name: "নিউ মার্কেট", price: 60 }] },
  { id: "12", slug: "tomato", name: "টমেটো", category: "sobji", categoryName: "সবজি", emoji: "🍅", unit: "প্রতি কেজি", price: 80, minPrice: 70, maxPrice: 95, avgPrice: 80, change: -2.1, description: "টমেটোর সাম্প্রতিক বাজারদরের ধারণা।", markets: [{ name: "কারওয়ান বাজার", price: 75 }, { name: "মিরপুর বাজার", price: 80 }, { name: "নিউ মার্কেট", price: 85 }] }
];

function first(obj: any, keys: string[], fallback: any = undefined) {
  for (const key of keys) if (obj?.[key] !== undefined && obj?.[key] !== null && obj?.[key] !== "") return obj[key];
  return fallback;
}
function numberOf(value: any, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const normalized = String(value ?? "").replace(/[০-৯]/g, (d) => String("০১২৩৪৫৬৭৮৯".indexOf(d))).replace(/[^\d.-]/g, "");
  const n = Number(normalized); return Number.isFinite(n) ? n : fallback;
}
function toSlug(value: string) { return value.toLowerCase().trim().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, ""); }
function normalize(raw: any, index: number): Product {
  const name = String(first(raw, ["name", "productName", "product_name", "title", "bn_name", "bangla_name"], `পণ্য ${index + 1}`));
  const category = String(first(raw, ["categorySlug", "category_slug", "category", "category_id"], "other")).toLowerCase();
  const price = numberOf(first(raw, ["price", "currentPrice", "current_price", "today_price", "average_price", "avg_price"]), 0);
  const minPrice = numberOf(first(raw, ["minPrice", "min_price", "minimum_price"]), price);
  const maxPrice = numberOf(first(raw, ["maxPrice", "max_price", "maximum_price"]), price);
  const change = numberOf(first(raw, ["change", "changePercent", "change_percent", "price_change_percent", "percentage_change"]), 0);
  const id = String(first(raw, ["id", "_id", "product_id"], index + 1));
  const categoryName = String(first(raw, ["categoryName", "category_name", "categoryTitle"], category === "chal" ? "চাল ও ডাল" : category));
  return { id, slug: String(first(raw, ["slug", "product_slug"], `${toSlug(name)}-${id}`)), name, category, categoryName, emoji: String(first(raw, ["emoji", "icon"], EMOJIS[category] || "🛍️")), unit: String(first(raw, ["unit", "unit_name", "measurement"], "প্রতি কেজি")), price, minPrice, maxPrice, avgPrice: numberOf(first(raw, ["avgPrice", "avg_price", "average_price"]), price || (minPrice + maxPrice) / 2), change, description: String(first(raw, ["description", "details", "summary"], `${name} এর আজকের আনুমানিক বাজারদর।`)), markets: Array.isArray(raw?.markets) ? raw.markets.map((m: any) => ({ name: String(first(m, ["name", "market", "market_name"], "স্থানীয় বাজার")), price: numberOf(first(m, ["price", "today_price"]), price) })) : [] };
}
async function apiGet(path: string) {
  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 5000);
  try { const res = await fetch(`${API_BASE}${path}`, { next: { revalidate: 300 }, signal: controller.signal }); if (!res.ok) throw new Error(`BazarDor API returned ${res.status}`); return await res.json(); }
  finally { clearTimeout(timer); }
}
export async function getProducts(): Promise<Product[]> {
  try {
    const payload = await apiGet("/products");
    const rows = Array.isArray(payload) ? payload : first(payload, ["data", "products", "items", "results"], []);
    if (Array.isArray(rows) && rows.length) return rows.map(normalize);
  } catch (error) { console.warn("Using sample products because BazarDor API is unavailable:", error instanceof Error ? error.message : error); }
  return DEMO;
}
export async function getProduct(slugOrId: string): Promise<Product | undefined> {
  const local = (await getProducts()).find(p => p.slug === slugOrId || p.id === slugOrId || `${p.id}-${p.slug}` === slugOrId || p.slug.endsWith(`-${slugOrId}`));
  if (local) return local;
  if (/^\d+$/.test(slugOrId)) {
    try { const payload = await apiGet(`/products/${slugOrId}`); const raw = first(payload, ["data", "product"], payload); return normalize(raw, Number(slugOrId) - 1); } catch { return undefined; }
  }
  return undefined;
}
export async function getCategories(): Promise<{ slug: string; name: string; icon: string }[]> {
  const fallback = [{ slug: "chal", name: "চাল ও ডাল", icon: "🍚" }, { slug: "sobji", name: "সবজি", icon: "🥬" }, { slug: "mach", name: "মাছ", icon: "🐟" }, { slug: "protein", name: "মাছ-মাংস ও ডিম", icon: "🍗" }, { slug: "oil", name: "তেল ও মসলা", icon: "🫙" }];
  try {
    const payload = await apiGet("/categories"); const rows = Array.isArray(payload) ? payload : first(payload, ["data", "categories", "items", "results"], []);
    if (Array.isArray(rows) && rows.length) return rows.map((c: any) => { const name = String(first(c, ["name", "title", "category_name", "bn_name"], "ক্যাটাগরি")); const slug = String(first(c, ["slug", "category_slug", "id"], toSlug(name))); return { slug, name, icon: String(first(c, ["icon", "emoji"], EMOJIS[slug] || "🛍️")) }; });
  } catch (error) { console.warn("Using sample categories because BazarDor API is unavailable:", error instanceof Error ? error.message : error); }
  return fallback;
}
export async function getCategoryProducts(slug: string): Promise<Product[]> {
  try {
    const payload = await apiGet(`/products?category=${encodeURIComponent(slug)}`); const rows = Array.isArray(payload) ? payload : first(payload, ["data", "products", "items", "results"], []);
    if (Array.isArray(rows) && rows.length) return rows.map(normalize);
  } catch { /* use local filter below */ }
  const all = await getProducts(); return all.filter(p => p.category === slug || p.categoryName.toLowerCase() === slug.toLowerCase());
}
export function taka(value: number): string { return `${Math.round(value).toLocaleString("bn-BD")} টাকা`; }
export function percent(value: number): string { return Math.abs(value).toLocaleString("bn-BD", { maximumFractionDigits: 1 }); }
