'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Lock,
  Unlock,
  KeyRound,
  ShieldCheck,
  Search,
  Plus,
  CalendarDays,
  Paperclip,
  ExternalLink,
  ChevronRight,
  Activity,
  Copy,
  Check,
  Radio,
  FileText,
  Clock3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

interface Capsule {
  id: string;
  fingerprint: string;
  title: string;
  recipientEmail: string;
  audience: 'self' | 'someone_else';
  visibility: 'private' | 'public_anonymous';
  createdAt: string;
  deliverAt: string;
  targetTimestamp: number;
  totalDurationDays: number;
  remainingDays: number;
  status: 'locked' | 'unsealed';
  hasAttachments: boolean;
  cipherSize: string;
}

const MOCK_CAPSULES: Capsule[] = [
  {
    id: 'cap_9821_f9',
    fingerprint: '0x8F4A...3B21',
    title: 'Letter to my 30s self on discipline, startup & life lessons',
    recipientEmail: 'me@unseal.vault',
    audience: 'self',
    visibility: 'private',
    createdAt: '2026-01-10',
    deliverAt: '2027-01-10',
    targetTimestamp: 1799539200000,
    totalDurationDays: 365,
    remainingDays: 210,
    status: 'locked',
    hasAttachments: true,
    cipherSize: '4.2 KB',
  },
  {
    id: 'cap_4102_e2',
    fingerprint: '0x1C8D...99A4',
    title: 'A confidential farewell note and final blessings',
    recipientEmail: 'alex.partner@gmail.com',
    audience: 'someone_else',
    visibility: 'private',
    createdAt: '2026-03-01',
    deliverAt: '2026-09-01',
    targetTimestamp: 1788220800000,
    totalDurationDays: 184,
    remainingDays: 45,
    status: 'locked',
    hasAttachments: false,
    cipherSize: '1.8 KB',
  },
  {
    id: 'cap_1029_x0',
    fingerprint: '0xDE99...771B',
    title: 'Public confession: What we feared most during the 20s transition',
    recipientEmail: 'public-archive@unseal.io',
    audience: 'self',
    visibility: 'public_anonymous',
    createdAt: '2025-05-01',
    deliverAt: '2026-05-01',
    targetTimestamp: 1777593600000,
    totalDurationDays: 365,
    remainingDays: 0,
    status: 'unsealed',
    hasAttachments: true,
    cipherSize: '8.4 KB',
  },
];

export default function ProfessionalDashboard() {
  const [capsules] = useState<Capsule[]>(MOCK_CAPSULES);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'locked' | 'unsealed'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyHash = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredCapsules = capsules.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.recipientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.fingerprint.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' ? true : c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const lockedCount = capsules.filter((c) => c.status === 'locked').length;
  const unsealedCount = capsules.filter((c) => c.status === 'unsealed').length;

  return (
    <>
      {/* Ambient Background Glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[15%] left-[20%] w-125 h-125 bg-red-950/15 rounded-full blur-[160px]" />
        <div className="absolute top-[40%] right-[10%] w-112.5 h-112.5 bg-[#991b1b]/10 rounded-full blur-[180px]" />
      </div>

      <div className="relative z-10 w-full  mx-auto px-6 sm:px-8  flex-1 space-y-10">

        {/* ================= 1. SECURITY COCKPIT HEADER ================= */}
        {/* ================= CRYPTOGRAPHIC EXECUTIVE VAULT HEADER ================= */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-[#10121a]/90 via-[#0a0b10]/80 to-[#07080a]/90 p-8 sm:p-10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]">

          {/* Subsurface Ambient Glow */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-linear-to-br from-[#991b1b]/20 via-rose-950/10 to-transparent blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-red-950/15 blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 pb-8 border-b border-white/8">

            <div className="space-y-4 max-w-2xl">
              {/* Live System Indicator */}
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

              {/* Main Typography */}
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#fbf8f3] leading-[1.12]">
                  Time-Lock <span className="bg-linear-to-r from-white via-rose-100 to-white/60 bg-clip-text text-transparent">Registry</span>
                </h1>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-white/50 font-light max-w-xl">
                  Client-side encrypted parcels resting in mathematical stasis. Payloads remain indecipherable until the assigned temporal milestone arrives.
                </p>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="flex items-center gap-4 shrink-0">
              <Button 
                className="h-12 rounded-full bg-linear-to-r from-[#991b1b] via-[#dc2626] to-[#991b1b] px-7 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_30px_rgba(220,38,38,0.35)] hover:shadow-[0_0_45px_rgba(220,38,38,0.55)] transition-all cursor-pointer border border-red-400/20 active:scale-98"
              >
                <Link href="/create" className="flex items-center gap-2.5">
                  <Plus className="size-4 stroke-[2.5]" />
                  <span>Seal New Capsule</span>
                </Link>
              </Button>
            </div>

          </div>

          {/* ================= FLOATING TELEMETRY METRICS ================= */}
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-8">

            {/* Total Archives */}
            <div className="group rounded-2xl border border-white/6 bg-white/2 p-4 sm:p-5 transition-all duration-300 hover:border-white/15 hover:bg-white/4">
              <div className="flex items-center justify-between text-white/40 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Total Sealed</span>
                <FileText className="size-4 text-white/30 group-hover:text-white/60 transition-colors" />
              </div>
              <div className="text-3xl font-mono font-medium tracking-tight text-[#fbf8f3]">
                {capsules.length.toString().padStart(2, '0')}
              </div>
              <div className="mt-1 text-[11px] font-mono text-white/40">Cryptographic records</div>
            </div>

            {/* Locked in Stasis */}
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

            {/* Unsealed & Delivered */}
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

            {/* Cryptographic Cipher Standard */}
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

        {/* ================= 2. SEARCH & CONTROLS ================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <Input
              type="text"
              placeholder="Search by title, recipient, or hash..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 pl-10 rounded-xl bg-[#0c0d12]/60 border-white/10 text-xs text-white placeholder:text-white/30 focus-visible:ring-1 focus-visible:ring-[#991b1b] focus-visible:border-[#991b1b]"
            />
          </div>

          <div className="flex items-center gap-1 p-1 bg-[#0c0d12]/80 rounded-xl border border-white/10 w-full sm:w-auto">
            {(['all', 'locked', 'unsealed'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setFilterStatus(mode)}
                className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-lg transition-all cursor-pointer ${filterStatus === mode
                    ? 'bg-white/10 text-white font-medium shadow-xs'
                    : 'text-white/40 hover:text-white/80'
                  }`}
              >
                {mode} ({mode === 'all' ? capsules.length : mode === 'locked' ? lockedCount : unsealedCount})
              </button>
            ))}
          </div>
        </div>

        {/* ================= 3. CAPSULE CARDS (VAULT ENVELOPE DESIGN) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCapsules.map((capsule) => {
            const isLocked = capsule.status === 'locked';
            const progressPercent = isLocked
              ? Math.max(5, Math.min(100, Math.round(((capsule.totalDurationDays - capsule.remainingDays) / capsule.totalDurationDays) * 100)))
              : 100;

            return (
              <div
                key={capsule.id}
                className="group relative rounded-2xl border border-white/10 bg-[#0c0d12]/50 hover:bg-[#0c0d12]/80 backdrop-blur-xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-red-500/30 hover:shadow-[0_12px_40px_rgba(239,68,68,0.12)] overflow-hidden"
              >
                {/* Subtle Envelope Wax Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-red-500/5 to-transparent pointer-events-none rounded-tr-2xl" />

                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`size-2 rounded-full ${isLocked ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
                          }`}
                      />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                        {isLocked ? 'Immutable Lock' : 'Payload Ready'}
                      </span>
                    </div>

                    <button
                      onClick={() => copyHash(capsule.id, capsule.fingerprint)}
                      className="inline-flex items-center gap-1 font-mono text-[10px] text-white/40 hover:text-rose-400 bg-white/5 px-2 py-1 rounded border border-white/5 transition-colors cursor-pointer"
                      title="Click to copy cryptographic fingerprint"
                    >
                      {copiedId === capsule.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{capsule.fingerprint}</span>
                    </button>
                  </div>

                  {/* Title & Audience */}
                  <div className="space-y-1.5">
                    <h3 className="font-medium text-base sm:text-lg text-[#fbf8f3] group-hover:text-rose-200 transition-colors line-clamp-2 leading-snug">
                      {capsule.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                      <span>To: {capsule.recipientEmail}</span>
                      <span>•</span>
                      <span className="capitalize">{capsule.visibility.replace('_', ' ')}</span>
                    </div>
                  </div>

                  {/* Progress / Time Bar */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-white/40 flex items-center gap-1.5">
                        <Clock3 className="size-3 text-[#dc2626]" />
                        {isLocked ? `${capsule.remainingDays} Days Remaining` : 'Unsealed on Schedule'}
                      </span>
                      <span className="text-white/60 font-semibold">{progressPercent}%</span>
                    </div>

                    <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${isLocked
                            ? 'bg-linear-to-r from-[#991b1b] to-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]'
                            : 'bg-emerald-500 shadow-[0_0_10px_rgba(52,211,153,0.5)]'
                          }`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Footer: Metadata & Action */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[11px] font-mono text-white/40">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="size-3 text-white/30" />
                      {capsule.deliverAt}
                    </span>
                    {capsule.hasAttachments && (
                      <span className="flex items-center gap-1 text-white/60">
                        <Paperclip className="size-3 text-rose-400" />
                        Media
                      </span>
                    )}
                  </div>

                  {isLocked ? (
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-white/40 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Encrypted</span>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      className="h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs border border-white/10"
                    >
                      <Link href={`/vault/${capsule.id}`} className="flex items-center gap-1.5">
                        <Unlock className="w-3 h-3 text-emerald-400" />
                        <span>Read Payload</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCapsules.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 p-16 text-center space-y-4 bg-[#0c0d12]/30">
            <div className="size-12 rounded-full bg-red-950/30 border border-red-500/20 flex items-center justify-center mx-auto text-rose-400">
              <Lock className="size-5" />
            </div>
            <h4 className="font-serif text-lg text-white">No Sealed Capsules Found</h4>
            <p className="text-xs text-white/50 max-w-sm mx-auto font-light">
              No cryptographic time capsules match your current criteria. Create and seal your first message into eternity.
            </p>
            <Button className="h-10 rounded-full bg-[#9f0f24] text-white px-6 text-xs font-semibold">
              <Link href="/create">Seal a Letter</Link>
            </Button>
          </div>
        )}

      </div>

    </>
  );
}