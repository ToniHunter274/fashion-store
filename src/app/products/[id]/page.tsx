import { headers } from "next/headers";
import AddToCart from "./AddToCart";


type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

async function getProduct(id: string): Promise<Product> {
  const base = process.env.NEXT_PUBLIC_BASE_URL || `http://${headers().get("host")}`;
  const res = await fetch(`${base}/api/products/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Product not found");
  return res.json();
}

export default async function ProductPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const p = await getProduct(id);

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="rounded-xl overflow-hidden bg-gray-100">
          <img src={p.imageUrl} alt={p.name} className="w-full h-auto object-cover" />
        </div>

        <div>
          <h1 className="text-3xl font-bold">{p.name}</h1>
          <div className="mt-2 text-gray-600">{p.description}</div>
          <div className="mt-4 text-2xl font-semibold">
            ₦{p.price.toLocaleString()}
          </div>
          <AddToCart id={p.id} name={p.name} price={p.price} />
        </div>
      </div>
    </div>
  );
}
