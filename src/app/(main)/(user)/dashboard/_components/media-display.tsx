'use client';

import { Music, FileText, Download, ExternalLink, Sparkles } from 'lucide-react';

interface DashboardMediaDisplayProps {
  images?: string[];
  videos?: string[];
  audio?: string[];
  files?: string[];
}

export function MediaDisplay({
  images = [],
  videos = [],
  audio = [],
  files = [],
}: DashboardMediaDisplayProps) {
  const totalMedia = images.length + videos.length + audio.length + files.length;
  if (totalMedia === 0) return null;

  const getFileName = (url: string) => {
    try {
      const pathname = new URL(url).pathname;
      const fileName = pathname.substring(pathname.lastIndexOf('/') + 1);
      return decodeURIComponent(fileName) || 'attached-document.pdf';
    } catch {
      return 'document.pdf';
    }
  };

  return (
    <div className="space-y-4 pt-3 border-t border-white/10">
      <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-rose-400">
        <Sparkles className="size-3" />
        <span>Attached Media & Documents ({totalMedia})</span>
      </div>

      {/* ১. সরাসরি সম্পূর্ণ ছবি (Visual Memories) */}
      {images.length > 0 && (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {images.map((url, idx) => (
              <div
                key={idx}
                className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black shadow-md"
              >
                <img
                  src={url}
                  alt={`Memory ${idx + 1}`}
                  className="w-full h-full object-cover select-none"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ২. সরাসরি ভিডিও প্লেয়ার */}
      {videos.length > 0 && (
        <div className="space-y-2">
          {videos.map((url, idx) => (
            <div
              key={idx}
              className="rounded-xl overflow-hidden border border-white/10 bg-black shadow-md"
            >
              <video
                controls
                playsInline
                preload="metadata"
                className="w-full aspect-video rounded-lg"
              >
                <source src={url} />
                Your browser does not support video playback.
              </video>
            </div>
          ))}
        </div>
      )}

      {/* ৩. সরাসরি অডিও প্লেয়ার */}
      {audio.length > 0 && (
        <div className="space-y-2">
          {audio.map((url, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl border border-white/10 bg-white/5 flex items-center gap-2.5"
            >
              <div className="p-1.5 rounded-lg bg-red-950/60 border border-red-800/40 text-red-400 shrink-0">
                <Music className="size-3.5" />
              </div>
              <audio controls className="w-full h-7 brightness-90 contrast-125">
                <source src={url} />
                Your browser does not support audio playback.
              </audio>
            </div>
          ))}
        </div>
      )}

      {/* ৪. সরাসরি ডকুমেন্টস ও পিডিএফ লিঙ্ক */}
      {files.length > 0 && (
        <div className="space-y-1.5">
          {files.map((url, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 transition-all text-xs"
            >
              <div className="flex items-center gap-2 truncate pr-2">
                <FileText className="size-3.5 text-emerald-400 shrink-0" />
                <span className="font-mono text-[11px] text-white/80 truncate">
                  {getFileName(url)}
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 rounded bg-red-950/40 hover:bg-red-900/50 text-[10px] font-mono text-red-400 border border-red-900/40 flex items-center gap-1 transition-colors"
                >
                  <span>Open</span>
                  <ExternalLink className="size-2.5" />
                </a>
                <a
                  href={url}
                  download
                  className="p-1 text-white/40 hover:text-white transition-colors"
                  title="Download File"
                >
                  <Download className="size-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}