// components/navbar.tsx
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export function Navbar() {
    return (
        <header className="relative z-10 w-full max-w-3xl mx-auto px-6 py-6 flex items-center justify-between border-b border-border/70">
            <Link href="/" className="flex items-center gap-2.5">
                <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#991b1b] opacity-60" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#991b1b] shadow-[0_0_10px_#991b1b]" />
                </div>
                <span className="font-semibold text-xs tracking-[0.25em] text-foreground uppercase">UNSEAL</span>
            </Link>

            <div className="flex items-center gap-3.5">
                <Link href="/public-vault" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    Public Vault
                </Link>
                <span className="h-3 w-px bg-border" />
                <Link href="/sign-in" className="text-xs font-medium text-foreground hover:text-[#991b1b] transition-colors">
                    Sign In
                </Link>
                <span className="h-3 w-px bg-border" />
                <ThemeToggle />
            </div>
        </header>
    );
}