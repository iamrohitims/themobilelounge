import { describe, it, expect } from "vitest";
import { calculateEMI } from "@/lib/emi";

describe("EMI Calculation Engine", () => {
  it("calculates correct reducing-balance EMI for standard values", () => {
    // ₹60,000 price, ₹10,000 down payment -> ₹50,000 loan, 12 months, 12% annual rate
    const result = calculateEMI({
      price: 60000,
      downPayment: 10000,
      tenureMonths: 12,
      annualInterestRate: 12,
      isNoCostEmi: false,
    });

    expect(result.principal).toBe(50000);
    expect(result.tenureMonths).toBe(12);
    // Formula check: 50000 * 0.01 * (1.01^12) / (1.01^12 - 1) = ~4442.4
    expect(result.monthlyEmi).toBeCloseTo(4442, -1);
    expect(result.totalInterest).toBeGreaterThan(0);
    expect(result.totalPayable).toBe(10000 + result.schedule.reduce((s, r) => s + r.emi, 0));
  });

  it("handles No-Cost EMI with 0% effective interest", () => {
    // ₹30,000 phone, ₹0 down payment, 6 months No-Cost EMI
    const result = calculateEMI({
      price: 30000,
      downPayment: 0,
      tenureMonths: 6,
      annualInterestRate: 14.5,
      isNoCostEmi: true,
    });

    expect(result.monthlyEmi).toBe(5000); // 30,000 / 6
    expect(result.totalInterest).toBe(0);
    expect(result.totalPayable).toBe(30000);
    expect(result.interestSubsidyDiscount).toBeGreaterThan(0);
  });

  it("handles 100% down payment (principal = 0) without division by zero errors", () => {
    const result = calculateEMI({
      price: 50000,
      downPayment: 50000,
      tenureMonths: 9,
      annualInterestRate: 15,
      isNoCostEmi: false,
    });

    expect(result.principal).toBe(0);
    expect(result.monthlyEmi).toBe(0);
    expect(result.totalInterest).toBe(0);
    expect(result.totalPayable).toBe(50000);
    expect(result.processingFee).toBe(0);
  });

  it("verifies amortization schedule reduces balance to zero", () => {
    const result = calculateEMI({
      price: 80000,
      downPayment: 20000,
      tenureMonths: 12,
      annualInterestRate: 14,
      isNoCostEmi: false,
    });

    expect(result.schedule.length).toBe(12);
    const lastRow = result.schedule[result.schedule.length - 1];
    expect(lastRow.closingBalance).toBe(0);

    const totalPrincipalAmortized = result.schedule.reduce((sum, r) => sum + r.principal, 0);
    expect(totalPrincipalAmortized).toBe(60000);
  });

  it("enforces processing fee min and max caps", () => {
    // Small loan: ₹5,000 loan -> 1.5% is ₹75, below min fee of ₹299
    const smallLoan = calculateEMI({
      price: 5000,
      downPayment: 0,
      tenureMonths: 6,
      annualInterestRate: 12,
      isNoCostEmi: false,
    });
    expect(smallLoan.processingFee).toBe(299);

    // Large loan: ₹1,50,000 loan -> 1.5% is ₹2250, capped at max fee of ₹1499
    const largeLoan = calculateEMI({
      price: 150000,
      downPayment: 0,
      tenureMonths: 12,
      annualInterestRate: 14,
      isNoCostEmi: false,
    });
    expect(largeLoan.processingFee).toBe(1499);
  });
});
