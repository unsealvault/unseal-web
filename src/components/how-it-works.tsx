import { ArrowRight, Clock, Lock, PenLine, Shield } from 'lucide-react';
import { ComponentType } from 'react';

interface StepItem {
  step: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}

const steps: StepItem[] = [
  {
    step: '01',
    title: 'Write',
    description: "Write what you don't want to forget.",
    icon: PenLine,
  },
  {
    step: '02',
    title: 'Seal',
    description: 'Your message is encrypted before it leaves your device.',
    icon: Shield,
  },
  {
    step: '03',
    title: 'Wait',
    description: 'Time-lock it for a date that matters.',
    icon: Clock,
  },
  {
    step: '04',
    title: 'Unseal',
    description: 'When the moment arrives, your message becomes yours again.',
    icon: Lock,
  },
];

const HowItWorks = () => {
  return (
    <section className="relative w-full overflow-hidden bg-background px-4 py-20 text-foreground transition-colors duration-300 sm:px-6 sm:py-24 md:px-8 lg:px-12 lg:py-28 dark:bg-[#07080a] dark:text-[#fbf8f3]">
      {/* Ambient Red Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/5 blur-[100px] sm:h-80 sm:w-[75%] sm:blur-[120px] lg:h-100 lg:w-162.5 lg:blur-[130px] dark:bg-[#991b1b]/15" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl space-y-3 text-center sm:mb-16 md:mb-20">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-[#991b1b] sm:text-xs sm:tracking-[0.35em] dark:text-rose-400">
            HOW IT WORKS
          </p>

          <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl dark:text-[#fbf8f3]">
            Four Simple Steps
          </h2>

          <p className="mx-auto max-w-xl text-xs font-light leading-relaxed text-muted-foreground sm:text-sm md:text-base dark:text-white/50">
            From your thoughts to a sealed time capsule — in just a few clicks.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-4 lg:gap-6">
          {steps.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={item.step} className="group relative flex flex-col items-center text-center">
                {/* Icon + Connector */}
                <div className="relative mb-5 flex w-full items-center justify-center sm:mb-6">
                  {/* Icon Circle */}
                  <div className="relative flex size-14 shrink-0 items-center justify-center rounded-full border border-[#991b1b]/20 bg-[#991b1b]/5 text-[#991b1b] shadow-[0_0_20px_rgba(153,27,27,0.08)] transition-all duration-300 group-hover:scale-105 group-hover:border-[#991b1b]/50 group-hover:bg-[#991b1b]/10 group-hover:shadow-[0_0_25px_rgba(153,27,27,0.15)] sm:size-16 dark:border-rose-500/30 dark:bg-rose-950/20 dark:text-rose-400 dark:shadow-[0_0_25px_rgba(225,29,72,0.15)] dark:group-hover:border-rose-400/60 dark:group-hover:bg-rose-950/30 dark:group-hover:shadow-[0_0_30px_rgba(225,29,72,0.2)]">
                    <Icon className="size-5 stroke-[1.6] sm:size-6" />
                  </div>

                  {/* Desktop Arrow */}
                  {index !== steps.length - 1 && (
                    <div className="pointer-events-none absolute left-[calc(50%+42px)] right-[calc(-50%+42px)] top-1/2 hidden -translate-y-1/2 items-center justify-center lg:flex">
                      <div className="h-px w-full bg-linear-to-r from-[#991b1b]/15 via-[#991b1b]/30 to-[#991b1b]/10 dark:from-rose-500/20 dark:via-rose-500/30 dark:to-rose-500/10" />
                      <ArrowRight className="absolute size-4 shrink-0 bg-background px-0.5 text-[#991b1b]/40 stroke-[1.5] dark:bg-[#07080a] dark:text-rose-400/50" />
                    </div>
                  )}
                </div>

                {/* Step Number + Title */}
                <div className="mb-2 flex items-baseline gap-2">
                  <span className="font-mono text-sm font-semibold text-[#991b1b] sm:text-base dark:text-rose-400">
                    {item.step}
                  </span>

                  <h3 className="font-serif text-lg font-medium tracking-wide text-foreground sm:text-xl dark:text-[#fbf8f3]">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="max-w-60 text-xs font-light leading-relaxed text-muted-foreground sm:max-w-56 sm:text-sm dark:text-white/50">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;