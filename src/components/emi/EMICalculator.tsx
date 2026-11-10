"use client";

import { useState, useMemo } from "react";
import { emiConfig } from "@/config/emi";
import { calculateEMI } from "@/lib/emi";
import { formatPrice } from "@/lib/format";
import { getEMIWhatsAppUrl } from "@/lib/whatsapp";
import {
  MessageSquare,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Percent,
  Calendar,
  CreditCard,
  FileText,
  BadgeAlert,
} from "lucide-react";

interface EMICalculatorProps {
  initialPrice?: number;
  productName?: string;
  isCompact?: boolean;
}

export function EMICalculator({
  initialPrice = emiConfig.defaultPrice,
  productName,
  isCompact = false,
}: EMICalculatorProps) {
  const [price, setPrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(
    emiConfig.defaultDownPaymentPercent
  );
  const [tenure, setTenure] = useState<number>(emiConfig.defaultTenureMonths);
  const [interestRate, setInterestRate] = useState<number>(
    emiConfig.defaultAnnualInterestRate
  );
  const [isNoCost, setIsNoCost] = useState<boolean>(false);
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  const downPaymentAmount = useMemo(() => {
    return Math.round((price * downPaymentPercent) / 100);
  }, [price, downPaymentPercent]);

  const calculation = useMemo(() => {
    return calculateEMI({
      price,
      downPayment: downPaymentAmount,
      tenureMonths: tenure,
      annualInterestRate: interestRate,
      isNoCostEmi: isNoCost,
    });
  }, [price, downPaymentAmount, tenure, interestRate, isNoCost]);

  // Donut chart math: principal vs interest
  const totalLoanCost = calculation.principal + calculation.totalInterest;
  const principalShare =
    totalLoanCost > 0 ? (calculation.principal / totalLoanCost) * 100 : 100;
  const interestShare = totalLoanCost > 0 ? 100 - principalShare : 0;

  const whatsappUrl = getEMIWhatsAppUrl({
    productName,
    price,
    downPayment: downPaymentAmount,
    monthlyEmi: calculation.monthlyEmi,
    tenureMonths: tenure,
    isNoCost,
  });

  return (
    <div className="bento-card p-4 sm:p-8 space-y-5 sm:space-y-6 bg-white dark:bg-[#141724] border-2 border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white shadow-xl dark:shadow-2xl w-full">
      {/* Top Header & No-Cost Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 border-b border-zinc-200 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-[#c5e84a] text-[11px] sm:text-xs font-extrabold uppercase mb-1">
            <CreditCard className="w-3.5 h-3.5" />
            <span>0% EASY EMI & FINANCE CALCULATOR</span>
          </div>
          <h3 className="font-display font-extrabold text-xl sm:text-3xl text-zinc-950 dark:text-white">
            {productName ? `Calculate EMI for ${productName}` : "Smart Mobile EMI Calculator"}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            Instant paperless approval in 5 minutes at Kakod store with Aadhaar & PAN card.
          </p>
        </div>

        {/* No-Cost EMI Toggle Switch */}
        <div className="flex items-center justify-between sm:justify-start gap-3 bg-zinc-50 dark:bg-zinc-950 p-2 sm:p-2.5 rounded-2xl border border-zinc-200 dark:border-white/10 shrink-0">
          <div>
            <p className="text-xs font-bold text-zinc-900 dark:text-white">0% No-Cost EMI</p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Interest offset by store discount</p>
          </div>
          <button
            type="button"
            onClick={() => setIsNoCost(!isNoCost)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 shrink-0 ${
              isNoCost ? "bg-[#c5e84a]" : "bg-zinc-300 dark:bg-zinc-800"
            }`}
          >
            <div
              className={`bg-black w-4 h-4 rounded-full shadow-md transform transition duration-300 ${
                isNoCost ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* 1. Phone Price Input & Presets */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                Smartphone Price:
              </label>
              <span className="font-display font-extrabold text-xl sm:text-2xl text-zinc-950 dark:text-white">
                {formatPrice(price)}
              </span>
            </div>

            <input
              type="range"
              min={emiConfig.minPrice}
              max={emiConfig.maxPrice}
              step={emiConfig.priceStep}
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value, 10))}
              aria-label="Phone Price"
            />

            <div className="flex justify-between text-[11px] text-zinc-500 font-bold">
              <span>₹5,000</span>
              <span>₹40,000</span>
              <span>₹80,000 (iPhone)</span>
              <span>₹1,50,000 (Pro Max)</span>
            </div>

            {/* Quick Price Preset Buttons */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[15000, 25000, 45000, 75000, 135000].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setPrice(preset)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition border ${
                    price === preset
                      ? "bg-[#ff5a1f] text-white border-[#ff5a1f]"
                      : "bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/30"
                  }`}
                >
                  {formatPrice(preset)}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Down Payment Slider (% and ₹) */}
          <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-white/10">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-1.5">
                <label className="font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                  Down Payment:
                </label>
                <span className="text-[11px] font-bold text-emerald-800 dark:text-[#c5e84a] bg-emerald-500/15 px-2 py-0.5 rounded">
                  {downPaymentPercent}%
                </span>
              </div>
              <span className="font-display font-extrabold text-lg text-zinc-950 dark:text-white">
                {formatPrice(downPaymentAmount)}
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={60}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(parseInt(e.target.value, 10))}
              aria-label="Down payment percentage"
            />

            <div className="flex justify-between text-[11px] text-zinc-500 font-bold">
              <span className="text-emerald-700 dark:text-[#c5e84a]">₹0 (Zero Downpayment)</span>
              <span>20%</span>
              <span>40%</span>
              <span>60%</span>
            </div>
          </div>

          {/* 3. Tenure Buttons (Months) */}
          <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-white/10">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                Tenure Duration:
              </label>
              <span className="font-extrabold text-zinc-950 dark:text-white text-sm">
                {tenure} Months ({tenure <= 6 ? "Short" : tenure <= 12 ? "Recommended" : "Extended"})
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2">
              {emiConfig.tenureMonthsOptions.map((t) => (
                <button
                  key={t}
                  onClick={() => setTenure(t)}
                  className={`py-2.5 rounded-xl text-xs font-extrabold transition border ${
                    tenure === t
                      ? "bg-zinc-950 text-white dark:bg-white dark:text-black border-zinc-950 dark:border-white shadow-md"
                      : "bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/30"
                  }`}
                >
                  {t}m
                </button>
              ))}
            </div>
          </div>

          {/* 4. Interest Rate Slider (Active when NOT No-Cost) */}
          {!isNoCost ? (
            <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-white/10">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                  Interest Rate (% p.a. reducing):
                </label>
                <span className="font-extrabold text-zinc-950 dark:text-white text-sm">{interestRate}%</span>
              </div>

              <input
                type="range"
                min={10}
                max={24}
                step={0.5}
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                aria-label="Annual interest rate"
              />
              <p className="text-[10px] text-zinc-500">
                Default: 14.5% standard consumer durable reducing rate across Bajaj/IDFC/Home Credit.
              </p>
            </div>
          ) : (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-3 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 shrink-0 text-emerald-600 dark:text-[#c5e84a]" />
              <span>
                <strong>0% No-Cost EMI Active:</strong> Total interest of{" "}
                {formatPrice(calculation.interestSubsidyDiscount)} is completely offset by the
                store discount!
              </span>
            </div>
          )}
        </div>

        {/* Right Summary Card & Donut Chart (5 Cols) */}
        <div className="lg:col-span-5 bg-zinc-50 dark:bg-zinc-950 border-2 border-emerald-500/30 dark:border-[#c5e84a]/30 rounded-3xl p-5 sm:p-6 space-y-5 shadow-lg dark:shadow-xl">
          {/* Monthly EMI Big Display */}
          <div className="text-center space-y-1 pb-4 border-b border-zinc-200 dark:border-white/10">
            <span className="text-[11px] font-extrabold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
              Monthly Installment
            </span>
            <div className="font-display font-extrabold text-4xl sm:text-5xl text-emerald-700 dark:text-[#c5e84a]">
              {formatPrice(calculation.monthlyEmi)}
              <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">/month</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              for {tenure} months with {formatPrice(downPaymentAmount)} down payment
            </p>
          </div>

          {/* Donut / Visual Bar Principal vs Interest */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-zinc-700 dark:text-zinc-200 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-900 dark:bg-white" />
                Principal: {formatPrice(calculation.principal)} ({principalShare.toFixed(0)}%)
              </span>
              <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5a1f]" />
                Interest: {formatPrice(calculation.totalInterest)} ({interestShare.toFixed(0)}%)
              </span>
            </div>

            <div className="w-full h-3 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden flex">
              <div
                style={{ width: `${principalShare}%` }}
                className="h-full bg-zinc-900 dark:bg-white transition-all duration-300"
              />
              <div
                style={{ width: `${interestShare}%` }}
                className="h-full bg-[#ff5a1f] transition-all duration-300"
              />
            </div>
          </div>

          {/* Breakdown Numbers */}
          <div className="space-y-2 text-xs bg-white dark:bg-zinc-900/80 p-3.5 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-sm">
            <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
              <span>Down Payment:</span>
              <span className="font-bold text-zinc-900 dark:text-white">{formatPrice(downPaymentAmount)}</span>
            </div>
            <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
              <span>Total Interest Payable:</span>
              <span className="font-bold text-rose-600 dark:text-rose-300">
                {formatPrice(calculation.totalInterest)}
              </span>
            </div>
            <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
              <span>Est. Processing Fee (+18% GST):</span>
              <span className="font-bold text-zinc-900 dark:text-white">
                {formatPrice(calculation.processingFeeWithGst)}
              </span>
            </div>
            <div className="pt-2 border-t border-zinc-200 dark:border-white/10 flex justify-between font-bold text-sm text-zinc-900 dark:text-white">
              <span>Total Amount Payable:</span>
              <span className="text-emerald-700 dark:text-[#c5e84a] font-display text-base">
                {formatPrice(calculation.totalPayable)}
              </span>
            </div>
          </div>

          {/* WhatsApp CTA with prefilled calculation */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-sm py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition active:scale-95"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Get Pre-Approved on WhatsApp</span>
          </a>

          {/* Free Gifts Note */}
          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 text-center flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-lime-400 shrink-0" />
            <span>Includes Official Brand Warranty & Free Gift Hamper</span>
          </div>
        </div>
      </div>

      {/* Tenure Comparison Bar Chart */}
      {!isCompact && (
        <div className="pt-6 border-t border-zinc-200 dark:border-white/10 space-y-3">
          <h4 className="font-display font-extrabold text-base text-zinc-950 dark:text-white">
            📊 Compare EMI Across Different Tenures
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {calculation.tenureComparison.map((tc) => (
              <div
                key={tc.tenure}
                onClick={() => setTenure(tc.tenure)}
                className={`p-3 rounded-2xl border text-center cursor-pointer transition ${
                  tenure === tc.tenure
                    ? "bg-zinc-100 dark:bg-white/10 border-zinc-900 dark:border-white text-zinc-950 dark:text-white font-bold"
                    : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-white/30"
                }`}
              >
                <p className="text-[10px] font-extrabold uppercase text-zinc-500 dark:text-zinc-400">
                  {tc.tenure} Months
                </p>
                <p className="font-display font-extrabold text-base text-emerald-700 dark:text-[#c5e84a] mt-1">
                  {formatPrice(tc.monthlyEmi)}
                </p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">/mo</p>
                <p className="text-[10px] text-zinc-500 mt-1">
                  Total: {formatPrice(tc.totalPayable)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Collapsible Amortization Schedule Table */}
      {!isCompact && (
        <div className="pt-4 border-t border-zinc-200 dark:border-white/10">
          <button
            onClick={() => setShowAmortization(!showAmortization)}
            className="w-full py-2.5 px-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 flex items-center justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition"
          >
            <span>
              📋 {showAmortization ? "Hide" : "View"} Detailed Month-by-Month Amortization Schedule
            </span>
            {showAmortization ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showAmortization && (
            <div className="mt-3 overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-950">
              <table className="w-full text-xs text-left">
                <thead className="bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Month</th>
                    <th className="p-3">Opening Loan</th>
                    <th className="p-3">EMI Amount</th>
                    <th className="p-3">Principal</th>
                    <th className="p-3">Interest</th>
                    <th className="p-3">Balance Remaining</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-white/5 font-mono text-[11px]">
                  {calculation.schedule.map((row) => (
                    <tr key={row.month} className="hover:bg-zinc-100 dark:hover:bg-white/5">
                      <td className="p-3 text-zinc-950 dark:text-white font-sans font-bold">Month {row.month}</td>
                      <td className="p-3 text-zinc-700 dark:text-zinc-300">{formatPrice(row.openingBalance)}</td>
                      <td className="p-3 text-emerald-700 dark:text-[#c5e84a] font-bold">{formatPrice(row.emi)}</td>
                      <td className="p-3 text-zinc-700 dark:text-zinc-200">{formatPrice(row.principal)}</td>
                      <td className="p-3 text-rose-600 dark:text-rose-300">{formatPrice(row.interest)}</td>
                      <td className="p-3 text-zinc-600 dark:text-zinc-400">{formatPrice(row.closingBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Eligibility Helper Documents Checklist */}
      <div className="pt-4 border-t border-zinc-200 dark:border-white/10 space-y-3">
        <h4 className="font-display font-extrabold text-sm text-zinc-950 dark:text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-600 dark:text-[#c5e84a]" />
          <span>Documents Needed For In-Store 5-Minute EMI Approval:</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
          {emiConfig.eligibilityChecklist.map((doc) => (
            <div
              key={doc.title}
              className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 space-y-1"
            >
              <div className="flex items-center gap-1.5 font-bold text-zinc-950 dark:text-white">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#c5e84a] shrink-0" />
                <span>{doc.title}</span>
              </div>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-snug">{doc.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-zinc-100 dark:bg-zinc-950/60 p-3.5 rounded-2xl border border-zinc-200 dark:border-white/5 text-[11px] text-zinc-500 leading-relaxed">
        <strong className="text-zinc-700 dark:text-zinc-400">Notice:</strong> {emiConfig.disclaimer}
      </div>
    </div>
  );
}
