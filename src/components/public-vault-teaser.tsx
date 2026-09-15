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

const PublicVaultTeaser = () => {
  return (
    <section className="relative w-full overflow-hidden border-t border-border/60 bg-background px-4 py-16 text-foreground transition-colors duration-300 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
      <div className="pointer-events-none absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#991b1b]/5 blur-[120px] dark:bg-red-950/15 sm:h-96 sm:w-96" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 border-b border-border/60 pb-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#991b1b]/30 bg-[#991b1b]/5 px-3 py-1 text-[10px] font-mono tracking-[0.18em] text-[#991b1b] dark:text-rose-400 sm:text-xs">
              <span className="size-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] animate-pulse" />
              <span>PUBLIC ARCHIVE LEDGER</span>
            </div>

            <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Echoes Unlocked from the Past
            </h2>

            <p className="max-w-2xl text-xs font-light leading-relaxed text-muted-foreground sm:text-sm">
              Real capsules sealed years ago whose timers have reached zero. Anonymous confessions, promises, and unedited memories decrypted for the world to witness.
            </p>
          </div>

          <div className="shrink-0">
            <Link href="/public-vault" className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#991b1b]/40 bg-[#991b1b]/10 px-5 py-2.5 text-[10px] font-mono tracking-[0.16em] text-[#991b1b] uppercase shadow-xs transition-all duration-300 hover:bg-[#991b1b] hover:text-white dark:text-rose-400 dark:hover:bg-[#991b1b] sm:w-auto sm:px-6 sm:py-3 sm:text-xs">
              <span>Explore All Capsules</span>
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:size-4" />
            </Link>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {records.map((item) => (
            <Link key={item.id} href="/public-vault" className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-xl border border-border/80 bg-card/80 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#991b1b]/60 hover:shadow-xl hover:shadow-[#991b1b]/10 sm:min-h-[340px] sm:rounded-2xl sm:p-6">
              <div className="pointer-events-none absolute right-3 top-3 text-border/30 transition-colors duration-300 group-hover:text-[#991b1b]/15 dark:text-zinc-800/40">
                <LockOpen className="size-14 stroke-1 sm:size-16" />
              </div>

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-3 text-[10px] font-mono sm:text-[11px]">
                  <span className="font-semibold tracking-wider text-muted-foreground">{item.archiveNo}</span>
                  <span className="rounded-full border border-red-500/20 bg-red-500/5 px-2 py-0.5 text-[9px] tracking-wider text-red-500 sm:text-[10px]">{item.lockedDays}</span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 text-[9px] font-mono text-muted-foreground sm:gap-2 sm:text-[10px]">
                  <span>{item.sealedDate}</span>
                  <span className="text-border">→</span>
                  <span className="font-medium text-[#991b1b] dark:text-rose-400">{item.unsealedDate}</span>
                </div>

                <div className="pt-1">
                  <p className="line-clamp-5 font-serif text-[14px] italic leading-[1.65] text-foreground/90 sm:text-[15px]">
                    &ldquo;{item.excerpt}&rdquo;
                  </p>
                </div>
              </div>

              <div className="relative z-10 mt-5 flex items-center justify-between border-t border-border/60 pt-4 text-xs font-mono">
                <div className="flex min-w-0 items-center gap-2">
                  <div className="size-1.5 shrink-0 rounded-full bg-muted-foreground/50 transition-colors group-hover:bg-[#991b1b]" />
                  <span className="truncate text-muted-foreground transition-colors group-hover:text-foreground">{item.author}</span>
                </div>

                <span className="ml-3 flex shrink-0 items-center gap-1 text-[10px] font-semibold text-[#991b1b] transition-transform duration-300 group-hover:translate-x-1 dark:text-rose-400 sm:text-[11px]">
                  <span>Read Document</span>
                  <ArrowUpRight className="size-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 border-t border-border/60 pt-6 sm:grid-cols-3 sm:gap-4">
          <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-card/40 px-4 py-3">
            <FileText className="size-4 text-[#991b1b] dark:text-rose-400" />
            <div>
              <p className="text-[10px] font-mono tracking-wider text-muted-foreground">ARCHIVED</p>
              <p className="text-xs font-medium text-foreground">Unsealed Memories</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-card/40 px-4 py-3">
            <Clock className="size-4 text-[#991b1b] dark:text-rose-400" />
            <div>
              <p className="text-[10px] font-mono tracking-wider text-muted-foreground">TIME LOCKED</p>
              <p className="text-xs font-medium text-foreground">Years, Not Minutes</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-card/40 px-4 py-3">
            <Sparkles className="size-4 text-[#991b1b] dark:text-rose-400" />
            <div>
              <p className="text-[10px] font-mono tracking-wider text-muted-foreground">OPEN ACCESS</p>
              <p className="text-xs font-medium text-foreground">Public Archive</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicVaultTeaser;