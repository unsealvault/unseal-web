// src/components/unseal/image-lightbox.tsx
'use client';

import { X } from 'lucide-react';

interface MediaPreviewProps {
  media: { url: string; type: 'image' | 'video' } | null;
  onClose: () => void;
}

export function ImageLightbox({ media, onClose }: MediaPreviewProps) {
  if (!media) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
    >
      {/* ক্লোজ বাটন */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
      >
        <X className="w-5 h-5" />
      </button>

      {/* কনটেন্ট রেন্ডারিং */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative max-w-4xl max-h-[85vh] w-full flex items-center justify-center"
      >
        {media.type === 'image' ? (
          <img
            src={media.url}
            alt="Full size memory"
            className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          />
        ) : (
          <div className="w-full rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl">
            <video
              src={media.url}
              controls
              autoPlay
              playsInline
              className="w-full max-h-[80vh] aspect-video"
            />
          </div>
        )}
      </div>
    </div>
  );
}