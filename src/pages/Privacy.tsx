import { QrCode, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

export default function Privacy() {
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
          Privacy Policy
        </h1>

        <div className="prose prose-invert max-w-none">
          <p className="text-[#f0f0f0]/70 text-sm sm:text-base leading-relaxed mb-6">
            QR Nexus respects your privacy. This policy explains how we handle your data.
            Last updated: June 2026.
          </p>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#f0f0f0] mb-3">Data Collection</h2>
            <p className="text-[#f0f0f0]/60 text-sm leading-relaxed">
              We do not collect any personal data. All QR code generation happens entirely in your browser.
              No information is sent to our servers. Your data — URLs, contact details, WiFi passwords, 
              and any other content you enter — stays on your device and is never transmitted over the internet.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#f0f0f0] mb-3">Cookies</h2>
            <p className="text-[#f0f0f0]/60 text-sm leading-relaxed">
              We use minimal cookies for essential site functionality. We do not use tracking cookies
              or third-party analytics that could identify you personally.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#f0f0f0] mb-3">Third-Party Services</h2>
            <p className="text-[#f0f0f0]/60 text-sm leading-relaxed">
              We may display advertisements through third-party ad networks (such as Google AdSense).
              These services may use cookies and similar technologies per their own privacy policies.
              We do not share any of your data with these services since we never collect it in the first place.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold text-[#f0f0f0] mb-3">Changes to This Policy</h2>
            <p className="text-[#f0f0f0]/60 text-sm leading-relaxed">
              We may update this privacy policy from time to time. Any changes will be posted on this page
              with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#f0f0f0] mb-3">Contact</h2>
            <p className="text-[#f0f0f0]/60 text-sm leading-relaxed">
              For privacy questions or concerns, please contact us at{' '}
              <a href="mailto:privacy@qrnexus.app" className="text-[#4d6bfa] hover:underline">
                privacy@qrnexus.app
              </a>
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
