// src/app/terms/page.tsx
import Link from 'next/link';
import { 
  FileText, 
  Hourglass, 
  ShieldAlert, 
  KeyRound, 
  Clock, 
  Globe, 
  Scale 
} from 'lucide-react';

export default function TermsPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-[#991b1b]/20 selection:text-[#991b1b] dark:selection:bg-[#991b1b]/40 dark:selection:text-rose-200 transition-colors duration-300">
      
      {/* Crimson Ambient Glow */}
      <div className="pointer-events-none fixed inset-0 flex justify-center">
        <div className="w-162.5 h-80 bg-[#991b1b]/10 dark:bg-[#991b1b]/15 blur-[140px] rounded-full" />
      </div>

      {/* Main Content (ফিক্সড ন্যাভবারের জন্য pt-32 রাখা হয়েছে) */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-20 flex-1">
        
        {/* Page Header */}
        <div className="space-y-3 mb-10 pb-6 border-b border-border/60">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#991b1b]/30 bg-[#991b1b]/5 text-[11px] font-mono text-[#991b1b] dark:text-rose-400 uppercase tracking-widest">
            <FileText className="size-3.5" />
            <span>Protocol Governance</span>
          </div>
          
          <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
            Terms of Service
          </h1>
          
          <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
            Effective Date: September 2026. Rules governing the transmission of memories through time.
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground font-light">

          {/* ১. টাইম-লক প্রতিশ্রুতি */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-medium text-foreground flex items-center gap-2.5">
              <Hourglass className="size-4 text-[#991b1b] dark:text-rose-400" />
              <span>1. The Time-Lock Commitment</span>
            </h2>
            <p>
              By sealing a letter on Unseal, you acknowledge that a time lock is binding. Once sealed, a letter cannot be accelerated or delivered prematurely by request. The protocol deterministically respects the designated passage of time.
            </p>
          </section>

          {/* ২. পাসওয়ার্ড ও ক্রেডেনশিয়াল */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-medium text-foreground flex items-center gap-2.5">
              <KeyRound className="size-4 text-[#991b1b] dark:text-rose-400" />
              <span>2. Custody of Credentials & Passwords</span>
            </h2>
            <p>
              Unseal enforces a strict Zero-Knowledge model. If you use client-side passphrase protection and lose or forget the secret passphrase or emergency recovery key, <strong className="text-foreground font-medium">we cannot recover your message</strong>. No backdoor exists.
            </p>
          </section>

          {/* ৩. পাবলিক ভল্ট পলিসি */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-medium text-foreground flex items-center gap-2.5">
              <Globe className="size-4 text-[#991b1b] dark:text-rose-400" />
              <span>3. Public Vault Archive Policy</span>
            </h2>
            <p>
              If you explicitly set a capsule&apos;s privacy to <span className="font-mono text-foreground text-xs px-2 py-0.5 rounded bg-muted">Public, Anonymous</span>, you grant Unseal permission to feature the decrypted excerpt on the community ledger once the unlock timer reaches zero. Private capsules are never made public.
            </p>
          </section>

          {/* ৪. ব্যবহারের গ্রহণযোগ্য নীতিমালা */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-medium text-foreground flex items-center gap-2.5">
              <ShieldAlert className="size-4 text-[#991b1b] dark:text-rose-400" />
              <span>4. Acceptable Use Policy</span>
            </h2>
            <p>
              You agree not to utilize Unseal infrastructure for:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm font-mono text-muted-foreground/90">
              <li>Unsolicited spam, harassment, or targeted threats.</li>
              <li>Transmission of malware, exploit scripts, or malicious payloads.</li>
              <li>Circumventing legal frameworks or facilitating unlawful activities.</li>
            </ul>
          </section>

          {/* ৫. ডেলিভারি ডিসক্লেইমার */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-medium text-foreground flex items-center gap-2.5">
              <Clock className="size-4 text-[#991b1b] dark:text-rose-400" />
              <span>5. Delivery Disclaimers</span>
            </h2>
            <p>
              We guarantee rigorous automated scheduling at the designated timestamp; however, final email arrival relies on upstream mailbox providers (e.g., Google, Proton, Outlook). Ensure the destination inbox remains active across the selected time horizon.
            </p>
          </section>

          {/* প্রোটোকল পরিবর্তন ও ফুটার নোট */}
          <section className="space-y-2 border-t border-border/60 pt-6">
            <h2 className="font-serif text-base font-medium text-foreground flex items-center gap-2">
              <Scale className="size-4 text-[#991b1b] dark:text-rose-400" />
              <span>Changes to Protocol</span>
            </h2>
            <p className="text-xs">
              We may update these terms as cryptographic standards evolve. Continued use of Unseal constitutes agreement to the current terms. For privacy details, review our{' '}
              <Link href="/privacy" className="text-[#991b1b] dark:text-rose-400 underline underline-offset-4 hover:opacity-80">
                Privacy Policy
              </Link>.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}