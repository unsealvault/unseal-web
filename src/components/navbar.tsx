'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from './theme-toggle';
import { AvatarDropdown } from './avatar-dropdown';
import { useUser } from '@/providers/user.provider';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Public Vault', href: '/public-vault' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const homeTopNavbar = isHomePage && !isScrolled;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto w-full max-w-362.5 px-3 pt-3 sm:px-5 sm:pt-4 md:px-6 lg:px-8 xl:px-10">
        <div className={`relative flex min-h-16 items-center justify-between rounded-2xl border px-3 backdrop-blur-xl transition-all duration-300 sm:min-h-17 sm:px-5 lg:px-6 ${homeTopNavbar ? 'border-white/10 bg-[#07080a]/70 text-white shadow-[0_8px_32px_rgba(0,0,0,0.45)]' : 'border-border/80 bg-background/90 text-foreground shadow-lg shadow-black/5 dark:border-white/10 dark:bg-[#07080a]/75 dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)]'}`}>
          {/* LOGO */}
          <Link href="/" onClick={closeMobileMenu} className="group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3.5">
            <div className={`relative flex size-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 group-hover:scale-105 ${homeTopNavbar ? 'border-rose-400/40 bg-rose-500/10 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.25)]' : 'border-[#991b1b]/40 bg-[#991b1b]/10 text-[#991b1b] shadow-[0_0_15px_rgba(153,27,27,0.2)] dark:border-rose-500/40 dark:bg-rose-950/20 dark:text-rose-400'}`}>
              <svg
                className="size-4.25 sm:size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* ১. চিঠির খামের আউটলাইন ও নিচের আর্চ (Envelope Base) */}
                <path d="M3 7.5v6.5c0 5 9 8 9 8s9-3 9-8V7.5" />

                {/* ২. চিঠির ওপরের মুখবন্ধ ফ্ল্যাপ (Envelope Flap Fold) */}
                <path d="M3 7.5l9 6 9-6" />

                {/* ৩. কেন্দ্রবিন্দুতে ওয়াক্স সিলমোহর বৃত্ত (Wax Seal Base) */}
                <circle cx="12" cy="13.5" r="3.25" />

                {/* ৪. সিলমোহরের ভেতরে থাকা মূল 'U' মনোগ্রাম */}
                <path d="M10.8 12.5v1.2a1.2 1.2 0 0 0 2.4 0v-1.2" strokeWidth="1.6" />
              </svg>
            </div>

            <div className="min-w-0 leading-none">
              <div className={`flex items-baseline font-serif text-xl font-semibold sm:text-2xl ${homeTopNavbar ? 'text-white' : 'text-foreground'}`}>
                <span>Unseal</span>
                <span className={`ml-0.5 size-1.5 rounded-full ${homeTopNavbar ? 'bg-rose-400' : 'bg-[#991b1b] dark:bg-rose-500'}`} />
              </div>

              <p className={`mt-1 hidden truncate text-[7px] font-mono tracking-[0.25em] xs:block sm:text-[8px] sm:tracking-[0.32em] ${homeTopNavbar ? 'text-white/40' : 'text-muted-foreground/80 dark:text-white/40'}`}>
                Digital Time Capsule
              </p>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navLinks.map((item) => {
              const active = isActive(item.href);

              return (
                <Link key={item.label} href={item.href} className={`relative py-1 text-[13px] font-medium transition-colors duration-200 xl:text-[14px] ${active ? homeTopNavbar ? 'font-semibold text-rose-400' : 'font-semibold text-[#991b1b] dark:text-rose-400' : homeTopNavbar ? 'text-white/65 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}>
                  {item.label}

                  {active && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-linear-to-r from-red-600 via-rose-500 to-transparent shadow-[0_0_8px_rgba(244,20,43,0.8)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5 lg:gap-3">
            <div className={homeTopNavbar ? '[&_button]:text-white [&_button:hover]:bg-white/10' : ''}>
              <ThemeToggle />
            </div>

            {user ? (
              <AvatarDropdown />
            ) : (
              <>
                <Link href="/login" className={`hidden px-1.5 py-1.5 text-sm font-medium transition-colors sm:inline-flex ${homeTopNavbar ? 'text-white/70 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}>
                  Log In
                </Link>

                <Button type="button" onClick={() => router.push('/register')} className="group relative hidden h-9 overflow-hidden rounded-full bg-linear-to-r from-[#b91c1c] via-[#dc2626] to-[#b91c1c] px-4 text-[11px] font-semibold tracking-wider text-white shadow-[0_0_20px_rgba(220,38,38,0.45)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(239,68,68,0.75)] active:scale-[0.98] sm:inline-flex sm:h-10 sm:px-5 sm:text-[12px] lg:h-11 lg:px-5 lg:text-[13px]">
                  <span className="pointer-events-none absolute inset-y-0 -left-25 w-24 bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer-infinite" />
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span className="hidden sm:inline">Track Your Seals</span>
                    <span className="sm:hidden">Get Started</span>
                    <ChevronRight className="size-4.25 text-white/90 transition-transform duration-300 group-hover:translate-x-1 sm:size-5" />
                  </span>
                </Button>
              </>
            )}

            {/* MOBILE MENU BUTTON */}
            <Button type="button" variant="ghost" size="icon" aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((prev) => !prev)} className={`size-9 rounded-xl lg:hidden ${homeTopNavbar ? 'text-white hover:bg-white/10 hover:text-white' : ''}`}>
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>

          {/* MOBILE MENU */}
          {mobileMenuOpen && (
            <div className="absolute left-0 right-0 top-[calc(100%+10px)] overflow-hidden rounded-2xl border border-border/80 bg-background/95 p-3 text-foreground shadow-xl shadow-black/10 backdrop-blur-xl dark:border-white/10 dark:bg-[#07080a]/95 lg:hidden">
              <nav className="flex flex-col gap-1">
                {navLinks.map((item) => {
                  const active = isActive(item.href);

                  return (
                    <Link key={item.label} href={item.href} onClick={closeMobileMenu} className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${active ? 'bg-red-500/10 text-[#991b1b] dark:bg-rose-500/10 dark:text-rose-400' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                      <span>{item.label}</span>
                      {active && <span className="size-1.5 rounded-full bg-[#991b1b] dark:bg-rose-400" />}
                    </Link>
                  );
                })}
              </nav>

              {!user && (
                <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border/60 pt-3 dark:border-white/10">
                  <Button type="button" variant="outline" onClick={() => { closeMobileMenu(); router.push('/login'); }} className="h-10 rounded-xl">
                    Log In
                  </Button>

                  <Button type="button" onClick={() => { closeMobileMenu(); router.push('/register'); }} className="h-10 rounded-xl bg-linear-to-r from-[#b91c1c] via-[#dc2626] to-[#b91c1c] text-white shadow-[0_0_18px_rgba(220,38,38,0.35)] transition-all hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(239,68,68,0.55)]">
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}