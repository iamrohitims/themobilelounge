import { describe, it, expect } from "vitest";
import {
  formatPrice,
  formatCompactINR,
  calculateDiscountPercent,
  formatStorage,
} from "@/lib/format";

describe("Formatting Utilities", () => {
  it("formats Indian Rupee prices correctly", () => {
    expect(formatPrice(144900)).toBe("₹1,44,900");
    expect(formatPrice(58990)).toBe("₹58,990");
    expect(formatPrice(0)).toBe("₹0");
  });

  it("calculates percentage discount accurately", () => {
    // MRP 79900, Price 71990 -> (79900 - 71990) / 79900 = ~9.89% -> 10%
    expect(calculateDiscountPercent(79900, 71990)).toBe(10);
    expect(calculateDiscountPercent(50000, 50000)).toBe(0);
  });

  it("formats storage nicely", () => {
    expect(formatStorage(128)).toBe("128GB");
    expect(formatStorage(1000)).toBe("1TB");
  });

  it("formats compact INR notation", () => {
    expect(formatCompactINR(150000)).toBe("₹1.5 L");
    expect(formatCompactINR(25000)).toBe("₹25k");
  });
});
