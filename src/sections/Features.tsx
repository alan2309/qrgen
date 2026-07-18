import { Zap, Shield, Palette, Download, Wifi, UserCheck } from 'lucide-react';

const features = [
  {
    icon: <Zap className="w-6 h-6 text-[#4d6bfa]" />,
    title: 'Instant Generation',
    description: 'QR codes generate in real-time as you type. No waiting, no processing delays.',
  },
  {
    icon: <Shield className="w-6 h-6 text-[#4d6bfa]" />,
    title: '100% Private & Secure',
    description: 'All QR codes are generated client-side in your browser. Your data never leaves your device — ever.',
  },
  {
    icon: <Palette className="w-6 h-6 text-[#4d6bfa]" />,
    title: 'Full Customization',
    description: 'Choose custom colors, upload your logo, and adjust error correction. Make QR codes that match your brand.',
  },
  {
    icon: <Download className="w-6 h-6 text-[#4d6bfa]" />,
    title: 'Multiple Formats',
    description: 'Download your QR code as high-resolution PNG, scalable SVG vector, or print-ready PDF.',
  },
  {
    icon: <Wifi className="w-6 h-6 text-[#4d6bfa]" />,
    title: '7 QR Code Types',
    description: 'URL, text, WiFi, vCard contact cards, email, phone calls, and SMS messages — all in one tool.',
  },
  {
    icon: <UserCheck className="w-6 h-6 text-[#4d6bfa]" />,
    title: 'No Signup Required',
    description: 'Use QRGen by Adwyzors immediately without creating an account. No emails, no passwords, no hassle.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#f0f0f0]">
            Why Choose QRGen by Adwyzors?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#f0f0f0]/50 max-w-xl mx-auto">
            The most trusted free QR code generator with everything you need.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="card-glass rounded-2xl p-6 sm:p-8 hover:border-[#4d6bfa]/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#4d6bfa]/10 flex items-center justify-center mb-4 group-hover:bg-[#4d6bfa]/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#f0f0f0] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[#f0f0f0]/50 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
