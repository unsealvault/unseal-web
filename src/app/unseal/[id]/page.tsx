// src/app/unseal/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { decryptLetterContent } from '@/lib/crypto';
import { KeyRound, Unlock, Lock, Mail, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function UnsealLetterPage() {
  const params = useParams();
  const letterId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [encryptedData, setEncryptedData] = useState<string | null>(null);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [secretKeyInput, setSecretKeyInput] = useState('');
  
  const [decryptedMessage, setDecryptedMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ১. সার্ভার থেকে এনক্রিপ্ট করা সাইফারটেক্সট নিয়ে আসা
  useEffect(() => {
    async function fetchLetter() {
      try {
        const res = await fetch('http://localhost:4000/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              query GetLetter($id: String!) {
                getLetterById(id: $id) {
                  id
                  recipientEmail
                  status
                  encryptedContent
                }
              }
            `,
            variables: { id: letterId },
          }),
        });

        const { data } = await res.json();
        if (data?.getLetterById) {
          setEncryptedData(data.getLetterById.encryptedContent);
          setRecipientEmail(data.getLetterById.recipientEmail);
          // ডিফল্ট হিসেবে আমরা এনক্রিপশনে প্রাপকের ইমেইল পাসওয়ার্ড হিসেবে ব্যবহার করেছিলাম
          setSecretKeyInput(data.getLetterById.recipientEmail);
        } else {
          setError('Letter not found in the vault.');
        }
      } catch (e) {
        setError('Failed to fetch the sealed vault.');
      } finally {
        setLoading(false);
      }
    }

    if (letterId) fetchLetter();
  }, [letterId]);

  // ২. ব্রাউজারে ডিক্রিপশন সম্পন্ন করা (Zero-Knowledge)
  const handleDecrypt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!encryptedData || !secretKeyInput) return;

    try {
      setError(null);
      // ব্রাউজারের Web Crypto API দিয়ে ডিক্রিপশন
      const plainText = await decryptLetterContent(encryptedData, secretKeyInput);
      setDecryptedMessage(plainText);
    } catch (err) {
      console.error(err);
      setError('Decryption failed! Wrong key or passphrase.');
    }
  };

  return (
    <main className="relative min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />

      <div className="relative z-10 w-full max-w-xl mx-auto px-4 py-12 flex-1 flex flex-col justify-center">
        {loading ? (
          <div className="text-center text-sm font-mono text-muted-foreground animate-pulse">
            Connecting to secure vault...
          </div>
        ) : error && !decryptedMessage ? (
          <div className="p-6 text-center border border-red-500/20 bg-red-500/5 rounded-2xl">
            <p className="text-sm text-red-400 font-mono">{error}</p>
          </div>
        ) : !decryptedMessage ? (
          /* আনলক করার ফর্ম */
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="space-y-1 text-center">
              <div className="inline-flex p-3 rounded-full bg-[#991b1b]/10 text-[#991b1b] mb-2">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-medium tracking-tight">Letter Locked in Time</h2>
              <p className="text-xs text-muted-foreground">
                This letter is encrypted with AES-256. Enter the key to unseal it in your browser.
              </p>
            </div>

            {/* সার্ভার থেকে আসা আসল সাইফারটেক্সট প্রদর্শন (প্রমাণের জন্য) */}
            <div className="p-3 bg-muted/40 rounded-lg border border-border/60">
              <span className="text-[10px] font-mono text-muted-foreground block mb-1">
                ENCRYPTED PAYLOAD FROM SERVER (CIPHERTEXT):
              </span>
              <p className="text-[11px] font-mono break-all text-muted-foreground line-clamp-3">
                {encryptedData}
              </p>
            </div>

            <form onSubmit={handleDecrypt} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-muted-foreground">
                  Secret Key / Recipient Email
                </label>
                <Input
                  type="text"
                  value={secretKeyInput}
                  onChange={(e) => setSecretKeyInput(e.target.value)}
                  placeholder="Enter email/passphrase used during sealing"
                  required
                  className="h-10 text-xs"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#991b1b] hover:bg-[#7f1d1d] text-white flex items-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                Unseal & Decrypt in Browser
              </Button>
            </form>
          </div>
        ) : (
          /* আনলক হওয়ার পর ডিক্রিপ্ট করা মূল চিঠি */
          <div className="rounded-2xl border border-[#991b1b]/30 bg-card p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-500">
            <div className="flex justify-between items-center pb-4 border-b border-border/60">
              <span className="inline-flex items-center gap-1 text-xs font-mono text-[#991b1b]">
                <Sparkles className="w-3.5 h-3.5" /> Successfully Unsealed
              </span>
              <span className="text-[11px] font-mono text-muted-foreground">
                Decrypted Locally
              </span>
            </div>

            <div className="py-4">
              <p className="text-base sm:text-lg leading-relaxed text-foreground whitespace-pre-wrap font-serif">
                {decryptedMessage}
              </p>
            </div>

            <div className="pt-4 border-t border-border/50 text-xs text-muted-foreground flex justify-between">
              <span>To: {recipientEmail}</span>
              <span className="text-[11px] font-mono">Zero-Knowledge AES-GCM</span>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}