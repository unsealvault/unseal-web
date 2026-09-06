// components/audience-selector.tsx
import { User, Heart } from 'lucide-react';

interface AudienceSelectorProps {
  audience: 'self' | 'someone_else';
  setAudience: (val: 'self' | 'someone_else') => void;
}

export function AudienceSelector({ audience, setAudience }: AudienceSelectorProps) {
  return (
    <div className="flex p-1 bg-muted/60 rounded-lg border border-border/60">
      <button
        type="button"
        onClick={() => setAudience('self')}
        className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md transition-all cursor-pointer ${
          audience === 'self'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <User className={`w-3.5 h-3.5 ${audience === 'self' ? 'text-[#991b1b] dark:text-rose-400' : ''}`} />
        <span>To Future Self</span>
      </button>
      <button
        type="button"
        onClick={() => setAudience('someone_else')}
        className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md transition-all cursor-pointer ${
          audience === 'someone_else'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <Heart className={`w-3.5 h-3.5 ${audience === 'someone_else' ? 'text-[#991b1b] fill-[#991b1b]/20' : 'text-muted-foreground'}`} />
        <span>To Someone Else</span>
      </button>
    </div>
  );
}