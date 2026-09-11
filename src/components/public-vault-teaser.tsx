// components/public-vault-teaser.tsx
import Link from "next/link";
import { ArrowUpRight, Clock, FileText, LockOpen, Sparkles } from "lucide-react";

interface VaultRecord {
  id: string;
  archiveNo: string;
  author: string;
  lockedDays: string;
  sealedDate: string;
  unsealedDate: string;
  excerpt: string;
}

const records: VaultRecord[] = [
  {
    id: "1",
    archiveNo: "ARC-2023-094",
    author: "Anonymous",
    lockedDays: "730 DAYS IN VAULT",
    sealedDate: "SEP 2023",
    unsealedDate: "UNSEALED YESTERDAY",
    excerpt:
      "If you are reading this, I hope you finally quit that soul-crushing agency job and took a leap into building your own studio. Did you ever stop being afraid of failing?",
  },
  {
    id: "2",
    archiveNo: "ARC-2021-118",
    author: "Robin",
    lockedDays: "1,095 DAYS IN VAULT",
    sealedDate: "AUG 2021",
    unsealedDate: "UNSEALED 3 DAYS AGO",
    excerpt:
      "Did we ever make it to Tokyo? Did we learn how to forgive Dad? I am writing this from my tiny dorm room with 200 bucks left in the account. Remember this hunger.",
  },
  {
    id: "3",
    archiveNo: "ARC-2022-402",
    author: "The Architect",
    lockedDays: "365 DAYS IN VAULT",
    sealedDate: "JAN 2022",
    unsealedDate: "UNSEALED THIS WEEK",
    excerpt:
      "To whoever reads this in the future: I hope you learned to stop worrying about things you cannot control. The rain always stops eventually. Keep creating.",
  },
];

export function PublicVaultTeaser() {
  return (
    <section className="relative w-full bg-background py-24 px-4 sm:px-8 lg:px-12 text-foreground border-t border-border/60 transition-colors duration-300 overflow-hidden">
      
      {/* ব্যাকগ্রাউন্ড অ্যাম্বিয়েন্ট আভা */}
      <div className="pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 h-100 w-125 rounded-full bg-[#991b1b]/5 dark:bg-red-950/15 blur-[140px]" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        
        {/* টপ হেডার ও লাইভ আর্কাভ স্ট্যাটাস বার */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4 border-b border-border/60">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#991b1b]/30 bg-[#991b1b]/5 text-[#991b1b] dark:text-rose-400 text-xs font-mono tracking-widest">
              <span className="size-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />
              <span>PUBLIC ARCHIVE LEDGER</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
              Echoes Unlocked from the Past
            </h2>

            <p className="text-xs sm:text-sm text-muted-foreground font-light max-w-xl leading-relaxed">
              Real capsules sealed years ago whose timers have reached zero. Anonymous confessions, promises, and unedited memories decrypted for the world to witness.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/public-vault"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#991b1b]/40 bg-[#991b1b]/10 text-xs font-mono tracking-widest uppercase text-[#991b1b] dark:text-rose-400 hover:bg-[#991b1b] hover:text-white dark:hover:bg-[#991b1b] transition-all duration-300 group shadow-xs"
            >
              <span>Explore All Capsules</span>
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* ৩ডি ভল্ট রেকর্ডস গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {records.map((item) => (
            <Link
              key={item.id}
              href="/public-vault"
              className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card/80 backdrop-blur-md p-6 sm:p-7 transition-all duration-300 hover:border-[#991b1b]/60 hover:shadow-2xl hover:shadow-[#991b1b]/10 hover:-translate-y-1.5"
            >
              {/* পেছনের ওয়াটারমার্ক সিল */}
              <div className="pointer-events-none absolute right-4 top-4 text-border/40 dark:text-zinc-800/40 group-hover:text-[#991b1b]/15 transition-colors duration-300">
                <LockOpen className="size-16 stroke-1" />
              </div>

              {/* টপ মেটা: আর্কাইভ নম্বর ও টাইম-লক ব্যাজ */}
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between border-b border-border/60 pb-3 text-[11px] font-mono">
                  <span className="text-muted-foreground tracking-wider font-semibold">
                    {item.archiveNo}
                  </span>
                  <span className="px-2 py-0.5 rounded-full border border-red-500/20 bg-red-500/5 text-red-500 text-[10px] tracking-wider">
                    {item.lockedDays}
                  </span>
                </div>

                {/* টাইমলাইন ফ্লো */}
                <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
                  <span>{item.sealedDate}</span>
                  <span className="text-border">&rarr;</span>
                  <span className="text-[#991b1b] dark:text-rose-400 font-medium">
                    {item.unsealedDate}
                  </span>
                </div>

                {/* দলিলের লেখা (Serif Styling) */}
                <div className="pt-2">
                  <p className="font-serif text-[15px] sm:text-[16px] leading-[1.65] text-foreground/90 italic line-clamp-4">
                    &ldquo;{item.excerpt}&rdquo;
                  </p>
                </div>
              </div>

              {/* বটম সেকশন: সিগনেচার ও রিড সিগন্যাল */}
              <div className="relative z-10 pt-5 mt-6 border-t border-border/60 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-muted-foreground/50 group-hover:bg-[#991b1b] transition-colors" />
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {item.author}
                  </span>
                </div>

                <span className="text-[11px] text-[#991b1b] dark:text-rose-400 group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1 font-semibold">
                  <span>Read Document</span>
                  <ArrowUpRight className="size-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

export default PublicVaultTeaser;