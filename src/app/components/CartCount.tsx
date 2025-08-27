"use client";

import { useEffect, useState } from "react";

export default function CartCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const key = "cartItems";

    const load = () => {
      try{
        const items = JSON.parse(localStorage.getItem(key) || "[]");
        setCount(items.reduce((sum: number, i: any) => sum + i.qty, 0));
      } catch{
        setCount(0);
      }
    };

    load();

    const handler = () => load();
    window.addEventListener("storage", handler);
  }, []);

  return (
    <span className="ml-1 text-sm text-gray-600">({count})</span>
  );
}


