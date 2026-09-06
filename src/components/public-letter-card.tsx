// src/components/public-letter-card.tsx
'use client';

import { useState, useEffect } from 'react';
import { decryptPublicLetter } from '@/lib/crypto';
import { Quote, Sparkles, Calendar, Lock } from 'lucide-react';

interface PublicLetterProps {
  letter: {
    id: string;
    encryptedContent: string;
    authorName?: string;
    deliverAt: string;
    createdAt: string;
  };
}

export function PublicLetterCard({ letter }: PublicLetterProps) {
  const [decryptedText, setDecryptedText] = useState<string>('');
  const [isDecrypting, setIsDecrypting] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function runDecryption() {
      setIsDecrypting(true);
      const text = await decryptPublicLetter(letter.encryptedContent);
      if (isMounted) {
        setDecryptedText(text);
        setIsDecrypting(false);
      }
    }

    runDecryption();
    return () => {
      isMounted = false;
    };
  }, [letter.encryptedContent]);

  return (
    <div className="relative p-6 rounded-2xl border border-border/80 bg-card text-card-foreground flex flex-col justify-between hover:border-[#991b1b]/40 transition-all shadow-md group">
      <Quote className="w-5 h-5 text-muted-foreground/20 absolute top-5 right-5 group-hover:text-[#991b1b]/30 transition-colors pointer-events-none" />

      <div className="space-y-3 mb-4">
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-border bg-muted/40 text-[10px] font-mono text-muted-foreground">
          <Sparkles className="w-3 h-3 text-[#991b1b]" />
          <span>Unsealed</span>
        </div>

        {isDecrypting ? (
          <div className="space-y-2 py-3 animate-pulse">
            <div className="h-3.5 bg-muted rounded w-5/6" />
            <div className="h-3.5 bg-muted rounded w-full" />
            <div className="h-3.5 bg-muted rounded w-2/3" />
          </div>
        ) : (
          <p className="text-sm sm:text-[15px] leading-relaxed text-foreground/90 font-serif italic line-clamp-5 whitespace-pre-wrap">
            “{decryptedText}”
          </p>
        )}
      </div>

      <div className="pt-4 border-t border-border/50 flex items-center justify-between text-xs font-mono text-muted-foreground">
        <span className="font-medium text-foreground">
          {letter.authorName || 'Anonymous'}
        </span>
        <span className="flex items-center gap-1 text-[11px]">
          <Calendar className="w-3 h-3" />
          {new Date(letter.deliverAt).toLocaleDateString(undefined, {
            month: 'short',
            year: 'numeric',
          })}
        </span>
      </div>
    </div>
  );
}