// components/faq-accordion.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, MessageSquareQuote, ShieldCheck } from 'lucide-react';
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

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative w-full bg-background py-24 px-6 sm:px-8 lg:px-12 text-foreground border-t border-border/60 transition-colors duration-300"
    >
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* বাম পাশ: স্টিকি টাইটেল ও হেল্প কার্ড */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#991b1b]/30 bg-[#991b1b]/5 text-[#991b1b] dark:text-rose-400 text-xs font-mono tracking-wider">
            <HelpCircle className="size-3.5" />
            <span>KNOWLEDGE BASE</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-[1.15]">
            Frequently Asked <br className="hidden sm:inline" /> Questions
          </h2>

          <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-md">
            Everything you need to know about zero-knowledge encryption, time-lock protocols, and cryptographic keys.
          </p>

          {/* হেল্প কার্ড */}
          <div className="p-6 rounded-2xl border border-border/70 bg-card/60 space-y-4 shadow-xs">
            <div className="flex items-center gap-3 text-[#991b1b] dark:text-rose-400">
              <MessageSquareQuote className="size-5" />
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                Still have questions?
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Read our technical whitepaper or reach out to our team directly.
            </p>
            <Button 
              variant="outline"
              size="sm"
              className="rounded-full text-xs font-mono h-9 px-4 cursor-pointer"
            >
              <Link href="mailto:unseal.vault@gmail.com">Contact Support</Link>
            </Button>
          </div>
        </div>

        {/* ডান পাশ: নম্বরযুক্ত অ্যাকর্ডিয়ন তালিকা */}
        <div className="lg:col-span-7 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#991b1b]/50 dark:border-rose-500/40 bg-card shadow-lg shadow-[#991b1b]/5'
                    : 'border-border/70 bg-card/40 hover:border-border'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="font-mono text-xs text-[#991b1b] dark:text-rose-400 font-semibold">
                      {faq.id}
                    </span>
                    <span className="font-medium text-sm sm:text-base text-foreground tracking-tight">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`size-7 rounded-full border border-border flex items-center justify-center transition-transform duration-300 shrink-0 ${
                      isOpen
                        ? 'rotate-180 bg-[#991b1b]/10 text-[#991b1b] dark:text-rose-400 border-[#991b1b]/30'
                        : 'text-muted-foreground'
                    }`}
                  >
                    <ChevronDown className="size-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-muted-foreground leading-relaxed font-light border-t border-border/40 pl-12">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}

          <div className="pt-4 flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <ShieldCheck className="size-4 text-[#991b1b] dark:text-rose-400" />
            <span>Audited & verified zero-knowledge protocol</span>
          </div>
        </div>
      </div>
    </section>
  );
}