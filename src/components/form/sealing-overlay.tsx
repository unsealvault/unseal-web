'use client';

import { Lock, Sparkles } from 'lucide-react';

interface SealingOverlayProps {
  isVisible: boolean;
}

export function SealingOverlay({ isVisible }: SealingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 z-50 overflow-hidden select-none bg-[#07080a]/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 animate-in fade-in duration-300">

      {/* Scanning beam */}
      <div className="absolute inset-x-0 h-16 bg-linear-to-b from-transparent via-red-600/10 to-transparent -translate-y-full animate-[scan_2s_ease-in-out_infinite] pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute w-40 h-40 rounded-full bg-red-600/15 blur-3xl pointer-events-none" />

      {/* Main content */}
      <div className="relative -translate-y-8 flex flex-col items-center">

        {/* ================= SEAL ================= */}
        <div className="relative flex items-center justify-center">

          <div className="absolute w-24 h-24 rounded-full border border-red-500/30 animate-ping opacity-60 duration-1000" />

          <div className="absolute w-28 h-28 rounded-full bg-red-950/40 blur-lg animate-pulse" />

          <div className="relative w-16 h-16 rounded-full bg-linear-to-br from-[#ef4444] via-[#991b1b] to-[#450a0a] border-2 border-rose-300/40 flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.7)] animate-in zoom-in-75 duration-300">

            <div className="w-11 h-11 rounded-full border border-dashed border-rose-200/40 flex items-center justify-center bg-[#7f1d1d]/40 shadow-inner">
              <span className="font-serif font-bold text-white text-xl tracking-tight drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)]">
                U
              </span>
            </div>

            <Sparkles className="w-3.5 h-3.5 text-rose-100 absolute -top-1.5 -right-1.5 animate-pulse" />
          </div>
        </div>


        {/* ================= SECURITY BADGE ================= */}
        <div className="mt-8 animate-in slide-in-from-bottom-2 duration-300">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/50 border border-red-800/50 shadow-[0_0_15px_rgba(220,38,38,0.12)]">

            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
            </span>

            <span className="text-[9px] font-mono font-medium tracking-[0.18em] text-rose-300">
              ZERO-KNOWLEDGE SEAL
            </span>

          </div>
        </div>


        {/* ================= MAIN STATUS ================= */}
        <div className="mt-5 flex items-center justify-center gap-2.5 animate-in slide-in-from-bottom-2 duration-300">

          <Lock className="w-4 h-4 text-red-500 shrink-0" />

          <p className="text-sm font-medium text-white/95 tracking-wide">
            Encrypting &amp; Locking Payload
          </p>

        </div>


        {/* ================= SUB STATUS ================= */}
        <p className="mt-3 text-[9px] font-mono uppercase tracking-[0.22em] text-white/30 animate-in fade-in duration-500">
          Establishing Secure Seal
        </p>


        {/* ================= LOADING DOTS ================= */}
        <div className="mt-5 flex justify-center gap-1.5">

          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />

          <span className="w-1.5 h-1.5 rounded-full bg-red-500/70 animate-pulse [animation-delay:150ms]" />

          <span className="w-1.5 h-1.5 rounded-full bg-red-500/40 animate-pulse [animation-delay:300ms]" />

        </div>

      </div>
    </div>
  );
}