// app/page.tsx
import { Badge } from '@/components/ui/badge';
import { LockKeyhole, ShieldCheck, Clock3 } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { CapsuleForm } from '@/components/capsule-form';

export default function UnsealHero() {
  return (
    <main className="min-h-screen bg-[#07080a] text-[#fbf8f3] selection:bg-[#991b1b]/30 selection:text-rose-200">
      <Navbar />

      {/* Hero Banner Section */}
      <section className="relative min-h-screen w-full overflow-hidden flex items-center pt-24 pb-16">

        {/* Background Envelope Image */}
        <div
          className="absolute inset-0 z-0 bg-no-repeat bg-cover bg-left lg:bg-[left-20px_center] opacity-40 lg:opacity-75"
          style={{
            backgroundImage: "url('/unseal-hero-bg.png')",
          }}
        />

        {/* Ambient Overlays & Gradients */}
        <div className="absolute inset-0 z-1 bg-linear-to-b from-[#07080a]/90 via-[#07080a]/80 via-45% lg:via-55% to-[#07080a]/40" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-1 h-32 bg-linear-to-b from-[#07080a] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-1 h-36 bg-linear-to-t from-[#07080a] to-transparent" />
        <div className="pointer-events-none absolute right-[15%] top-[25%] z-1 h-87.5 w-87.5 rounded-full bg-red-950/25 blur-[140px]" />

        {/* Main 2-Column Grid */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-0 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Column: Vision & Security Badges */}
            <div className="lg:col-span-6 space-y-6">
              <Badge
                variant="outline"
                className="rounded-full border-red-500/25 bg-red-950/30 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.35em] text-red-400 backdrop-blur-sm shadow-[0_0_15px_rgba(239,68,68,0.1)]"
              >
                Digital Time Capsule
              </Badge>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-semibold leading-[1.08] tracking-tight text-[#fbf8f3]">
                Write it. Feel it. <br />
                <span className="bg-linear-to-r from-[#ef4444] via-[#f43f5e] to-rose-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                  Seal it. Become it.
                </span>
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-white/60 sm:text-lg font-light">
                A digital time capsule for your unvarnished thoughts, memories, letters, and future confessions. Keep what matters, until the right time.
              </p>

              {/* Security Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 font-mono text-[11px] text-white/60 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex size-6 items-center justify-center rounded-full bg-red-950/40 border border-red-900/40">
                    <LockKeyhole className="size-3 text-[#dc2626]" />
                  </div>
                  <span>AES-256 Encrypted</span>
                </div>

                <span className="h-4 w-px bg-white/10 hidden sm:block" />

                <div className="flex items-center gap-2">
                  <div className="flex size-6 items-center justify-center rounded-full bg-red-950/40 border border-red-900/40">
                    <ShieldCheck className="size-3 text-[#dc2626]" />
                  </div>
                  <span>Zero-Knowledge</span>
                </div>

                <span className="h-4 w-px bg-white/10 hidden sm:block" />

                <div className="flex items-center gap-2">
                  <div className="flex size-6 items-center justify-center rounded-full bg-red-950/40 border border-red-900/40">
                    <Clock3 className="size-3 text-[#dc2626]" />
                  </div>
                  <span>Time-Locked</span>
                </div>
              </div>
            </div>

            {/* Right Column: Encapsulated Form Component */}
            <div className="lg:col-span-6">
              <CapsuleForm />
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}