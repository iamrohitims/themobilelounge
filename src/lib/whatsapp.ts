import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/format";
import { Product, ProductVariant } from "@/types/product";

export function generateWhatsAppUrl(message: string): string {
  const number = siteConfig.contact.whatsapp;
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${number}?text=${encodedText}`;
}

export function getProductWhatsAppUrl(
  product: Product,
  variant?: ProductVariant,
  pageUrl?: string
): string {
  const activeVariant = variant || product.variants[0];
  const priceStr = formatPrice(activeVariant?.price || 0);
  const mrpStr = formatPrice(activeVariant?.mrp || 0);
  const colorStr = activeVariant?.color ? ` (${activeVariant.color})` : "";
  const storageStr = activeVariant?.storage ? ` ${activeVariant.storage}GB` : "";

  const lines = [
    `Namaste The Mobile Lounge Kakod! 🙏`,
    ``,
    `I am interested in buying:`,
    `📱 *${product.name}${colorStr}${storageStr}*`,
    `💰 Deal Price: *${priceStr}* (MRP: ${mrpStr})`,
    product.emiAvailable ? `💳 Please share 0% EMI and downpayment options.` : ``,
    ``,
    `🎁 Is today's Free Gift Box (Watch / Earbuds) available with this phone?`,
    pageUrl ? `🔗 Link: ${pageUrl}` : ``,
    ``,
    `Please confirm ready stock at your Kakod store.`,
  ].filter(Boolean);

  return generateWhatsAppUrl(lines.join("\n"));
}

export function getEMIWhatsAppUrl(data: {
  productName?: string;
  price: number;
  downPayment: number;
  monthlyEmi: number;
  tenureMonths: number;
  partnerName?: string;
  isNoCost?: boolean;
}): string {
  const priceStr = formatPrice(data.price);
  const downPaymentStr = formatPrice(data.downPayment);
  const emiStr = formatPrice(data.monthlyEmi);

  const lines = [
    `Namaste The Mobile Lounge! 💳`,
    ``,
    `I used your website EMI calculator for:`,
    data.productName ? `📱 Phone: *${data.productName}*` : `📱 Target Budget: *${priceStr}*`,
    `💵 Down Payment: *${downPaymentStr}*`,
    `📊 Monthly EMI: *${emiStr}/month* for *${data.tenureMonths} Months*`,
    data.isNoCost ? `✨ Scheme: *0% No-Cost EMI*` : ``,
    data.partnerName ? `🏦 Preferred Partner: *${data.partnerName}*` : ``,
    ``,
    `Can I check eligibility with my Aadhaar & PAN card at your Kakod shop today?`,
  ].filter(Boolean);

  return generateWhatsAppUrl(lines.join("\n"));
}

export function getExchangeWhatsAppUrl(data: {
  currentBrand: string;
  currentModel: string;
  condition: string;
  targetPhone?: string;
  estimatedValue?: number;
}): string {
  const lines = [
    `Namaste The Mobile Lounge! 🔄`,
    ``,
    `I want an Old Phone Exchange quote:`,
    `📱 Old Device: *${data.currentBrand} ${data.currentModel}*`,
    `⚙️ Condition: *${data.condition}*`,
    data.estimatedValue ? `💵 Estimated Value: *${formatPrice(data.estimatedValue)}*` : ``,
    data.targetPhone ? `🎯 Upgrade To: *${data.targetPhone}*` : ``,
    ``,
    `When can I bring it to your Kakod store for final physical check and instant bill discount?`,
  ].filter(Boolean);

  return generateWhatsAppUrl(lines.join("\n"));
}

export function getGeneralEnquiryUrl(subject?: string): string {
  const lines = [
    `Namaste The Mobile Lounge Kakod! 🙏`,
    subject ? `Enquiry regarding: *${subject}*` : `I visited your website and would like to know today's best offers and smartphone stock in Kakod.`,
    ``,
    `Please assist me!`,
  ];
  return generateWhatsAppUrl(lines.join("\n"));
}
