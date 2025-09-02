"use client";

type CartItem = { id:number; name:string; price:number; qty:number};


export default function AddToCart(props: { id: number; name: string; price: number }) {
  const saveToCart = (item: CartItem) => {
    const key = "cartItems";
    const raw = localStorage.getItem(key);

    const arr : CartItem[] = raw ? (JSON.parse(raw) as CartItem[]) : [];

    const idx = arr.findIndex((x) => x.id === item.id);
    if (idx >= 0) arr[idx].qty += item.qty; 
    else arr.push(item);

    
    localStorage.setItem(key, JSON.stringify(arr));

    window.dispatchEvent(new Event("cart-updated"));
  };

  return (
    <button
      onClick={() => {
        saveToCart({ ...props, qty: 1 });
        alert("Added to cart");
      }}
      className="mt-6 w-full md:w-auto px-6 py-3 rounded-lg bg-black text-white"
    >
      Add to Cart
    </button>
  );
}
