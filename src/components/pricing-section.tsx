// components/pricing-section.tsx
import { Check, Sparkles, Coffee, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PRICING_PLANS = [
  {
    name: 'Standard Capsule',
    price: '$0',
    frequency: 'Free forever',
    description: 'Perfect for sending encrypted thoughts and letters to your near future.',
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
    description: 'Lock away memories for life milestones deep into the future.',
    badge: 'Most Popular',
    features: [
      '5 to 10+ years extended scheduling',
      'Automated scheduler infrastructure maintenance',
      'Up to 5 attached media files (Free launch access)',
      'Immutable cryptographic time lock',
      'No recurring subscriptions',
    ],
    buttonText: 'Unlock Long-Term Vault',
    // আপনার Lemon Squeezy প্রোডাক্ট লিংক
    buttonHref: 'https://unseal.lemonsqueezy.com/buy/vault-pass',
    isPrimary: true,
  },
  {
    name: 'Patron Supporter',
    price: '$3.00',
    frequency: 'Voluntary gift',
    description: 'Keep the Unseal zero-knowledge servers running ad-free.',
    badge: 'Community',
    features: [
      'Fuel automated cron runners & email APIs',
      'Support independent, tracker-free software',
      'Buy the developer a warm cup of coffee',
    ],
    buttonText: 'Buy Us a Coffee',
    // আপনার Buy Me a Coffee পেজ লিংক
    buttonHref: 'https://buymeacoffee.com/unseal',
    isPrimary: false,
  },
];

export function PricingSection() {
  return (
    <section className="relative py-20 px-4 max-w-6xl mx-auto">
      <div className="text-center space-y-3 mb-14">
        <span className="text-[11px] font-mono tracking-[0.25em] text-[#991b1b] dark:text-rose-400 uppercase font-semibold">
          Transparent Protocols
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-foreground">
          Honest pricing. No subscriptions.
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Unseal does not sell your personal data or run tracking ads. Our core services remain free, sustained by micro-payments and community backing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {PRICING_PLANS.map((plan, index) => (
          <div
            key={index}
            className={`relative flex flex-col justify-between rounded-2xl p-6 sm:p-8 border transition-all ${
              plan.isPrimary
                ? 'bg-card border-[#991b1b]/50 shadow-2xl shadow-[#991b1b]/10 dark:shadow-[#991b1b]/20 scale-[1.02]'
                : 'bg-card/60 border-border hover:border-zinc-500/40 shadow-sm'
            }`}
          >
            {plan.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-[#991b1b] text-white shadow-md">
                {plan.badge}
              </span>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-foreground">{plan.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 min-h-[32px]">
                  {plan.description}
                </p>
              </div>

              <div className="flex items-baseline gap-1.5 pt-2">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
                  {plan.price}
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  / {plan.frequency}
                </span>
              </div>

              <div className="h-px bg-border/60 my-4" />

              <ul className="space-y-2.5 text-xs text-muted-foreground">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="size-3.5 text-emerald-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 mt-auto">
              <a href={plan.buttonHref} target={plan.buttonHref.startsWith('http') ? '_blank' : '_self'} rel="noreferrer">
                <Button
                  className={`w-full text-xs tracking-wider uppercase font-medium h-10 cursor-pointer ${
                    plan.isPrimary
                      ? 'bg-[#991b1b] hover:bg-[#7f1d1d] text-white shadow-md shadow-[#991b1b]/30'
                      : 'border border-border bg-background text-foreground hover:bg-muted'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>{plan.buttonText}</span>
                    <ArrowRight className="size-3.5" />
                  </span>
                </Button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}