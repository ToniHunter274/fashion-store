// src/app/cart/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type CartItem = { id: number; name: string; price: number; qty: number };

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("cartItems");
    const arr: CartItem[] = raw ? JSON.parse(raw) : [];
    setItems(arr);
  }, []);

  const clearCart = () => {
    localStorage.removeItem("cartItems");
    setItems([]);
    window.dispatchEvent(new Event("cart-updated")); // sync navbar count
  };

  if (items.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <p>Your cart is empty. <Link href="/">Continue shopping</Link></p>
      </div>
    );
  }

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <ul className="space-y-4">
        {items.map((i) => (
          <li key={i.id} className="flex justify-between border-b pb-2">
            <span>
              {i.name} × {i.qty}
            </span>
            <span>₦{(i.price * i.qty).toLocaleString()}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 font-bold text-xl">Total: ₦{total.toLocaleString()}</div>
      <button
        onClick={clearCart}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Clear Cart
      </button>
    </div>
  );
}
