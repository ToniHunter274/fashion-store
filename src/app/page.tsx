export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-xl p-8">
        <h1 className="text-3xl font-bold">LuxeWear</h1>
        <p className="mt-2 text-gray-600">
          Fashion micro-store demo. Fast. Mobile-first. Paystack-ready.
        </p>
        <div className="mt-6 flex gap-3">
          <a href="#" className="px-4 py-2 rounded-lg border">Shop now</a>
          <a href="#" className="px-4 py-2 rounded-lg bg-black text-white">Contact</a>

        </div>
      </div>
    </main>
  );
}