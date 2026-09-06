// src/app/page.tsx
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer'; 
import { FeaturesGuide } from '@/components/features-guide';
import { PublicVaultTeaser } from '@/components/public-vault-teaser';
import { FaqSection } from '@/components/faq-accordion';
import { LetterComposer } from '@/components/letter-composer';

export default function UnsealHome() {
  return (
    <main className="relative min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-[#991b1b]/20 selection:text-[#991b1b] dark:selection:bg-[#991b1b]/40 dark:selection:text-rose-200 transition-colors duration-300">
      {/* Crimson Wax Ambient Glow */}
      <div className="pointer-events-none fixed inset-0 flex justify-center">
        <div className="w-150 h-80 bg-[#991b1b]/10 dark:bg-[#991b1b]/15 blur-[130px] rounded-full" />
      </div>

      <Navbar />

      {/* Main Composer Section */}
      <section className="relative z-10 w-full max-w-xl mx-auto px-4 py-8 flex-1 flex flex-col justify-center">
        <LetterComposer />
      </section>

      {/* Information & Community Sections */}
      <FeaturesGuide />
      <PublicVaultTeaser />
      <FaqSection />

      <Footer />
    </main>
  );
}