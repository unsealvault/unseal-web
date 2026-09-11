// src/app/privacy/page.tsx
import Link from 'next/link'; 
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  Server, 
  Database, 
  Mail, 
  KeyRound 
} from 'lucide-react';

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-[#991b1b]/20 selection:text-[#991b1b] dark:selection:bg-[#991b1b]/40 dark:selection:text-rose-200 transition-colors duration-300">
      
      {/* Crimson Ambient Glow */}
      <div className="pointer-events-none fixed inset-0 flex justify-center">
        <div className="w-162.5 h-80 bg-[#991b1b]/10 dark:bg-[#991b1b]/15 blur-[140px] rounded-full" />
      </div> 

      {/* Main Content Container (ফিক্সড ন্যাভবারের সাথে স্পেসিং ঠিক রাখতে pt-32 রাখা হয়েছে) */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-20 flex-1">
        
        {/* Page Header */}
        <div className="space-y-3 mb-10 pb-6 border-b border-border/60">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#991b1b]/30 bg-[#991b1b]/5 text-[11px] font-mono text-[#991b1b] dark:text-rose-400 uppercase tracking-widest">
            <ShieldCheck className="size-3.5" />
            <span>Zero-Knowledge Architecture</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
            Privacy Policy
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
            Last updated: September 2026. Built on mathematical trust, not corporate promises.
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground font-light">
          
          {/* Key Principle Card */}
          <div className="rounded-2xl border border-[#991b1b]/30 bg-[#991b1b]/5 dark:bg-[#991b1b]/10 p-5 sm:p-6 text-foreground space-y-2 shadow-xs">
            <div className="flex items-center gap-2.5 text-[#991b1b] dark:text-rose-400 font-medium text-sm sm:text-base">
              <Lock className="size-4 shrink-0" />
              <span className="font-serif">We cannot read your letters. Even if we are forced to.</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-6.5">
              Every message sealed on Unseal is encrypted directly inside your web browser using Web Crypto API (AES-GCM-256) before touching our networks. The server only ever stores an unreadable cryptographic ciphertext.
            </p>
          </div>

          {/* ১. কী ডেটা সংগ্রহ করা হয় */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-medium text-foreground flex items-center gap-2.5">
              <EyeOff className="size-4 text-[#991b1b] dark:text-rose-400" />
              <span>1. What Data We Collect</span>
            </h2>
            <p>
              We collect the absolute minimum required to execute the time-capsule protocol:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm font-mono text-muted-foreground/90">
              <li><strong className="text-foreground font-medium">Recipient Email:</strong> Used strictly to dispatch the unseal link on the target date.</li>
              <li><strong className="text-foreground font-medium">Encrypted Payload:</strong> Ciphertext blob of your message and metadata.</li>
              <li><strong className="text-foreground font-medium">Delivery Timestamp:</strong> The target release date and time.</li>
              <li><strong className="text-foreground font-medium">Public Vault Preferences:</strong> Optional pen name and public visibility flag (only if chosen).</li>
            </ul>
          </section>

          {/* ২. কী কখনো সংরক্ষণ করা হয় না */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-medium text-foreground flex items-center gap-2.5">
              <Server className="size-4 text-[#991b1b] dark:text-rose-400" />
              <span>2. What We Never Store</span>
            </h2>
            <p>
              Because of client-side zero-knowledge encryption, we never receive, possess, or log:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm font-mono text-muted-foreground/90">
              <li>Plaintext copies of your letter content or attachments.</li>
              <li>Your decryption passwords, passphrases, or private master keys.</li>
              <li>Tracking cookies or third-party behavioral analytics trackers.</li>
            </ul>
          </section>

          {/* ৩. ডেটা রিটেনশন ও মোছার নীতিমালা */}
          <section className="space-y-3">
            <h2 className="font-serif text-lg font-medium text-foreground flex items-center gap-2.5">
              <Database className="size-4 text-[#991b1b] dark:text-rose-400" />
              <span>3. Data Retention & Deletion</span>
            </h2>
            <p>
              Once a letter is dispatched and unsealed by the recipient, you retain the ability to permanently burn and purge the record. We do not sell, monetize, or train artificial intelligence models on your encrypted vaults.
            </p>
          </section>

          {/* ৪. যোগাযোগ ও অনুসন্ধান */}
          <section className="space-y-2 border-t border-border/60 pt-6">
            <h2 className="font-serif text-base font-medium text-foreground flex items-center gap-2">
              <Mail className="size-4 text-[#991b1b] dark:text-rose-400" />
              <span>Contact & Inquiries</span>
            </h2>
            <p className="text-xs leading-relaxed">
              If you have cryptographic or architectural privacy queries, contact the team at{' '}
              <a 
                href="mailto:unseal.vault@gmail.com" 
                className="font-mono text-[#991b1b] dark:text-rose-400 underline underline-offset-4 hover:opacity-80"
              >
                unseal.vault@gmail.com
              </a>.
            </p>
          </section>

        </div>
      </div> 
    </main>
  );
}