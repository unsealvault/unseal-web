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
    <div className="rounded-2xl border border-border/80 bg-card text-card-foreground p-8 sm:p-10 text-center shadow-xl space-y-6">
      <div className="w-12 h-12 mx-auto rounded-full bg-[#991b1b]/10 border border-[#991b1b]/30 flex items-center justify-center text-[#991b1b] dark:text-rose-400 shadow-[0_0_20px_rgba(153,27,27,0.2)]">
        <CheckCircle2 className="w-6 h-6" />
      </div>

      <div className="space-y-1.5">
        <h2 className="text-xl font-medium tracking-tight text-foreground">
          Sealed in the vault.
        </h2>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
          A verification link has been dispatched to <span className="text-[#991b1b] dark:text-rose-300 font-mono font-medium">{email}</span>. Click it to activate the timer.
        </p>
        {filesCount > 0 && (
          <p className="text-[11px] text-muted-foreground/80 font-mono pt-1">
            ✦ Encrypted payload includes {filesCount} attached {filesCount === 1 ? 'file' : 'files'}.
          </p>
        )}
      </div>

      <div className="rounded-xl border border-border bg-muted/40 p-4 text-left flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
            <Coffee className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-foreground">Love Unseal? Buy us a coffee</h4>
            <p className="text-[11px] text-muted-foreground leading-snug">
              Unseal is free for 2 years. If you enjoy the project, feel free to support our server costs.
            </p>
          </div>
        </div>
        <a
          href="https://buymeacoffee.com"
          target="_blank"
          rel="noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-foreground text-background hover:opacity-90 transition-all shrink-0 cursor-pointer shadow-xs"
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