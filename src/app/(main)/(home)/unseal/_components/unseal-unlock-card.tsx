// src/components/unseal/unseal-unlock-card.tsx
'use client';

import { Lock, Unlock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface UnsealUnlockCardProps {
  ciphertext?: string;
  secretKeyInput: string;
  onKeyChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function UnsealUnlockCard({
  ciphertext,
  secretKeyInput,
  onKeyChange,
  onSubmit,
}: UnsealUnlockCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0c0d12]/90 backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-2xl">
      <div className="space-y-1.5 text-center">
        <div className="inline-flex p-3.5 rounded-full bg-red-950/40 border border-red-800/40 text-red-500 mb-2 shadow-[0_0_20px_rgba(220,38,38,0.2)]">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-serif tracking-wide text-white">
          Letter Locked in Time
        </h2>
        <p className="text-xs text-white/50 max-w-sm mx-auto">
          This capsule is protected with Zero-Knowledge AES-256-GCM. Enter the key to unseal it in your browser.
        </p>
      </div>

      {ciphertext && (
        <div className="p-3.5 bg-white/5 rounded-xl border border-white/10">
          <span className="text-[10px] font-mono text-white/40 block mb-1 tracking-wider uppercase">
            Encrypted Payload (Ciphertext):
          </span>
          <p className="text-[11px] font-mono break-all text-white/60 line-clamp-2">
            {ciphertext}
          </p>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-white/50">
            Secret Key / Recipient Email
          </label>
          <Input
            type="text"
            value={secretKeyInput}
            onChange={(e) => onKeyChange(e.target.value)}
            placeholder="Enter email or passphrase used during sealing"
            required
            className="h-10 text-xs bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-1 focus-visible:ring-red-700"
          />
        </div>

        <Button
          type="submit"
          className="w-full h-11 bg-[#991b1b] hover:bg-[#7f1d1d] text-white text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-950/50 active:scale-[0.99] transition-all"
        >
          <Unlock className="w-4 h-4" />
          Unseal & Decrypt in Browser
        </Button>
      </form>
    </div>
  );
}