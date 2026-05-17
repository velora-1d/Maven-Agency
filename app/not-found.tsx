export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-ink px-6 text-paper">
      <div className="brutal-card max-w-xl bg-blaze p-10 text-center text-ink">
        <p className="mb-3 text-xs uppercase tracking-[0.3em]">404</p>
        <h1 className="font-[family:var(--font-display)] text-6xl uppercase leading-none">
          Page Not Forged
        </h1>
        <p className="mt-4 text-sm">
          The route you requested does not exist in this build.
        </p>
      </div>
    </main>
  );
}
