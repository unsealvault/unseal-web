// components/how-it-works.tsx
import { PenLine, Shield, Clock, Lock, ArrowRight } from "lucide-react";

interface StepItem {
  step: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const steps: StepItem[] = [
  {
    step: "01",
    title: "Write",
    description: "Write what you don't want to forget.",
    icon: PenLine,
  },
  {
    step: "02",
    title: "Seal",
    description: "Your message is encrypted before it leaves your device.",
    icon: Shield,
  },
  {
    step: "03",
    title: "Wait",
    description: "Time-lock it for a date that matters.",
    icon: Clock,
  },
  {
    step: "04",
    title: "Unseal",
    description: "When the moment arrives, your message becomes yours again.",
    icon: Lock,
  },
];

export function HowItWorks() {
  return (
    <section className="relative w-full bg-background py-24 px-6 sm:px-8 lg:px-12 text-foreground overflow-hidden transition-colors duration-300">
      
      {/* ব্যাকগ্রাউন্ড রেডিশ অ্যাম্বিয়েন্ট গ্লো (লাইট ও ডার্ক অ্যাডাপ্টিভ) */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-100 w-162.5 rounded-full bg-[#991b1b]/5 dark:bg-[#991b1b]/15 blur-[130px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* হেডার সেকশন */}
        <div className="text-center space-y-3 mb-16 sm:mb-20">
          <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.35em] text-[#991b1b] dark:text-rose-400 font-semibold">
            HOW IT WORKS
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-foreground">
            Four Simple Steps
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-light max-w-xl mx-auto">
            From your thoughts to a sealed time capsule — in just a few clicks.
          </p>
        </div>

        {/* ৪-টি স্টেপ গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="relative flex flex-col items-center text-center group"
            >
              {/* আইকন সার্কেল এবং অ্যারো কানেক্টর */}
              <div className="relative w-full flex items-center justify-center mb-6">
                
                {/* আইকন সার্কেল */}
                <div className="relative flex size-15 sm:size-16 items-center justify-center rounded-full border border-[#991b1b]/20 bg-[#991b1b]/5 text-[#991b1b] shadow-[0_0_20px_rgba(153,27,27,0.08)] dark:border-rose-500/30 dark:bg-rose-950/20 dark:text-rose-400 dark:shadow-[0_0_25px_rgba(225,29,72,0.15)] transition-all duration-300 group-hover:border-[#991b1b]/60 dark:group-hover:border-rose-400/60 group-hover:scale-105">
                  <item.icon className="size-5 sm:size-6 stroke-[1.6]" />
                </div>

                {/* কানেক্টর অ্যারো (ডেস্কটপে প্রতি ধাপের মাঝে থাকবে, শেষেরটি বাদে) */}
                {index !== steps.length - 1 && (
                  <div className="hidden lg:flex absolute left-[calc(50%+44px)] right-[calc(-50%+44px)] top-1/2 -translate-y-1/2 items-center justify-center pointer-events-none">
                    <ArrowRight className="size-4 text-[#991b1b]/35 dark:text-rose-400/40 stroke-[1.5]" />
                  </div>
                )}
              </div>

              {/* স্টেপ নম্বর ও টাইটেল */}
              <div className="flex items-baseline gap-2 mb-2.5">
                <span className="font-mono text-sm sm:text-base font-semibold text-[#991b1b] dark:text-rose-400">
                  {item.step}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-medium text-foreground tracking-wide">
                  {item.title}
                </h3>
              </div>

              {/* ডেসক্রিপশন */}
              <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed max-w-52.5">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;