'use client';

import { useState } from 'react';
import {
  Globe,
  Search,
  Heart,
  LockOpen,
  ArrowUpRight,
  X,
  Sparkles,
  Calendar,
  ShieldCheck,
  Check,
  Copy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface VaultLetter {
  id: string;
  archiveNo: string;
  tag: string;
  author: string;
  lockedDays: string;
  sealedDate: string;
  unsealedDate: string;
  excerpt: string;
  fullContent: string;
  resonates: number;
}



const categories = [
  'All Echoes',
  'Future Self',
  'Promises',
  'Reflections',
  'Love & Loss',
  'Milestones',
];

const PublicVaultPage = () => {
  const [letters, setLetters] = useState<VaultLetter[]>(initialLetters);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Echoes');
  const [selectedLetter, setSelectedLetter] = useState<VaultLetter | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [resonatedIds, setResonatedIds] = useState<Record<string, boolean>>({});

  const filteredLetters = letters.filter((item) => {
    const matchesCategory =
      activeCategory === 'All Echoes' ||
      item.tag.toLowerCase() === activeCategory.toLowerCase();

    const query = searchQuery.trim().toLowerCase();

    const matchesSearch =
      !query ||
      item.excerpt.toLowerCase().includes(query) ||
      item.author.toLowerCase().includes(query) ||
      item.archiveNo.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const handleResonate = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const isAlreadyResonated = !!resonatedIds[id];

    setResonatedIds((prev) => ({
      ...prev,
      [id]: !isAlreadyResonated,
    }));

    setLetters((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              resonates: isAlreadyResonated
                ? item.resonates - 1
                : item.resonates + 1,
            }
          : item
      )
    );
  };

  const handleCopyLink = async (archiveNo: string) => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/public-vault#${archiveNo}`
      );

      setCopiedId(archiveNo);

      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground transition-colors duration-300 selection:bg-[#991b1b]/20 selection:text-[#991b1b] dark:selection:bg-[#991b1b]/40 dark:selection:text-rose-200">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-[#991b1b]/5 blur-[120px] dark:bg-red-950/15 sm:h-96 sm:w-96" />
        <div className="absolute right-0 top-1/2 h-64 w-64 rounded-full bg-[#991b1b]/5 blur-[120px] dark:bg-red-950/10" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col space-y-10 px-4 pb-16 pt-24 sm:space-y-12 sm:px-6 sm:pb-20 sm:pt-28 lg:px-10">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#991b1b]/30 bg-[#991b1b]/5 px-3 py-1 text-[10px] font-mono tracking-[0.16em] text-[#991b1b] dark:text-rose-400 sm:text-xs">
            <span className="size-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] animate-pulse sm:size-2" />
            <span>PUBLIC ARCHIVE LEDGER</span>
          </div>

          <h1 className="font-serif text-3xl font-normal tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            Echoes from the Past
          </h1>

          <p className="mx-auto max-w-2xl text-xs font-light leading-relaxed text-muted-foreground sm:text-sm md:text-base">
            Real time capsules sealed years ago whose timers have reached zero.
            Read confessions, promises, and unedited memories decrypted for the
            world to witness.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-1 text-[9px] font-mono text-muted-foreground sm:gap-6 sm:text-[11px]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-[#991b1b] dark:text-rose-400" />
              Verifiable AES-GCM-256
            </span>

            <span className="hidden text-border sm:inline">•</span>

            <span className="flex items-center gap-1.5">
              <Globe className="size-3.5 text-[#991b1b] dark:text-rose-400" />
              Open Decrypted Archive
            </span>

            <span className="hidden text-border sm:inline">•</span>

            <span className="flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-[#991b1b] dark:text-rose-400" />
              {letters.length} Capsules Decrypted
            </span>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search archive by keyword, author, or ARC ID..."
                className="h-10 rounded-xl border-border/80 bg-card/60 pl-10 text-xs text-foreground backdrop-blur-md transition-colors hover:border-border focus-visible:ring-1 focus-visible:ring-[#991b1b] sm:h-11"
              />
            </div>

            <span className="self-end text-[10px] font-mono text-muted-foreground sm:self-center sm:text-xs">
              Showing{' '}
              <span className="font-semibold text-foreground">
                {filteredLetters.length}
              </span>{' '}
              capsules
            </span>
          </div>

          <div className="-mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 text-[10px] font-mono tracking-wider transition-all duration-200 sm:px-4 sm:py-2 sm:text-xs ${isActive ? 'bg-[#991b1b] font-medium text-white shadow-md shadow-[#991b1b]/20' : 'border border-border/70 bg-card/70 text-muted-foreground hover:border-border hover:text-foreground'}`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {filteredLetters.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/40 px-6 py-16 text-center">
            <LockOpen className="mx-auto size-9 stroke-[1.2] text-muted-foreground/40" />

            <h3 className="mt-3 font-serif text-lg font-medium text-foreground">
              No Echoes Found
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-xs font-light leading-relaxed text-muted-foreground">
              No decrypted capsules matched your search term. Try another
              keyword or filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {filteredLetters.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedLetter(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedLetter(item);
                  }
                }}
                className="group relative flex min-h-80 cursor-pointer flex-col justify-between overflow-hidden rounded-xl border border-border/80 bg-card/80 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#991b1b]/60 hover:shadow-xl hover:shadow-[#991b1b]/10 sm:min-h-85 sm:rounded-2xl sm:p-6"
              >
                <div className="pointer-events-none absolute right-3 top-3 text-border/30 transition-colors duration-300 group-hover:text-[#991b1b]/15 dark:text-zinc-800/40 sm:right-4 sm:top-4">
                  <LockOpen className="size-14 stroke-1 sm:size-16" />
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-3 text-[10px] font-mono sm:text-[11px]">
                    <span className="font-semibold tracking-wider text-muted-foreground">
                      {item.archiveNo}
                    </span>

                    <span className="shrink-0 rounded-full border border-red-500/20 bg-red-500/5 px-2 py-0.5 text-[8px] tracking-wider text-red-500 sm:text-[10px]">
                      {item.lockedDays}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 text-[9px] font-mono text-muted-foreground sm:text-[10px]">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="size-3 text-muted-foreground/70" />
                      {item.sealedDate}
                    </span>

                    <span className="text-border">→</span>

                    <span className="text-right font-medium text-[#991b1b] dark:text-rose-400">
                      {item.unsealedDate}
                    </span>
                  </div>

                  <div className="pt-1">
                    <p className="line-clamp-5 font-serif text-[14px] italic leading-[1.65] text-foreground/90 sm:text-[15px]">
                      &ldquo;{item.excerpt}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="relative z-10 mt-5 flex items-center justify-between border-t border-border/60 pt-4 text-xs font-mono">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="size-1.5 shrink-0 rounded-full bg-muted-foreground/50 transition-colors group-hover:bg-[#991b1b]" />

                    <span className="truncate text-muted-foreground transition-colors group-hover:text-foreground">
                      {item.author}
                    </span>
                  </div>

                  <div className="ml-3 flex shrink-0 items-center gap-2.5">
                    <button
                      type="button"
                      onClick={(e) => handleResonate(item.id, e)}
                      aria-label={`Resonate with ${item.archiveNo}`}
                      className={`flex cursor-pointer items-center gap-1 rounded-full px-2 py-1 text-[10px] transition-colors sm:text-[11px] ${resonatedIds[item.id] ? 'bg-red-500/10 text-red-500' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      <Heart
                        className={`size-3.5 transition-transform active:scale-125 ${resonatedIds[item.id] ? 'fill-red-500 text-red-500' : ''}`}
                      />
                      <span>{item.resonates}</span>
                    </button>

                    <span className="flex items-center gap-0.5 text-[10px] font-semibold text-[#991b1b] transition-transform duration-300 group-hover:translate-x-0.5 dark:text-rose-400 sm:text-[11px]">
                      <span>Read</span>
                      <ArrowUpRight className="size-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedLetter && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-md animate-in fade-in duration-200 sm:p-5"
          onClick={() => setSelectedLetter(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border/80 bg-card p-5 text-card-foreground shadow-2xl sm:rounded-3xl sm:p-8 lg:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedLetter(null)}
              aria-label="Close document"
              className="absolute right-4 top-4 flex size-8 cursor-pointer items-center justify-center rounded-full border border-border/60 bg-muted/30 text-muted-foreground transition-colors hover:text-foreground sm:right-6 sm:top-6"
            >
              <X className="size-4" />
            </button>

            <div className="space-y-2 border-b border-border/60 pb-5 pr-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono font-semibold text-[#991b1b] dark:text-rose-400 sm:text-xs">
                  {selectedLetter.archiveNo}
                </span>

                <span className="text-border">•</span>

                <span className="rounded-md border border-border px-2 py-0.5 text-[9px] font-mono text-muted-foreground sm:text-[10px]">
                  {selectedLetter.tag}
                </span>
              </div>

              <h2 className="font-serif text-xl font-medium text-foreground sm:text-2xl lg:text-3xl">
                Decrypted Archival Record
              </h2>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl border border-border/60 bg-muted/20 p-3 text-xs font-mono sm:gap-4 sm:p-3.5">
              <div className="min-w-0">
                <span className="mb-1 block text-[9px] text-muted-foreground sm:text-[10px]">
                  SEALED AT
                </span>

                <span className="block truncate font-medium text-foreground">
                  {selectedLetter.sealedDate}
                </span>
              </div>

              <div className="min-w-0">
                <span className="mb-1 block text-[9px] text-muted-foreground sm:text-[10px]">
                  UNLOCKED
                </span>

                <span className="block truncate font-medium text-[#991b1b] dark:text-rose-400">
                  {selectedLetter.unsealedDate}
                </span>
              </div>
            </div>

            <div className="my-5 border-y border-border/40 py-5 font-serif text-[15px] font-light leading-[1.8] text-foreground/95 whitespace-pre-line sm:text-[16px] lg:text-[17px]">
              {selectedLetter.fullContent}
            </div>

            <div className="flex flex-col gap-4 pt-1 text-xs font-mono sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Authored by:</span>

                <span className="font-medium text-foreground">
                  {selectedLetter.author}
                </span>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleCopyLink(selectedLetter.archiveNo)}
                className="h-8 w-full cursor-pointer rounded-full px-3 text-xs font-mono sm:w-auto"
              >
                {copiedId === selectedLetter.archiveNo ? (
                  <>
                    <Check className="mr-1.5 size-3.5 text-green-500" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="mr-1.5 size-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default PublicVaultPage;

const initialLetters: VaultLetter[] = [
  {
    id: '1',
    archiveNo: 'ARC-2023-094',
    tag: 'Future Self',
    author: 'Anonymous',
    lockedDays: '730 DAYS IN VAULT',
    sealedDate: 'SEP 14, 2023',
    unsealedDate: 'YESTERDAY',
    excerpt:
      'If you are reading this, I hope you finally quit that soul-crushing agency job and took a leap into building your own studio. Did you ever stop being afraid of failing?',
    fullContent: `If you are reading this, I hope you finally quit that soul-crushing agency job and took a leap into building your own studio. Did you ever stop being afraid of failing?

Right now, it is 3:45 AM on a rainy Tuesday. My eyes burn from staring at Figma files for clients who don't care about craftsmanship. I have $1,400 in savings and a pitch deck no one has opened yet.

Promise me that if the studio worked out, you didn't become arrogant. And if it failed and you had to start over, promise me you did it with your head high. Keep designing things that matter.`,
    resonates: 142,
  },
  {
    id: '2',
    archiveNo: 'ARC-2021-118',
    tag: 'Promises',
    author: 'Robin',
    lockedDays: '1,095 DAYS IN VAULT',
    sealedDate: 'AUG 22, 2021',
    unsealedDate: '3 DAYS AGO',
    excerpt:
      'Did we ever make it to Tokyo? Did we learn how to forgive Dad? I am writing this from my tiny dorm room with 200 bucks left in the account. Remember this hunger.',
    fullContent: `Did we ever make it to Tokyo? Did we learn how to forgive Dad? I am writing this from my tiny dorm room with 200 bucks left in the account. Remember this hunger.

Remember the days when a bowl of instant ramen felt like a luxury and walking 4 miles saved train fare. I promised myself back then that success wouldn't make me forget the people who stood by me in the cold.

Call Mom tomorrow. Don't wait for an excuse.`,
    resonates: 89,
  },
  {
    id: '3',
    archiveNo: 'ARC-2022-402',
    tag: 'Reflections',
    author: 'The Architect',
    lockedDays: '365 DAYS IN VAULT',
    sealedDate: 'JAN 01, 2022',
    unsealedDate: 'THIS WEEK',
    excerpt:
      'To whoever reads this in the future: I hope you learned to stop worrying about things you cannot control. The rain always stops eventually. Keep creating.',
    fullContent: `To whoever reads this in the future: I hope you learned to stop worrying about things you cannot control. The rain always stops eventually. Keep creating.

We waste so much vital energy mourning things that were never meant to stay. Treat time as a sacred material—like raw timber or hand-cast bronze. Don't let trivial distractions erode your life's work.`,
    resonates: 215,
  },
  {
    id: '4',
    archiveNo: 'ARC-2020-019',
    tag: 'Love & Loss',
    author: 'A Distant Friend',
    lockedDays: '1,460 DAYS IN VAULT',
    sealedDate: 'NOV 12, 2020',
    unsealedDate: 'LAST WEEK',
    excerpt:
      'I never told you how much that coffee on the rooftop meant to me. By the time this unlocks, we will probably be strangers living in different continents.',
    fullContent: `I never told you how much that coffee on the rooftop meant to me. By the time this unlocks, we will probably be strangers living in different continents.

Life has this cruel habit of drifting people apart so slowly that neither person realizes when the last goodbye happened. If serendipity ever brings you to this archive, just know I always rooted for your happiness.`,
    resonates: 312,
  },
  {
    id: '5',
    archiveNo: 'ARC-2023-512',
    tag: 'Future Self',
    author: 'Rookie Coder',
    lockedDays: '365 DAYS IN VAULT',
    sealedDate: 'MAR 08, 2023',
    unsealedDate: '2 WEEKS AGO',
    excerpt:
      'Today I wrote my first line of code that actually worked. If you are reading this years later, I hope we built something people truly love and cherish.',
    fullContent: `Today I wrote my first line of code that actually worked. If you are reading this years later, I hope we built something people truly love and cherish.

My first React button didn't center for 3 hours. I felt like an imposter. But when that first state update triggered, it was magic. Never lose that child-like wonder for building software.`,
    resonates: 98,
  },
  {
    id: '6',
    archiveNo: 'ARC-2019-003',
    tag: 'Milestones',
    author: 'Chai & Nostalgia',
    lockedDays: '1,825 DAYS IN VAULT',
    sealedDate: 'JUL 19, 2019',
    unsealedDate: 'LAST MONTH',
    excerpt:
      'Sitting on my rooftop watching the sunset over the city skyline. Sending this breath of fresh air into the digital ether. Be kind to yourself today.',
    fullContent: `Sitting on my rooftop watching the sunset over the city skyline. Sending this breath of fresh air into the digital ether. Be kind to yourself today.

The world moves at breakneck speed. Breathe. The sky doesn't rush, yet twilight always arrives in perfect harmony.`,
    resonates: 267,
  },
];