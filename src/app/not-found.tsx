import Link from "next/link";
import { ArrowLeft, Home, Smartphone } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="bento-card p-8 sm:p-12 text-center max-w-md w-full space-y-5 bg-zinc-950 border border-white/10">
        <span className="text-5xl block">📱</span>
        <h1 className="font-display font-extrabold text-3xl text-white">404 - Phone Not Found</h1>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          The smartphone or page you are looking for may have been updated, sold out, or moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
          <Link
            href="/"
            className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 transition border border-white/10"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Go Home</span>
          </Link>
          <Link
            href="/phones"
            className="flex-1 bg-[#ff1e42] hover:bg-rose-600 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 transition shadow-lg"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Browse Stock</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
