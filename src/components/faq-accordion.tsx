'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  HelpCircle,
  MessageSquareQuote,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: '01',
    question: 'Can anyone at Unseal read my letters?',
    answer:
      'Never. Your letters are encrypted locally in your web browser using client-side AES-GCM-256 before leaving your device. We only store encrypted ciphertext on the server; even if our database were breached, nobody could read your words without your key.',
  },
  {
    id: '02',
    question: 'What if my destination email changes in the future?',
    answer:
      'When your letter is sealed, an emergency recovery key is generated. You can securely authenticate with that key anytime prior to the unlock date to update the recipient address.',
  },
  {
    id: '03',
    question: 'Can I cancel or burn a letter before delivery?',
    answer:
      'Yes. Through your cryptographically verified recovery key, you can initiate a permanent burn action to purge the payload from the vault forever.',
  },
  {
    id: '04',
    question: 'How does the Public Vault work?',
    answer:
      'If you toggle the visibility to "Public, Anonymous", your letter will be delivered privately to your inbox first, then simultaneously unsealed on the community archive without revealing your identity.',
  },
  {
    id: '05',
    question: 'How far into the future can I seal a capsule?',
    answer:
      'You can time-lock a capsule anywhere from 6 months up to 5 years. Once locked into the time protocol, the delivery timer cannot be accelerated by anyone.',
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? null : index,
    );
  };

  return (
    <section
      id="faq"
      className="relative w-full overflow-hidden border-t border-border/60 bg-background px-4 py-16 text-foreground transition-colors duration-300 sm:px-6 sm:py-20 md:px-8 lg:px-12 lg:py-24 dark:bg-[#07080a] dark:text-[#fbf8f3]"
    >
      <div className="pointer-events-none absolute -left-45 top-1/3 h-90 w-90 rounded-full bg-[#991b1b]/5 blur-[130px] dark:bg-red-950/15" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="space-y-5 lg:sticky lg:top-28 lg:col-span-5 lg:space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#991b1b]/30 bg-[#991b1b]/5 px-3 py-1 text-[10px] font-mono tracking-wider text-[#991b1b] dark:text-rose-400 sm:text-xs">
            <HelpCircle className="size-3.5" />
            <span>KNOWLEDGE BASE</span>
          </div>

          <h2 className="font-serif text-3xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-5xl dark:text-[#fbf8f3]">
            Frequently Asked
            <br className="hidden sm:inline" /> Questions
          </h2>

          <p className="max-w-md text-xs font-light leading-relaxed text-muted-foreground sm:text-sm">
            Everything you need to know about zero-knowledge encryption,
            time-lock protocols, and cryptographic keys.
          </p>

          <div className="max-w-md space-y-3 rounded-2xl border border-border/70 bg-card/60 p-5 shadow-xs backdrop-blur-sm sm:p-6">
            <div className="flex items-center gap-3 text-[#991b1b] dark:text-rose-400">
              <MessageSquareQuote className="size-5" />
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider sm:text-xs">
                Still have questions?
              </span>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground">
              Read our technical whitepaper or reach out to our team directly.
            </p>

            <Button 
              variant="outline"
              size="sm"
              className="h-9 cursor-pointer rounded-full px-4 text-xs font-mono"
            >
              <Link href="mailto:unseal.vault@gmail.com">
                Contact Support
              </Link>
            </Button>
          </div>
        </div>

        <div className="space-y-3 lg:col-span-7 sm:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.id}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-[#991b1b]/50 bg-card shadow-lg shadow-[#991b1b]/5 dark:border-rose-500/40'
                    : 'border-border/70 bg-card/40 hover:border-border'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer select-none items-center justify-between gap-3 px-4 py-4 text-left sm:px-6 sm:py-5"
                >
                  <div className="flex min-w-0 items-center gap-3 sm:gap-3.5">
                    <span className="shrink-0 font-mono text-[10px] font-semibold text-[#991b1b] dark:text-rose-400 sm:text-xs">
                      {faq.id}
                    </span>

                    <span className="text-sm font-medium tracking-tight text-foreground sm:text-base">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-300 ${
                      isOpen
                        ? 'rotate-180 border-[#991b1b]/30 bg-[#991b1b]/10 text-[#991b1b] dark:text-rose-400'
                        : 'text-muted-foreground'
                    }`}
                  >
                    <ChevronDown className="size-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-border/40 px-4 pb-5 pt-4 pl-12 sm:px-6 sm:pb-6 sm:pl-16">
                    <p className="text-xs font-light leading-relaxed text-muted-foreground sm:text-sm">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex items-center gap-2 px-1 pt-2 text-[9px] font-mono text-muted-foreground sm:pt-3 sm:text-xs">
            <ShieldCheck className="size-4 shrink-0 text-[#991b1b] dark:text-rose-400" />
            <span>Audited &amp; verified zero-knowledge protocol</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;