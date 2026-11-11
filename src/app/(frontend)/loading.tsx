export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8 animate-pulse">
      <div className="h-8 bg-zinc-900 rounded-2xl w-64" />
      <div className="h-4 bg-zinc-900 rounded-xl w-96" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="h-72 bg-zinc-900/60 rounded-3xl border border-white/5" />
        ))}
      </div>
    </div>
  );
}
