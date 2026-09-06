import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ShieldCheck, Lock, EyeOff, Server, Database } from 'lucide-react';

export default function PrivacyPage() {
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
            <ShieldCheck className="w-3.5 h-3.5 text-[#991b1b] dark:text-rose-400" />
            Zero-Knowledge Architecture
          </div>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-light">
            Last updated: September 2026. Built on mathematical trust, not corporate promises.
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
          
          {/* Key Principle Card */}
          <div className="rounded-xl border border-[#991b1b]/30 bg-[#991b1b]/5 p-5 text-foreground space-y-2">
            <div className="flex items-center gap-2 text-[#991b1b] dark:text-rose-400 font-medium text-sm">
              <Lock className="w-4 h-4" />
              <span>We cannot read your letters. Even if we are forced to.</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every message sealed on Unseal is encrypted directly inside your web browser using Web Crypto API (AES-GCM-256) before touching our networks. The server only ever stores an unreadable cryptographic ciphertext.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-[#991b1b]" />
              1. What Data We Collect
            </h2>
            <p>
              We collect the absolute minimum required to execute the time-capsule protocol:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>Recipient Email:</strong> Used strictly to dispatch the unseal link on the target date.</li>
              <li><strong>Encrypted Payload:</strong> Ciphertext blob of your message and metadata.</li>
              <li><strong>Delivery Timestamp:</strong> The target release date and time.</li>
              <li><strong>Public Vault Preferences:</strong> Anonymous nickname and public flag (only if chosen).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Server className="w-4 h-4 text-[#991b1b]" />
              2. What We Never Store
            </h2>
            <p>
              Because of client-side encryption, we never receive, possess, or log:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Plaintext copies of your letter content.</li>
              <li>Your decryption passwords or private master keys.</li>
              <li>Tracking cookies or third-party behavioral trackers.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Database className="w-4 h-4 text-[#991b1b]" />
              3. Data Retention & Deletion
            </h2>
            <p>
              Once a letter is dispatched and unsealed by the recipient, you retain the ability to purge the record. We do not sell, monetize, or train AI models on your encrypted vaults.
            </p>
          </section>

          <section className="space-y-2 border-t border-border/50 pt-6">
            <h2 className="text-base font-semibold text-foreground">Contact & Inquiries</h2>
            <p className="text-xs">
              If you have cryptographic or architectural privacy queries, contact the team at <span className="font-mono text-foreground">unseal.vault@gmail.com</span>.
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </main>
  );
}