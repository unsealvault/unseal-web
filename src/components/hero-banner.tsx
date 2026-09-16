'use client';

import { Badge } from '@/components/ui/badge';
import { LockKeyhole, ShieldCheck, Clock3, Sparkles, Feather } from 'lucide-react';
import { CapsuleForm } from '@/components/form/capsule-form';
import { Button } from './ui/button';

const UnsealHero = () => {
  const scrollToForm = () => {
    const formElement = document.querySelector('textarea');
    if (formElement) {
      formElement.focus();
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="relative flex w-full items-center overflow-hidden bg-[#07080a] pt-28 pb-12 sm:pb-16 md:pt-28 md:pb-20">
      {/* Background Envelope Image */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-no-repeat bg-size-[auto_70%] bg-position-[left_-120px_center] opacity-[0.12] sm:bg-size-[auto_75%] sm:bg-position-[left_-80px_center] sm:opacity-[0.16] md:bg-size-[auto_80%] md:bg-position-[left_-50px_center] md:opacity-[0.2] lg:bg-cover lg:bg-position-[left_-20px_center] lg:opacity-[0.25] xl:bg-position-[left_center] xl:opacity-[0.3]" style={{ backgroundImage: "url('/unseal-hero-bg.png')" }} />

      {/* Main Overlay */}
      <div className="absolute inset-0 z-1 bg-linear-to-b from-[#07080a] via-[#07080a]/90 via-40% to-[#07080a]/60 lg:via-[#07080a]/80 lg:via-55% lg:to-[#07080a]/40" />

      {/* Top Navbar Blend */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-2 h-40 bg-linear-to-b from-[#07080a] via-[#07080a]/80 to-transparent" />

      {/* Bottom Fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-2 h-40 bg-linear-to-t from-[#07080a] via-[#07080a]/70 to-transparent" />

      {/* Ambient Red Glow */}
      <div className="pointer-events-none absolute right-[-15%] top-[20%] z-1 size-64 rounded-full bg-red-950/20 blur-[100px] sm:right-[-5%] sm:size-80 md:right-[5%] md:size-96 md:blur-[130px] lg:right-[15%] lg:top-[25%] lg:size-87.5 lg:blur-[140px]" />

      {/* Secondary Glow */}
      <div className="pointer-events-none absolute bottom-[10%] left-[-20%] z-1 size-56 rounded-full bg-red-950/10 blur-[100px] sm:left-[-10%] sm:size-72 lg:hidden" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto w-full max-w-337.5 px-6">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 md:gap-16 lg:grid-cols-12 lg:gap-8 xl:gap-14">
          {/* Left Column */}
          <div className="flex flex-col space-y-5 sm:space-y-8 lg:col-span-6">
            {/* Badge & Live Pulse */}
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="inline-flex items-center gap-1.5 rounded-full border-red-500/25 bg-red-950/30 px-3 py-3 text-[9px] font-medium uppercase tracking-[0.25em] text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)] backdrop-blur-sm sm:px-3.5 sm:text-[10px] sm:tracking-[0.3em]">
                <Sparkles className="size-3 text-red-400" />
                Digital Time Capsule
              </Badge>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400/80">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <span>Vault Active</span>
              </div>
            </div>

            <div className="relative inline-block max-w-2xl select-none group">


              <h1 className="leading-[1.08] tracking-tight">
                {/* প্রথম লাইন: Write it. + Feel it. */}
                <span className="block text-4xl sm:text-[52px] font-serif">
                  <span className="text-[#fcfbf9] font-semibold drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                    Write it.{" "}
                  </span>
                  {/* Feel it: উষ্ণ সোনালী আলো যা হোভারে উজ্জ্বল হয় */}
                  <span className="inline-block italic font-semibold bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(245,158,11,0.4)] transition-all duration-300 hover:drop-shadow-[0_0_28px_rgba(245,158,11,0.7)]">
                    Feel it.
                  </span>
                </span>

                {/* দ্বিতীয় লাইন: সিনেমাটিক ফ্লুইড রেড গ্রেডিয়েন্ট (স্বয়ংক্রিয় চলমান আলো) */}
                <span className="relative mt-1 block font-serif italic text-4xl sm:text-[52px] mfont-normal">
                  {/* পেছনের রক্তিম ডাইনামিক আভা (Aura) */}
                  <span
                    className="pointer-events-none absolute -inset-x-4 -inset-y-1 -z-10 rounded-2xl bg-gradient-to-r from-red-600/30 via-rose-500/20 to-transparent blur-xl animate-aura"
                    aria-hidden="true"
                  />

                  {/* টেক্সটের ভেতরে রঙের চলমান স্রোত */}
                  <span className="animate-text-flow bg-clip-text text-transparent font-semibold bg-gradient-to-r from-[#ef4444] via-[#fb7185] via-50% to-[#b91c1c] drop-shadow-[0_0_22px_rgba(244,63,94,0.4)]">
                    Seal it. Become it.
                  </span>
                </span>
              </h1>

              {/* নিচের বাঁকা রেড আর্ক (Arc Stroke) - পালসিং লাইট ইফেক্ট সহ */}
              <div className="relative -mt-1 sm:-mt-2 flex w-full justify-center pointer-events-none">
                <svg
                  viewBox="0 0 320 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[75%] sm:w-[70%] max-w-[340px] overflow-visible animate-arc-glow transition-transform duration-500 group-hover:scale-105"
                >
                  <defs>
                    <linearGradient id="arcGlowAnimated" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
                      <stop offset="20%" stopColor="#f43f5e" stopOpacity="0.85" />
                      <stop offset="50%" stopColor="#fb7185" stopOpacity="1" />
                      <stop offset="80%" stopColor="#e11d48" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#991b1b" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 10 16 Q 160 4 310 13"
                    stroke="url(#arcGlowAnimated)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Description */}
            <p className="max-w-xl text-xs font-light leading-relaxed text-white/60 sm:text-base ">
              A private digital time capsule for your thoughts, memories,
              letters, and future confessions. Write what matters today.
              Open it when the time is right.
            </p>


            {/* Emotional Message & Action Block (Plain, Universal English) */}
            <div className="space-y-4 pt-1 max-w-xl">
              <div className="space-y-1.5 border-l-2 border-red-700/60 pl-3.5 sm:pl-4">
                <p className="font-serif italic text-sm sm:text-base leading-relaxed text-zinc-200">
                  “Some words are meant for tomorrow.”
                </p>
                <p className="text-xs sm:text-[13px] font-light leading-relaxed text-zinc-400">
                  Write a private letter to your future self or someone you love. Sealed safely in time until the day you choose to open it.
                </p>
              </div>

              <div className="pt-1">
                <Button
                  onClick={scrollToForm}
                  className="group relative inline-flex h-11 items-center gap-2.5 rounded-lg bg-gradient-to-r from-[#b91c1c] via-[#991b1b] to-[#7f1d1d] px-6 text-xs font-medium uppercase tracking-wider text-white shadow-[0_0_25px_rgba(185,28,28,0.4)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(225,29,72,0.6)] cursor-pointer"
                >
                  <Feather className="size-4 text-rose-200 transition-transform duration-300 group-hover:-rotate-12" />
                  <span> Seal a Letter </span>
                </Button>
              </div>

            </div>

            {/* Security Features */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-white/10 pt-4 font-mono text-[9px] text-white/60 sm:gap-x-5 sm:gap-y-4 sm:text-[10px] md:gap-x-6 md:text-[11px]">
              {/* AES */}
              <div className="flex items-center gap-2">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full border border-red-900/40 bg-red-950/40 sm:size-7">
                  <LockKeyhole className="size-3 text-[#dc2626] sm:size-3.5" />
                </div>
                <span>AES-256 Encrypted</span>
              </div>

              <span className="hidden h-4 w-px bg-white/10 sm:block" />

              {/* Zero Knowledge */}
              <div className="flex items-center gap-2">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full border border-red-900/40 bg-red-950/40 sm:size-7">
                  <ShieldCheck className="size-3 text-[#dc2626] sm:size-3.5" />
                </div>
                <span>Zero-Knowledge</span>
              </div>

              <span className="hidden h-4 w-px bg-white/10 sm:block" />

              {/* Time Locked */}
              <div className="flex items-center gap-2">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full border border-red-900/40 bg-red-950/40 sm:size-7">
                  <Clock3 className="size-3 text-[#dc2626] sm:size-3.5" />
                </div>
                <span>Time-Locked</span>
              </div>
            </div>

            {/* Social Proof & Trust Counter (খালি জায়গা ব্যালান্স করার জন্য) */}
            <div className="flex items-center gap-3 pt-1 text-[11px] font-mono text-zinc-400">
              <div className="flex -space-x-1.5 overflow-hidden">
                <div className="inline-block size-5 rounded-full ring-1 ring-zinc-800 bg-red-900/60" />
                <div className="inline-block size-5 rounded-full ring-1 ring-zinc-800 bg-rose-800/60" />
                <div className="inline-block size-5 rounded-full ring-1 ring-zinc-800 bg-amber-900/60" />
              </div>
              <span className="text-zinc-400/80">
                <strong className="text-zinc-200 font-semibold">1,400+</strong> letters sealed in time
              </span>
            </div>

          </div>

          {/* Right Column - Capsule Form */}
          <div className="w-full lg:col-span-6 lg:flex lg:justify-end">
            <div className="mx-auto w-full">
              <CapsuleForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnsealHero;