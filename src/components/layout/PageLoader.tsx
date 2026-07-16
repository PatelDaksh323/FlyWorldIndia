/** Lightweight fallback shown while a lazy route chunk loads. */
export default function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label="Loading">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-gold" />
    </div>
  );
}
