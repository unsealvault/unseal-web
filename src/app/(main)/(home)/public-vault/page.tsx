// src/app/public-vault/page.tsx
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
  Share2, 
  Check, 
  Copy,
  Timer
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

const initialLetters: VaultLetter[] = [
  {
    id: '1',
    archiveNo: 'ARC-2023-094',
    tag: 'Future Self',
    author: 'Anonymous',
    lockedDays: '730 DAYS IN VAULT',
    sealedDate: 'SEP 14, 2023',
    unsealedDate: 'YESTERDAY',
    excerpt: 'If you are reading this, I hope you finally quit that soul-crushing agency job and took a leap into building your own studio. Did you ever stop being afraid of failing?',
    fullContent: `If you are reading this, I hope you finally quit that soul-crushing agency job and took a leap into building your own studio. Did you ever stop being afraid of failing?\n\nRight now, it is 3:45 AM on a rainy Tuesday. My eyes burn from staring at Figma files for clients who don't care about craftsmanship. I have $1,400 in savings and a pitch deck no one has opened yet.\n\nPromise me that if the studio worked out, you didn't become arrogant. And if it failed and you had to start over, promise me you did it with your head high. Keep designing things that matter.`,
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
    excerpt: 'Did we ever make it to Tokyo? Did we learn how to forgive Dad? I am writing this from my tiny dorm room with 200 bucks left in the account. Remember this hunger.',
    fullContent: `Did we ever make it to Tokyo? Did we learn how to forgive Dad? I am writing this from my tiny dorm room with 200 bucks left in the account. Remember this hunger.\n\nRemember the days when a bowl of instant ramen felt like a luxury and walking 4 miles saved train fare. I promised myself back then that success wouldn't make me forget the people who stood by me in the cold.\n\nCall Mom tomorrow. Don't wait for an excuse.`,
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
    excerpt: 'To whoever reads this in the future: I hope you learned to stop worrying about things you cannot control. The rain always stops eventually. Keep creating.',
    fullContent: `To whoever reads this in the future: I hope you learned to stop worrying about things you cannot control. The rain always stops eventually. Keep creating.\n\nWe waste so much vital energy mourning things that were never meant to stay. Treat time as a sacred material—like raw timber or hand-cast bronze. Don't let trivial distractions erode your life's work.`,
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
    excerpt: 'I never told you how much that coffee on the rooftop meant to me. By the time this unlocks, we will probably be strangers living in different continents.',
    fullContent: `I never told you how much that coffee on the rooftop meant to me. By the time this unlocks, we will probably be strangers living in different continents.\n\nLife has this cruel habit of drifting people apart so slowly that neither person realizes when the last goodbye happened. If serendipity ever brings you to this archive, just know I always rooted for your happiness.`,
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
    excerpt: 'Today I wrote my first line of code that actually worked. If you are reading this years later, I hope we built something people truly love and cherish.',
    fullContent: `Today I wrote my first line of code that actually worked. If you are reading this years later, I hope we built something people truly love and cherish.\n\nMy first React button didn't center for 3 hours. I felt like an imposter. But when that first state update triggered, it was magic. Never lose that child-like wonder for building software.`,
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
    excerpt: 'Sitting on my rooftop watching the sunset over the city skyline. Sending this breath of fresh air into the digital ether. Be kind to yourself today.',
    fullContent: `Sitting on my rooftop watching the sunset over the city skyline. Sending this breath of fresh air into the digital ether. Be kind to yourself today.\n\nThe world moves at breakneck speed. Breathe. The sky doesn't rush, yet twilight always arrives in perfect harmony.`,
    resonates: 267,
  },
];

const categories = ['All Echoes', 'Future Self', 'Promises', 'Reflections', 'Love & Loss', 'Milestones'];

export default function PublicVaultPage() {
  const [letters, setLetters] = useState<VaultLetter[]>(initialLetters);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Echoes');
  const [selectedLetter, setSelectedLetter] = useState<VaultLetter | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [resonatedIds, setResonatedIds] = useState<Record<string, boolean>>({});

  // ফিল্টার এবং সার্চ হ্যান্ডলিং
  const filteredLetters = letters.filter((item) => {
    const matchesCategory =
      activeCategory === 'All Echoes' || item.tag.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.archiveNo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // রেজোনেট (লাইক) টগল
  const handleResonate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isAlreadyResonated = resonatedIds[id];

    setResonatedIds((prev) => ({ ...prev, [id]: !isAlreadyResonated }));
    setLetters((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, resonates: isAlreadyResonated ? item.resonates - 1 : item.resonates + 1 }
          : item
      )
    );
  };

  // শেয়ার / লিঙ্ক কপি হ্যান্ডলার
  const handleCopyLink = (archiveNo: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/public-vault#${archiveNo}`);
    setCopiedId(archiveNo);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <main className="relative min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-[#991b1b]/20 selection:text-[#991b1b] dark:selection:bg-[#991b1b]/40 dark:selection:text-rose-200 transition-colors duration-300">
      {/* ব্যাকগ্রাউন্ড অ্যাম্বিয়েন্ট গ্লো */}
      <div className="pointer-events-none fixed inset-0 flex justify-center">
        <div className="w-175 h-85 bg-[#991b1b]/10 dark:bg-[#991b1b]/15 blur-[150px] rounded-full" />
      </div>
 
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-32 pb-20 flex-1 space-y-12">
        {/* ================= ১. পেজ হেডার ও লাইভ স্ট্যাটাস ================= */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#991b1b]/30 bg-[#991b1b]/5 text-[#991b1b] dark:text-rose-400 text-xs font-mono tracking-widest">
            <span className="size-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />
            <span>PUBLIC ARCHIVE LEDGER</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground">
            Echoes from the Past
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
            Real time capsules sealed years ago whose timers have reached zero. Read confessions, promises, and unedited memories decrypted for the world to witness[cite: 1, 2].
          </p>

          {/* লাইভ মেট্রিক স্ট্রিপ */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-[#991b1b] dark:text-rose-400" />
              Verifiable AES-GCM-256[cite: 1]
            </span>
            <span className="text-border">•</span>
            <span className="flex items-center gap-1.5">
              <Globe className="size-3.5 text-[#991b1b] dark:text-rose-400" />
              Open Decrypted Archive[cite: 1]
            </span>
            <span className="text-border">•</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-[#991b1b] dark:text-rose-400" />
              {letters.length} Capsules Decrypted[cite: 1]
            </span>
          </div>
        </div>

        {/* ================= ২. সার্চ ও ক্যাটাগরি ফিল্টার বার ================= */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* সার্চ ইনপুট */}
            <div className="relative w-full sm:max-w-md">
              <Search className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search archive by keyword, author, or ARC ID..."
                className="h-11 pl-10 bg-card/60 backdrop-blur-md border-border/80 text-xs text-foreground placeholder:text-muted-foreground/60 rounded-xl hover:border-border focus-visible:ring-1 focus-visible:ring-[#991b1b]"
              />
            </div>

            {/* ফিল্টার কাউন্টার */}
            <span className="text-xs font-mono text-muted-foreground self-end sm:self-center">
              Showing <span className="text-foreground font-semibold">{filteredLetters.length}</span> capsules[cite: 1]
            </span>
          </div>

          {/* ক্যাটাগরি পিলস */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#991b1b] text-white shadow-md shadow-[#991b1b]/20 font-medium'
                    : 'bg-card/70 border border-border/70 text-muted-foreground hover:text-foreground hover:border-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ================= ৩. কার্ড গ্রিড ================= */}
        {filteredLetters.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border rounded-3xl bg-card/40 p-8 space-y-3">
            <LockOpen className="size-10 mx-auto text-muted-foreground/40 stroke-[1.2]" />
            <h3 className="font-serif text-lg text-foreground font-medium">No Echoes Found</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto font-light">
              No decrypted capsules matched your search term. Try another keyword or filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLetters.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedLetter(item)}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card/80 backdrop-blur-md p-6 sm:p-7 transition-all duration-300 hover:border-[#991b1b]/60 hover:shadow-2xl hover:shadow-[#991b1b]/10 hover:-translate-y-1.5 cursor-pointer"
              >
                {/* পেছনের ওয়াটারমার্ক সিল */}
                <div className="pointer-events-none absolute right-4 top-4 text-border/40 dark:text-zinc-800/40 group-hover:text-[#991b1b]/15 transition-colors duration-300">
                  <LockOpen className="size-16 stroke-[1]" />
                </div>

                <div className="relative z-10 space-y-4">
                  {/* টপ মেটা: আর্কাইভ নম্বর ও টাইম-লক ব্যাজ */}
                  <div className="flex items-center justify-between border-b border-border/60 pb-3 text-[11px] font-mono">
                    <span className="text-muted-foreground tracking-wider font-semibold">
                      {item.archiveNo}
                    </span>
                    <span className="px-2 py-0.5 rounded-full border border-red-500/20 bg-red-500/5 text-red-500 text-[10px] tracking-wider">
                      {item.lockedDays}
                    </span>
                  </div>

                  {/* টাইমলাইন ফ্লো */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3 text-muted-foreground/70" />
                      {item.sealedDate}
                    </span>
                    <span className="text-border">&rarr;</span>
                    <span className="text-[#991b1b] dark:text-rose-400 font-medium">
                      {item.unsealedDate}
                    </span>
                  </div>

                  {/* দলিলের মূল উদ্ধৃতি */}
                  <div className="pt-2">
                    <p className="font-serif text-[15px] sm:text-[16px] leading-[1.65] text-foreground/90 italic line-clamp-4">
                      &ldquo;{item.excerpt}&rdquo;
                    </p>
                  </div>
                </div>

                {/* বটম মেটা: লেখক, রেজোনেট ও রিড অ্যাকশন */}
                <div className="relative z-10 pt-5 mt-6 border-t border-border/60 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{item.author}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* রেজোনেট (Heart) বাটন */}
                    <button
                      type="button"
                      onClick={(e) => handleResonate(item.id, e)}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] transition-colors ${
                        resonatedIds[item.id]
                          ? 'text-red-500 bg-red-500/10'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Heart
                        className={`size-3.5 transition-transform active:scale-125 ${
                          resonatedIds[item.id] ? 'fill-red-500 text-red-500' : ''
                        }`}
                      />
                      <span>{item.resonates}</span>
                    </button>

                    <span className="text-[11px] text-[#991b1b] dark:text-rose-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-semibold">
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

      {/* ================= ৪. সম্পূর্ণ চিঠি পড়ার প্রিমিয়াম মোডাল (Document Reader) ================= */}
      {selectedLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-3xl border border-border/80 bg-card text-card-foreground shadow-2xl p-6 sm:p-10 space-y-6 max-h-[85vh] overflow-y-auto">
            {/* ক্লোজ বাটন */}
            <button
              type="button"
              onClick={() => setSelectedLetter(null)}
              className="absolute top-6 right-6 p-2 rounded-full border border-border/60 bg-muted/30 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="size-4" />
            </button>

            {/* মোডাল হেডার */}
            <div className="space-y-2 border-b border-border/60 pb-5 pr-10">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-mono font-semibold text-[#991b1b] dark:text-rose-400">
                  {selectedLetter.archiveNo}
                </span>
                <span className="text-border">•</span>
                <span className="px-2 py-0.5 rounded-md border border-border text-[10px] font-mono text-muted-foreground">
                  {selectedLetter.tag}
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground">
                Decrypted Archival Record[cite: 1]
              </h2>
            </div>

            {/* টাইমলাইন বার */}
            <div className="grid grid-cols-2 gap-4 p-3.5 rounded-xl border border-border/60 bg-muted/20 text-xs font-mono">
              <div>
                <span className="text-muted-foreground text-[10px] block">SEALED AT</span>
                <span className="text-foreground font-medium">{selectedLetter.sealedDate}</span>
              </div>
              <div>
                <span className="text-muted-foreground text-[10px] block">UNLOCKED</span>
                <span className="text-[#991b1b] dark:text-rose-400 font-medium">
                  {selectedLetter.unsealedDate}
                </span>
              </div>
            </div>

            {/* সম্পূর্ণ চিঠির বডি */}
            <div className="font-serif text-[16px] sm:text-[17px] leading-[1.8] text-foreground/95 whitespace-pre-line py-2 border-y border-border/40 font-light">
              {selectedLetter.fullContent}
            </div>

            {/* মোডাল ফুটার */}
            <div className="flex items-center justify-between text-xs font-mono pt-2">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Authored by:</span>
                <span className="text-foreground font-medium">{selectedLetter.author}</span>
              </div>

              <div className="flex items-center gap-2">
                {/* পার্মালিঙ্ক কপি */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyLink(selectedLetter.archiveNo)}
                  className="rounded-full text-xs font-mono h-8 px-3 cursor-pointer"
                >
                  {copiedId === selectedLetter.archiveNo ? (
                    <>
                      <Check className="size-3.5 text-green-500 mr-1.5" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5 mr-1.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )} 
    </main>
  );
}