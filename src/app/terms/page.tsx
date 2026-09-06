// src/app/terms/page.tsx
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { FileText, Hourglass, ShieldAlert, KeyRound } from 'lucide-react';

export default function TermsPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-[#991b1b]/20 selection:text-[#991b1b] dark:selection:bg-[#991b1b]/40 dark:selection:text-rose-200 transition-colors duration-300">
      
      {/* Crimson Ambient Glow */}
      <div className="pointer-events-none fixed inset-0 flex justify-center">
        <div className="w-150 h-80 bg-[#991b1b]/10 dark:bg-[#991b1b]/15 blur-[130px] rounded-full" />
      </div>

      <Navbar />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 py-12 flex-1">
        
        {/* Page Header */}
        <div className="space-y-3 mb-10 pb-6 border-b border-border/60">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-muted/40 text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
            <FileText className="w-3.5 h-3.5 text-[#991b1b] dark:text-rose-400" />
            Protocol Governance
          </div>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-light">
            Effective Date: September 2026. Rules governing the transmission of memories through time.
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Hourglass className="w-4 h-4 text-[#991b1b]" />
              1. The Time-Lock Commitment
            </h2>
            <p>
              By sealing a letter on Unseal, you acknowledge that a time lock is binding. Once sealed, a letter cannot be accelerated or delivered prematurely by request. The protocol respects the designated passage of time.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-[#991b1b]" />
              2. Custody of Credentials & Passwords
            </h2>
            <p>
              Unseal enforces a strict Zero-Knowledge model. If you use client-side password protection and lose or forget the secret passphrase, <strong>we cannot recover your message</strong>. No backdoor exists.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#991b1b]" />
              3. Acceptable Use Policy
            </h2>
            <p>
              You agree not to utilize Unseal for:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Unsolicited spam, harassment, or targeted threats.</li>
              <li>Transmission of malware, keyloggers, or malicious payloads.</li>
              <li>Circumventing legal frameworks or facilitating unlawful activities.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-foreground">
              4. Delivery Disclaimers
            </h2>
            <p>
              We guarantee rigorous automated scheduling; however, email delivery depends on upstream mailbox providers (e.g., Google, Outlook). Ensure the destination inbox remains valid and accessible across the selected time horizon.
            </p>
          </section>

          <section className="space-y-2 border-t border-border/50 pt-6">
            <h2 className="text-base font-semibold text-foreground">Changes to Protocol</h2>
            <p className="text-xs">
              We may update these terms as cryptographic standards evolve. Continued use of Unseal constitutes agreement to the current terms.
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </main>
  );
}