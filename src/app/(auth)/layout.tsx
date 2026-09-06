// app/(auth)/layout.tsx
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-[#991b1b]/20 selection:text-[#991b1b] dark:selection:bg-[#991b1b]/40 dark:selection:text-rose-200">
      {/* Crimson Wax Ambient Glow */}
      <div className="pointer-events-none fixed inset-0 flex justify-center">
        <div className="w-150 h-80 bg-[#991b1b]/10 dark:bg-[#991b1b]/15 blur-[130px] rounded-full" />
      </div>

      {/* Top Bar */}
      <header className="relative z-10 w-full max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#991b1b] opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#991b1b] shadow-[0_0_10px_#991b1b]" />
          </div>
          <span className="font-semibold text-xs tracking-[0.25em] text-foreground uppercase group-hover:text-[#991b1b] transition-colors">
            UNSEAL
          </span>
        </Link>
        <ThemeToggle />
      </header>

      {/* Auth Content */}
      <main className="relative z-10 w-full flex-1 flex items-center justify-center px-4 py-8">
        {children}
      </main>

      {/* Auth Footer */}
      <footer className="relative z-10 w-full max-w-4xl mx-auto px-6 py-6 text-center text-xs text-muted-foreground font-mono">
        Secured with Zero-Knowledge Protocol
      </footer>
    </div>
  );
}