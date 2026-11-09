import { emiConfig } from "@/config/emi";

export interface AmortizationRow {
  month: number;
  openingBalance: number;
  emi: number;
  principal: number;
  interest: number;
  closingBalance: number;
}

export interface EMICalculationInput {
  price: number;
  downPayment: number;
  tenureMonths: number;
  annualInterestRate: number; // e.g. 14.5
  isNoCostEmi?: boolean;
}

export interface EMICalculationResult {
  price: number;
  downPayment: number;
  principal: number; // price - downPayment
  tenureMonths: number;
  annualInterestRate: number;
  monthlyInterestRate: number;
  monthlyEmi: number;
  totalInterest: number;
  totalPayable: number; // downPayment + (monthlyEmi * tenureMonths)
  processingFee: number;
  processingFeeWithGst: number;
  isNoCostEmi: boolean;
  interestSubsidyDiscount: number; // In No-cost EMI, brand/store discount equal to interest
  schedule: AmortizationRow[];
  tenureComparison: {
    tenure: number;
    monthlyEmi: number;
    totalInterest: number;
    totalPayable: number;
  }[];
}

/**
 * Calculates standard reducing-balance EMI and No-Cost EMI with complete amortization.
 */
export function calculateEMI(input: EMICalculationInput): EMICalculationResult {
  const price = Math.max(0, Math.round(input.price));
  const downPayment = Math.min(price, Math.max(0, Math.round(input.downPayment)));
  const principal = price - downPayment;
  const tenureMonths = Math.max(1, Math.round(input.tenureMonths));
  const isNoCostEmi = Boolean(input.isNoCostEmi);

  // If No-Cost EMI, effective interest rate charged to consumer is 0
  const effectiveAnnualRate = isNoCostEmi ? 0 : Math.max(0, input.annualInterestRate);
  const monthlyRate = effectiveAnnualRate / 12 / 100;

  let monthlyEmi = 0;

  if (principal === 0) {
    monthlyEmi = 0;
  } else if (monthlyRate === 0 || isNoCostEmi) {
    // No-cost EMI formula: P / n
    monthlyEmi = Math.round(principal / tenureMonths);
  } else {
    // Standard reducing balance formula: P × r × (1+r)^n / ((1+r)^n − 1)
    const factor = Math.pow(1 + monthlyRate, tenureMonths);
    monthlyEmi = Math.round((principal * monthlyRate * factor) / (factor - 1));
  }

  // Generate complete amortization schedule
  const schedule: AmortizationRow[] = [];
  let balance = principal;
  let accumulatedInterest = 0;

  for (let m = 1; m <= tenureMonths; m++) {
    if (balance <= 0) {
      schedule.push({
        month: m,
        openingBalance: 0,
        emi: 0,
        principal: 0,
        interest: 0,
        closingBalance: 0,
      });
      continue;
    }

    const interestComponent =
      monthlyRate === 0 || isNoCostEmi
        ? 0
        : Math.round(balance * monthlyRate);

    let principalComponent = monthlyEmi - interestComponent;
    if (m === tenureMonths || principalComponent > balance) {
      principalComponent = balance;
    }

    const rowEmi = principalComponent + interestComponent;
    const closing = Math.max(0, balance - principalComponent);

    accumulatedInterest += interestComponent;

    schedule.push({
      month: m,
      openingBalance: balance,
      emi: rowEmi,
      principal: principalComponent,
      interest: interestComponent,
      closingBalance: closing,
    });

    balance = closing;
  }

  const totalInterest = isNoCostEmi ? 0 : accumulatedInterest;
  const totalLoanRepayment = schedule.reduce((sum, row) => sum + row.emi, 0);
  const totalPayable = downPayment + (principal > 0 ? totalLoanRepayment : 0);

  // Compute standard interest that would have been paid to show No-Cost subsidy discount
  let interestSubsidyDiscount = 0;
  if (isNoCostEmi && input.annualInterestRate > 0 && principal > 0) {
    const stdRate = input.annualInterestRate / 12 / 100;
    const factor = Math.pow(1 + stdRate, tenureMonths);
    const stdEmi = Math.round((principal * stdRate * factor) / (factor - 1));
    interestSubsidyDiscount = Math.max(0, stdEmi * tenureMonths - principal);
  }

  // Processing fee calculation from config
  const rawFee = (principal * emiConfig.processingFee.percentage) / 100;
  const processingFee =
    principal === 0
      ? 0
      : Math.min(
          emiConfig.processingFee.maxFee,
          Math.max(emiConfig.processingFee.minFee, Math.round(rawFee))
        );
  const gst = Math.round((processingFee * emiConfig.processingFee.gstPercent) / 100);
  const processingFeeWithGst = processingFee + gst;

  // Tenure comparisons across standard options [3, 6, 9, 12, 18, 24]
  const tenureComparison = emiConfig.tenureMonthsOptions.map((t) => {
    if (principal === 0) {
      return { tenure: t, monthlyEmi: 0, totalInterest: 0, totalPayable: downPayment };
    }
    if (monthlyRate === 0 || isNoCostEmi) {
      const emi = Math.round(principal / t);
      return {
        tenure: t,
        monthlyEmi: emi,
        totalInterest: 0,
        totalPayable: downPayment + emi * t,
      };
    }
    const factor = Math.pow(1 + monthlyRate, t);
    const emi = Math.round((principal * monthlyRate * factor) / (factor - 1));
    const interest = Math.max(0, emi * t - principal);
    return {
      tenure: t,
      monthlyEmi: emi,
      totalInterest: interest,
      totalPayable: downPayment + emi * t,
    };
  });

  return {
    price,
    downPayment,
    principal,
    tenureMonths,
    annualInterestRate: effectiveAnnualRate,
    monthlyInterestRate: monthlyRate,
    monthlyEmi,
    totalInterest,
    totalPayable,
    processingFee,
    processingFeeWithGst,
    isNoCostEmi,
    interestSubsidyDiscount,
    schedule,
    tenureComparison,
  };
}
