// components/zero-knowledge-section.tsx
import { ArrowRight, Lock } from "lucide-react";

export function ZeroKnowledgeSection() {
  return (
    <section className="relative w-full bg-background py-14 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-16 text-foreground overflow-hidden border-y border-border/60 transition-colors duration-300">
      
      {/* অ্যাম্বিয়েন্ট রেড গ্লো */}
      <div className="pointer-events-none absolute right-1/2 lg:right-1/4 top-1/2 -translate-y-1/2 translate-x-1/2 lg:translate-x-0 h-65 sm:h-87.5 w-[320px] sm:w-137.5 rounded-full bg-[#991b1b]/10 dark:bg-red-950/20 blur-[90px] sm:blur-[130px]" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        
        {/* ================= বাম পাশের টেক্সট ও বাটন ================= */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6 text-center lg:text-left">
          <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#991b1b] dark:text-rose-400 font-semibold">
            BUILT FOR YOUR PRIVACY
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.15] tracking-tight text-foreground">
            Zero-Knowledge <br className="hidden sm:inline" />
            Encryption
          </h2>

          <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed max-w-md mx-auto lg:mx-0">
            Your message is encrypted in your browser using AES-GCM-256 before it ever reaches our servers. We can&apos;t read it. No one can.
          </p>

          <div className="flex justify-center lg:justify-start pt-1">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-[#991b1b]/30 bg-[#991b1b]/5 dark:bg-red-950/25 text-xs font-mono tracking-wider text-[#991b1b] dark:text-rose-400 hover:text-white hover:bg-[#991b1b] dark:hover:bg-[#991b1b] hover:border-transparent hover:shadow-[0_0_15px_rgba(153,27,27,0.3)] transition-all duration-300 cursor-pointer"
            >
              <span>Learn More</span>
              <ArrowRight className="size-3 sm:size-3.5" />
            </button>
          </div>
        </div>

        {/* ================= ডান পাশের ৩ডি ভিজ্যুয়াল ডায়াগ্রাম ================= */}
        <div className="lg:col-span-7 relative flex items-center justify-between py-4 sm:py-6 px-1 sm:px-4 w-full">
          
          {/* ১. কানেক্টিং লেজার ডটেড লাইন */}
          <div className="pointer-events-none absolute left-[12%] right-[14%] top-1/2 -translate-y-1/2 z-0">
            <svg className="w-full h-3 sm:h-4 overflow-visible" xmlns="http://www.w3.org/2000/svg">
              <line
                x1="0"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="#ef4444"
                strokeWidth="2"
                strokeDasharray="4 6"
                strokeLinecap="round"
                className="drop-shadow-[0_0_6px_rgba(239,68,68,0.9)]"
              />
            </svg>
          </div>

          {/* ২. YOUR DEVICE (লেয়ার্ড ৩ডি কার্ড) */}
          <div className="relative z-10 flex flex-col items-center flex-1 max-w-23.75 sm:max-w-32.5 lg:max-w-37.5">
            <div className="relative w-20 h-28 sm:w-28 sm:h-38 lg:w-32 lg:h-44 flex items-center justify-center">
              {/* ৩য় পেছনের কার্ড */}
              <div className="absolute w-16 h-22 sm:w-22 sm:h-30 lg:w-26 lg:h-36 rounded-lg sm:rounded-xl border border-border/40 bg-muted/30 dark:bg-zinc-900/30 backdrop-blur-xs -rotate-12 -translate-x-1.5 shadow-md" />
              {/* ২য় মাঝের কার্ড */}
              <div className="absolute w-16 h-22 sm:w-22 sm:h-30 lg:w-26 lg:h-36 rounded-lg sm:rounded-xl border border-border/60 bg-muted/60 dark:bg-zinc-900/60 backdrop-blur-xs -rotate-6 -translate-x-0.5 shadow-lg" />
              {/* ১ম সামনের মূল কার্ড */}
              <div className="relative w-16 h-22 sm:w-22 sm:h-30 lg:w-26 lg:h-36 rounded-lg sm:rounded-xl border border-border bg-card dark:bg-linear-to-b dark:from-[#16181f]/90 dark:to-[#0b0c10]/95 backdrop-blur-md flex items-center justify-center shadow-xl">
                {/* ডকুমেন্ট আইকন */}
                <div className="w-8 h-10 sm:w-10 sm:h-12 lg:w-11 lg:h-14 rounded border border-muted-foreground/30 bg-muted/20 p-1 sm:p-1.5 flex flex-col justify-between shadow-inner">
                  <div className="w-full flex justify-end">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 border-b border-l border-muted-foreground/40 bg-muted/40 rounded-bl-xs" />
                  </div>
                  <div className="space-y-1 pb-0.5 sm:space-y-1.5 sm:pb-1">
                    <div className="h-0.5 w-full bg-muted-foreground/40 rounded-full" />
                    <div className="h-0.5 w-4/5 bg-muted-foreground/40 rounded-full" />
                    <div className="h-0.5 w-2/3 bg-muted-foreground/40 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <span className="mt-3 sm:mt-5 text-[8px] sm:text-[10px] lg:text-[11px] font-mono tracking-[0.15em] sm:tracking-[0.25em] text-muted-foreground uppercase text-center whitespace-nowrap">
              YOUR DEVICE
            </span>
          </div>

          {/* ৩. ENCRYPTED (ওয়াক্স-সিলসহ গ্লাস কার্ড) */}
          <div className="relative z-10 flex flex-col items-center flex-1 max-w-30 sm:max-w-42.5 lg:max-w-50">
            <div className="relative w-26 h-36 sm:w-36 sm:h-48 lg:w-44 lg:h-56 rounded-2xl sm:rounded-3xl border border-[#991b1b]/30 dark:border-red-500/30 bg-card/95 dark:bg-linear-to-b dark:from-[#1f090a]/80 dark:via-[#120405]/85 dark:to-[#080203]/95 backdrop-blur-xl shadow-lg shadow-[#991b1b]/10 dark:shadow-[0_0_35px_rgba(220,38,38,0.25)] flex flex-col items-center justify-center p-2.5 sm:p-4 overflow-hidden">
              
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.15)_0%,transparent_70%)]" />
              
              {/* ৩ডি মোমের সিলমোহর (Wax Seal) */}
              <div className="relative size-12 sm:size-16 lg:size-20 flex items-center justify-center mb-2 sm:mb-3.5">
                <div className="absolute inset-0 rounded-full bg-linear-to-br from-[#dc2626] via-[#991b1b] to-[#450a0a] shadow-[0_0_15px_rgba(220,38,38,0.45)] border border-red-400/40" />
                
                <div className="relative size-8 sm:size-11 lg:size-14 rounded-full border border-red-400/30 bg-linear-to-b from-[#b91c1c] to-[#7f1d1d] shadow-inner flex items-center justify-center">
                  <svg className="size-4 sm:size-6 lg:size-7 text-red-100 drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(127, 29, 29, 0.4)" />
                    <path d="M9 9v3a3 3 0 0 0 6 0V9" strokeWidth="2" />
                  </svg>
                </div>
              </div>

              {/* টেক্সট ও লক আইকন */}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <span className="text-[8px] sm:text-[10px] lg:text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] text-foreground dark:text-red-100 font-semibold drop-shadow-xs">
                  ENCRYPTED
                </span>
                <Lock className="size-2.5 sm:size-3.5 text-muted-foreground stroke-2" />
              </div>
            </div>

            <div className="h-4" />
          </div>

          {/* ৪. SECURE VAULT (৩-স্তরের সার্ভার ইউনিট) */}
          <div className="relative z-10 flex flex-col items-center flex-1 max-w-23.75 sm:max-w-32.5 lg:max-w-37.5">
            <div className="relative w-20 h-28 sm:w-28 sm:h-38 lg:w-32 lg:h-44 flex flex-col items-center justify-center">
              
              {/* ৩ডি সার্ভার চেসিস স্ট্যাক */}
              <div className="relative flex flex-col gap-1 p-1 sm:p-1.5 rounded-lg sm:rounded-xl border border-border bg-card dark:bg-[#07080b] shadow-xl">
                
                {/* ১ম ড্রাইভ */}
                <div className="w-16 sm:w-22 lg:w-24 h-5 sm:h-6.5 lg:h-7 rounded bg-muted/40 dark:bg-linear-to-b dark:from-zinc-800 dark:to-zinc-900 border border-border/80 dark:border-zinc-700/60 flex items-center justify-between px-1.5 sm:px-2 shadow-xs">
                  <div className="h-0.5 sm:h-1 w-6 sm:w-8 bg-muted-foreground/30 dark:bg-black/60 rounded-full" />
                  <div className="size-1 rounded-full bg-red-500 shadow-[0_0_4px_#ef4444]" />
                </div>

                {/* ২য় ড্রাইভ (লেজার এন্ট্রি পয়েন্ট) */}
                <div className="relative w-16 sm:w-22 lg:w-24 h-5 sm:h-6.5 lg:h-7 rounded bg-muted/40 dark:bg-linear-to-b dark:from-zinc-800 dark:to-zinc-900 border border-border/80 dark:border-zinc-700/60 flex items-center justify-between px-1.5 sm:px-2 shadow-xs">
                  <div className="absolute -left-1.5 sm:-left-2 top-1/2 -translate-y-1/2 size-2 sm:size-2.5 rounded-full bg-red-500 blur-[1.5px] shadow-[0_0_8px_#ef4444]" />
                  <div className="h-0.5 sm:h-1 w-6 sm:w-8 bg-muted-foreground/30 dark:bg-black/60 rounded-full" />
                  <div className="size-1 rounded-full bg-red-500 shadow-[0_0_4px_#ef4444]" />
                </div>

                {/* ৩য় ড্রাইভ */}
                <div className="w-16 sm:w-22 lg:w-24 h-5 sm:h-6.5 lg:h-7 rounded bg-muted/40 dark:bg-linear-to-b dark:from-zinc-800 dark:to-zinc-900 border border-border/80 dark:border-zinc-700/60 flex items-center justify-between px-1.5 sm:px-2 shadow-xs">
                  <div className="h-0.5 sm:h-1 w-6 sm:w-8 bg-muted-foreground/30 dark:bg-black/60 rounded-full" />
                  <div className="size-1 rounded-full bg-red-500 shadow-[0_0_4px_#ef4444]" />
                </div>

              </div>

              {/* সার্ভারের নিচে লাল টেক্সট */}
              <p className="mt-1.5 sm:mt-2 text-[7px] sm:text-[8px] lg:text-[9px] font-mono uppercase tracking-wider text-[#991b1b] dark:text-red-500 font-semibold text-center leading-tight">
                NOT EVEN <br /> WE CAN READ IT
              </p>
            </div>

            <span className="mt-3 sm:mt-5 text-[8px] sm:text-[10px] lg:text-[11px] font-mono tracking-[0.15em] sm:tracking-[0.25em] text-muted-foreground uppercase text-center whitespace-nowrap">
              SECURE VAULT
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}

export default ZeroKnowledgeSection;