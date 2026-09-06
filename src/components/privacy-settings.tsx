// components/privacy-settings.tsx
import { Lock, Globe, UserCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface PrivacySettingsProps {
  visibility: 'private' | 'public_anonymous';
  setVisibility: (val: 'private' | 'public_anonymous') => void;
  authorName: string;
  setAuthorName: (val: string) => void;
}

export function PrivacySettings({
  visibility,
  setVisibility,
  authorName,
  setAuthorName,
}: PrivacySettingsProps) {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
        Privacy Setting
      </label>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setVisibility('private')}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
            visibility === 'private'
              ? 'border-[#991b1b] bg-[#991b1b]/10 text-foreground font-semibold shadow-xs'
              : 'border-border bg-background text-muted-foreground hover:text-foreground hover:border-zinc-500/40'
          }`}
        >
          <Lock className={`w-3.5 h-3.5 ${visibility === 'private' ? 'text-[#991b1b]' : 'text-muted-foreground'}`} />
          <span>Private</span>
        </button>

        <button
          type="button"
          onClick={() => setVisibility('public_anonymous')}
          className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
            visibility === 'public_anonymous'
              ? 'border-[#991b1b] bg-[#991b1b]/10 text-foreground font-semibold shadow-xs'
              : 'border-border bg-background text-muted-foreground hover:text-foreground hover:border-zinc-500/40'
          }`}
        >
          <Globe className={`w-3.5 h-3.5 ${visibility === 'public_anonymous' ? 'text-[#991b1b]' : 'text-muted-foreground'}`} />
          <span>Public</span>
        </button>
      </div>

      {visibility === 'public_anonymous' ? (
        <div className="pt-1.5 space-y-1.5 animate-in fade-in duration-300">
          <div className="relative">
            <Input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Display Name or Pen Name (optional — blank for Anonymous)"
              className="h-9 bg-background border-border text-xs text-foreground placeholder:text-muted-foreground/60 pr-8 hover:border-zinc-500/40 focus-visible:ring-1 focus-visible:ring-[#991b1b]"
            />
            <UserCircle2 className="w-4 h-4 text-muted-foreground absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <p className="text-[11px] text-muted-foreground/70">
            Public Vault-এ চিঠিটি{' '}
            <span className="text-foreground font-medium">
              {authorName.trim() ? authorName : 'Anonymous'}
            </span>{' '}
            হিসেবে তালিকাভুক্ত হবে।
          </p>
        </div>
      ) : (
        <p className="text-[11px] text-muted-foreground/70 pt-0.5">
          চিঠিটি শুধু প্রাপকের ইনবক্সে যাবে। কখনো পাবলিক ভল্টে যাবে না।
        </p>
      )}
    </div>
  );
}