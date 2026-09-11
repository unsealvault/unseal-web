// src/app/unseal/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { decryptLetterContent } from '@/lib/crypto';
import { Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UnsealUnlockCard } from '../_components/unseal-unlock-card';
import { UnsealMediaViewer } from '../_components/unseal-media-viewer';
import { ImageLightbox } from '../_components/image-lightbox';

interface LetterPayload {
  id: string;
  recipientEmail: string;
  status: string;
  encryptedContent: string;
  mediaUrls: string[];
  deliverAt: string;
}

export default function UnsealLetterPage() {
  const params = useParams();
  const letterId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [letterData, setLetterData] = useState<LetterPayload | null>(null);
  const [secretKeyInput, setSecretKeyInput] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<{ url: string; type: 'image' | 'video' } | null>(null);

  // ১. ব্যাকএন্ড থেকে ডেটা ফেচ
  useEffect(() => {
    async function fetchLetter() {
      if (!letterId) return;

      try {
        setLoading(true);
        setError(null);

        const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4001/graphql';
        const res = await fetch(graphqlUrl, {
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
                  mediaUrls
                  deliverAt
                }
              }
            `,
            variables: { id: letterId },
          }),
        });

        const result = await res.json();

        if (result.errors && result.errors.length > 0) {
          setError(result.errors[0]?.message || 'Backend GraphQL error occurred.');
          return;
        }

        if (result.data?.getLetterById) {
          const fetched = result.data.getLetterById;
          setLetterData({
            ...fetched,
            mediaUrls: fetched.mediaUrls || [],
          });
          setSecretKeyInput(fetched.recipientEmail || '');
        } else {
          setError('Letter not found in the vault (Invalid ID).');
        }
      } catch (e: any) {
        setError('Failed to connect to the sealed vault server. Check if port 4001 is running.');
      } finally {
        setLoading(false);
      }
    }

    fetchLetter();
  }, [letterId]);

  // ২. ব্রাউজারে ডিক্রিপশন (Zero-Knowledge)
  const handleDecrypt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!letterData?.encryptedContent || !secretKeyInput) return;

    try {
      setError(null);
      const plainText = await decryptLetterContent(
        letterData.encryptedContent,
        secretKeyInput.trim()
      );
      setDecryptedMessage(plainText);
    } catch (err) {
      console.error(err);
      setError('Decryption failed! Wrong key or recipient email.');
    }
  };

  return (
    <main className="relative min-h-screen bg-[#07080a] text-foreground flex flex-col justify-between selection:bg-red-900 selection:text-white">


      {/* pt-28 sm:pt-36 দিয়ে ফিক্সড ন্যাভবারের নিচের নিরাপদ স্পেসিং নিশ্চিত করা হয়েছে */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 pt-28 pb-16 sm:pt-36 sm:pb-24 flex-1 flex flex-col justify-center">
        {loading ? (
          <div className="text-center space-y-2 py-12 animate-pulse">
            <div className="text-xs font-mono text-white/50 tracking-widest uppercase">
              Connecting to Time Capsule Vault...
            </div>
            <div className="text-[10px] font-mono text-white/30">
              Querying MongoDB Atlas via Port 4001
            </div>
          </div>
        ) : error && !decryptedMessage ? (
          <div className="p-6 text-center border border-red-500/20 bg-red-950/20 backdrop-blur-xl rounded-2xl space-y-3">
            <div className="inline-flex p-2.5 rounded-full bg-red-500/10 text-red-400">
              <AlertCircle className="w-5 h-5" />
            </div>
            <p className="text-xs sm:text-sm text-red-300 font-mono">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
              className="text-xs border-white/10 text-white hover:bg-white/5 cursor-pointer"
            >
              Retry Connection
            </Button>
          </div>
        ) : !decryptedMessage ? (
          <UnsealUnlockCard
            ciphertext={letterData?.encryptedContent}
            secretKeyInput={secretKeyInput}
            onKeyChange={setSecretKeyInput}
            onSubmit={handleDecrypt}
          />
        ) : (
          /* আনলক হওয়ার পর ডিক্রিপ্ট করা মূল কন্টেন্ট */
          <div className="rounded-2xl border border-red-900/30 bg-[#0c0d12]/95 backdrop-blur-xl p-6 sm:p-9 space-y-8 shadow-2xl animate-in fade-in zoom-in-95 duration-500">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-red-400">
                <Sparkles className="w-3.5 h-3.5" /> Successfully Unsealed
              </span>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                Decrypted Locally
              </span>
            </div>

            <div className="py-2">
              <p className="text-base sm:text-lg leading-relaxed text-[#fbf8f3] whitespace-pre-wrap font-serif">
                {decryptedMessage}
              </p>
            </div>

            {/* আলাদা মিডিয়া কম্পোনেন্ট */}
            <UnsealMediaViewer
              mediaUrls={letterData?.mediaUrls || []}
            />

            <div className="pt-4 border-t border-white/10 text-xs text-white/40 flex justify-between items-center font-mono text-[11px]">
              <span>To: {letterData?.recipientEmail}</span>
              <span>Zero-Knowledge AES-GCM-256</span>
            </div>
          </div>
        )}
      </div>

      {/* ইমেজ লাইটবক্স মডাল */}
      <ImageLightbox
        media={selectedMedia}
        onClose={() => setSelectedMedia(null)}
      />

    </main>
  );
}