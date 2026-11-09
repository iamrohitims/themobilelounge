/**
 * Indian Rupee (INR) currency and number formatting helpers
 */

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const inrNumberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return "₹0";
  return inrFormatter.format(Math.round(amount));
}

export function formatNumber(amount: number): string {
  if (isNaN(amount)) return "0";
  return inrNumberFormatter.format(Math.round(amount));
}

export function formatCompactINR(amount: number): string {
  if (amount >= 10000000) {
    const val = (amount / 10000000).toFixed(2).replace(/\.?0+$/, "");
    return `₹${val} Cr`;
  }
  if (amount >= 100000) {
    const val = (amount / 100000).toFixed(2).replace(/\.?0+$/, "");
    return `₹${val} L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(0)}k`;
  }
  return `₹${amount}`;
}

export function calculateDiscountPercent(mrp: number, price: number): number {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

export function formatStorage(storage?: number): string {
  if (!storage) return "";
  if (storage >= 1000) {
    return `${storage / 1000}TB`;
  }
  return `${storage}GB`;
}

export function formatRam(ram?: number): string {
  if (!ram) return "";
  return `${ram}GB RAM`;
}
