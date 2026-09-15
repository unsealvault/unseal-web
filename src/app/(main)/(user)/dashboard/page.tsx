'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Lock,
  Unlock,
  ShieldCheck,
  Search,
  Plus,
  Radio,
  FileText,
  Loader2,
  AlertCircle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMyLetters } from '@/hooks/use-letter';
import { UserLetter } from '@/types';
import { DashboardLetterCard } from './_components/letter-card';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'locked' | 'unsealed'>('all');

  const { letters, isLoading, error, refetch } = useMyLetters();

  const lockedCount = letters.filter((letter) => new Date(letter.deliverAt).getTime() > Date.now()).length;
  const unsealedCount = letters.length - lockedCount;

  const filteredLetters = letters.filter((letter: UserLetter) => {
    const query = searchQuery.trim().toLowerCase();
    const isLocked = new Date(letter.deliverAt).getTime() > Date.now();

    const matchesFilter =
      filterStatus === 'all' ? true : filterStatus === 'locked' ? isLocked : !isLocked;

    const matchesSearch =
      !query ||
      letter.recipientEmail.toLowerCase().includes(query) ||
      Boolean(letter.authorName?.toLowerCase().includes(query)) ||
      letter._id.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full space-y-6">
        {/* Header */}
        <section className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/70 p-5 shadow-lg backdrop-blur-xl sm:p-6 lg:p-7">
          <div className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-[#991b1b]/10 blur-3xl dark:bg-[#991b1b]/15" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 size-56 rounded-full bg-rose-950/5 blur-3xl dark:bg-red-950/15" />

          <div className="relative z-10 flex flex-col gap-5 border-b border-border/70 pb-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#991b1b]/30 bg-[#991b1b]/8 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[#991b1b] dark:bg-red-950/30 dark:text-rose-400">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-70" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-red-500" />
                  </span>
                  Encrypted Cold Vault
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-2.5 py-1 font-mono text-[9px] text-muted-foreground">
                  <ShieldCheck className="size-3 text-emerald-500" />
                  Zero-Knowledge
                </span>
              </div>

              <div>
                <h1 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                  Time-Lock <span className="bg-linear-to-r from-foreground via-rose-500 to-muted-foreground bg-clip-text text-transparent">Registry</span>
                </h1>

                <p className="mt-1.5 max-w-2xl text-xs font-light leading-relaxed text-muted-foreground sm:text-sm">
                  Client-side encrypted parcels resting in mathematical stasis until their assigned temporal milestone arrives.
                </p>
              </div>
            </div>

            <Button className="h-10 w-full shrink-0 rounded-full bg-[#991b1b] px-5 text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-white shadow-md shadow-[#991b1b]/20 transition-all hover:bg-[#7f1d1d] sm:w-auto">
              <Link href="/" className="flex items-center justify-center gap-2">
                <Plus className="size-3.5 stroke-[2.5]" />
                <span>Seal New Capsule</span>
              </Link>
            </Button>
          </div>

          {/* Metrics */}
          <div className="relative z-10 grid grid-cols-2 gap-2.5 pt-5 sm:grid-cols-4">
            <div className="rounded-xl border border-border/70 bg-muted/30 p-3 transition-colors hover:bg-muted/50">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Total</span>
                <FileText className="size-3.5 text-muted-foreground" />
              </div>
              <div className="font-mono text-xl font-medium tracking-tight text-foreground">{letters.length.toString().padStart(2, '0')}</div>
              <p className="mt-0.5 truncate font-mono text-[9px] text-muted-foreground">Sealed records</p>
            </div>

            <div className="rounded-xl border border-red-500/20 bg-red-950/5 p-3 transition-colors hover:bg-red-950/10 dark:bg-red-950/15">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-red-600 dark:text-red-300/80">Locked</span>
                <Lock className="size-3.5 text-red-500 dark:text-red-400" />
              </div>
              <div className="font-mono text-xl font-medium tracking-tight text-red-600 dark:text-red-100">{lockedCount.toString().padStart(2, '0')}</div>
              <p className="mt-0.5 truncate font-mono text-[9px] text-red-500/60 dark:text-red-300/40">Pending release</p>
            </div>

            <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/5 p-3 transition-colors hover:bg-emerald-950/10 dark:bg-emerald-950/15">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-300/80">Unsealed</span>
                <Unlock className="size-3.5 text-emerald-500 dark:text-emerald-400" />
              </div>
              <div className="font-mono text-xl font-medium tracking-tight text-emerald-600 dark:text-emerald-100">{unsealedCount.toString().padStart(2, '0')}</div>
              <p className="mt-0.5 truncate font-mono text-[9px] text-emerald-500/60 dark:text-emerald-300/40">Archived</p>
            </div>

            <div className="rounded-xl border border-border/70 bg-muted/30 p-3 transition-colors hover:bg-muted/50">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Cipher</span>
                <Radio className="size-3.5 text-rose-500" />
              </div>
              <div className="truncate pt-0.5 font-mono text-base font-semibold tracking-tight text-foreground sm:text-lg">AES-GCM-256</div>
              <p className="mt-0.5 truncate font-mono text-[9px] text-muted-foreground">SHA-256 + ECDSA</p>
            </div>
          </div>
        </section>

        {/* Search + Filter */}
        <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search recipient, author, or hash..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 rounded-xl border-border/80 bg-card/70 pl-9 text-xs text-foreground shadow-sm backdrop-blur-md placeholder:text-muted-foreground/60 focus-visible:ring-1 focus-visible:ring-[#991b1b]"
            />
          </div>

          <div className="flex w-full items-center gap-1 overflow-hidden rounded-xl border border-border/80 bg-card/70 p-1 backdrop-blur-md sm:w-auto">
            {(['all', 'locked', 'unsealed'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setFilterStatus(mode)}
                className={`flex-1 rounded-lg px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider transition-all sm:flex-initial sm:px-3.5 sm:text-[10px] ${filterStatus === mode ? 'bg-[#991b1b] text-white shadow-sm' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
              >
                {mode} ({mode === 'all' ? letters.length : mode === 'locked' ? lockedCount : unsealedCount})
              </button>
            ))}
          </div>
        </section>

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border/70 bg-card/40 py-16 text-muted-foreground">
            <Loader2 className="mb-2.5 size-5 animate-spin text-[#991b1b]" />
            <span className="font-mono text-[10px] uppercase tracking-wider">Fetching cryptographic ledger...</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex flex-col gap-3 rounded-2xl border border-red-500/20 bg-red-950/5 p-4 font-mono text-xs text-red-600 dark:bg-red-950/20 dark:text-rose-300 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-2.5">
              <AlertCircle className="size-4 shrink-0 text-red-500" />
              <span className="truncate">{error}</span>
            </div>

            <Button variant="outline" size="sm" onClick={() => refetch()} className="h-8 shrink-0 border-border text-[10px] font-mono text-foreground hover:bg-muted">
              Retry
            </Button>
          </div>
        )}

        {/* Letters */}
        {!isLoading && !error && (
          <>
            {filteredLetters.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card/40 px-5 py-14 text-center">
                <FileText className="mx-auto mb-3 size-8 text-muted-foreground/40" />
                <h2 className="font-serif text-lg text-foreground">No Capsules Found</h2>
                <p className="mx-auto mt-1.5 max-w-sm text-xs text-muted-foreground">
                  Try changing your search query or selecting a different filter.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredLetters.map((letter: UserLetter) => (
                  <DashboardLetterCard key={letter._id} letter={letter} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
  );
};

export default Dashboard;