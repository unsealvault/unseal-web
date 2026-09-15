// src/app/(main)/(user)/dashboard/_components/dashboard-letter-card.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CalendarDays,
  Clock3,
  Sparkles,
  ExternalLink,
  Image as ImageIcon,
  Video,
  Music,
  FileText,
  Check,
  Copy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserLetter } from '@/types';
import { decryptLetterContent, PUBLIC_VAULT_KEY } from '@/lib/crypto';

interface LetterCardProps {
  letter: UserLetter;
}

export function DashboardLetterCard({ letter }: LetterCardProps) {
  const [decryptedText, setDecryptedText] = useState<string>('');
  const [isDecrypting, setIsDecrypting] = useState<boolean>(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);


  const createdTime = new Date(letter.createdAt).getTime();
  const targetTime = new Date(letter.deliverAt).getTime();
  const now = Date.now();

  const totalDays = Math.max(1, Math.ceil((targetTime - createdTime) / (1000 * 60 * 60 * 24)));
  const remainingDays = Math.max(0, Math.ceil((targetTime - now) / (1000 * 60 * 60 * 24)));
  const isLocked = targetTime > now;
  const progressPercent = isLocked
    ? Math.max(5, Math.min(100, Math.round(((totalDays - remainingDays) / totalDays) * 100)))
    : 100;

  const deliverAtFormatted = new Date(letter.deliverAt).toISOString().split('T')[0];

  // মিডিয়া ফাইল গণনা
  const imagesCount = letter.images?.length || 0;
  const videoCount = letter.videos?.length || 0;
  const audioCount = letter.audio?.length || 0;
  const filesCount = letter.files?.length || 0;
  const fingerprint = letter?._id;

  useEffect(() => {
    let isMounted = true;

    async function autoDecrypt() {
      setIsDecrypting(true);
      try {
        const keyToUse =
          letter.visibility === 'public_anonymous'
            ? PUBLIC_VAULT_KEY
            : letter.recipientEmail.trim();

        const plainText = await decryptLetterContent(letter.encryptedContent, keyToUse);
        if (isMounted) {
          setDecryptedText(plainText);
          setIsDecrypting(false);
        }
      } catch {
        if (isMounted) {
          setDecryptedText(letter.encryptedContent);
          setIsDecrypting(false);
        }
      }
    }

    autoDecrypt();

    return () => {
      isMounted = false;
    };
  }, [letter.encryptedContent, letter.recipientEmail, letter.visibility]);

  const copyHash = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="group relative rounded-3xl border border-white/10 bg-[#0c0d12]/70 hover:bg-[#0c0d12]/95 backdrop-blur-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-red-500/30 hover:shadow-[0_16px_45px_rgba(220,38,38,0.14)]">

      <div className="space-y-4">
        {/* কার্ড টপ: স্ট্যাটাস ও আইডি */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`size-2 rounded-full ${isLocked
                  ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)] animate-pulse'
                  : 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]'
                }`}
            />
            <span className="font-mono text-[11px] uppercase tracking-wider text-white/70">
              {isLocked ? 'Sealed Capsule' : 'Ready to Open'}
            </span>
          </div>

          {/* দীর্ঘ আইডির বদলে খুব সাধারণ শর্ট রেফারেন্স */}
          <span className="font-mono text-[10px] text-white/30">
            #{letter._id.slice(-6).toUpperCase()}
          </span>
        </div>

        {/* প্রাপক ও দৃশ্যমানতা */}
        <div className="space-y-0.5">
          <h3 className="font-medium text-base text-[#fbf8f3] group-hover:text-rose-200 transition-colors truncate">
            To: {letter.recipientEmail}
          </h3>
          <p className="text-xs font-mono text-white/40">
            <span className="capitalize">{(letter.visibility || 'private').replace('_', ' ')}</span>
            <span> • </span>
            <span>{letter.authorName || 'Anonymous'}</span>
          </p>
        </div>

        {/* মেসেজ ও মিডিয়া সেকশন */}
        <div className="space-y-2">
          {/* এক লাইনে ডিক্রিপ্টেড লেবেল এবং মিডিয়া ফাইলের কাউন্টার ব্যাজ */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1 shrink-0">
              <Sparkles className="size-3 text-emerald-400" />
              <span>Decrypted Message</span>
            </span>

            {/* এক লাইনে মিডিয়া স্ট্যাটাস চিপস */}
            <div className="flex items-center gap-1.5 shrink-0 font-mono text-[10px]">
              {imagesCount > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300">
                  <ImageIcon className="size-2.5" />
                  <span>{imagesCount}</span>
                </span>
              )}
              {videoCount > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-300">
                  <Video className="size-2.5" />
                  <span>{videoCount}</span>
                </span>
              )}
              {audioCount > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300">
                  <Music className="size-2.5" />
                  <span>{audioCount}</span>
                </span>
              )}
              {filesCount > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                  <FileText className="size-2.5" />
                  <span>{filesCount}</span>
                </span>
              )}
            </div>
          </div>

          {/* টেক্সট কন্টেন্ট এরিয়া (টেক্সট কাটা বন্ধ করতে line-clamp-4) */}
          <div className="p-4 bg-black/50 rounded-2xl border border-white/5 min-h-[115px] flex items-center">
            {isDecrypting ? (
              <div className="w-full space-y-2 animate-pulse">
                <div className="h-3 bg-white/10 rounded w-5/6" />
                <div className="h-3 bg-white/10 rounded w-full" />
                <div className="h-3 bg-white/10 rounded w-3/4" />
              </div>
            ) : (
              <p className="font-serif text-sm leading-relaxed text-[#fbf8f3]/90 line-clamp-4 select-none">
                {decryptedText}
              </p>
            )}
          </div>
        </div>

        {/* টাইম কাউন্টার ও প্রগ্রেস বার */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-white/40 flex items-center gap-1.5">
              <Clock3 className="size-3 text-[#dc2626]" />
              {isLocked ? `${remainingDays} Days Remaining` : 'Unsealed on Schedule'}
            </span>
            <span className="text-white/60 font-semibold">{progressPercent}%</span>
          </div>

          <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${isLocked
                ? 'bg-gradient-to-r from-[#991b1b] to-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]'
                : 'bg-emerald-500 shadow-[0_0_10px_rgba(52,211,153,0.4)]'
                }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* কার্ড ফুটার: ডেলিভারি ডেট এবং ওপেন ভল্ট বাটন */}
      <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] font-mono text-white/40">
          <CalendarDays className="size-3.5 text-white/30" />
          <span>{deliverAtFormatted}</span>
        </div>

        {/* Sealed এর পরিবর্তে Open Vault অ্যাকশন বাটন */}
        <Button
          size="sm"
          className="h-8.5 rounded-xl bg-white/10 hover:bg-[#991b1b]/80 hover:text-white text-white font-mono text-xs border border-white/10 hover:border-red-500/30 transition-all cursor-pointer shadow-xs"
        >
          <Link href={`/dashboard/letter/${letter?._id}`} className="flex items-center gap-1.5 px-3">
            <span>Open Vault</span>
            <ExternalLink className="size-3 text-white/60" />
          </Link>
        </Button>
      </div>

    </div>
  );
}