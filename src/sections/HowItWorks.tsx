import { MousePointer, Paintbrush, Share2 } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: <MousePointer className="w-10 h-10 text-[#4d6bfa]" />,
    title: 'Choose Type & Enter Data',
    description: 'Select what type of QR code you need — URL, WiFi, contact card, email, phone, or text. Fill in the details.',
  },
  {
    number: '02',
    icon: <Paintbrush className="w-10 h-10 text-[#4d6bfa]" />,
    title: 'Customize Your Design',
    description: 'Pick your colors, upload your logo, and set the error correction level. See changes instantly.',
  },
  {
    number: '03',
    icon: <Share2 className="w-10 h-10 text-[#4d6bfa]" />,
    title: 'Download & Share',
    description: 'Export your QR code as PNG, SVG, or PDF. Share it anywhere — print, digital, or social media.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#f0f0f0]">
            How to Create a QR Code
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#f0f0f0]/50">
            Three simple steps to your custom QR code.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-[16.67%] right-[16.67%] h-[2px] border-t-2 border-dashed border-white/10" />

          {/* Connecting line - Tablet */}
          <div className="hidden md:block lg:hidden absolute top-20 left-[25%] right-[25%] h-[2px] border-t-2 border-dashed border-white/10" />

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="flex flex-col items-center">
                  {/* Step number */}
                  <span className="text-4xl sm:text-5xl font-extrabold text-[#4d6bfa]/30 mb-3">
                    {step.number}
                  </span>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-[#4d6bfa]/10 flex items-center justify-center mb-4">
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-semibold text-[#f0f0f0] mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#f0f0f0]/50 leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
