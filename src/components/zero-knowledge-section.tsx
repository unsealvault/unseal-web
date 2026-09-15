// components/zero-knowledge-section.tsx

import { ArrowRight, Lock } from 'lucide-react';

const ZeroKnowledgeSection = () => {
  return (
    <section className="relative w-full overflow-hidden border-y border-border/60 bg-background px-4 py-14 text-foreground transition-colors duration-300 sm:px-6 sm:py-20 md:px-8 lg:px-12 lg:py-24 dark:border-white/10 dark:bg-[#07080a] dark:text-[#fbf8f3]">
      {/* Ambient Red Glow */}
      <div className="pointer-events-none absolute right-1/2 top-1/2 h-64 w-[320px] -translate-y-1/2 translate-x-1/2 rounded-full bg-[#991b1b]/5 blur-[90px] sm:h-88 sm:w-138 sm:blur-[120px] lg:right-1/4 lg:h-100 lg:w-163 lg:translate-x-0 lg:blur-[130px] dark:bg-red-950/20" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Left Content */}
        <div className="space-y-4 text-center sm:space-y-5 lg:col-span-5 lg:text-left">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-[#991b1b] sm:text-[11px] sm:tracking-[0.3em] dark:text-rose-400">
            BUILT FOR YOUR PRIVACY
          </p>

          <h2 className="text-3xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-[44px] dark:text-[#fbf8f3]">
            Zero-Knowledge
            <br className="hidden sm:inline" />
            Encryption
          </h2>

          <p className="mx-auto max-w-md text-xs font-light leading-relaxed text-muted-foreground sm:text-sm lg:mx-0 dark:text-white/55">
            Your message is encrypted in your browser using AES-GCM-256 before it ever reaches our servers. We can&apos;t read it. No one can.
          </p>

          <div className="flex justify-center pt-1 lg:justify-start">
            <button type="button" className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#991b1b]/30 bg-[#991b1b]/5 px-4 py-2 text-xs font-mono tracking-wider text-[#991b1b] transition-all duration-300 hover:border-transparent hover:bg-[#991b1b] hover:text-white hover:shadow-[0_0_15px_rgba(153,27,27,0.3)] sm:px-5 sm:py-2.5 dark:border-rose-500/30 dark:bg-red-950/25 dark:text-rose-400 dark:hover:bg-[#991b1b]">
              <span>Learn More</span>
              <ArrowRight className="size-3 sm:size-3.5" />
            </button>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative flex w-full items-center justify-between px-0 py-4 sm:px-2 sm:py-6 lg:col-span-7 lg:px-4">
          {/* Connecting Laser Line */}
          <div className="pointer-events-none absolute left-[10%] right-[10%] top-1/2 z-0 -translate-y-1/2">
            <svg className="h-3 w-full overflow-visible sm:h-4" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 6" strokeLinecap="round" className="drop-shadow-[0_0_6px_rgba(239,68,68,0.9)]" />
            </svg>
          </div>

          {/* Your Device */}
          <div className="relative z-10 flex flex-1 flex-col items-center">
            <div className="relative flex h-28 w-20 items-center justify-center sm:h-38 sm:w-28 lg:h-44 lg:w-32">
              {/* Back Card */}
              <div className="absolute h-22 w-16 -translate-x-1.5 -rotate-12 rounded-lg border border-border/40 bg-muted/30 shadow-md backdrop-blur-xs sm:h-30 sm:w-22 sm:rounded-xl lg:h-36 lg:w-26 dark:border-white/10 dark:bg-zinc-900/30" />

              {/* Middle Card */}
              <div className="absolute h-22 w-16 -translate-x-0.5 -rotate-6 rounded-lg border border-border/60 bg-muted/60 shadow-lg backdrop-blur-xs sm:h-30 sm:w-22 sm:rounded-xl lg:h-36 lg:w-26 dark:border-white/15 dark:bg-zinc-900/60" />

              {/* Front Card */}
              <div className="relative flex h-22 w-16 items-center justify-center rounded-lg border border-border bg-card shadow-xl backdrop-blur-md sm:h-30 sm:w-22 sm:rounded-xl lg:h-36 lg:w-26 dark:border-white/10 dark:bg-linear-to-b dark:from-[#16181f]/90 dark:to-[#0b0c10]/95">
                <div className="flex h-10 w-8 flex-col justify-between rounded border border-muted-foreground/30 bg-muted/20 p-1 shadow-inner sm:h-12 sm:w-10 sm:p-1.5 lg:h-14 lg:w-11">
                  <div className="flex w-full justify-end">
                    <div className="h-2 w-2 rounded-bl-xs border-b border-l border-muted-foreground/40 bg-muted/40 sm:h-2.5 sm:w-2.5" />
                  </div>

                  <div className="space-y-1 pb-0.5 sm:space-y-1.5 sm:pb-1">
                    <div className="h-0.5 w-full rounded-full bg-muted-foreground/40" />
                    <div className="h-0.5 w-4/5 rounded-full bg-muted-foreground/40" />
                    <div className="h-0.5 w-2/3 rounded-full bg-muted-foreground/40" />
                  </div>
                </div>
              </div>
            </div>

            <span className="mt-3 whitespace-nowrap text-center font-mono text-[8px] uppercase tracking-[0.15em] text-muted-foreground sm:mt-5 sm:text-[10px] sm:tracking-[0.25em] lg:text-[11px]">
              YOUR DEVICE
            </span>
          </div>

          {/* Encrypted */}
          <div className="relative z-10 flex flex-1 flex-col items-center">
            <div className="relative flex h-36 w-26 flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#991b1b]/30 bg-card/95 p-2.5 shadow-lg shadow-[#991b1b]/10 backdrop-blur-xl sm:h-48 sm:w-36 sm:rounded-3xl sm:p-4 lg:h-56 lg:w-44 dark:border-red-500/30 dark:bg-linear-to-b dark:from-[#1f090a]/80 dark:via-[#120405]/85 dark:to-[#080203]/95 dark:shadow-[0_0_35px_rgba(220,38,38,0.25)]">
              {/* Inner Glow */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.15)_0%,transparent_70%)]" />

              {/* Wax Seal */}
              <div className="relative mb-2 flex size-12 items-center justify-center sm:mb-3.5 sm:size-16 lg:size-20">
                <div className="absolute inset-0 rounded-full border border-red-400/40 bg-linear-to-br from-[#dc2626] via-[#991b1b] to-[#450a0a] shadow-[0_0_15px_rgba(220,38,38,0.45)]" />

                <div className="relative flex size-8 items-center justify-center rounded-full border border-red-400/30 bg-linear-to-b from-[#b91c1c] to-[#7f1d1d] shadow-inner sm:size-11 lg:size-14">
                  <svg className="size-4 text-red-100 drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)] sm:size-6 lg:size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(127,29,29,0.4)" />
                    <path d="M9 9v3a3 3 0 0 0 6 0V9" strokeWidth="2" />
                  </svg>
                </div>
              </div>

              {/* Encrypted Label */}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-foreground sm:text-[10px] sm:tracking-[0.3em] lg:text-xs dark:text-red-100">
                  ENCRYPTED
                </span>

                <Lock className="size-2.5 text-muted-foreground sm:size-3.5" />
              </div>
            </div>
          </div>

          {/* Secure Vault */}
          <div className="relative z-10 flex flex-1 flex-col items-center">
            <div className="relative flex h-28 w-20 flex-col items-center justify-center sm:h-38 sm:w-28 lg:h-44 lg:w-32">
              {/* Server Stack */}
              <div className="relative flex flex-col gap-1 rounded-lg border border-border bg-card p-1 shadow-xl sm:rounded-xl sm:p-1.5 dark:border-white/10 dark:bg-[#07080b]">
                {/* Drive 1 */}
                <div className="flex h-5 w-16 items-center justify-between rounded border border-border/80 bg-muted/40 px-1.5 shadow-xs sm:h-6.5 sm:w-22 sm:px-2 lg:h-7 lg:w-24 dark:border-zinc-700/60 dark:bg-linear-to-b dark:from-zinc-800 dark:to-zinc-900">
                  <div className="h-0.5 w-6 rounded-full bg-muted-foreground/30 sm:h-1 sm:w-8 dark:bg-black/60" />
                  <div className="size-1 rounded-full bg-red-500 shadow-[0_0_4px_#ef4444]" />
                </div>

                {/* Drive 2 */}
                <div className="relative flex h-5 w-16 items-center justify-between rounded border border-border/80 bg-muted/40 px-1.5 shadow-xs sm:h-6.5 sm:w-22 sm:px-2 lg:h-7 lg:w-24 dark:border-zinc-700/60 dark:bg-linear-to-b dark:from-zinc-800 dark:to-zinc-900">
                  <div className="absolute -left-1.5 top-1/2 size-2 -translate-y-1/2 rounded-full bg-red-500 blur-[1.5px] shadow-[0_0_8px_#ef4444] sm:-left-2 sm:size-2.5" />
                  <div className="h-0.5 w-6 rounded-full bg-muted-foreground/30 sm:h-1 sm:w-8 dark:bg-black/60" />
                  <div className="size-1 rounded-full bg-red-500 shadow-[0_0_4px_#ef4444]" />
                </div>

                {/* Drive 3 */}
                <div className="flex h-5 w-16 items-center justify-between rounded border border-border/80 bg-muted/40 px-1.5 shadow-xs sm:h-6.5 sm:w-22 sm:px-2 lg:h-7 lg:w-24 dark:border-zinc-700/60 dark:bg-linear-to-b dark:from-zinc-800 dark:to-zinc-900">
                  <div className="h-0.5 w-6 rounded-full bg-muted-foreground/30 sm:h-1 sm:w-8 dark:bg-black/60" />
                  <div className="size-1 rounded-full bg-red-500 shadow-[0_0_4px_#ef4444]" />
                </div>
              </div>

              {/* Vault Text */}
              <p className="mt-1.5 text-center font-mono text-[7px] font-semibold uppercase leading-tight tracking-wider text-[#991b1b] sm:mt-2 sm:text-[8px] lg:text-[9px] dark:text-red-500">
                NOT EVEN
                <br />
                WE CAN READ IT
              </p>
            </div>

            <span className="mt-3 whitespace-nowrap text-center font-mono text-[8px] uppercase tracking-[0.15em] text-muted-foreground sm:mt-5 sm:text-[10px] sm:tracking-[0.25em] lg:text-[11px]">
              SECURE VAULT
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZeroKnowledgeSection;