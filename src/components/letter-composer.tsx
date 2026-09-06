// src/components/letter-composer.tsx
'use client';

import { useState } from 'react';
import { encryptLetterContent, PUBLIC_VAULT_KEY } from '@/lib/crypto';
import { calculateDeliveryDate } from '@/lib/utils';
import { Lock, Globe, Sparkles, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function LetterComposer() {
  const [content, setContent] = useState('');
  const [email, setEmail] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [duration, setDuration] = useState('1_year');
  const [visibility, setVisibility] = useState<'private' | 'public_anonymous'>('private');
  const [audience, setAudience] = useState<'self' | 'someone_else'>('self');

  const [isSealing, setIsSealing] = useState(false);
  const [isSealed, setIsSealed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isFormValid = content.trim().length > 0 && email.trim().length > 0;

  const handleSeal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSealing(true);
    setErrorMessage(null);

    try {
      // ১. ভিজিবিলিটি অনুযায়ী সঠিক কি নির্ধারণ (পাবলিক হলে গ্লোবাল কি, প্রাইভেট হলে ইমেইল)
      const encryptionKey =
        visibility === 'public_anonymous' ? PUBLIC_VAULT_KEY : email.trim();

      // ২. ব্রাউজারেই AES-GCM-256 এনক্রিপশন সম্পন্ন করা
      const encryptedBase64 = await encryptLetterContent(content, encryptionKey);

      // ৩. ভবিষ্যৎ আনলক তারিখ নির্ধারণ
      const deliverAt = calculateDeliveryDate(duration);

      // ৪. ব্যাকএন্ড GraphQL মিউটেশন কল
      const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql';
      const response = await fetch(graphqlUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation SealLetter($input: CreateLetterInput!) {
              sealLetter(input: $input) {
                id
                recipientEmail
                status
              }
            }
          `,
          variables: {
            input: {
              recipientEmail: email.trim(),
              encryptedContent: encryptedBase64,
              deliverAt,
              audience,
              visibility,
              authorName: authorName.trim() || 'Anonymous',
              mediaUrls: [],
            },
          },
        }),
      });

      const resData = await response.json();

      if (resData.errors && resData.errors.length > 0) {
        throw new Error(resData.errors[0].message);
      }

      setIsSealed(true);
    } catch (error: any) {
      console.error('Failed to seal letter:', error);
      setErrorMessage(error.message || 'Error connecting to vault.');
    } finally {
      setIsSealing(false);
    }
  };

  if (isSealed) {
    return (
      <div className="rounded-2xl border border-[#991b1b]/40 bg-card p-8 text-center space-y-4 shadow-xl">
        <div className="inline-flex p-3 rounded-full bg-[#991b1b]/10 text-[#991b1b]">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-medium tracking-tight">Sealed in the vault.</h3>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
          Your letter has been encrypted client-side. The time lock is active and will unlock on schedule.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setContent('');
            setIsSealed(false);
          }}
          className="text-xs font-mono mt-2"
        >
          Write Another Letter
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSeal} className="space-y-6">
      {errorMessage && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg font-mono">
          {errorMessage}
        </div>
      )}

      {/* ক্যানভাস টেক্সট এরিয়া */}
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write what you cannot say today, but must be remembered tomorrow..."
        className="w-full min-h-[200px] bg-transparent border-0 focus-visible:ring-0 resize-none font-serif text-base sm:text-lg leading-relaxed placeholder:text-muted-foreground/50 p-0"
        required
      />

      <div className="pt-4 border-t border-border/60 space-y-4">
        {/* ইমেইল ও নাম */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            type="email"
            placeholder="Destination email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-9 text-xs"
          />
          <Input
            type="text"
            placeholder="Your pen name (Optional)"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="h-9 text-xs"
          />
        </div>

        {/* প্রাইভেসি সিলেক্টর */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
            Privacy Setting
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setVisibility('private')}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-medium transition-all ${
                visibility === 'private'
                  ? 'border-[#991b1b] bg-[#991b1b]/10 text-foreground'
                  : 'border-border bg-background text-muted-foreground hover:text-foreground'
              }`}
            >
              <Lock className="w-3 h-3 text-[#991b1b]" />
              <span>Private</span>
            </button>

            <button
              type="button"
              onClick={() => setVisibility('public_anonymous')}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-medium transition-all ${
                visibility === 'public_anonymous'
                  ? 'border-[#991b1b] bg-[#991b1b]/10 text-foreground'
                  : 'border-border bg-background text-muted-foreground hover:text-foreground'
              }`}
            >
              <Globe className="w-3 h-3 text-[#991b1b]" />
              <span>Public, anonymous</span>
            </button>
          </div>
        </div>

        {/* সাবমিট বাটন */}
        <Button
          type="submit"
          disabled={!isFormValid || isSealing}
          className="w-full bg-[#991b1b] hover:bg-[#7f1d1d] text-white flex items-center justify-center gap-2 h-10 text-xs font-mono uppercase tracking-widest transition-all"
        >
          {isSealing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Encrypting & Sealing...
            </>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              Seal This Letter
            </>
          )}
        </Button>
      </div>
    </form>
  );
}