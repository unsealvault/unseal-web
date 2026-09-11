'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LockKeyhole, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './theme-toggle';

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Public Vault', href: '/public-vault' },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300">
      <div className="mx-auto max-w-[1550px] px-6 sm:px-8 lg:px-12 pt-4 sm:pt-6">
        <div className="flex h-18.5 items-center justify-between rounded-2xl border border-border/80 dark:border-white/10 bg-background/80 dark:bg-[#07080a]/70 px-6 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-colors duration-300">

          {/* লোগো ও ব্র্যান্ড পরিচয় */}
          <Link href="/" className="flex items-center gap-3.5 group">
            {/* Crimson Wax Seal Shield Logo */}
            <div className="relative size-9 flex items-center justify-center rounded-xl border border-[#991b1b]/40 dark:border-rose-500/40 bg-[#991b1b]/10 dark:bg-rose-950/20 text-[#991b1b] dark:text-rose-400 shadow-[0_0_15px_rgba(153,27,27,0.2)] transition-transform duration-300 group-hover:scale-105">
              <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 10v2a3 3 0 0 0 6 0v-2" strokeWidth="2" />
              </svg>
            </div>

            <div className="leading-none">
              <div className="font-serif text-2xl font-semibold text-foreground flex items-baseline">
                <span>Unseal</span>
                <span className="inline-block ml-0.5 size-1.5 rounded-full bg-[#991b1b] dark:bg-rose-500 shadow-[0_0_8px_rgba(225,29,72,0.8)]" />
              </div>
              <p className="mt-1 text-[8px] font-mono tracking-[0.32em] text-muted-foreground/80 dark:text-white/40">
                Digital Time Capsule
              </p>
            </div>
          </Link>

          {/* ডেক্সটপ নেভিগেশন মেনু (Home, Blog, About, Public Vault) */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative py-1 text-[14px] font-medium transition-colors ${isActive
                    ? 'text-[#991b1b] dark:text-rose-400 font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-linear-to-r from-red-600 via-rose-500 to-transparent shadow-[0_0_8px_rgba(244,20,43,0.8)]" />
                  )}
                </Link>
              );
            })}
          </nav>


          {/* ডান পাশের স্ট্যাটাস, থিম টগল এবং অ্যাকশন বাটন */}
          <div className="flex items-center gap-3 sm:gap-4">

            <ThemeToggle />

            {/* সাইন ইন বাটন */}
            <Link
              href="/login"
              className="text-md font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 cursor-pointer"
            >
              Sign In
            </Link>

            {/* গেট স্টার্টেড / সাইন আপ বাটন */}
            <Button 
              className=" sm:h-11 rounded-full bg-linear-to-r from-[#b91c1c] via-[#dc2626] to-[#b91c1c] px-5 text-[13px] tracking-wider font-semibold text-white shadow-[0_0_20px_rgba(185,28,28,0.25)] dark:shadow-[0_0_25px_rgba(220,38,38,0.35)] transition-all hover:shadow-[0_0_35px_rgba(220,38,38,0.55)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Link href="/register" className="flex items-center gap-1.5 bg-transparent">
                <span>Get Started</span>
                <ChevronRight className="size-4 text-white/80" />
              </Link>
            </Button>

          </div>
        </div>
      </div>
    </header>
  );
}