// components/faq-accordion.tsx
import { HelpCircle } from 'lucide-react';

export function FaqSection() {
  const faqs = [
    {
      q: "Can the Unseal team read my letters?",
      a: "No. Your messages and attached files are locked using client-side Zero-Knowledge encryption. The cryptographic keys never touch our servers in plain text.",
    },
    {
      q: "What if my destination email changes?",
      a: "When your capsule is sealed, you receive an emergency recovery token. You can use it at any point before delivery to securely update the recipient address.",
    },
    {
      q: "Can I cancel or permanently delete a letter?",
      a: "Yes. Using your original confirmation link or recovery key, you can permanently burn and purge the capsule from the vault before its unseal date.",
    },
  ];

  return (
    <section className="w-full max-w-3xl mx-auto px-6 py-12 border-t border-border/70 space-y-8 mb-12">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#991b1b]" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#991b1b] dark:text-rose-400 font-semibold">
            FAQ
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-foreground">
          Frequently asked questions
        </h3>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="p-5 sm:p-6 rounded-xl border border-border/80 bg-card text-card-foreground space-y-2 shadow-xs">
            <h4 className="text-sm sm:text-base font-semibold text-foreground tracking-tight">{faq.q}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}