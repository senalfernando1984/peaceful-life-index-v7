import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="border-b border-pli-border/80 bg-white/85 backdrop-blur">
      <div className="container-shell flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pli-teal text-sm font-semibold text-white">
            PLI
          </div>
          <div>
            <p className="text-lg font-semibold">Peaceful Life Index</p>
            <p className="text-xs text-pli-slate">The Happiness Blueprint</p>
          </div>
        </Link>
        <nav className="hidden gap-5 text-sm text-pli-slate md:flex">
          <Link href="/assessment">Assessment</Link>
          <Link href="/results">Dashboard</Link>
          <Link href="/progress">Progress</Link>
        </nav>
      </div>
    </header>
  );
}
