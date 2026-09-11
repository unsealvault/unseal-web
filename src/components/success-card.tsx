// components/success-card.tsx
import { CheckCircle2, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SuccessCardProps {
  email: string;
  filesCount: number;
  onReset: () => void;
}

export function SuccessCard({ email, filesCount, onReset }: SuccessCardProps) {
  return (
    <div className="relative z-10 mt-16 sm:mt-20 w-full max-w-xl mx-auto rounded-2xl border border-white/10 bg-[#0c0d12]/50 backdrop-blur-md text-card-foreground p-8 sm:p-10 text-center shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="w-14 h-14 mx-auto rounded-full bg-red-950/40 border border-red-800/60 flex items-center justify-center text-red-500 shadow-[0_0_25px_rgba(220,38,38,0.3)]">
        <CheckCircle2 className="w-7 h-7" />
      </div>

      <div className="space-y-1.5">
        <h2 className="text-xl font-medium tracking-tight text-foreground">
          Sealed in the vault.
        </h2>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
          A verification link has been dispatched to{' '}
          <span className="text-[#991b1b] dark:text-rose-300 font-mono font-medium">
            {email}
          </span>
          . Click it to activate the countdown timer.
        </p>
        {filesCount > 0 && (
          <p className="text-[11px] text-muted-foreground/80 font-mono pt-1">
            ✦ Encrypted payload includes {filesCount} attached{' '}
            {filesCount === 1 ? 'file' : 'files'}.
          </p>
        )}
      </div>

      {/* Buy Me a Coffee Support Box */}
      <div className="rounded-xl border border-border bg-muted/40 p-4 text-left flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
            <Coffee className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-foreground">Love Unseal? Buy us a coffee</h4>
            <p className="text-[11px] text-muted-foreground leading-snug">
              Unseal is free for basic time-capsules. Support our encryption servers with a small tip.
            </p>
          </div>
        </div>
        <a
          href="https://buymeacoffee.com/unseal"
          target="_blank"
          rel="noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-md bg-[#991b1b] hover:bg-[#7f1d1d] text-white transition-all shrink-0 cursor-pointer shadow-sm"
        >
          <span>Support $3</span>
        </a>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={onReset}
        className="text-xs text-muted-foreground hover:text-foreground border-border hover:border-zinc-500/40"
      >
        ← Write another letter
      </Button>
    </div>
  );
}