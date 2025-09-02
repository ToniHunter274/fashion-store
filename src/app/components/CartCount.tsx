"use client";

import { useEffect, useState } from "react";

type CartItem = { id:number; name:string; price:number; qty:number};

export default function CartCount() {
  const [count, setCount] = useState(0);

  const load = () => {
    try{
      const raw = localStorage.getItem("cartItems");
      const items: CartItem[] = raw ? (JSON.parse(raw) as CartItem[]) : [];
      const total = items.reduce((sum, i) => sum + (i.qty || 0), 0)
      setCount(total);
    } catch{
      setCount(0);
    }
  };

  useEffect(() => {
    load();
    const onStorage = () => load();
    const onCartUpdated = () => load();

    window.addEventListener("storage", onStorage);
    window.addEventListener("cart-updated", onCartUpdated );
    

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cart-updated", onCartUpdated)
    };
  }, []);

  return <span className="ml-1 text-sm text-gray-600">({count})</span>;
}


