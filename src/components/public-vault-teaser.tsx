// components/public-vault-teaser.tsx
import { Globe, ArrowRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PublicVaultTeaser() {
  const letters = [
    {
      author: "Anonymous",
      sealedIn: "Sep 2023",
      unsealedIn: "Yesterday",
      excerpt: "If you are reading this, I hope you finally quit that soul-crushing agency job and took a leap into building your own studio...",
    },
    {
      author: "Robin",
      sealedIn: "Aug 2021",
      unsealedIn: "3 days ago",
      excerpt: "Did we ever make it to Tokyo? Did we learn how to forgive Dad? I am writing this from my tiny dorm room with 200 bucks left in the account.",
    },
  ];

  return (
    <section className="w-full max-w-3xl mx-auto px-6 py-12 border-t border-border/70 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#991b1b]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#991b1b] dark:text-rose-400 font-semibold">
              Public Vault
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-foreground">
            Letters that just unlocked
          </h3>
        </div>

        <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:text-foreground self-start sm:self-auto p-0 hover:bg-transparent">
          Explore all stories <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {letters.map((item, idx) => (
          <div
            key={idx}
            className="relative p-6 rounded-xl border border-border/80 bg-card text-card-foreground space-y-4 flex flex-col justify-between hover:border-zinc-500/40 transition-colors shadow-sm"
          >
            <Quote className="w-6 h-6 text-muted-foreground/20 absolute top-5 right-5 pointer-events-none" />
            <p className="text-sm sm:text-[15px] leading-relaxed text-foreground/90 italic line-clamp-4 font-normal">
              “{item.excerpt}”
            </p>
            
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pt-4 border-t border-border/50">
              <span className="text-foreground font-semibold">{item.author}</span>
              <span>{item.sealedIn} → {item.unsealedIn}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}