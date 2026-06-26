import { QrCode, Github, Twitter } from 'lucide-react';

const productLinks = [
  { label: 'QR Code Generator', href: '#generate' },
  { label: 'URL QR Code', href: '#generate' },
  { label: 'WiFi QR Code', href: '#generate' },
  { label: 'vCard QR Code', href: '#generate' },
  { label: 'Email QR Code', href: '#generate' },
];

const resourceLinks = [
  { label: 'How to Use', href: '#how-it-works' },
  { label: 'QR Code Types', href: '#features' },
  { label: 'Error Correction Guide', href: '#faq' },
  { label: 'Print Tips', href: '#faq' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#050508] border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <QrCode className="w-5 h-5 text-[#4d6bfa]" />
              <span className="text-[#f0f0f0] font-bold text-base">QR Nexus</span>
            </div>
            <p className="text-sm text-[#f0f0f0]/40 mb-4 max-w-[240px]">
              The free, private QR code generator trusted by thousands.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f0f0f0]/40 hover:text-[#f0f0f0] transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f0f0f0]/40 hover:text-[#f0f0f0] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-[#f0f0f0] mb-4">Product</h4>
            <ul className="space-y-2.5">
              {productLinks.map(link => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-[#f0f0f0]/40 hover:text-[#4d6bfa] transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-[#f0f0f0] mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {resourceLinks.map(link => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-[#f0f0f0]/40 hover:text-[#4d6bfa] transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-[#f0f0f0] mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {legalLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#f0f0f0]/40 hover:text-[#4d6bfa] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-[#f0f0f0]/30">
            QR Nexus. All rights reserved.
          </p>
          <p className="text-xs text-[#f0f0f0]/30">
            Free QR Code Generator
          </p>
        </div>
      </div>
    </footer>
  );
}
