'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Lock,
  Unlock,
  Clock3,
  User,
  Heart,
  Globe,
  Plus,
  Search,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { useUser } from '@/providers/user.provider';

interface CapsuleLetter {
  id: string;
  titleSnippet: string;
  recipientEmail: string;
  audience: 'self' | 'someone_else';
  visibility: 'private' | 'public_anonymous';
  sealedAt: string;
  unlockAt: string;
  isDelivered: boolean;
  daysRemaining: number;
}

const mockLetters: CapsuleLetter[] = [
  {
    id: 'cap_01',
    titleSnippet: 'To the version of me running a design studio...',
    recipientEmail: 'me@unseal.today',
    audience: 'self',
    visibility: 'private',
    sealedAt: 'Sep 10, 2024',
    unlockAt: 'Sep 10, 2027',
    isDelivered: false,
    daysRemaining: 1095,
  },
  {
    id: 'cap_02',
    titleSnippet: 'Read this the day you walk down the aisle...',
    recipientEmail: 'sarah.m@gmail.com',
    audience: 'someone_else',
    visibility: 'private',
    sealedAt: 'Jan 01, 2024',
    unlockAt: 'Dec 31, 2025',
    isDelivered: false,
    daysRemaining: 478,
  },
  {
    id: 'cap_03',
    titleSnippet: 'Reflections from the 2023 financial breakthrough...',
    recipientEmail: 'me@unseal.today',
    audience: 'self',
    visibility: 'public_anonymous',
    sealedAt: 'Aug 15, 2023',
    unlockAt: 'Aug 15, 2024',
    isDelivered: true,
    daysRemaining: 0,
  },
];

export default function UserVaultDashboard() {
    const { user, setUser } = useUser();

    console.log("User login", user)

  const [filter, setFilter] = useState<'all' | 'locked' | 'delivered'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLetters = mockLetters.filter((letter) => {
    const matchesFilter =
      filter === 'all'
        ? true
        : filter === 'locked'
        ? !letter.isDelivered
        : letter.isDelivered;

    const matchesSearch =
      letter.titleSnippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      letter.recipientEmail.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const lockedCount = mockLetters.filter((l) => !l.isDelivered).length;
  const deliveredCount = mockLetters.filter((l) => l.isDelivered).length;

  return (
   <div className="space-y-8 flex-1">
        
        {/* ১. ড্যাশবোর্ড হেডার ও দ্রুত অ্যাকশন */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Zero-Knowledge Personal Vault
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
              Your Sealed Capsules
            </h1>
            <p className="text-xs text-muted-foreground font-light">
              All time-capsules are stored encrypted client-side until their designated unlock epoch.
            </p>
          </div>

          <Button
            asChild
            className="h-10 rounded-lg bg-[#991b1b] hover:bg-[#7f1d1d] text-white font-medium px-4 shadow-md shadow-[#991b1b]/20 transition-all cursor-pointer shrink-0"
          >
            <Link href="/" className="flex items-center gap-1.5 text-xs tracking-wider uppercase">
              <Plus className="w-4 h-4" />
              <span>Seal New Letter</span>
            </Link>
          </Button>
        </div>

        {/* ২. হরিজন্টাল স্ট্যাটাস কাউন্টার */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-border/80 bg-card p-5 space-y-1 shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-mono uppercase tracking-wider">
              <span>Time-Locked</span>
              <Lock className="w-4 h-4 text-[#991b1b] dark:text-rose-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-medium text-foreground">{lockedCount}</div>
            <p className="text-[11px] text-muted-foreground">Capsules locked in vault</p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card p-5 space-y-1 shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-mono uppercase tracking-wider">
              <span>Unsealed</span>
              <Unlock className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-medium text-foreground">{deliveredCount}</div>
            <p className="text-[11px] text-muted-foreground">Delivered to inboxes</p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card p-5 space-y-1 shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-mono uppercase tracking-wider">
              <span>Security State</span>
              <ShieldCheck className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-xl font-mono font-medium text-foreground flex items-center gap-2">
              <span>AES-256-GCM</span>
              <Badge variant="outline" className="text-[10px] border-amber-500/30 text-amber-600 dark:text-amber-400">
                Encrypted
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground">Zero-knowledge protection</p>
          </div>
        </div>

        {/* ৩. ফিল্টার ও সার্চ বার */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex p-1 bg-muted/60 rounded-lg border border-border/60 w-full sm:w-auto">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              All ({mockLetters.length})
            </button>
            <button
              onClick={() => setFilter('locked')}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                filter === 'locked'
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Locked ({lockedCount})
            </button>
            <button
              onClick={() => setFilter('delivered')}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                filter === 'delivered'
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Unsealed ({deliveredCount})
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <Input
              type="text"
              placeholder="Search capsules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 pl-8 bg-background border-border text-xs text-foreground placeholder:text-muted-foreground/60 rounded-lg focus-visible:ring-1 focus-visible:ring-[#991b1b]"
            />
          </div>
        </div>

        {/* ৪. ক্যাপসুল গ্রিড */}
        {filteredLetters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLetters.map((letter) => (
              <div
                key={letter.id}
                className="rounded-xl border border-border/80 bg-card hover:border-[#991b1b]/40 p-5 flex flex-col justify-between transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    {!letter.isDelivered ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#991b1b]/10 border border-[#991b1b]/20 text-[#991b1b] dark:text-rose-300">
                        <Lock className="w-3 h-3" /> Locked
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                        <Unlock className="w-3 h-3" /> Unsealed
                      </span>
                    )}

                    {letter.visibility === 'public_anonymous' ? (
                      <Globe className="w-3.5 h-3.5 text-muted-foreground" title="Public Vault" />
                    ) : (
                      <Lock className="w-3 h-3 text-muted-foreground/60" title="Private" />
                    )}
                  </div>

                  <p className="text-sm font-medium text-foreground leading-snug line-clamp-3">
                    "{letter.titleSnippet}"
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-border/60 space-y-2.5 font-mono text-[11px] text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      {letter.audience === 'self' ? (
                        <User className="w-3 h-3 text-[#991b1b] dark:text-rose-400" />
                      ) : (
                        <Heart className="w-3 h-3 text-[#991b1b] dark:text-rose-400" />
                      )}
                      <span className="truncate max-w-[150px]">{letter.recipientEmail}</span>
                    </span>

                    <span className="flex items-center gap-1 text-foreground">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      {letter.unlockAt}
                    </span>
                  </div>

                  {!letter.isDelivered ? (
                    <div className="pt-1 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground flex items-center gap-1 font-sans">
                        <Clock3 className="w-3 h-3 text-[#991b1b] dark:text-rose-400" /> Countdown:
                      </span>
                      <span className="font-semibold text-[#991b1b] dark:text-rose-300">
                        {letter.daysRemaining} days left
                      </span>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-1 h-8 text-xs border-border hover:bg-muted text-foreground rounded-md flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Read Letter</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border/80 bg-muted/20 p-12 text-center space-y-2">
            <Sparkles className="w-7 h-7 mx-auto text-muted-foreground/50" />
            <h3 className="text-sm font-medium text-foreground">No sealed letters found</h3>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">
              Nothing matches your current search or filter query.
            </p>
          </div>
        )}
      </div>
  );
}