'use client';

import { useState, useEffect, use } from 'react';

import Link from 'next/link';

import {
  ArrowLeft,
  Calendar,
  Clock,
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

import {
  decryptLetterContent,
  PUBLIC_VAULT_KEY,
} from '@/lib/crypto';

import { useMyLetterById } from '@/hooks/use-letter';

export default function CapsuleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const {
    singleLetterById,
    isLoading,
    error,
  } = useMyLetterById(id) as any;

  const [decryptedText, setDecryptedText] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // ============================================
  // AUTO DECRYPTION
  // ============================================

  useEffect(() => {
    if (!singleLetterById?.encryptedContent) return;

    let isMounted = true;

    async function performDecryption() {
      setIsDecrypting(true);

      try {
        const keyToUse =
          singleLetterById.visibility === 'public_anonymous'
            ? PUBLIC_VAULT_KEY
            : singleLetterById.recipientEmail.trim();

        const plain = await decryptLetterContent(
          singleLetterById.encryptedContent,
          keyToUse,
        );

        if (isMounted) {
          setDecryptedText(plain);
        }
      } catch (err) {
        console.error('Decryption failed:', err);

        if (isMounted) {
          setDecryptedText(
            singleLetterById.encryptedContent,
          );
        }
      } finally {
        if (isMounted) {
          setIsDecrypting(false);
        }
      }
    }

    performDecryption();

    return () => {
      isMounted = false;
    };
  }, [singleLetterById]);

  // ============================================
  // ESC TO CLOSE IMAGE
  // ============================================

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);

  // ============================================
  // COPY VAULT LINK
  // ============================================

  const copyVaultLink = async () => {
    if (typeof window === 'undefined') return;

    try {
      await navigator.clipboard.writeText(
        window.location.href,
      );

      setCopiedLink(true);

      window.setTimeout(() => {
        setCopiedLink(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  // ============================================
  // FILE NAME
  // ============================================

  const getFileName = (url: string) => {
    try {
      const pathname = new URL(url).pathname;

      return (
        decodeURIComponent(
          pathname.substring(
            pathname.lastIndexOf('/') + 1,
          ),
        ) || 'document.pdf'
      );
    } catch {
      return 'document.pdf';
    }
  };

  // ============================================
  // LOADING
  // ============================================

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-3 px-4 text-center text-muted-foreground">
        <Loader2 className="size-6 animate-spin text-[#991b1b]" />

        <span className="font-mono text-[10px] uppercase tracking-[0.14em] sm:text-xs sm:tracking-widest">
          Deciphering capsule from ledger...
        </span>
      </div>
    );
  }

  // ============================================
  // ERROR
  // ============================================

  if (error || !singleLetterById) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center px-4 py-8 text-center">
        <AlertCircle className="mb-3 size-8 text-rose-500" />

        <p className="mb-4 max-w-sm font-mono text-[10px] leading-5 text-rose-400 sm:text-xs">
          {error || 'Time capsule not found in ledger.'}
        </p>

        <Button
          variant="outline"
          size="sm" 
          className="h-8 px-3 text-[10px] font-mono"
        >
          <Link href="/dashboard">
            Return to Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  // ============================================
  // TIME & PROGRESS
  // ============================================

  const createdTime = new Date(
    singleLetterById.createdAt,
  ).getTime();

  const targetTime = new Date(
    singleLetterById.deliverAt,
  ).getTime();

  const now = Date.now();

  const isLocked = targetTime > now;

  const totalDays = Math.max(
    1,
    Math.ceil(
      (targetTime - createdTime) /
        (1000 * 60 * 60 * 24),
    ),
  );

  const remainingDays = Math.max(
    0,
    Math.ceil(
      (targetTime - now) /
        (1000 * 60 * 60 * 24),
    ),
  );

  const progressPercent = isLocked
    ? Math.max(
        5,
        Math.min(
          100,
          Math.round(
            ((totalDays - remainingDays) /
              totalDays) *
              100,
          ),
        ),
      )
    : 100;

  const images = singleLetterById.images || [];
  const videos = singleLetterById.videos || [];
  const audios = singleLetterById.audio || [];
  const files = singleLetterById.files || [];

  const totalMedia =
    images.length +
    videos.length +
    audios.length +
    files.length;

  return (
    <div className="w-full overflow-x-hidden px-3 sm:py-7 md:px-6 md:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-4xl space-y-4 sm:space-y-5 md:space-y-6">

        {/* ============================================
            ACTION BAR
        ============================================ */}

        <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          <Button
            variant="ghost"
            size="sm" 
            className="-ml-2 h-8 w-fit px-2 text-[10px] font-mono text-muted-foreground hover:bg-muted hover:text-foreground sm:text-xs"
          >
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5"
            >
              <ArrowLeft className="size-3.5 shrink-0" />

              <span>
                Back to Dashboard
              </span>
            </Link>
          </Button>

          <div className="flex w-full min-w-0 items-center gap-1.5 sm:w-auto sm:gap-2">
            <button
              type="button"
              onClick={copyVaultLink}
              className="inline-flex h-8 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full border border-border bg-card px-2.5 font-mono text-[9px] text-muted-foreground transition-colors hover:text-foreground sm:flex-none sm:px-3 sm:text-[10px]"
            >
              {copiedLink ? (
                <Check className="size-3 shrink-0 text-emerald-500" />
              ) : (
                <Share2 className="size-3 shrink-0" />
              )}

              <span className="truncate">
                {copiedLink
                  ? 'Link Copied'
                  : 'Share Vault'}
              </span>
            </button>

            <div className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-2.5 font-mono text-[9px] text-muted-foreground sm:px-3 sm:text-[10px]">
              <ShieldCheck className="size-3.5 shrink-0 text-emerald-500" />

              <span>AES-GCM-256</span>
            </div>
          </div>
        </div>

        {/* ============================================
            MAIN CAPSULE
        ============================================ */}

        <section className="w-full overflow-hidden rounded-xl border border-border bg-card/80 p-3.5 shadow-sm backdrop-blur-xl sm:rounded-2xl sm:p-5 md:p-6 lg:p-7">
          
          <div className="w-full space-y-5 sm:space-y-6">

            {/* ========================================
                CAPSULE HEADER
            ======================================== */}

            <div className="w-full space-y-3 border-b border-border/60 pb-5">

              {/* STATUS + ID */}

              <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span
                  className={`inline-flex w-fit max-w-full items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9px] ${
                    isLocked
                      ? 'border-amber-500/20 bg-amber-500/10 text-amber-500'
                      : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
                  }`}
                >
                  <span
                    className={`size-1.5 shrink-0 rounded-full ${
                      isLocked
                        ? 'animate-pulse bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                  />

                  <span className="truncate">
                    {isLocked
                      ? 'Immutable Locked'
                      : 'Delivered & Unsealed'}
                  </span>
                </span>

                <span className="max-w-full truncate font-mono text-[8px] text-muted-foreground sm:text-[9px]">
                  ID: #
                  {singleLetterById._id
                    ?.slice(-8)
                    .toUpperCase()}
                </span>
              </div>

              {/* RECIPIENT */}

              <div className="min-w-0">
                <h1 className="break-all font-serif text-xl font-medium leading-tight text-foreground sm:text-2xl md:text-3xl">
                  To: {singleLetterById.recipientEmail}
                </h1>

                <div className="mt-2 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[9px] text-muted-foreground sm:text-[10px]">
                  <span className="break-words">
                    By:{' '}
                    <span className="text-foreground/80">
                      {singleLetterById.authorName ||
                        'Anonymous'}
                    </span>
                  </span>

                  <span>•</span>

                  <span className="capitalize">
                    {singleLetterById.audience ||
                      'Self'}
                  </span>

                  <span>•</span>

                  <span className="capitalize">
                    {(
                      singleLetterById.visibility ||
                      'private'
                    ).replaceAll('_', ' ')}
                  </span>
                </div>
              </div>

              {/* PROGRESS */}

              <div className="w-full space-y-2 pt-1.5">

                <div className="grid w-full grid-cols-1 gap-1.5 font-mono text-[9px] text-muted-foreground sm:grid-cols-3 sm:items-center sm:gap-2 sm:text-[10px]">

                  <span className="flex min-w-0 items-center gap-1.5">
                    <Calendar className="size-3 shrink-0" />

                    <span className="truncate">
                      Sealed:{' '}
                      {new Date(
                        singleLetterById.createdAt,
                      ).toLocaleDateString()}
                    </span>
                  </span>

                  <span className="flex min-w-0 items-center gap-1.5 text-[#991b1b] sm:justify-center dark:text-rose-400">
                    <Clock className="size-3 shrink-0" />

                    <span className="truncate">
                      {isLocked
                        ? `${remainingDays} Days Left`
                        : 'Unlocked'}
                    </span>
                  </span>

                  <span className="flex min-w-0 items-center gap-1.5 sm:justify-end">
                    <Calendar className="size-3 shrink-0" />

                    <span className="truncate">
                      Unseals:{' '}
                      {new Date(
                        singleLetterById.deliverAt,
                      ).toLocaleDateString()}
                    </span>
                  </span>

                </div>

                <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isLocked
                        ? 'bg-[#991b1b]'
                        : 'bg-emerald-500'
                    }`}
                    style={{
                      width: `${progressPercent}%`,
                    }}
                  />
                </div>

              </div>
            </div>

            {/* ========================================
                DECRYPTED LETTER
            ======================================== */}

            <div className="w-full space-y-2.5">

              <div className="flex min-w-0 flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                <span className="flex min-w-0 items-center gap-1.5 font-mono text-[9px] text-emerald-500 sm:text-[10px]">
                  <Sparkles className="size-3.5 shrink-0" />

                  <span className="truncate">
                    Decrypted Letter Content
                  </span>
                </span>

                <span className="font-mono text-[8px] text-muted-foreground sm:text-[9px]">
                  Zero-Knowledge
                </span>
              </div>

              {isDecrypting ? (
                <div className="w-full animate-pulse space-y-2 rounded-xl border border-border bg-muted/20 p-4 sm:p-5">
                  <div className="h-3 w-full rounded bg-muted" />

                  <div className="h-3 w-5/6 rounded bg-muted" />

                  <div className="h-3 w-2/3 rounded bg-muted" />
                </div>
              ) : (
                <div className="max-h-[65vh] w-full overflow-x-hidden overflow-y-auto rounded-xl border border-border bg-background p-4 font-serif text-sm leading-7 text-foreground/90 whitespace-pre-wrap break-words sm:p-5 sm:text-base sm:leading-8 md:p-6">
                  {decryptedText}
                </div>
              )}

            </div>

            {/* ========================================
                MEDIA & DOCUMENTS
            ======================================== */}

            {totalMedia > 0 && (
              <div className="w-full space-y-5 border-t border-border/60 pt-5 sm:space-y-6">

                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground sm:text-[10px]">
                    Attachments ({totalMedia})
                  </h3>
                </div>

                {/* ====================================
                    IMAGES
                ==================================== */}

                {images.length > 0 && (
                  <div className="w-full space-y-2.5">

                    <div className="flex items-center gap-1.5 font-mono text-[9px] text-muted-foreground sm:text-[10px]">
                      <Eye className="size-3 shrink-0" />

                      <span>
                        Images ({images.length})
                      </span>
                    </div>

                    <div className="grid w-full grid-cols-2 gap-1.5 min-[480px]:gap-2 sm:grid-cols-3 md:grid-cols-4">
                      {images.map(
                        (
                          url: string,
                          idx: number,
                        ) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() =>
                              setSelectedImage(url)
                            }
                            className="group relative aspect-square min-w-0 cursor-pointer overflow-hidden rounded-lg border border-border bg-black transition-colors hover:border-[#991b1b]/50 sm:rounded-xl"
                          >
                            <img
                              src={url}
                              alt={`Attachment ${idx + 1}`}
                              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                              <Eye className="size-4 text-white" />
                            </div>
                          </button>
                        ),
                      )}
                    </div>

                  </div>
                )}

                {/* ====================================
                    VIDEOS
                ==================================== */}

                {videos.length > 0 && (
                  <div className="w-full space-y-2.5">

                    <div className="flex items-center gap-1.5 font-mono text-[9px] text-muted-foreground sm:text-[10px]">
                      <Video className="size-3 shrink-0" />

                      <span>
                        Videos ({videos.length})
                      </span>
                    </div>

                    <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
                      {videos.map(
                        (
                          url: string,
                          idx: number,
                        ) => (
                          <video
                            key={idx}
                            controls
                            playsInline
                            preload="metadata"
                            className="aspect-video h-auto w-full min-w-0 rounded-lg border border-border bg-black sm:rounded-xl"
                          >
                            <source src={url} />
                            Your browser does not support video playback.
                          </video>
                        ),
                      )}
                    </div>

                  </div>
                )}

                {/* ====================================
                    AUDIO
                ==================================== */}

                {audios.length > 0 && (
                  <div className="w-full space-y-2.5">

                    <div className="flex items-center gap-1.5 font-mono text-[9px] text-muted-foreground sm:text-[10px]">
                      <Music className="size-3 shrink-0" />

                      <span>
                        Audio ({audios.length})
                      </span>
                    </div>

                    <div className="w-full space-y-2">
                      {audios.map(
                        (
                          url: string,
                          idx: number,
                        ) => (
                          <div
                            key={idx}
                            className="flex min-w-0 w-full items-center gap-2 rounded-lg border border-border bg-muted/20 p-2 sm:rounded-xl sm:p-2.5"
                          >
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                              <Music className="size-3.5 text-amber-500" />
                            </div>

                            <audio
                              controls
                              className="block h-8 min-w-0 w-full max-w-full"
                            >
                              <source src={url} />
                              Your browser does not support audio playback.
                            </audio>
                          </div>
                        ),
                      )}
                    </div>

                  </div>
                )}

                {/* ====================================
                    FILES
                ==================================== */}

                {files.length > 0 && (
                  <div className="w-full space-y-2.5">

                    <div className="flex items-center gap-1.5 font-mono text-[9px] text-muted-foreground sm:text-[10px]">
                      <FileText className="size-3 shrink-0" />

                      <span>
                        Files ({files.length})
                      </span>
                    </div>

                    <div className="w-full space-y-1.5">
                      {files.map(
                        (
                          url: string,
                          idx: number,
                        ) => (
                          <div
                            key={idx}
                            className="flex min-w-0 w-full flex-col gap-2 rounded-lg border border-border bg-muted/20 p-2.5 sm:flex-row sm:items-center sm:justify-between sm:rounded-xl"
                          >
                            {/* FILE NAME */}

                            <div className="flex min-w-0 items-center gap-2">
                              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                                <FileText className="size-3.5 text-emerald-500" />
                              </div>

                              <span className="min-w-0 flex-1 truncate font-mono text-[9px] text-foreground/80 sm:text-[10px]">
                                {getFileName(url)}
                              </span>
                            </div>

                            {/* ACTIONS */}

                            <div className="flex w-full shrink-0 items-center justify-end gap-1 sm:w-auto">

                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-7 flex-1 items-center justify-center gap-1.5 rounded-md px-2.5 text-[9px] font-mono text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:flex-none"
                                title="Open file"
                              >
                                <ExternalLink className="size-3.5 shrink-0" />

                                <span className="sm:hidden">
                                  Open
                                </span>
                              </a>

                              <a
                                href={url}
                                download
                                className="inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                title="Download"
                              >
                                <Download className="size-3.5" />
                              </a>

                            </div>
                          </div>
                        ),
                      )}
                    </div>

                  </div>
                )}

              </div>
            )}
          </div>
        </section>
      </div>

      {/* ============================================
          IMAGE PREVIEW MODAL
      ============================================ */}

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex h-dvh w-full items-center justify-center bg-black/90 p-2 backdrop-blur-sm sm:p-4"
          onClick={() =>
            setSelectedImage(null)
          }
        >
          <div
            className="relative flex max-h-[94dvh] max-w-[98vw] items-center justify-center sm:max-h-[90dvh] sm:max-w-[92vw]"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <img
              src={selectedImage}
              alt="Preview"
              className="max-h-[90dvh] max-w-[96vw] rounded-lg object-contain shadow-2xl sm:max-h-[85dvh] sm:max-w-[90vw] sm:rounded-xl"
            />

            <button
              type="button"
              onClick={() =>
                setSelectedImage(null)
              }
              className="absolute right-1.5 top-1.5 flex size-8 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-md transition-colors hover:bg-black sm:-right-3 sm:-top-3"
              title="Close preview"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}