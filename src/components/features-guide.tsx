// components/features-guide.tsx
import { LockKeyhole, Clock, Send } from 'lucide-react';

export function FeaturesGuide() {
  const steps = [
    {
      icon: LockKeyhole,
      title: "1. Write & Encrypt",
      desc: "Write raw thoughts or attach files. Everything is sealed client-side with Zero-Knowledge AES-256 encryption.",
    },
    {
      icon: Clock,
      title: "2. Set the Seal",
      desc: "Pick your unlock date—from 6 months to 5 years. Once locked, no one can force-open it early.",
    },
    {
      icon: Send,
      title: "3. The Unsealing",
      desc: "On the designated day, your private time-capsule automatically lands in the recipient's inbox.",
    },
  ];

  return (
    <section className="w-full max-w-3xl mx-auto px-6 py-14 border-t border-border/70 space-y-14">
      {/* লাইভ স্ট্যাটস স্ট্রিপ */}
      <div className="grid grid-cols-3 gap-6 text-center py-6 px-4 rounded-xl bg-muted/40 border border-border/70 font-mono">
        <div>
          <div className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">18,420+</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Letters Sealed</div>
        </div>
        <div className="border-x border-border/70">
          <div className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">6,190+</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Delivered</div>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-bold text-[#991b1b] dark:text-rose-400 tracking-tight">100%</div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Zero-Knowledge</div>
        </div>
      </div>

      {/* ৩-স্টেপ গাইড */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-xs font-mono font-semibold tracking-widest uppercase text-[#991b1b] dark:text-rose-400">
            Protocol Workflow
          </h3>
          <p className="text-xl sm:text-2xl font-medium tracking-tight text-foreground">
            How your memory travels through time
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border border-border/80 bg-card text-card-foreground space-y-3 shadow-sm hover:border-zinc-500/40 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-[#991b1b]/10 text-[#991b1b] flex items-center justify-center">
                <step.icon className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-foreground">{step.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}