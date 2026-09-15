import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PricingPlan {
  name: string;
  price: string;
  frequency: string;
  description: string;
  badge: string | null;
  features: string[];
  buttonText: string;
  buttonHref: string;
  isPrimary: boolean;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Standard Capsule',
    price: '$0',
    frequency: 'Free forever',
    description:
      'Perfect for sending encrypted thoughts and letters to your near future.',
    badge: null,
    features: [
      'Text letters up to 3 years ahead',
      'Client-side AES-256 encryption',
      'Delivery to self or loved ones',
      'Public or Private Vault selection',
      'Zero ads & strict privacy',
    ],
    buttonText: 'Write a Letter',
    buttonHref: '/',
    isPrimary: false,
  },
  {
    name: 'Long-Term Vault Pass',
    price: '$2.99',
    frequency: 'One-time payment',
    description:
      'Lock away memories for life milestones deep into the future.',
    badge: 'Most Popular',
    features: [
      '5 to 10+ years extended scheduling',
      'Automated scheduler infrastructure maintenance',
      'Up to 5 attached media files (Free launch access)',
      'Immutable cryptographic time lock',
      'No recurring subscriptions',
    ],
    buttonText: 'Unlock Long-Term Vault',
    buttonHref: 'https://unseal.lemonsqueezy.com/buy/vault-pass',
    isPrimary: true,
  },
  {
    name: 'Patron Supporter',
    price: '$3.00',
    frequency: 'Voluntary gift',
    description:
      'Keep the Unseal zero-knowledge servers running ad-free.',
    badge: 'Community',
    features: [
      'Fuel automated cron runners & email APIs',
      'Support independent, tracker-free software',
      'Buy the developer a warm cup of coffee',
    ],
    buttonText: 'Buy Us a Coffee',
    buttonHref: 'https://buymeacoffee.com/unseal',
    isPrimary: false,
  },
];

const PricingSection = () => {
  return (
    <section className="relative w-full overflow-hidden border-t border-border/60 bg-background px-4 py-16 text-foreground transition-colors duration-300 sm:px-6 sm:py-20 md:px-8 lg:px-12 lg:py-24 dark:bg-[#07080a] dark:text-[#fbf8f3]">
      <div className="pointer-events-none absolute left-1/2 top-24 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#991b1b]/5 blur-[120px] dark:bg-red-950/15 sm:h-[400px] sm:w-[400px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-2xl space-y-3 text-center sm:mb-12 lg:mb-14">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#991b1b] dark:text-rose-400 sm:text-[11px] sm:tracking-[0.25em]">
            Transparent Protocols
          </span>

          <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground sm:text-4xl dark:text-[#fbf8f3]">
            Honest pricing. No subscriptions.
          </h2>

          <p className="mx-auto max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">
            Unseal does not sell your personal data or run tracking ads. Our
            core services remain free, sustained by micro-payments and
            community backing.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3 lg:gap-6">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col justify-between rounded-2xl border p-5 transition-all duration-300 sm:p-6 lg:p-7 ${
                plan.isPrimary
                  ? 'border-[#991b1b]/50 bg-card shadow-xl shadow-[#991b1b]/10 md:scale-[1.02] dark:border-rose-500/40 dark:shadow-[#991b1b]/20'
                  : 'border-border bg-card/60 shadow-sm hover:border-zinc-500/40 dark:bg-white/[0.025]'
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#991b1b] px-3 py-1 text-[9px] font-mono font-semibold uppercase tracking-wider text-white shadow-md">
                  {plan.badge}
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-medium text-foreground sm:text-lg">
                    {plan.name}
                  </h3>

                  <p className="mt-1 min-h-[36px] text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-1.5 pt-1">
                  <span className="font-serif text-3xl font-bold text-foreground sm:text-4xl dark:text-[#fbf8f3]">
                    {plan.price}
                  </span>

                  <span className="text-[10px] font-mono text-muted-foreground sm:text-xs">
                    / {plan.frequency}
                  </span>
                </div>

                <div className="my-3 h-px bg-border/60" />

                <ul className="space-y-2.5 text-[11px] text-muted-foreground sm:text-xs">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 leading-relaxed"
                    >
                      <Check className="mt-0.5 size-3.5 shrink-0 text-emerald-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 pt-1">
                <a
                  href={plan.buttonHref}
                  target={plan.buttonHref.startsWith('http') ? '_blank' : '_self'}
                  rel={
                    plan.buttonHref.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className="block"
                >
                  <Button
                    className={`h-10 w-full cursor-pointer text-[10px] font-medium uppercase tracking-wider transition-all sm:text-xs ${
                      plan.isPrimary
                        ? 'bg-[#991b1b] text-white shadow-md shadow-[#991b1b]/30 hover:bg-[#7f1d1d]'
                        : 'border border-border bg-background text-foreground hover:bg-muted'
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span>{plan.buttonText}</span>
                      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground sm:text-[10px]">
            Secure payments · No recurring charges · Privacy first
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;