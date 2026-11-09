export interface EMIPartner {
  name: string;
  badge: string;
  tagline: string;
  minDownPaymentPercent: number;
  popularTenures: number[];
  requirements: string[];
}

export const emiConfig = {
  defaultPrice: 35000,
  defaultDownPaymentPercent: 0,
  defaultTenureMonths: 9,
  defaultAnnualInterestRate: 14.5, // Reducing balance annual %
  minPrice: 5000,
  maxPrice: 200000,
  priceStep: 1000,

  tenureMonthsOptions: [3, 6, 9, 12, 18, 24],

  processingFee: {
    percentage: 1.5,
    minFee: 299,
    maxFee: 1499,
    gstPercent: 18,
  },

  partners: [
    {
      name: "Bajaj Finserv",
      badge: "Most Popular",
      tagline: "Instant ₹0 Downpayment & No Cost EMI with EMI Network Card",
      minDownPaymentPercent: 0,
      popularTenures: [6, 9, 12],
      requirements: ["Bajaj EMI Card or PAN Card", "Bank Account with e-Mandate"],
    },
    {
      name: "IDFC FIRST Bank",
      badge: "Quick Approval",
      tagline: "High approval rates with simple Aadhaar KYC verification",
      minDownPaymentPercent: 0,
      popularTenures: [6, 9, 12, 18],
      requirements: ["Aadhaar Card", "PAN Card", "Active Debit Card/UPI"],
    },
    {
      name: "Home Credit",
      badge: "First-Time Buyers",
      tagline: "Easy smartphone finance even with minimal or new credit score",
      minDownPaymentPercent: 10,
      popularTenures: [6, 9, 12],
      requirements: ["Aadhaar Card", "PAN Card", "6 Months Bank Statement"],
    },
    {
      name: "HDB Financial Services",
      badge: "HDFC Group",
      tagline: "Flexible consumer durable loans with minimal documentation",
      minDownPaymentPercent: 10,
      popularTenures: [9, 12, 18, 24],
      requirements: ["Identity Proof", "Address Proof", "Cancelled Cheque"],
    },
    {
      name: "TVS Credit",
      badge: "Rural & Local Friendly",
      tagline: "Doorstep and in-store instant mobile loan approval",
      minDownPaymentPercent: 0,
      popularTenures: [6, 9, 12],
      requirements: ["Aadhaar Card", "PAN Card", "Active Mobile Number"],
    },
    {
      name: "Credit & Debit Card EMI",
      badge: "All Major Banks",
      tagline: "HDFC, ICICI, SBI, Axis, Kotak, OneCard instant swipe EMI",
      minDownPaymentPercent: 0,
      popularTenures: [3, 6, 9, 12, 24],
      requirements: ["Any Major Bank Credit Card or Pre-Approved Debit Card"],
    },
  ] as EMIPartner[],

  eligibilityChecklist: [
    {
      title: "Identity & Age Proof",
      description: "Original Aadhaar Card & PAN Card (Age 18+ to 65 years)",
      required: true,
    },
    {
      title: "Bank Account Details",
      description: "Active Indian Bank account with Net Banking / Debit Card / UPI for auto-debit (e-NACH)",
      required: true,
    },
    {
      title: "Registered Mobile Number",
      description: "Aadhaar-linked active mobile number for instantaneous OTP verification",
      required: true,
    },
    {
      title: "Income / Address Document",
      description: "Electricity bill, bank passbook, or UPI statement for high-ticket flagship approvals (₹70k+)",
      required: false,
    },
  ],

  disclaimer:
    "Disclaimer: EMI amounts, interest rates, and loan processing fees shown are indicative and calculated using the standard reducing-balance method. Final approval, exact down payment, interest rates, and processing fees are determined by the respective financing partner (Bajaj Finserv, IDFC First Bank, Home Credit, etc.) at the store counter based on your credit score and eligibility. The Mobile Lounge charges zero hidden store commissions.",
};
