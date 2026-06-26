import { QrCode, ArrowRight } from 'lucide-react';

export default function Hero() {
  const scrollToGenerator = () => {
    document.querySelector('#generate')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4d6bfa]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-8 items-center">
          {/* Left Column - Content */}
          <div className="animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] font-extrabold text-[#f0f0f0] leading-[1.1] tracking-tight">
              <span className="text-gradient">Free</span> QR Code
              <br />
              Generator
            </h1>

            {/* SEO H2 - visually hidden */}
            <span className="sr-only">Best Online QR Code Maker with Logo Support</span>

            <p className="mt-5 text-base sm:text-lg text-[#f0f0f0]/70 max-w-[520px] leading-relaxed">
              Create custom QR codes for URLs, WiFi, contact cards, email, phone & more.{' '}
              <span className="text-[#f0f0f0]/90 font-medium">No signup required</span> — 100% private client-side generation.
            </p>

            {/* Stats */}
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#f0f0f0]/50">
              <span>10,000+ QR Codes Generated Daily</span>
              <span className="hidden sm:inline text-[#f0f0f0]/20">·</span>
              <span className="hidden sm:inline">100% Free & Private</span>
              <span className="hidden sm:inline text-[#f0f0f0]/20">·</span>
              <span className="hidden sm:inline">PNG, SVG, PDF Export</span>
            </div>

            {/* CTA */}
            <button
              onClick={scrollToGenerator}
              className="mt-8 btn-primary inline-flex items-center gap-2 px-8 py-4 text-base bg-glow"
            >
              Generate QR Code
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column - Visual */}
          <div className="hidden lg:flex items-center justify-center relative">
            {/* Glow behind QR */}
            <div className="absolute w-[400px] h-[400px] bg-[#4d6bfa]/20 rounded-full blur-[80px] pointer-events-none" />

            {/* Rotating QR visual */}
            <div className="relative animate-rotate-slow">
              <div className="w-[280px] h-[280px] xl:w-[320px] xl:h-[320px] rounded-3xl bg-gradient-to-br from-[#4d6bfa] to-[#8b5cf6] p-1 shadow-2xl">
                <div className="w-full h-full rounded-3xl bg-[#0a0a0f] flex items-center justify-center">
                  <QrCode className="w-40 h-40 xl:w-48 xl:h-48 text-gradient" strokeWidth={1} />
                </div>
              </div>

              {/* Floating badges */}
              <span className="absolute -top-3 -right-3 bg-white/5 border border-white/10 text-[#f0f0f0]/60 text-xs px-3 py-1 rounded-full animate-float">
                PNG
              </span>
              <span className="absolute top-1/4 -left-8 bg-white/5 border border-white/10 text-[#f0f0f0]/60 text-xs px-3 py-1 rounded-full animate-float-delay-1">
                SVG
              </span>
              <span className="absolute bottom-1/4 -right-6 bg-white/5 border border-white/10 text-[#f0f0f0]/60 text-xs px-3 py-1 rounded-full animate-float-delay-2">
                PDF
              </span>
              <span className="absolute -bottom-2 left-1/4 bg-white/5 border border-white/10 text-[#f0f0f0]/60 text-xs px-3 py-1 rounded-full animate-float-delay-3">
                Custom Logo
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
