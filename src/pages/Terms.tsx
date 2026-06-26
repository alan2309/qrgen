import { QrCode, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Simple Header */}
      <header className="border-b border-white/5">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2.5">
            <QrCode className="w-5 h-5 text-[#4d6bfa]" />
            <span className="text-[#f0f0f0] font-bold text-base">QR Nexus</span>
          </Link>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto px-4 sm:px-6 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[#f0f0f0]/50 hover:text-[#4d6bfa] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Generator
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-[#f0f0f0] mb-6">
          Terms of Service
        </h1>

        <div className="prose prose-invert max-w-none">
          <p className="text-[#f0f0f0]/70 text-sm sm:text-base leading-relaxed mb-6">
            By using QR Nexus, you agree to these terms. Last updated: June 2026.
          </p>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#f0f0f0] mb-3">Acceptable Use</h2>
            <p className="text-[#f0f0f0]/60 text-sm leading-relaxed">
              You may use QR Nexus to generate QR codes for any lawful purpose. You may not use this service
              to create QR codes that link to malicious content, phishing sites, malware, illegal content,
              or any material that violates applicable laws or regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#f0f0f0] mb-3">Disclaimer</h2>
            <p className="text-[#f0f0f0]/60 text-sm leading-relaxed">
              QR Nexus is provided &quot;as is&quot; without any warranties, express or implied. We do not guarantee
              that the service will be uninterrupted, error-free, or that QR codes will be scannable in all
              conditions. You are responsible for testing your QR codes before publishing or printing.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#f0f0f0] mb-3">Limitation of Liability</h2>
            <p className="text-[#f0f0f0]/60 text-sm leading-relaxed">
              To the maximum extent permitted by law, QR Nexus and its operators shall not be liable for
              any direct, indirect, incidental, special, consequential, or punitive damages arising from
              your use of the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#f0f0f0] mb-3">Intellectual Property</h2>
            <p className="text-[#f0f0f0]/60 text-sm leading-relaxed">
              QR codes you generate are yours. You retain all rights to the content you encode in QR codes
              and may use them for personal or commercial purposes without attribution.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#f0f0f0] mb-3">Changes to Terms</h2>
            <p className="text-[#f0f0f0]/60 text-sm leading-relaxed">
              We may modify these terms at any time. Continued use of the service after changes constitutes
              acceptance of the updated terms. Please review this page periodically.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 flex justify-between items-center">
          <p className="text-xs text-[#f0f0f0]/30">QR Nexus. All rights reserved.</p>
          <Link to="/" className="text-xs text-[#4d6bfa] hover:underline">Back to Generator</Link>
        </div>
      </footer>
    </div>
  );
}
