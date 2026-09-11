// src/components/unseal/unseal-media-viewer.tsx
'use client';

import { 
  Music, 
  FileText, 
  Download,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface UnsealMediaViewerProps {
  mediaUrls: string[];
}

export function UnsealMediaViewer({ mediaUrls }: UnsealMediaViewerProps) {
  if (!mediaUrls || mediaUrls.length === 0) return null;

  const getFileType = (url: string) => {
    try {
      const pathname = new URL(url).pathname.toLowerCase();
      if (pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|bmp)$/)) return 'image';
      if (pathname.match(/\.(mp4|webm|mov|mkv|ogg)$/)) return 'video';
      if (pathname.match(/\.(mp3|wav|m4a|aac|flac)$/)) return 'audio';
      if (pathname.match(/\.(pdf)$/)) return 'pdf';
      return 'generic';
    } catch {
      return 'generic';
    }
  };

  const getFileName = (url: string) => {
    try {
      const pathname = new URL(url).pathname;
      const fileName = pathname.substring(pathname.lastIndexOf('/') + 1);
      return decodeURIComponent(fileName) || 'attachment-file';
    } catch {
      return 'memory-attachment';
    }
  };

  const images = mediaUrls.filter((u) => getFileType(u) === 'image');
  const videos = mediaUrls.filter((u) => getFileType(u) === 'video');
  const audios = mediaUrls.filter((u) => getFileType(u) === 'audio');
  const documents = mediaUrls.filter((u) => ['pdf', 'generic'].includes(getFileType(u)));

  return (
    <div className="space-y-10 pt-8 border-t border-white/10">
      
      {/* ================= ১. ব্লগের মতো সরাসরি সম্পূর্ণ ছবিসমূহ ================= */}
      {images.length > 0 && (
        <div className="space-y-8">
          <div className="flex items-center gap-2 text-xs font-mono text-white/50 tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span>Visual Journal ({images.length})</span>
          </div>

          <div className="space-y-8">
            {images.map((url, idx) => (
              <figure 
                key={idx} 
                className="space-y-2.5 rounded-2xl overflow-hidden border border-white/10 bg-[#050608]/90 p-2 sm:p-3 shadow-2xl"
              >
                <div className="overflow-hidden rounded-xl bg-black">
                  <img
                    src={url}
                    alt={`Story image ${idx + 1}`}
                    className="w-full h-auto object-cover select-none"
                    loading="eager"
                  />
                </div>
                <figcaption className="px-2 py-1 text-center font-mono text-[11px] text-white/40 italic">
                  — Memory Frame #{idx + 1}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      {/* ================= ২. ব্লগের ভেতর ভিডিও প্লেয়ার ================= */}
      {videos.length > 0 && (
        <div className="space-y-4">
          <span className="text-[11px] font-mono uppercase tracking-widest text-white/50 block">
            Time Reels ({videos.length})
          </span>
          <div className="space-y-6">
            {videos.map((url, idx) => (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl p-1"
              >
                <video
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full aspect-video rounded-xl"
                >
                  <source src={url} />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= ৩. ভয়েস মেমো / অডিও প্লেয়ার ================= */}
      {audios.length > 0 && (
        <div className="space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-widest text-white/50 block">
            Voice Memos ({audios.length})
          </span>
          <div className="space-y-2.5">
            {audios.map((url, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center gap-3.5"
              >
                <div className="p-2.5 rounded-lg bg-red-950/60 border border-red-800/40 text-red-400 shrink-0">
                  <Music className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-mono text-white/80 truncate mb-1">
                    {getFileName(url)}
                  </div>
                  <audio controls className="w-full h-7 brightness-90 contrast-125">
                    <source src={url} />
                    Your browser does not support audio playback.
                  </audio>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= ৪. ডকুমেন্টস ও ফাইলস ================= */}
      {documents.length > 0 && (
        <div className="space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-widest text-white/50 block">
            Attached Documents ({documents.length})
          </span>
          <div className="space-y-2">
            {documents.map((url, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 transition-all group"
              >
                <div className="flex items-center gap-3 truncate pr-3">
                  <div className="p-2 rounded-lg bg-red-950/40 text-red-400 shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono text-white/80 truncate group-hover:text-white transition-colors">
                    {getFileName(url)}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-red-400 hover:text-red-300 px-2.5 py-1 rounded bg-red-950/40 border border-red-900/40 hover:bg-red-900/50 transition-colors"
                  >
                    <span>Open</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={url}
                    download
                    className="p-1.5 text-white/50 hover:text-white transition-colors"
                    title="Download"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}