// components/footer.tsx
import { Coffee } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative z-10 w-full max-w-3xl mx-auto px-6 py-5 border-t border-border/70 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
      <div className="flex items-center gap-3">
        <span>UNSEAL PROTOCOL</span>
        <span className="hidden sm:inline text-zinc-600 dark:text-zinc-400">·</span>
        <a
          href="https://buymeacoffee.com"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:inline-flex items-center gap-1 text-muted-foreground hover:text-amber-500 transition-colors"
        >
          <Coffee className="w-3 h-3" /> Buy us a coffee
        </a>
      </div>
      <div className="flex gap-5">
        <Link href="/privacy" className="hover:text-foreground transition-colors">
          Privacy
        </Link>
        <Link href="/terms" className="hover:text-foreground transition-colors">
          Terms
        </Link>
      </div>
    </footer>
  );
}