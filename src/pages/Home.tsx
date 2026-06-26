import Header from '@/sections/Header';
import Hero from '@/sections/Hero';
import Generator from '@/sections/Generator';
import AdZone from '@/sections/AdZone';
import Features from '@/sections/Features';
import HowItWorks from '@/sections/HowItWorks';
import UseCases from '@/sections/UseCases';
import FAQ from '@/sections/FAQ';
import Footer from '@/sections/Footer';
import ScrollToTop from '@/sections/ScrollToTop';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Top Banner Ad */}
      <AdZone variant="top" />

      {/* Header */}
      <Header />

      <main>
        {/* Hero */}
        <Hero />

        {/* Generator Tool */}
        <Generator />

        {/* Mid-Content Ad */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-6">
          <AdZone variant="mid" />
        </div>

        {/* Features */}
        <Features />

        {/* How It Works */}
        <HowItWorks />

        {/* Use Cases */}
        <UseCases />

        {/* FAQ */}
        <FAQ />
      </main>

      {/* Bottom Ad */}
      <AdZone variant="bottom" />

      {/* Footer */}
      <Footer />

      {/* Scroll to Top */}
      <ScrollToTop />
    </div>
  );
}
