// components/letter-composer.tsx
import { Textarea } from '@/components/ui/textarea';

interface LetterComposerProps {
  content: string;
  setContent: (val: string) => void;
  audience: 'self' | 'someone_else';
}

export function LetterComposer({ content, setContent, audience }: LetterComposerProps) {
  return (
    <div className="space-y-1">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={
          audience === 'self'
            ? 'Write what you cannot say today, but must be remembered tomorrow...'
            : 'Write a heartfelt note, a confession, or an unforgettable memory...'
        }
        className="w-full min-h-40 bg-muted/20 border-border resize-none font-serif text-sm sm:text-base leading-relaxed p-3 focus-visible:ring-1 focus-visible:ring-[#991b1b]"
        required
      />
      <div className="flex justify-end text-[10px] font-mono text-muted-foreground">
        {content.length} characters
      </div>
    </div>
  );
}