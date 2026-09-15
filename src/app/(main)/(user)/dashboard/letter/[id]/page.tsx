'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    Calendar,
    Clock,
    Lock,
    Unlock,
    Sparkles,
    Music,
    Video,
    FileText,
    Download,
    ExternalLink,
    ShieldCheck,
    Loader2,
    AlertCircle,
    Eye,
    X,
    Share2,
    Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { decryptLetterContent, PUBLIC_VAULT_KEY } from '@/lib/crypto';

interface LetterDetail {
    id: string;
    recipientEmail: string;
    status: string;
    encryptedContent: string;
    deliverAt: string;
    createdAt: string;
    authorName?: string;
    audience?: string;
    visibility?: string;
    images?: string[];
    audio?: string[];
    videos?: string[];
    files?: string[];
}

export default function CapsuleDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const [letter, setLetter] = useState<LetterDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [decryptedText, setDecryptedText] = useState<string>('');
    const [isDecrypting, setIsDecrypting] = useState<boolean>(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [copiedLink, setCopiedLink] = useState(false);

    // ১. ব্যাকএন্ড GraphQL থেকে নির্দিষ্ট চিঠির সম্পূর্ণ ডেটা ফেচ করা
    useEffect(() => {
        async function fetchCapsule() {
            if (!id) return;

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
                  deliverAt
                  createdAt
                  authorName
                  audience
                  visibility
                  images
                  audio
                  videos
                  files
                }
              }
            `,
                        variables: { id },
                    }),
                });

                const result = await res.json();

                if (result.errors && result.errors.length > 0) {
                    setError(result.errors[0]?.message || 'GraphQL Query Error');
                    return;
                }

                if (result.data?.getLetterById) {
                    setLetter(result.data.getLetterById);
                } else {
                    setError('Vault not found with this identifier.');
                }
            } catch (err: any) {
                console.error(err);
                setError('Failed to connect to the secure vault ledger.');
            } finally {
                setLoading(false);
            }
        }

        fetchCapsule();
    }, [id]);

    // ২. ব্রাউজার মেমোরিতে জিরো-নলেজ ডিক্রিপশন (অটোমেটিক)
    useEffect(() => {
        if (!letter) return;

        const currentLetter = letter;

        async function performDecryption() {
            setIsDecrypting(true);
            try {
                const keyToUse =
                    currentLetter.visibility === 'public_anonymous'
                        ? PUBLIC_VAULT_KEY
                        : currentLetter.recipientEmail.trim();

                const plain = await decryptLetterContent(currentLetter.encryptedContent, keyToUse);
                setDecryptedText(plain);
            } catch (err) {
                setDecryptedText(currentLetter.encryptedContent);
            } finally {
                setIsDecrypting(false);
            }
        }

        performDecryption();
    }, [letter]);

    // ফাইল নাম বের করার হেল্পার
    const getFileName = (url: string) => {
        try {
            const pathname = new URL(url).pathname;
            const fileName = pathname.substring(pathname.lastIndexOf('/') + 1);
            return decodeURIComponent(fileName) || 'attached-document.pdf';
        } catch {
            return 'document.pdf';
        }
    };

    const copyVaultLink = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2000);
        }
    };

    // লোডিং স্টেট
    if (loading) {
        return (
            <div className="min-h-screen bg-[#07080a] flex flex-col items-center justify-center font-mono text-xs text-white/50 space-y-3">
                <Loader2 className="w-6 h-6 animate-spin text-red-500" />
                <span className="tracking-widest uppercase">Deciphering capsule from ledger...</span>
            </div>
        );
    }

    // এরর স্টেট
    if (error || !letter) {
        return (
            <div className="min-h-screen bg-[#07080a] flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="p-3 rounded-full bg-red-950/40 border border-red-800/40 text-red-400">
                    <AlertCircle className="w-6 h-6" />
                </div>
                <p className="text-sm font-mono text-red-300 max-w-md">{error || 'Capsule not found.'}</p>
                <Button variant="outline" className="border-white/10 text-xs font-mono text-white hover:bg-white/5">
                    <Link href="/dashboard">Back to Dashboard</Link>
                </Button>
            </div>
        );
    }

    const createdTime = new Date(letter.createdAt).getTime();
    const targetTime = new Date(letter.deliverAt).getTime();
    const now = Date.now();
    const isLocked = targetTime > now;

    const totalDays = Math.max(1, Math.ceil((targetTime - createdTime) / (1000 * 60 * 60 * 24)));
    const remainingDays = Math.max(0, Math.ceil((targetTime - now) / (1000 * 60 * 60 * 24)));
    const progressPercent = isLocked
        ? Math.max(5, Math.min(100, Math.round(((totalDays - remainingDays) / totalDays) * 100)))
        : 100;

    const images = letter?.images || [];
    const videos = letter?.videos || [];
    const audios = letter?.audio || [];
    const files = letter?.files || [];
    const totalMedia = images.length + videos.length + audios.length + files.length;

    return (
        <>



            <div className="relative z-10 max-w-4xl mx-auto space-y-8">

                {/* টপ নেভিগেশন ও অ্যাকশন বার */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Button asChild variant="ghost" className="text-white/60 hover:text-white text-xs font-mono -ml-3">
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                        </Link>
                    </Button>

                    <div className="flex items-center gap-2.5">
                        <button
                            onClick={copyVaultLink}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-white/70 hover:text-white transition-colors cursor-pointer"
                        >
                            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                            <span>{copiedLink ? 'Link Copied' : 'Share Vault'}</span>
                        </button>

                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 font-mono text-xs">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            <span className="text-white/80">AES-GCM-256</span>
                        </div>
                    </div>
                </div>

                {/* মূল ক্যাপসুল কন্টেইনার */}
                <div className="relative rounded-3xl border border-white/10 bg-[#0c0d12]/80 backdrop-blur-2xl p-6 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.8)] space-y-8">

                    {/* পার্সেল মেটা হেডার */}
                    <div className="space-y-4 border-b border-white/10 pb-6">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 font-mono text-xs">
                                <span
                                    className={`size-2 rounded-full ${isLocked
                                        ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)] animate-pulse'
                                        : 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]'
                                        }`}
                                />
                                <span className={isLocked ? 'text-amber-300' : 'text-emerald-300'}>
                                    {isLocked ? 'Immutable Sealed Vault' : 'Payload Ready & Delivered'}
                                </span>
                            </div>

                            <span className="font-mono text-xs text-white/40">
                                CAPSULE #{letter.id.slice(-8).toUpperCase()}
                            </span>
                        </div>

                        <div>
                            <h1 className="font-serif text-2xl sm:text-4xl text-[#fbf8f3] tracking-wide">
                                To: {letter.recipientEmail}
                            </h1>
                            <p className="text-xs sm:text-sm font-mono text-white/40 mt-1.5">
                                Authored by: <span className="text-white/70">{letter.authorName || 'Anonymous'}</span>
                                {' • '}
                                Audience: <span className="capitalize text-white/70">{letter.audience || 'Self'}</span>
                                {' • '}
                                Visibility: <span className="capitalize text-white/70">{(letter.visibility || 'private').replace('_', ' ')}</span>
                            </p>
                        </div>

                        {/* টাইমলাইন প্রগ্রেস স্ট্রিপ */}
                        <div className="space-y-2 pt-3">
                            <div className="flex flex-wrap items-center justify-between text-xs font-mono text-white/50 gap-2">
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5 text-white/40" />
                                    Sealed: {new Date(letter.createdAt).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1.5 text-red-400">
                                    <Clock className="w-3.5 h-3.5" />
                                    {isLocked ? `${remainingDays} Days Left (${progressPercent}%)` : 'Delivery Schedule Complete'}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5 text-white/40" />
                                    Target: {new Date(letter.deliverAt).toLocaleDateString()}
                                </span>
                            </div>

                            <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-700 ${isLocked ? 'bg-gradient-to-r from-red-800 to-rose-500' : 'bg-emerald-500'
                                        }`}
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* ডিক্রিপ্ট করা মূল চিঠি */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5" /> Decrypted Letter Payload
                            </span>
                            <span className="text-[11px] font-mono text-white/40">Zero-Knowledge Client Decrypt</span>
                        </div>

                        {isDecrypting ? (
                            <div className="space-y-3 p-6 bg-black/40 rounded-2xl border border-white/5 animate-pulse">
                                <div className="h-4 bg-white/10 rounded w-full" />
                                <div className="h-4 bg-white/10 rounded w-5/6" />
                                <div className="h-4 bg-white/10 rounded w-3/4" />
                            </div>
                        ) : (
                            <div className="p-6 sm:p-8 rounded-2xl bg-black/40 border border-white/5 font-serif text-base sm:text-lg leading-relaxed whitespace-pre-wrap text-[#fbf8f3]">
                                {decryptedText}
                            </div>
                        )}
                    </div>

                    {/* মিডিয়া ও এটাচমেন্টস সেকশন */}
                    {totalMedia > 0 && (
                        <div className="space-y-6 pt-6 border-t border-white/10">
                            <div className="flex items-center justify-between">
                                <h3 className="font-mono text-xs uppercase tracking-widest text-white/70">
                                    Attached Media & Documents ({totalMedia})
                                </h3>
                            </div>

                            {/* ১. ছবি গ্যালারি */}
                            {images.length > 0 && (
                                <div className="space-y-3">
                                    <span className="text-xs font-mono text-white/40">Images ({images.length})</span>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {images.map((url, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => setSelectedImage(url)}
                                                className="group relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black cursor-pointer hover:border-red-500/50 transition-all"
                                            >
                                                <img src={url} alt={`Memory ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                    <Eye className="w-5 h-5 text-white" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ২. ভিডিও প্লেয়ার */}
                            {videos.length > 0 && (
                                <div className="space-y-3">
                                    <span className="text-xs font-mono text-white/40">Video Memos ({videos.length})</span>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {videos.map((url, idx) => (
                                            <div key={idx} className="rounded-2xl overflow-hidden border border-white/10 bg-black">
                                                <video controls playsInline preload="metadata" className="w-full aspect-video">
                                                    <source src={url} />
                                                    Video playback not supported.
                                                </video>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ৩. অডিও প্লেয়ার */}
                            {audios.length > 0 && (
                                <div className="space-y-3">
                                    <span className="text-xs font-mono text-white/40">Voice Recordings ({audios.length})</span>
                                    <div className="space-y-2">
                                        {audios.map((url, idx) => (
                                            <div key={idx} className="p-3.5 rounded-2xl border border-white/10 bg-white/5 flex items-center gap-3">
                                                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                                                    <Music className="w-4 h-4" />
                                                </div>
                                                <audio controls className="w-full h-8 brightness-90">
                                                    <source src={url} />
                                                </audio>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ৪. ডকুমেন্টস ও পিডিএফ */}
                            {files.length > 0 && (
                                <div className="space-y-3">
                                    <span className="text-xs font-mono text-white/40">Documents & PDFs ({files.length})</span>
                                    <div className="space-y-2">
                                        {files.map((url, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 transition-all">
                                                <div className="flex items-center gap-3 truncate pr-3">
                                                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                                                        <FileText className="w-4 h-4" />
                                                    </div>
                                                    <span className="font-mono text-xs text-white/80 truncate">{getFileName(url)}</span>
                                                </div>
                                                <div className="flex items-center gap-2 shrink-0">
                                                    <a
                                                        href={url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-red-300 flex items-center gap-1.5 transition-colors"
                                                    >
                                                        <span>Open</span>
                                                        <ExternalLink className="w-3 h-3" />
                                                    </a>
                                                    <a
                                                        href={url}
                                                        download
                                                        className="p-2 text-white/40 hover:text-white transition-colors"
                                                        title="Download file"
                                                    >
                                                        <Download className="w-4 h-4" />
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </div>


            {selectedImage && (
                <div
                    className="fixed inset-0 z-60 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-200 lg:pt-24"
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        className="relative max-w-[90vw] max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* মূল ছবি */}
                        <img
                            src={selectedImage}
                            alt="Expanded Memory"
                            className="w-auto h-auto max-w-full max-h-[80vh] object-contain block rounded-2xl"
                        />

                        <button
                            type="button"
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/70 hover:bg-black text-white/80 hover:text-white border border-white/20 backdrop-blur-md transition-all shadow-lg cursor-pointer"
                            title="Close image"
                        >
                            <X className="w-4 h-4 stroke-[2.5]" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}