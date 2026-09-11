
import { FaqSection } from "@/components/faq-accordion"; 
import UnsealHero from "@/components/hero-banner";
import { HowItWorks } from "@/components/how-it-works"; 
import { PublicVaultTeaser } from "@/components/public-vault-teaser";
import QuoteBanner from "@/components/quote-banner";
import ZeroKnowledgeSection from "@/components/zero-knowledge-section";

export default function HomePage() {
  return (
    <main>
      <section className="relative">  
        <UnsealHero />
        <HowItWorks />
        <ZeroKnowledgeSection />
        <PublicVaultTeaser />
        <FaqSection />
        <QuoteBanner /> 
      </section>
    </main>
  );
}