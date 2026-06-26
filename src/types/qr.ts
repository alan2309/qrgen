export type QRType = 'url' | 'text' | 'wifi' | 'vcard' | 'email' | 'phone' | 'sms' | 'whatsapp' | 'upi';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface WiFiData {
  ssid: string;
  password: string;
  security: 'WPA' | 'WEP' | 'nopass';
}

export interface VCardData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  organization: string;
  title: string;
  address: string;
  website: string;
}

export interface EmailData {
  to: string;
  subject: string;
  body: string;
}

export interface SMSData {
  phone: string;
  message: string;
}

export interface WhatsAppData {
  phone: string;
  message: string;
}

export interface UPIData {
  upiId: string;
  name: string;
  amount: string;
  note: string;
}

export interface QRCodeData {
  type: QRType;
  url?: string;
  text?: string;
  wifi?: WiFiData;
  vcard?: VCardData;
  email?: EmailData;
  phone?: string;
  sms?: SMSData;
  whatsapp?: WhatsAppData;
  upi?: UPIData;
}

export interface QRCodeOptions {
  foregroundColor: string;
  backgroundColor: string;
  errorCorrectionLevel: ErrorCorrectionLevel;
  logo?: string | null;
  width?: number;
  margin?: number;
}
