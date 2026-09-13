'use client';

import { Globe, Lock, UserCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface PrivacySettingProps {
  visibility: 'private' | 'public_anonymous';
  authorName: string;
  onVisibilityChange: (
    value: 'private' | 'public_anonymous'
  ) => void;
  onAuthorNameChange: (value: string) => void;
}

export function PrivacySetting({
  visibility,
  authorName,
  onVisibilityChange,
  onAuthorNameChange,
}: PrivacySettingProps) {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-mono uppercase tracking-wider text-white/50">
        Privacy Setting
      </label>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onVisibilityChange('private')}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
            visibility === 'private'
              ? 'border-red-600 bg-red-950/30 text-white font-semibold'
              : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
          }`}
        >
          <Lock
            className={`w-3.5 h-3.5 ${
              visibility === 'private'
                ? 'text-red-500'
                : 'text-white/50'
            }`}
          />
          <span>Private</span>
        </button>

        <button
          type="button"
          onClick={() => onVisibilityChange('public_anonymous')}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
            visibility === 'public_anonymous'
              ? 'border-red-600 bg-red-950/30 text-white font-semibold'
              : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
          }`}
        >
          <Globe
            className={`w-3.5 h-3.5 ${
              visibility === 'public_anonymous'
                ? 'text-red-500'
                : 'text-white/50'
            }`}
          />
          <span>Public</span>
        </button>
      </div>

      {visibility === 'public_anonymous' && (
        <div className="pt-1.5 space-y-1.5 animate-in fade-in duration-200">
          <div className="relative">
            <Input
              type="text"
              value={authorName}
              onChange={(e) => onAuthorNameChange(e.target.value)}
              placeholder="Display Name or Pen Name (blank for Anonymous)"
              className="h-9 bg-white/5 border-white/10 text-xs text-white placeholder:text-white/40 pr-8"
            />

            <UserCircle2 className="w-4 h-4 text-white/40 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      )}
    </div>
  );
}