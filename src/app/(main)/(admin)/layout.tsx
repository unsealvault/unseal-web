import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className="relative min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-[#991b1b]/20 selection:text-[#991b1b] dark:selection:bg-[#991b1b]/40 dark:selection:text-rose-200 transition-colors duration-300">

        
        <div className="pointer-events-none fixed inset-0 flex justify-center">
          <div className="w-187.5 h-90 bg-[#991b1b]/10 dark:bg-[#991b1b]/15 blur-[150px] rounded-full" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-32 pb-24 flex-1 space-y-24">

          {children}

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default layout;
