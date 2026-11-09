import { describe, it, expect } from "vitest";
import {
  generateWhatsAppUrl,
  getProductWhatsAppUrl,
  getEMIWhatsAppUrl,
  getExchangeWhatsAppUrl,
} from "@/lib/whatsapp";
import { Product } from "@/types/product";

describe("WhatsApp URL Generator", () => {
  it("generates valid wa.me URL with phone and encoded text", () => {
    const url = generateWhatsAppUrl("Hello World");
    expect(url).toContain("https://wa.me/917017289590?text=Hello%20World");
  });

  it("builds product WhatsApp inquiry link with variant & deal price", () => {
    const mockProduct: Product = {
      id: "test-phone",
      slug: "test-phone",
      brand: "Apple",
      name: "iPhone 16 Pro",
      category: "phone",
      images: [{ src: "/test.svg", alt: "Test" }],
      variants: [
        { ram: 8, storage: 128, color: "Teal", mrp: 79900, price: 71990, inStock: true },
      ],
      highlights: ["Highlight 1"],
      specs: {
        display: {},
        performance: {},
        camera: {},
        battery: {},
        connectivity: {},
        design: {},
      },
      tags: ["5g"],
      emiAvailable: true,
      releaseDate: "2024-09-20",
      warranty: "1 Year",
      boxContents: ["Box"],
    };

    const url = getProductWhatsAppUrl(mockProduct);
    expect(url).toContain("https://wa.me/917017289590?text=");
    expect(decodeURIComponent(url)).toContain("iPhone 16 Pro");
    expect(decodeURIComponent(url)).toContain("₹71,990");
    expect(decodeURIComponent(url)).toContain("Kakod");
  });

  it("builds EMI inquiry WhatsApp message", () => {
    const url = getEMIWhatsAppUrl({
      productName: "Samsung Galaxy S24 Ultra",
      price: 109990,
      downPayment: 0,
      monthlyEmi: 9166,
      tenureMonths: 12,
      isNoCost: true,
    });
    expect(decodeURIComponent(url)).toContain("Samsung Galaxy S24 Ultra");
    expect(decodeURIComponent(url)).toContain("₹9,166/month");
    expect(decodeURIComponent(url)).toContain("12 Months");
    expect(decodeURIComponent(url)).toContain("0% No-Cost EMI");
  });
});
