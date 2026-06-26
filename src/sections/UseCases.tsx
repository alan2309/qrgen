import { IdCard, Utensils, Wifi, TrendingUp, Ticket, Package } from 'lucide-react';

const useCases = [
  {
    icon: <IdCard className="w-5 h-5 text-[#4d6bfa]" />,
    title: 'Business Cards',
    description: 'Add a vCard QR code to your business card so contacts can save your details with one scan.',
    keyword: 'vcard qr code business card',
  },
  {
    icon: <Utensils className="w-5 h-5 text-[#4d6bfa]" />,
    title: 'Restaurant Menus',
    description: 'Create QR codes linking to digital menus. Update your menu anytime without reprinting.',
    keyword: 'restaurant menu qr code',
  },
  {
    icon: <Wifi className="w-5 h-5 text-[#4d6bfa]" />,
    title: 'WiFi Access',
    description: 'Generate WiFi QR codes so guests can connect instantly without typing passwords.',
    keyword: 'wifi qr code generator',
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-[#4d6bfa]" />,
    title: 'Marketing Campaigns',
    description: 'Track marketing performance with QR codes on flyers, posters, and product packaging.',
    keyword: 'marketing qr code campaign',
  },
  {
    icon: <Ticket className="w-5 h-5 text-[#4d6bfa]" />,
    title: 'Event Tickets',
    description: 'Use QR codes for event check-ins, digital tickets, and contactless registration.',
    keyword: 'event qr code ticket',
  },
  {
    icon: <Package className="w-5 h-5 text-[#4d6bfa]" />,
    title: 'Product Packaging',
    description: 'Link customers to product info, manuals, or warranty registration with a simple scan.',
    keyword: 'product qr code packaging',
  },
];

export default function UseCases() {
  return (
    <section className="py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#f0f0f0]">
            Popular QR Code Use Cases
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#f0f0f0]/50 max-w-xl mx-auto">
            Discover how businesses and individuals use QR codes every day.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {useCases.map((useCase, i) => (
            <article
              key={i}
              className="bg-white/[0.03] border border-white/5 rounded-xl p-5 sm:p-6 hover:border-[#4d6bfa]/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#4d6bfa]/10 flex items-center justify-center flex-shrink-0">
                  {useCase.icon}
                </div>
                <h3 className="text-base font-semibold text-[#f0f0f0]">
                  {useCase.title}
                </h3>
              </div>
              <p className="text-sm text-[#f0f0f0]/50 leading-relaxed">
                {useCase.description}
              </p>
              {/* Hidden keyword for SEO */}
              <span className="sr-only">{useCase.keyword}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
