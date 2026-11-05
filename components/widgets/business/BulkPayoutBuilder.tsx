"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ComingSoonBadge from "@/components/ui/ComingSoonBadge";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SAMPLE_ROWS = [
  { name: "Adaeze Okafor",    account: "0123456789", bank: "GTBank",   amount: 50000,  status: "valid"   as const },
  { name: "Emeka Nwosu",      account: "9876543210", bank: "Access",   amount: 120000, status: "valid"   as const },
  { name: "Fatima Aliyu",     account: "1122334455", bank: "Zenith",   amount: 75000,  status: "valid"   as const },
  { name: "Chukwuemeka Eze",  account: "5544332211", bank: "UBA",      amount: 200000, status: "warning" as const },
];

const STATUS_STYLES: Record<string, string> = {
  valid:   "text-green-brand",
  warning: "text-yellow-400",
  error:   "text-red-400",
};

export default function BulkPayoutBuilder() {
  const [step, setStep] = useState<"list" | "review">("list");
  const total = SAMPLE_ROWS.reduce((s, r) => s + r.amount, 0);
  const fee = Math.round(total * 0.001);

  return (
    <div className="bg-white rounded-2xl border border-grey-mid shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-grey-mid flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-navy">Bulk payouts</p>
          <p className="text-xs text-grey-text mt-0.5">Pay multiple recipients at once</p>
        </div>
        <ComingSoonBadge />
      </div>

      <AnimatePresence mode="wait">
        {step === "list" ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-grey-text">{SAMPLE_ROWS.length} recipients</p>
              <button className="text-xs font-semibold text-green-deep hover:text-green-brand transition-colors">
                + Add row
              </button>
            </div>

            <div className="rounded-xl border border-grey-mid overflow-hidden mb-4">
              <div className="grid grid-cols-[1fr_1fr_80px] gap-0 bg-grey-light px-3 py-2">
                <p className="text-[10px] font-semibold text-grey-text uppercase tracking-widest">Name / Account</p>
                <p className="text-[10px] font-semibold text-grey-text uppercase tracking-widest">Bank</p>
                <p className="text-[10px] font-semibold text-grey-text uppercase tracking-widest text-right">Amount</p>
              </div>
              {SAMPLE_ROWS.map((r, i) => (
                <div key={i} className={`grid grid-cols-[1fr_1fr_80px] gap-0 px-3 py-2.5 ${i < SAMPLE_ROWS.length - 1 ? "border-b border-grey-mid" : ""}`}>
                  <div>
                    <p className="text-xs font-semibold text-navy">{r.name}</p>
                    <p className="text-[10px] text-grey-text">{r.account}</p>
                  </div>
                  <div className="flex items-center">
                    <p className={`text-xs font-medium ${r.status === "warning" ? "text-yellow-600" : "text-grey-text"}`}>{r.bank}</p>
                    {r.status === "warning" && <span className="ml-1 text-yellow-500 text-[10px]">⚠</span>}
                  </div>
                  <p className="text-xs font-semibold text-navy text-right">₦{r.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center px-1 mb-4">
              <p className="text-xs text-grey-text">Total + fee (0.1%)</p>
              <p className="text-sm font-bold text-navy">₦{(total + fee).toLocaleString()}</p>
            </div>

            <button
              onClick={() => setStep("review")}
              className="w-full py-2.5 text-sm font-semibold text-white bg-navy hover:bg-navy-mid rounded-xl transition-colors"
            >
              Review payout
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="review"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => setStep("list")} className="text-grey-text hover:text-navy transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
              <p className="text-sm font-semibold text-navy">Review and submit</p>
            </div>

            <div className="rounded-xl border border-grey-mid p-4 mb-4 space-y-2">
              <div className="flex justify-between text-xs"><span className="text-grey-text">Recipients</span><span className="font-semibold text-navy">{SAMPLE_ROWS.length}</span></div>
              <div className="flex justify-between text-xs"><span className="text-grey-text">Payout total</span><span className="font-semibold text-navy">₦{total.toLocaleString()}</span></div>
              <div className="flex justify-between text-xs"><span className="text-grey-text">Service fee</span><span className="font-semibold text-navy">₦{fee.toLocaleString()}</span></div>
              <div className="border-t border-grey-mid pt-2 flex justify-between text-sm"><span className="font-semibold text-navy">Grand total</span><span className="font-bold text-navy">₦{(total + fee).toLocaleString()}</span></div>
            </div>

            <p className="text-xs text-grey-text mb-4 leading-relaxed">
              This payout will require approval from a Finance or Admin team member before processing.
            </p>

            <button disabled className="w-full py-2.5 text-sm font-semibold text-white/50 bg-grey-mid rounded-xl cursor-not-allowed flex items-center justify-center gap-2">
              Submit for approval
              <ComingSoonBadge />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
