// src/app/about/page.tsx
'use client';

import Link from 'next/link';
import { 
  ShieldCheck, 
  Hourglass, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  EyeOff, 
  KeyRound, 
  Feather, 
  Flame,
  CheckCircle2
} from 'lucide-react'; 
import { Button } from '@/components/ui/button';

interface Principle {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  tag: string;
  description: string;
}

const principles: Principle[] = [
  {
    icon: EyeOff,
    tag: 'PRIVACY BY MATHEMATICS',
    title: 'Zero-Knowledge Cryptography',
    description:
      'We do not ask for your trust; we provide cryptographic proof. Every message is sealed directly inside your web browser with client-side AES-GCM-256 before leaving your machine. We store only ciphertext—no engineer, database admin, or AI scraper can decipher your words[cite: 1, 2].',
  },
  {
    icon: Hourglass,
    tag: 'THE TIME-LOCK PROTOCOL',
    title: 'Uncompromising Temporal Locks',
    description:
      'In a hyper-connected world addicted to instant notifications, true value lies in patient waiting[cite: 1, 4]. Once a capsule timer is set, the protocol respects the designated passage of time[cite: 3]. There are no early-access overrides, shortcuts, or premium acceleration fees.',
  },
  {
    icon: Flame,
    tag: 'SOVEREIGN RECOVERY',
    title: 'Cryptographic Sovereignty',
    description:
      'You hold the sovereign keys to your own past. Through decentralized emergency recovery tokens, creators can update destination emails or permanently burn their locked payload into digital ash whenever they decide.',
  },
  {
    icon: Feather,
    tag: 'RADICAL INTENTIONALITY',
    title: 'A Sanctum for Deliberate Thought',
    description:
      'Modern internet platforms are designed for the next 24 hours of ephemeral feeds[cite: 2]. Unseal is designed for who you will become three, five, or ten years down the road—a safe harbor for confessions, forgotten promises, and unedited truths[cite: 1, 2].',
  },
];

const milestones = [
  { year: '2024', event: 'The Manifesto', detail: 'Conceived as an antidote to ephemeral social feeds and algorithmic surveillance.' },
  { year: '2025', event: 'Zero-Knowledge Engine', detail: 'Transitioned to browser-native Web Crypto API with zero server-side plaintext custody[cite: 1, 2].' },
  { year: '2026', event: 'The Public Ledger', detail: 'Decrypted community archives launch, allowing unlocked anonymous reflections to inspire the world[cite: 1, 2].' },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-[#991b1b]/20 selection:text-[#991b1b] dark:selection:bg-[#991b1b]/40 dark:selection:text-rose-200 transition-colors duration-300">
      
      {/* ব্যাকগ্রাউন্ড সিনেমাটিক গ্লো */}
      <div className="pointer-events-none fixed inset-0 flex justify-center">
        <div className="w-[750px] h-[360px] bg-[#991b1b]/10 dark:bg-[#991b1b]/15 blur-[150px] rounded-full" />
      </div>
 
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-32 pb-24 flex-1 space-y-24">
        
        {/* ================= ১. হিরো / ভিশন সেকশন ================= */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#991b1b]/30 bg-[#991b1b]/5 text-[#991b1b] dark:text-rose-400 text-xs font-mono tracking-widest">
            <Sparkles className="size-3.5" />
            <span>THE UNSEAL MANIFESTO</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground leading-[1.12]">
            A Sanctuary Built for Words That Must Wait.
          </h1>

          <p className="font-serif text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
            The internet became too fast, too loud, and entirely too forgetful. We built Unseal to restore the sacred ritual of writing to the future—guaranteed by mathematics, sealed with digital wax.
          </p>
        </div>

        {/* ================= ২. স্টোরি / ফিলোসফি সেকশন ================= */}
        <div className="relative rounded-3xl border border-border/80 bg-card/80 backdrop-blur-md p-8 sm:p-12 lg:p-16 shadow-xl overflow-hidden">
          <div className="pointer-events-none absolute -left-20 -bottom-20 size-80 rounded-full bg-[#991b1b]/5 dark:bg-rose-950/15 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#991b1b] dark:text-rose-400 font-semibold">
                OUR REASON FOR BEING
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground leading-snug">
                We believe memory should not be an ad-supported commodity.
              </h2>
              <div className="font-serif text-sm sm:text-base text-muted-foreground font-light space-y-4 leading-relaxed">
                <p>
                  Every major cloud service today operates on surveillance incentives: your photos are parsed for training machine learning models, your drafts are scanned for advertising affinity, and your private notes sit unencrypted in corporate data warehouses[cite: 2].
                </p>
                <p>
                  Unseal was created under a radically different premise: <strong className="text-foreground font-medium">zero-knowledge architecture</strong>[cite: 1, 2]. We engineered our platform so that even if subpoenaed by authorities, breached by adversaries, or managed by rogue operators, your letters remain mathematically inaccessible until their unlock day arrives[cite: 1, 2].
                </p>
              </div>
            </div>

            {/* ডান পাশের স্ট্যাটস / কোট কার্ড */}
            <div className="lg:col-span-5 p-7 sm:p-9 rounded-2xl border border-border bg-muted/20 space-y-6">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#991b1b] dark:text-rose-400">
                  OUR ARCHITECTURAL PROMISE
                </span>
                <p className="font-serif text-xl text-foreground font-medium italic">
                  &ldquo;If our servers are ever compromised, the attackers walk away with pure static.&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-border/60 space-y-2.5 text-xs font-mono">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="size-4 text-[#991b1b] dark:text-rose-400 shrink-0" />
                  <span>Client-Side AES-GCM-256 Encryption[cite: 1, 2]</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="size-4 text-[#991b1b] dark:text-rose-400 shrink-0" />
                  <span>No Plaintext Database Storage[cite: 1, 2]</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="size-4 text-[#991b1b] dark:text-rose-400 shrink-0" />
                  <span>Deterministic Temporal Cron Delivery[cite: 1]</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= ৩. কোর প্রিন্সিপাল গ্রিড (৪টি স্তম্ভ) ================= */}
        <div className="space-y-10">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#991b1b] dark:text-rose-400 font-semibold">
              PILLARS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-foreground">
              Built on Unbending Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {principles.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-8 sm:p-9 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-md flex flex-col justify-between space-y-6 hover:border-[#991b1b]/50 transition-all duration-300 shadow-md group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="size-11 rounded-xl border border-[#991b1b]/30 bg-[#991b1b]/10 text-[#991b1b] dark:text-rose-400 flex items-center justify-center shadow-[0_0_15px_rgba(153,27,27,0.15)] group-hover:scale-105 transition-transform">
                        <Icon className="size-5" />
                      </div>
                      <span className="text-[10px] font-mono tracking-widest text-muted-foreground">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground group-hover:text-[#991b1b] dark:group-hover:text-rose-400 transition-colors">
                      {item.title}
                    </h3>

                    <p className="font-serif text-sm text-muted-foreground leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= ৪. টাইমলাইন / প্রোটোকল জার্নি ================= */}
        <div className="space-y-10 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#991b1b] dark:text-rose-400 font-semibold">
              CHRONOLOGY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-foreground">
              Evolution of the Protocol
            </h2>
          </div>

          <div className="relative border-l border-border/80 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative group">
                {/* টাইমলাইন ডট */}
                <span className="absolute -left-[31px] sm:-left-[47px] top-1 size-3 rounded-full bg-border group-hover:bg-[#991b1b] group-hover:shadow-[0_0_10px_#ef4444] transition-all" />

                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-[#991b1b] dark:text-rose-400 font-semibold">
                    {m.year}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-foreground">
                    {m.event}
                  </h3>
                  <p className="font-serif text-sm text-muted-foreground font-light leading-relaxed max-w-xl">
                    {m.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= ৫. বটম সিগনেচার কল-টু-অ্যাকশন ================= */}
        <div className="relative rounded-3xl border border-border/80 bg-card p-10 sm:p-14 text-center space-y-6 max-w-3xl mx-auto shadow-2xl overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(153,27,27,0.12)_0%,transparent_70%)]" />

          <div className="relative z-10 size-14 mx-auto rounded-2xl border border-[#991b1b]/40 bg-[#991b1b]/10 text-[#991b1b] dark:text-rose-400 flex items-center justify-center shadow-[0_0_20px_rgba(153,27,27,0.3)]">
            <Lock className="size-6" />
          </div>

          <div className="relative z-10 space-y-2">
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-foreground">
              Speak to Who You Will Become.
            </h3>
            <p className="font-serif text-sm text-muted-foreground font-light max-w-md mx-auto leading-relaxed">
              Seal your first capsule today. The words will remain untouched until the hour of their unsealing arrives[cite: 2, 4].
            </p>
          </div>

          <div className="relative z-10 pt-2">
            <Button 
              className="h-12 px-8 rounded-full bg-linear-to-r from-[#b91c1c] via-[#dc2626] to-[#b91c1c] text-xs font-mono uppercase tracking-wider font-semibold text-white shadow-[0_0_25px_rgba(220,38,38,0.3)] hover:shadow-[0_0_35px_rgba(220,38,38,0.5)] transition-all cursor-pointer"
            >
              <Link href="/create" className="flex items-center gap-2">
                <span>Create a Time Capsule</span>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>

      </div> 
    </main>
  );
}