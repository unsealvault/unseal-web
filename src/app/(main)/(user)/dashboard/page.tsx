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

export default function ProfessionalDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'locked' | 'unsealed'>('all');

  const { letters, isLoading, error, refetch } = useMyLetters();



  const filteredLetters = letters.filter((letter: UserLetter) => {
    const isLocked = new Date(letter.deliverAt).getTime() > Date.now();
    const matchesFilter =
      filterStatus === 'all' ? true : filterStatus === 'locked' ? isLocked : !isLocked;

    const matchesSearch =
      letter.recipientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (letter.authorName && letter.authorName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      letter._id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const lockedCount = letters.filter((l) => new Date(l.deliverAt).getTime() > Date.now()).length;
  const unsealedCount = letters.length - lockedCount;

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[15%] left-[20%] w-125 h-125 bg-red-950/15 rounded-full blur-[160px]" />
        <div className="absolute top-[40%] right-[10%] w-112.5 h-112.5 bg-[#991b1b]/10 rounded-full blur-[180px]" />
      </div>

      <div className="relative z-10 w-full mx-auto px-6 sm:px-8 flex-1 space-y-10">
        {/* হেডার ও মেট্রিক্স */}
        {/* ================= 1. SECURITY COCKPIT HEADER ================= */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#10121a]/90 via-[#0a0b10]/80 to-[#07080a]/90 p-8 sm:p-10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]">

          {/* Subsurface Ambient Glow */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-[#991b1b]/20 via-rose-950/10 to-transparent blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-red-950/15 blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 pb-8 border-b border-white/8">

            <div className="space-y-4 max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-950/30 px-3.5 py-1 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 shadow-[0_0_8px_#ef4444]" />
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-red-300">
                    Encrypted Cold Vault
                  </span>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/3 px-3 py-1 font-mono text-[11px] text-white/50">
                  <ShieldCheck className="size-3.5 text-emerald-400" />
                  <span>Zero-Knowledge: Immutable</span>
                </span>
              </div>

              <div>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#fbf8f3] leading-[1.12]">
                  Time-Lock <span className="bg-gradient-to-r from-white via-rose-100 to-white/60 bg-clip-text text-transparent">Registry</span>
                </h1>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-white/50 font-light max-w-xl">
                  Client-side encrypted parcels resting in mathematical stasis[cite: 1]. Payloads remain indecipherable until the assigned temporal milestone arrives[cite: 1, 3].
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <Button 
                className="h-12 rounded-full bg-gradient-to-r from-[#991b1b] via-[#dc2626] to-[#991b1b] px-7 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_30px_rgba(220,38,38,0.35)] hover:shadow-[0_0_45px_rgba(220,38,38,0.55)] transition-all cursor-pointer border border-red-400/20 active:scale-98"
              >
                <Link href="/" className="flex items-center gap-2.5">
                  <Plus className="size-4 stroke-[2.5]" />
                  <span>Seal New Capsule</span>
                </Link>
              </Button>
            </div>

          </div>

          {/* Metrics Ribbon */}
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-8">

            <div className="group rounded-2xl border border-white/6 bg-white/2 p-4 sm:p-5 transition-all duration-300 hover:border-white/15 hover:bg-white/4">
              <div className="flex items-center justify-between text-white/40 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Total Sealed</span>
                <FileText className="size-4 text-white/30 group-hover:text-white/60 transition-colors" />
              </div>
              <div className="text-3xl font-mono font-medium tracking-tight text-[#fbf8f3]">
                {letters.length.toString().padStart(2, '0')}
              </div>
              <div className="mt-1 text-[11px] font-mono text-white/40">Cryptographic records</div>
            </div>

            <div className="group rounded-2xl border border-red-500/20 bg-red-950/12 p-4 sm:p-5 transition-all duration-300 hover:border-red-500/35 hover:bg-red-950/18">
              <div className="flex items-center justify-between text-red-300/60 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-red-300/80">Active Locks</span>
                <Lock className="size-4 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
              </div>
              <div className="text-3xl font-mono font-medium tracking-tight text-red-100 flex items-baseline gap-2">
                {lockedCount.toString().padStart(2, '0')}
                <span className="text-[11px] font-mono text-red-400 font-normal">Pending release</span>
              </div>
              <div className="mt-1 text-[11px] font-mono text-red-300/40">Guarded by release key</div>
            </div>

            <div className="group rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-4 sm:p-5 transition-all duration-300 hover:border-emerald-500/35 hover:bg-emerald-950/16">
              <div className="flex items-center justify-between text-emerald-300/60 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-300/80">Unsealed</span>
                <Unlock className="size-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-mono font-medium tracking-tight text-emerald-100 flex items-baseline gap-2">
                {unsealedCount.toString().padStart(2, '0')}
                <span className="text-[11px] font-mono text-emerald-400 font-normal">Archived</span>
              </div>
              <div className="mt-1 text-[11px] font-mono text-emerald-300/40">Successfully reached reader</div>
            </div>

            <div className="group rounded-2xl border border-white/6 bg-white/2 p-4 sm:p-5 transition-all duration-300 hover:border-white/15 hover:bg-white/4">
              <div className="flex items-center justify-between text-white/40 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Cipher Suite</span>
                <Radio className="size-4 text-rose-400" />
              </div>
              <div className="text-xl sm:text-2xl font-mono font-semibold tracking-tight text-white/90 pt-0.5">
                AES-GCM-256
              </div>
              <div className="mt-1 text-[11px] font-mono text-white/40 truncate">
                SHA-256 + ECDSA Signed
              </div>
            </div>

          </div>

        </div>

        {/* সার্চ ও ফিল্টার */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <Input
              type="text"
              placeholder="Search by title, recipient, or hash..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 pl-10 rounded-xl bg-[#0c0d12]/60 border-white/10 text-xs text-white placeholder:text-white/30 focus-visible:ring-1 focus-visible:ring-[#991b1b]"
            />
          </div>

          <div className="flex items-center gap-1 p-1 bg-[#0c0d12]/80 rounded-xl border border-white/10 w-full sm:w-auto">
            {(['all', 'locked', 'unsealed'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setFilterStatus(mode)}
                className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-lg transition-all cursor-pointer ${filterStatus === mode ? 'bg-white/10 text-white font-medium' : 'text-white/40 hover:text-white/80'
                  }`}
              >
                {mode} ({mode === 'all' ? letters.length : mode === 'locked' ? lockedCount : unsealedCount})
              </button>
            ))}
          </div>
        </div>

        {/* এরর ও লোডার */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-3 font-mono text-xs text-white/40">
            <Loader2 className="w-6 h-6 animate-spin text-[#991b1b]" />
            <span>Fetching cryptographic ledger from vault...</span>
          </div>
        )}

        {error && (
          <div className="p-6 rounded-2xl border border-red-500/20 bg-red-950/20 text-rose-300 text-xs font-mono flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => refetch()} className="text-xs font-mono border-white/10 text-white">
              Retry
            </Button>
          </div>
        )}

        {/* কার্ডস গ্রিড */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLetters.map((letter: UserLetter) => (
              <DashboardLetterCard
                key={letter._id}
                letter={letter}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}