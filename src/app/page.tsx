"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

async function getProducts(): Promise<Product[]> {
  // Relative path works in the browser (same origin) and avoids CORS/env hassles
  const res = await fetch("/api/products", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getProducts();
        if (!cancelled) setProducts(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">LuxeWear</h1>
        <p className="text-gray-600">Fashion micro-store demo</p>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mt-4 p-2 border rounded-lg w-full max-w-sm"
        />
      </header>

      {loading && <p className="text-gray-600">Loading products…</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <Link key={p.id} href={`/products/${p.id}`}>
              <article className="border rounded-xl p-4 hover:shadow-md transition">
                <div className="aspect-square mb-3 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="font-semibold">{p.name}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {p.description}
                </p>
                <div className="mt-3 font-bold">
                  ₦{Number(p.price).toLocaleString()}
                </div>
                <button className="mt-4 w-full rounded-lg bg-black text-white py-2">
                  Add to Cart
                </button>
              </article>
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
