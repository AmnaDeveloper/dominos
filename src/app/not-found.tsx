import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="container-max py-24 text-center">
        <p className="text-6xl font-black" style={{ color: "#006491" }}>404</p>
        <h1 className="post-section-heading mt-4">Page not found</h1>
        <p className="text-slate-600 mt-3 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist. Try the menu,
          coupons, or head back home.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/" className="font-bold px-5 py-3 rounded-lg text-white" style={{ backgroundColor: "#C8102E" }}>Home</Link>
          <Link href="/menus-prices" className="font-bold px-5 py-3 rounded-lg bg-slate-100">Menu & Prices</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
