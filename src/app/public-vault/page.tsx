// src/app/public-vault/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PublicLetterCard } from '@/components/public-letter-card';
import { Globe, ShieldCheck, Loader2 } from 'lucide-react';

interface Letter {
  id: string;
  encryptedContent: string;
  authorName?: string;
  deliverAt: string;
  createdAt: string;
}

export default function PublicVaultPage() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPublicLetters() {
      try {
        const res = await fetch('http://localhost:4000/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              query GetPublicVault {
                publicVault {
                  id
                  encryptedContent
                  status
                  deliverAt
                  createdAt
                }
              }
            `,
          }),
        });
        const { data } = await res.json();
        if (data?.publicVault) {
          setLetters(data.publicVault);
        }
      } catch (err) {
        console.error('Failed to load public letters', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPublicLetters();
  }, []);

  return (
    <main className="relative min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-[#991b1b]/20 selection:text-[#991b1b]">
      {/* Crimson Ambient Glow */}
      <div className="pointer-events-none fixed inset-0 flex justify-center">
        <div className="w-150 h-80 bg-[#991b1b]/10 blur-[130px] rounded-full" />
      </div>

      <Navbar />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-12 flex-1 space-y-10">
        {/* Page Header */}
        <div className="space-y-3 border-b border-border/60 pb-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-muted/40 text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
            <Globe className="w-3.5 h-3.5 text-[#991b1b]" />
            Unlocked Memories
          </div>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground">
            The Public Vault
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-light max-w-xl">
            Letters sealed years ago that have completed their journey across time. Decrypted entirely inside your browser.
          </p>
        </div>

        {/* Grid or Status */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3 font-mono text-xs text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin text-[#991b1b]" />
            <span>Fetching unlocked capsules...</span>
          </div>
        ) : letters.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-2xl p-8 space-y-2">
            <p className="text-sm text-muted-foreground font-mono">No public letters have unsealed yet.</p>
            <p className="text-xs text-muted-foreground/60">Be the first to seal an anonymous message into the future.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {letters.map((letter) => (
              <PublicLetterCard key={letter.id} letter={letter} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}