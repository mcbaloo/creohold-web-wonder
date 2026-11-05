"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ComingSoonBadge from "@/components/ui/ComingSoonBadge";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Mode = "link" | "crypto";

const SAMPLE_LINK = "https://pay.creohold.com/acme/INV-20261105";
const SAMPLE_ADDRESS = "0x742d35Cc6634C0532925a3b8D4C9E6C2a4b1234";

export default function CollectPayments() {
  const [mode, setMode] = useState<Mode>("link");
  const [copied, setCopied] = useState(false);
  const [received, setReceived] = useState(false);

  const copy = (val: string) => {
    navigator.clipboard.writeText(val).catch(() => null);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const value = mode === "link" ? SAMPLE_LINK : SAMPLE_ADDRESS;
  const display = mode === "link"
    ? "pay.creohold.com/acme/INV-20261105"
    : "0x742d…1234";

  return (
    <div className="bg-white rounded-2xl border border-grey-mid shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-grey-mid flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-navy">Collect payments</p>
          <p className="text-xs text-grey-text mt-0.5">Share a link or crypto address</p>
        </div>
        <ComingSoonBadge />
      </div>

      <div className="p-5">
        {/* Mode tabs */}
        <div className="flex gap-1 p-1 bg-grey-light rounded-xl mb-5">
          {(["link", "crypto"] as Mode[]).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                mode === m
                  ? "bg-white text-navy shadow-sm"
                  : "text-grey-text hover:text-navy"
              }`}
            >
              {m === "link" ? "Payment link" : "Crypto address"}
            </button>
          ))}
        </div>

        {/* QR code mock */}
        <div className="flex justify-center mb-5">
          <div
            className="w-32 h-32 rounded-xl border border-grey-mid flex items-center justify-center"
            style={{ background: "#fff" }}
            aria-label="QR code placeholder"
          >
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" aria-hidden="true">
              {/* QR pattern mock */}
              {[0,1,2,3,4,5,6].map(col => [0,1,2,3,4,5,6].map(row => {
                const val = (col + row + col * row) % 3;
                if (val === 0) return <rect key={`${col}-${row}`} x={8+col*12} y={8+row*12} width={10} height={10} rx={1} fill="#052338"/>;
                return null;
              }))}
              <rect x="8" y="8" width="34" height="34" rx="4" fill="none" stroke="#052338" strokeWidth="3"/>
              <rect x="58" y="8" width="34" height="34" rx="4" fill="none" stroke="#052338" strokeWidth="3"/>
              <rect x="8" y="58" width="34" height="34" rx="4" fill="none" stroke="#052338" strokeWidth="3"/>
              <rect x="16" y="16" width="18" height="18" rx="2" fill="#052338"/>
              <rect x="66" y="16" width="18" height="18" rx="2" fill="#052338"/>
              <rect x="16" y="66" width="18" height="18" rx="2" fill="#052338"/>
            </svg>
          </div>
        </div>

        {/* Value + copy */}
        <div className="flex gap-2 mb-5">
          <div className="flex-1 bg-grey-light rounded-xl px-3 py-2 min-w-0">
            <p className="text-xs text-grey-text truncate">{display}</p>
          </div>
          <button
            onClick={() => copy(value)}
            className="shrink-0 px-3 py-2 rounded-xl bg-navy text-white text-xs font-semibold hover:bg-navy-mid transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Live payment received demo */}
        <AnimatePresence>
          {received ? (
            <motion.div
              key="received"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="rounded-xl bg-green-brand/10 border border-green-brand/20 p-3 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-green-brand/15 flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3 3 7-7" stroke="#00D285" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-green-deep">Payment received!</p>
                <p className="text-[10px] text-grey-text">₦25,000 from customer — just now</p>
              </div>
            </motion.div>
          ) : (
            <button
              onClick={() => setReceived(true)}
              disabled
              className="w-full py-2.5 text-sm font-semibold text-white/50 bg-grey-mid rounded-xl cursor-not-allowed flex items-center justify-center gap-2"
            >
              Generate new link
              <ComingSoonBadge />
            </button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
