import { useState, useRef, useCallback } from 'react';
import {
  Globe, Type, Wifi, IdCard, Mail, Phone, MessageSquare,
  Upload, X, Download, Copy, Check, AlertCircle,
  Shield, Palette, Zap, QrCode, MessageCircle, IndianRupee,
  Maximize2
} from 'lucide-react';
import { useQRGenerator } from '@/hooks/useQRGenerator';
import type { QRType, ErrorCorrectionLevel, WiFiData, VCardData, EmailData, SMSData, WhatsAppData, UPIData } from '@/types/qr';

const qrTypes: { type: QRType; label: string; icon: React.ReactNode; placeholder: string }[] = [
  { type: 'url', label: 'URL', icon: <Globe className="w-4 h-4" />, placeholder: 'https://example.com' },
  { type: 'text', label: 'Text', icon: <Type className="w-4 h-4" />, placeholder: 'Enter any text...' },
  { type: 'wifi', label: 'WiFi', icon: <Wifi className="w-4 h-4" />, placeholder: '' },
  { type: 'whatsapp', label: 'WhatsApp', icon: <MessageCircle className="w-4 h-4" />, placeholder: '' },
  { type: 'upi', label: 'UPI', icon: <IndianRupee className="w-4 h-4" />, placeholder: '' },
  { type: 'vcard', label: 'vCard', icon: <IdCard className="w-4 h-4" />, placeholder: '' },
  { type: 'email', label: 'Email', icon: <Mail className="w-4 h-4" />, placeholder: '' },
  { type: 'phone', label: 'Phone', icon: <Phone className="w-4 h-4" />, placeholder: '+1 (555) 123-4567' },
  { type: 'sms', label: 'SMS', icon: <MessageSquare className="w-4 h-4" />, placeholder: '' },
];

const errorLevels: { value: ErrorCorrectionLevel; label: string; desc: string }[] = [
  { value: 'L', label: 'Low', desc: '7%' },
  { value: 'M', label: 'Medium', desc: '15%' },
  { value: 'Q', label: 'Quartile', desc: '25%' },
  { value: 'H', label: 'High', desc: '30%' },
];

function getWifiData(qrData: { wifi?: WiFiData }): WiFiData {
  return {
    ssid: qrData.wifi?.ssid ?? '',
    password: qrData.wifi?.password ?? '',
    security: qrData.wifi?.security ?? 'WPA',
  };
}

function getVCardData(qrData: { vcard?: VCardData }): VCardData {
  return {
    firstName: qrData.vcard?.firstName ?? '',
    lastName: qrData.vcard?.lastName ?? '',
    phone: qrData.vcard?.phone ?? '',
    email: qrData.vcard?.email ?? '',
    organization: qrData.vcard?.organization ?? '',
    title: qrData.vcard?.title ?? '',
    address: qrData.vcard?.address ?? '',
    website: qrData.vcard?.website ?? '',
  };
}

function getEmailData(qrData: { email?: EmailData }): EmailData {
  return {
    to: qrData.email?.to ?? '',
    subject: qrData.email?.subject ?? '',
    body: qrData.email?.body ?? '',
  };
}

function getSMSData(qrData: { sms?: SMSData }): SMSData {
  return {
    phone: qrData.sms?.phone ?? '',
    message: qrData.sms?.message ?? '',
  };
}

function getWhatsAppData(qrData: { whatsapp?: WhatsAppData }): WhatsAppData {
  return {
    phone: qrData.whatsapp?.phone ?? '',
    message: qrData.whatsapp?.message ?? '',
  };
}

function getUPIData(qrData: { upi?: UPIData }): UPIData {
  return {
    upiId: qrData.upi?.upiId ?? '',
    name: qrData.upi?.name ?? '',
    amount: qrData.upi?.amount ?? '',
    note: qrData.upi?.note ?? '',
  };
}

export default function Generator() {
  const {
    qrType, setQrType, qrData, updateQRData, options, updateOptions,
    dataUrl, downloadPNG, downloadSVG, downloadPDF,
  } = useQRGenerator();
  const [copied, setCopied] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTypeChange = (type: QRType) => {
    setQrType(type);
    updateQRData(type, { type });
  };

  const handleLogoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Logo must be under 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => updateOptions({ logo: ev.target?.result as string });
    reader.readAsDataURL(file);
  }, [updateOptions]);

  const removeLogo = () => {
    updateOptions({ logo: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const copyQRLink = async () => {
    if (!dataUrl) return;
    try {
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: copy the data URL as text
      try {
        await navigator.clipboard.writeText(dataUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        alert('Unable to copy. Please right-click and save the image.');
      }
    }
  };

  const currentType = qrTypes.find(t => t.type === qrType)!;

  return (
    <section id="generate" className="py-20 scroll-mt-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#f0f0f0]">
            Create Your QR Code
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#f0f0f0]/50">
            Choose a type, enter your details, customize, and download.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-start">
          {/* Left Panel - Inputs */}
          <div className="card-glass rounded-2xl p-4 sm:p-6">
            {/* QR Type Tabs */}
            <div className="flex gap-1.5 overflow-x-auto tab-scroll pb-2 mb-5">
              {qrTypes.map(t => (
                <button
                  key={t.type}
                  onClick={() => handleTypeChange(t.type)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${qrType === t.type
                      ? 'bg-[#4d6bfa] text-white'
                      : 'bg-white/5 text-[#f0f0f0]/60 hover:bg-white/10 hover:text-[#f0f0f0]/80'
                    }`}
                >
                  {t.icon}
                  {t.label}
                </button>
              ))}
            </div>

            {/* Dynamic Input Fields */}
            <div className="space-y-4">
              {/* URL */}
              {qrType === 'url' && (
                <div>
                  <label className="block text-xs font-medium text-[#f0f0f0]/50 mb-1.5">
                    Website URL
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f0f0f0]/30" />
                    <input
                      type="url"
                      value={qrData.url || ''}
                      onChange={e => updateQRData('url', { url: e.target.value })}
                      placeholder={currentType.placeholder}
                      className="input-dark w-full pl-10 pr-4 py-3 text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Text */}
              {qrType === 'text' && (
                <div>
                  <label className="block text-xs font-medium text-[#f0f0f0]/50 mb-1.5">
                    Text Content
                  </label>
                  <textarea
                    value={qrData.text || ''}
                    onChange={e => updateQRData('text', { text: e.target.value })}
                    placeholder={currentType.placeholder}
                    rows={5}
                    className="input-dark w-full px-4 py-3 text-sm resize-none"
                  />
                </div>
              )}

              {/* WiFi */}
              {qrType === 'wifi' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#f0f0f0]/50 mb-1.5">
                      Network Name (SSID)
                    </label>
                    <div className="relative">
                      <Wifi className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f0f0f0]/30" />
                      <input
                        type="text"
                        value={getWifiData(qrData).ssid}
                        onChange={e => updateQRData('wifi', { wifi: { ...getWifiData(qrData), ssid: e.target.value } })}
                        placeholder="MyWiFiNetwork"
                        className="input-dark w-full pl-10 pr-4 py-3 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#f0f0f0]/50 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f0f0f0]/30" />
                      <input
                        type="text"
                        value={getWifiData(qrData).password}
                        onChange={e => updateQRData('wifi', { wifi: { ...getWifiData(qrData), password: e.target.value } })}
                        placeholder="WiFi password"
                        className="input-dark w-full pl-10 pr-4 py-3 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#f0f0f0]/50 mb-1.5">
                      Security Type
                    </label>
                    <select
                      value={getWifiData(qrData).security}
                      onChange={e => updateQRData('wifi', { wifi: { ...getWifiData(qrData), security: e.target.value as 'WPA' | 'WEP' | 'nopass' } })}
                      className="input-dark w-full px-4 py-3 text-sm"
                    >
                      <option value="WPA">WPA/WPA2</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">None (Open)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* vCard */}
              {qrType === 'vcard' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#f0f0f0]/50 mb-1.5">First Name</label>
                      <input
                        type="text"
                        value={getVCardData(qrData).firstName}
                        onChange={e => updateQRData('vcard', { vcard: { ...getVCardData(qrData), firstName: e.target.value } })}
                        placeholder="John"
                        className="input-dark w-full px-3 py-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#f0f0f0]/50 mb-1.5">Last Name</label>
                      <input
                        type="text"
                        value={getVCardData(qrData).lastName}
                        onChange={e => updateQRData('vcard', { vcard: { ...getVCardData(qrData), lastName: e.target.value } })}
                        placeholder="Doe"
                        className="input-dark w-full px-3 py-2.5 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#f0f0f0]/50 mb-1.5">Phone</label>
                    <input
                      type="tel"
                      value={getVCardData(qrData).phone}
                      onChange={e => updateQRData('vcard', { vcard: { ...getVCardData(qrData), phone: e.target.value } })}
                      placeholder="+1 (555) 123-4567"
                      className="input-dark w-full px-3 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#f0f0f0]/50 mb-1.5">Email</label>
                    <input
                      type="email"
                      value={getVCardData(qrData).email}
                      onChange={e => updateQRData('vcard', { vcard: { ...getVCardData(qrData), email: e.target.value } })}
                      placeholder="john@example.com"
                      className="input-dark w-full px-3 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#f0f0f0]/50 mb-1.5">Organization</label>
                    <input
                      type="text"
                      value={getVCardData(qrData).organization}
                      onChange={e => updateQRData('vcard', { vcard: { ...getVCardData(qrData), organization: e.target.value } })}
                      placeholder="Company Name"
                      className="input-dark w-full px-3 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#f0f0f0]/50 mb-1.5">Job Title</label>
                    <input
                      type="text"
                      value={getVCardData(qrData).title}
                      onChange={e => updateQRData('vcard', { vcard: { ...getVCardData(qrData), title: e.target.value } })}
                      placeholder="Software Engineer"
                      className="input-dark w-full px-3 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#f0f0f0]/50 mb-1.5">Website</label>
                    <input
                      type="url"
                      value={getVCardData(qrData).website}
                      onChange={e => updateQRData('vcard', { vcard: { ...getVCardData(qrData), website: e.target.value } })}
                      placeholder="https://example.com"
                      className="input-dark w-full px-3 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#f0f0f0]/50 mb-1.5">Address</label>
                    <input
                      type="text"
                      value={getVCardData(qrData).address}
                      onChange={e => updateQRData('vcard', { vcard: { ...getVCardData(qrData), address: e.target.value } })}
                      placeholder="123 Main St, City, Country"
                      className="input-dark w-full px-3 py-2.5 text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              {qrType === 'email' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#f0f0f0]/50 mb-1.5">To</label>
                    <input
                      type="email"
                      value={getEmailData(qrData).to}
                      onChange={e => updateQRData('email', { email: { ...getEmailData(qrData), to: e.target.value } })}
                      placeholder="recipient@example.com"
                      className="input-dark w-full px-4 py-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#f0f0f0]/50 mb-1.5">Subject</label>
                    <input
                      type="text"
                      value={getEmailData(qrData).subject}
                      onChange={e => updateQRData('email', { email: { ...getEmailData(qrData), subject: e.target.value } })}
                      placeholder="Email subject"
                      className="input-dark w-full px-4 py-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#f0f0f0]/50 mb-1.5">Message</label>
                    <textarea
                      value={getEmailData(qrData).body}
                      onChange={e => updateQRData('email', { email: { ...getEmailData(qrData), body: e.target.value } })}
                      placeholder="Your message..."
                      rows={4}
                      className="input-dark w-full px-4 py-3 text-sm resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Phone */}
              {qrType === 'phone' && (
                <div>
                  <label className="block text-xs font-medium text-[#f0f0f0]/50 mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f0f0f0]/30" />
                    <input
                      type="tel"
                      value={qrData.phone || ''}
                      onChange={e => updateQRData('phone', { phone: e.target.value })}
                      placeholder={currentType.placeholder}
                      className="input-dark w-full pl-10 pr-4 py-3 text-sm"
                    />
                  </div>
                </div>
              )}

              {/* SMS */}
              {qrType === 'sms' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#f0f0f0]/50 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      value={getSMSData(qrData).phone}
                      onChange={e => updateQRData('sms', { sms: { ...getSMSData(qrData), phone: e.target.value } })}
                      placeholder="+1 (555) 123-4567"
                      className="input-dark w-full px-4 py-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#f0f0f0]/50 mb-1.5">Message</label>
                    <textarea
                      value={getSMSData(qrData).message}
                      onChange={e => updateQRData('sms', { sms: { ...getSMSData(qrData), message: e.target.value } })}
                      placeholder="Your message..."
                      rows={4}
                      className="input-dark w-full px-4 py-3 text-sm resize-none"
                    />
                  </div>
                </div>
              )}

              {/* WhatsApp */}
              {qrType === 'whatsapp' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#f0f0f0]/50 mb-1.5">WhatsApp Number</label>
                    <div className="relative">
                      <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f0f0f0]/30" />
                      <input
                        type="tel"
                        value={getWhatsAppData(qrData).phone}
                        onChange={e => updateQRData('whatsapp', { whatsapp: { ...getWhatsAppData(qrData), phone: e.target.value } })}
                        placeholder="+91 98765 43210 (with country code)"
                        className="input-dark w-full pl-10 pr-4 py-3 text-sm"
                      />
                    </div>
                    <p className="mt-1 text-[10px] text-[#f0f0f0]/30">Include country code, e.g. +91 for India</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#f0f0f0]/50 mb-1.5">Pre-filled Message (optional)</label>
                    <textarea
                      value={getWhatsAppData(qrData).message}
                      onChange={e => updateQRData('whatsapp', { whatsapp: { ...getWhatsAppData(qrData), message: e.target.value } })}
                      placeholder="Hello! I'd like to know more..."
                      rows={3}
                      className="input-dark w-full px-4 py-3 text-sm resize-none"
                    />
                  </div>
                </div>
              )}

              {/* UPI */}
              {qrType === 'upi' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#f0f0f0]/50 mb-1.5">UPI ID</label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f0f0f0]/30" />
                      <input
                        type="text"
                        value={getUPIData(qrData).upiId}
                        onChange={e => updateQRData('upi', { upi: { ...getUPIData(qrData), upiId: e.target.value } })}
                        placeholder="yourname@upi"
                        className="input-dark w-full pl-10 pr-4 py-3 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#f0f0f0]/50 mb-1.5">Payee Name</label>
                    <input
                      type="text"
                      value={getUPIData(qrData).name}
                      onChange={e => updateQRData('upi', { upi: { ...getUPIData(qrData), name: e.target.value } })}
                      placeholder="Your Business Name"
                      className="input-dark w-full px-4 py-3 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#f0f0f0]/50 mb-1.5">Amount (₹) <span className="opacity-50">optional</span></label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={getUPIData(qrData).amount}
                        onChange={e => updateQRData('upi', { upi: { ...getUPIData(qrData), amount: e.target.value } })}
                        placeholder="0.00"
                        className="input-dark w-full px-4 py-3 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#f0f0f0]/50 mb-1.5">Note <span className="opacity-50">optional</span></label>
                      <input
                        type="text"
                        value={getUPIData(qrData).note}
                        onChange={e => updateQRData('upi', { upi: { ...getUPIData(qrData), note: e.target.value } })}
                        placeholder="Payment note"
                        className="input-dark w-full px-4 py-3 text-sm"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-[#f0f0f0]/30">Works with GPay, PhonePe, Paytm, and all UPI apps</p>
                </div>
              )}
            </div>

            {/* Customization */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <h4 className="text-sm font-semibold text-[#f0f0f0] mb-4 flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#4d6bfa]" />
                Customize
              </h4>

              {/* Color Pickers */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-xs text-[#f0f0f0]/50 mb-1.5">Foreground</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={options.foregroundColor}
                      onChange={e => updateOptions({ foregroundColor: e.target.value })}
                      className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={options.foregroundColor}
                      onChange={e => updateOptions({ foregroundColor: e.target.value })}
                      className="input-dark flex-1 px-2 py-1.5 text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#f0f0f0]/50 mb-1.5">Background</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={options.backgroundColor}
                      onChange={e => updateOptions({ backgroundColor: e.target.value })}
                      className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={options.backgroundColor}
                      onChange={e => updateOptions({ backgroundColor: e.target.value })}
                      className="input-dark flex-1 px-2 py-1.5 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Error Correction */}
              <div className="mb-4">
                <label className="block text-xs text-[#f0f0f0]/50 mb-1.5 flex items-center gap-1">
                  Error Correction
                  <span className="relative group">
                    <AlertCircle className="w-3 h-3 text-[#f0f0f0]/30 cursor-help" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-[#1a1a2e] border border-white/10 rounded-lg p-2 text-xs text-[#f0f0f0]/70 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      Higher correction = better scanning with logos or damage. Use Medium+ with logos.
                    </span>
                  </span>
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {errorLevels.map(level => (
                    <button
                      key={level.value}
                      onClick={() => updateOptions({ errorCorrectionLevel: level.value })}
                      className={`px-2 py-2 rounded-lg text-xs font-medium transition-all ${options.errorCorrectionLevel === level.value
                          ? 'bg-[#4d6bfa] text-white'
                          : 'bg-white/5 text-[#f0f0f0]/50 hover:bg-white/10'
                        }`}
                    >
                      <div>{level.label}</div>
                      <div className="text-[10px] opacity-60">{level.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-xs text-[#f0f0f0]/50 mb-1.5">Logo</label>
                {options.logo ? (
                  <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
                    <img src={options.logo} alt="Logo preview" className="w-10 h-10 object-contain rounded" />
                    <span className="text-xs text-[#f0f0f0]/60 flex-1 truncate">Logo uploaded</span>
                    <button onClick={removeLogo} className="p-1 hover:bg-white/10 rounded transition-colors">
                      <X className="w-4 h-4 text-[#f0f0f0]/60" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border border-dashed border-white/20 rounded-lg p-4 text-center hover:border-white/30 transition-colors"
                  >
                    <Upload className="w-5 h-5 text-[#f0f0f0]/30 mx-auto mb-1.5" />
                    <span className="text-xs text-[#f0f0f0]/40">Drop logo here or click to upload</span>
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Sidebar Ad - Desktop Only */}
          <div className="hidden lg:flex flex-col items-center self-stretch">
            <div className="ad-zone-dark rounded-xl w-[160px] flex-1 flex flex-col items-center justify-center">
              <span className="text-xs text-[#f0f0f0]/20 [writing-mode:vertical-lr]">Advertisement</span>
            </div>
          </div>

          {/* Right Panel - Preview & Download - ENHANCED */}
          <div className="space-y-4">
            {/* QR Preview - With zoom capability */}
            <div className="card-glass rounded-2xl p-6 sm:p-8 flex flex-col items-center relative">
              {/* Zoom button */}
              {dataUrl && (
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors z-10"
                  title="Zoom in/out"
                >
                  <Maximize2 className="w-4 h-4 text-[#f0f0f0]/50" />
                </button>
              )}

              <div className={`relative w-full max-w-[400px] aspect-square mx-auto transition-all duration-300 ${isZoomed ? 'scale-110' : 'scale-100'
                }`}>
                {dataUrl ? (
                  <div className="w-full h-full rounded-xl overflow-hidden bg-white p-6 shadow-2xl shadow-[#4d6bfa]/20 border border-white/10">
                    <img
                      src={dataUrl}
                      alt={`Generated ${qrType} QR code`}
                      className="w-full h-full object-contain"
                    />
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-[#4d6bfa]/5 to-transparent pointer-events-none" />
                  </div>
                ) : (
                  <div className="w-full h-full rounded-xl bg-white/5 flex items-center justify-center border-2 border-dashed border-white/10">
                    <div className="text-center">
                      <QrCode className="w-24 h-24 text-[#f0f0f0]/15 mx-auto mb-3" />
                      <p className="text-sm text-[#f0f0f0]/30">
                        {qrType === 'url' ? 'Enter a URL to generate' : `Enter ${qrType} details`}
                      </p>
                    </div>
                  </div>
                )}

                {/* Scan line animation */}
                {dataUrl && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                    <div
                      className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4d6bfa]/60 to-transparent"
                      style={{ animation: 'scan-line 2s linear infinite' }}
                    />
                  </div>
                )}
              </div>

              {/* Status badges - Improved */}
              {dataUrl ? (
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4d6bfa]/10 text-[#4d6bfa] border border-[#4d6bfa]/20">
                    <Zap className="w-3 h-3" />
                    {qrType.toUpperCase()}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-[#f0f0f0]/50 border border-white/5">
                    Error: {options.errorCorrectionLevel}
                  </span>
                  {options.logo && (
                    <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                      ✓ Logo
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full bg-white/5 text-[#f0f0f0]/40 border border-white/5">
                    {dataUrl.length > 100 ? `${(dataUrl.length / 1024).toFixed(1)}KB` : `${dataUrl.length}B`}
                  </span>
                </div>
              ) : (
                <div className="mt-4 flex items-center gap-2 text-xs text-[#f0f0f0]/30">
                  <AlertCircle className="w-3 h-3" />
                  <span>Fill in the details to generate</span>
                </div>
              )}
            </div>

            {/* Download Buttons - Enhanced */}
            <div className="grid grid-cols-3 gap-2.5">
              <button
                onClick={downloadPNG}
                disabled={!dataUrl}
                className="btn-primary py-3.5 text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 hover:shadow-lg hover:shadow-[#4d6bfa]/20 transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                PNG
              </button>
              <button
                onClick={downloadSVG}
                disabled={!dataUrl}
                className="btn-primary py-3.5 text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 hover:shadow-lg hover:shadow-[#4d6bfa]/20 transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                SVG
              </button>
              <button
                onClick={downloadPDF}
                disabled={!dataUrl}
                className="btn-primary py-3.5 text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 hover:shadow-lg hover:shadow-[#4d6bfa]/20 transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                PDF
              </button>
            </div>

            {/* Share/Copy - Enhanced with better feedback */}
            <div className="flex gap-2">
              <button
                onClick={copyQRLink}
                disabled={!dataUrl}
                className="btn-secondary flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10 transition-all duration-200"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Image
                  </>
                )}
              </button>
            </div>

            {/* Quick share hint with better styling */}
            {dataUrl && (
              <div className="text-center space-y-1">
                <p className="text-[10px] text-[#f0f0f0]/20">
                  Right-click the QR code to save directly
                </p>
                <p className="text-[9px] text-[#f0f0f0]/10">
                  {qrType} • {options.foregroundColor} on {options.backgroundColor}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add animation keyframes */}
      <style>{`
        @keyframes scan-line {
          0% {
            top: -2px;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}