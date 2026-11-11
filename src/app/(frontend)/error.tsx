"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4 py-16">
      <div className="bento-card p-8 text-center max-w-md w-full space-y-4 bg-zinc-950 border border-white/10">
        <AlertTriangle className="w-10 h-10 text-[#ff1e42] mx-auto" />
        <h2 className="font-display font-extrabold text-2xl text-white">Something went wrong</h2>
        <p className="text-xs text-zinc-400">
          We encountered an unexpected error loading smartphone data. Please try again or return home.
        </p>

        <div className="flex gap-2 justify-center pt-2">
          <button
            onClick={() => reset()}
            className="bg-[#ff1e42] hover:bg-rose-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-white/10 transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
