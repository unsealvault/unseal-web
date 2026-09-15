'use client';

import { Badge } from '@/components/ui/badge';
import { LockKeyhole, ShieldCheck, Clock3 } from 'lucide-react';
import { CapsuleForm } from '@/components/form/capsule-form';

const UnsealHero = () => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#07080a] text-[#fbf8f3] selection:bg-[#991b1b]/30 selection:text-rose-200">
      {/* Hero Banner Section */}
      <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#07080a] pt-28 pb-12 sm:pt-32 sm:pb-16 md:pt-36 md:pb-20 lg:pt-32 lg:pb-20 xl:pt-36">
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
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 md:gap-16 lg:grid-cols-12 lg:gap-8 xl:gap-12">
            {/* Left Column */}
            <div className="flex flex-col space-y-5 sm:space-y-6 lg:col-span-6">
              {/* Badge */}
              <div>
                <Badge variant="outline" className="rounded-full border-red-500/25 bg-red-950/30 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.25em] text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)] backdrop-blur-sm sm:px-4 sm:text-[10px] sm:tracking-[0.3em] md:text-[11px] md:tracking-[0.35em]">
                  Digital Time Capsule
                </Badge>
              </div>

              {/* Heading */}
              <h1 className="max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight text-[#fbf8f3] sm:text-5xl md:text-[52px] lg:text-5xl xl:text-6xl">
                Write it. Feel it.
                <br />
                <span className="bg-linear-to-r from-[#ef4444] via-[#f43f5e] to-rose-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                  Seal it. Become it.
                </span>
              </h1>

              {/* Description */}
              <p className="max-w-xl text-sm font-light leading-relaxed text-white/60 sm:text-base md:text-lg">
                A digital time capsule for your unvarnished thoughts, memories,
                letters, and future confessions. Keep what matters, until the
                right time.
              </p>

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
            </div>

            {/* Right Column - Capsule Form */}
            <div className="w-full lg:col-span-6 lg:flex lg:justify-end">
              <div className="mx-auto w-full max-w-xl lg:mx-0 lg:max-w-140">
                <CapsuleForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default UnsealHero;