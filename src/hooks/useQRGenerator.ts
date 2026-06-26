import { useState, useCallback, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import type { QRType, QRCodeData, QRCodeOptions, WiFiData, VCardData, EmailData, SMSData, WhatsAppData, UPIData } from '@/types/qr';

function buildQRContent(data: QRCodeData): string {
  switch (data.type) {
    case 'url':
      return data.url || '';
    case 'text':
      return data.text || '';
    case 'wifi': {
      const w = data.wifi || {} as WiFiData;
      const sec = w.security === 'nopass' ? 'nopass' : w.security || 'WPA';
      return `WIFI:T:${sec};S:${w.ssid || ''};P:${w.password || ''};;`;
    }
    case 'vcard': {
      const v = data.vcard || {} as VCardData;
      return `BEGIN:VCARD\nVERSION:3.0\nFN:${v.firstName || ''} ${v.lastName || ''}\nN:${v.lastName || ''};${v.firstName || ''};;;\nTEL:${v.phone || ''}\nEMAIL:${v.email || ''}\nORG:${v.organization || ''}\nTITLE:${v.title || ''}\nADR:;;${v.address || ''};;;;\nURL:${v.website || ''}\nEND:VCARD`;
    }
    case 'email': {
      const e = data.email || {} as EmailData;
      return `mailto:${e.to || ''}?subject=${encodeURIComponent(e.subject || '')}&body=${encodeURIComponent(e.body || '')}`;
    }
    case 'phone':
      return `tel:${data.phone || ''}`;
    case 'sms': {
      const s = data.sms || {} as SMSData;
      return `sms:${s.phone || ''}?body=${encodeURIComponent(s.message || '')}`;
    }
    case 'whatsapp': {
      const w = data.whatsapp || {} as WhatsAppData;
      const phone = (w.phone || '').replace(/[^0-9]/g, '');
      const msg = w.message ? `?text=${encodeURIComponent(w.message)}` : '';
      return `https://wa.me/${phone}${msg}`;
    }
    case 'upi': {
      const u = data.upi || {} as UPIData;
      const params = new URLSearchParams();
      if (u.upiId) params.set('pa', u.upiId);
      if (u.name) params.set('pn', u.name);
      if (u.amount) params.set('am', u.amount);
      params.set('cu', 'INR');
      if (u.note) params.set('tn', u.note);
      return `upi://pay?${params.toString()}`;
    }
    default:
      return '';
  }
}

export function useQRGenerator() {
  const [qrType, setQrType] = useState<QRType>('url');
  const [qrData, setQrData] = useState<QRCodeData>({ type: 'url', url: '' });
  const [options, setOptions] = useState<QRCodeOptions>({
    foregroundColor: '#000000',
    backgroundColor: '#ffffff',
    errorCorrectionLevel: 'M',
    logo: null,
    width: 800,
    margin: 2,
  });
  const [dataUrl, setDataUrl] = useState<string>('');
  const [svgString, setSvgString] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isGenerating = useRef(false);

  const updateQRData = useCallback((type: QRType, data: Partial<QRCodeData>) => {
    setQrData(prev => ({ ...prev, type, ...data }));
  }, []);

  const updateOptions = useCallback((newOptions: Partial<QRCodeOptions>) => {
    setOptions(prev => ({ ...prev, ...newOptions }));
  }, []);

  // Generate QR code when data or options change
  useEffect(() => {
    const generate = async () => {
      if (isGenerating.current) return;
      const content = buildQRContent(qrData);
      if (!content.trim()) {
        setDataUrl('');
        setSvgString('');
        return;
      }

      isGenerating.current = true;
      try {
        // Generate PNG data URL
        const canvas = document.createElement('canvas');
        await QRCode.toCanvas(canvas, content, {
          width: options.width,
          margin: options.margin,
          color: {
            dark: options.foregroundColor,
            light: options.backgroundColor,
          },
          errorCorrectionLevel: options.errorCorrectionLevel,
        });

        // If logo exists, composite it
        if (options.logo) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const logoImg = new Image();
            logoImg.crossOrigin = 'anonymous';
            await new Promise<void>((resolve) => {
              logoImg.onload = () => resolve();
              logoImg.src = options.logo!;
            });
            const logoSize = canvas.width * 0.2;
            const logoX = (canvas.width - logoSize) / 2;
            const logoY = (canvas.height - logoSize) / 2;

            // White background behind logo
            ctx.fillStyle = options.backgroundColor;
            ctx.fillRect(logoX - 4, logoY - 4, logoSize + 8, logoSize + 8);
            ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
          }
        }

        setDataUrl(canvas.toDataURL('image/png'));
        canvasRef.current = canvas;

        // Generate SVG
        const svg = await QRCode.toString(content, {
          type: 'svg',
          width: options.width,
          margin: options.margin,
          color: {
            dark: options.foregroundColor,
            light: options.backgroundColor,
          },
          errorCorrectionLevel: options.errorCorrectionLevel,
        });
        setSvgString(svg);
      } catch (error) {
        console.error('QR generation error:', error);
      } finally {
        isGenerating.current = false;
      }
    };

    generate();
  }, [qrData, options]);

  const downloadPNG = useCallback(() => {
    if (!dataUrl) return;
    const link = document.createElement('a');
    link.download = `qr-nexus-${qrType}-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  }, [dataUrl, qrType]);

  const downloadSVG = useCallback(() => {
    if (!svgString) return;
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `qr-nexus-${qrType}-${Date.now()}.svg`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }, [svgString, qrType]);

  const downloadPDF = useCallback(async () => {
    if (!dataUrl) return;
    try {
      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const qrSize = 100;
      const x = (pageWidth - qrSize) / 2;
      const y = (pageHeight - qrSize) / 2;

      pdf.addImage(dataUrl, 'PNG', x, y, qrSize, qrSize);

      // Add label
      pdf.setFontSize(14);
      pdf.text(`QR Code - ${qrType.toUpperCase()}`, pageWidth / 2, y + qrSize + 15, { align: 'center' });

      pdf.save(`qr-nexus-${qrType}-${Date.now()}.pdf`);
    } catch (error) {
      console.error('PDF generation error:', error);
    }
  }, [dataUrl, qrType]);

  return {
    qrType,
    setQrType,
    qrData,
    updateQRData,
    options,
    updateOptions,
    dataUrl,
    svgString,
    downloadPNG,
    downloadSVG,
    downloadPDF,
  };
}
