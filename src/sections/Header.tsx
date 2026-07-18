import { useState, useEffect } from 'react';
import { QrCode, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Generate', href: '#generate' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <QrCode className="w-6 h-6 text-[#4d6bfa]" />
          <span className="text-[#f0f0f0] font-bold text-lg">QRGen by Adwyzors</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-[#f0f0f0]/60 hover:text-[#f0f0f0] text-sm font-medium transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA + Mobile Menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('#generate')}
            className="hidden sm:block bg-[#4d6bfa] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#3d5bea] transition-colors"
          >
            Generate QR
          </button>
          <button
            className="md:hidden text-[#f0f0f0] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-lg border-t border-white/5">
          <nav className="flex flex-col p-4 gap-2">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-[#f0f0f0]/70 hover:text-[#f0f0f0] text-sm font-medium py-3 px-4 rounded-lg hover:bg-white/5 transition-all text-left"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('#generate')}
              className="bg-[#4d6bfa] text-white px-4 py-3 rounded-lg text-sm font-semibold hover:bg-[#3d5bea] transition-colors mt-2"
            >
              Generate QR Code
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
