// src/app/components/ProductGrid.tsx (Client Component)

"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "../types"; // import the Product type

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search for products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mt-4 p-2 border rounded-lg w-full max-w-sm"
      />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredProducts.map((p) => (
          <Link key={p.id} href={`/products/${p.id}`}>
            <article className="border rounded-xl p-4 hover:shadow-md transition">
              <div className="aspect-square mb-3 overflow-hidden rounded-lg bg-gray-100">
                <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <h2 className="font-semibold">{p.name}</h2>
              <p className="text-sm text-gray-600 line-clamp-2">{p.description}</p>
              <div className="mt-3 font-bold">₦{p.price.toLocaleString()}</div>
              <button className="mt-4 w-full rounded-lg bg-black text-white py-2">Add to Cart</button>
            </article>
          </Link>
        ))}
      </section>
    </div>
  );
}
