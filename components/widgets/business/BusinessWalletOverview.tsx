"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const BALANCES = [
  { label: "Naira", symbol: "₦", amount: "2,840,000.00", code: "NGN", change: "+₦120,000 today" },
  { label: "Bitcoin", symbol: "", amount: "0.4821", code: "BTC", change: "≈ ₦39,200,000" },
  { label: "USDT", symbol: "", amount: "12,500.00", code: "USDT", change: "≈ ₦20,312,500" },
];

const ACTIVITY = [
  { name: "Emeka Nwosu", action: "Sent ₦450,000", time: "2m ago", type: "out" },
  { name: "Fatima Aliyu", action: "Approved payout", time: "14m ago", type: "approve" },
  { name: "API deposit", action: "+0.05 BTC received", time: "1h ago", type: "in" },
  { name: "Adaeze Okafor", action: "Paid electricity ₦32,000", time: "3h ago", type: "out" },
];

export default function BusinessWalletOverview() {
  const [tab, setTab] = useState<"balances" | "activity">("balances");

  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{
        background: "linear-gradient(170deg, #161616 0%, #0a0a0a 100%)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-0.5">CreoHold Business</p>
            <p className="text-xs text-white/50">Acme Technologies Ltd</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-brand animate-pulse" />
            <span className="text-[10px] text-green-brand font-semibold">Live</span>
          </div>
        </div>

        <div className="flex gap-1">
          {(["balances", "activity"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors capitalize ${
                tab === t ? "text-white" : "text-white/40 hover:text-white/70"
              }`}
            >
              {t === "balances" ? "Balances" : "Team activity"}
              {tab === t && (
                <motion.div
                  layoutId="biz-tab"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                  transition={{ duration: 0.2, ease: EASE }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {tab === "balances" ? (
          <motion.div
            key="balances"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="p-5 space-y-3"
          >
            {BALANCES.map(b => (
              <div key={b.code} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div>
                  <p className="text-xs font-semibold text-white">{b.label}</p>
                  <p className="text-[10px] text-white/35 mt-0.5">{b.change}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">{b.symbol}{b.amount}</p>
                  <p className="text-[10px] text-white/35 mt-0.5">{b.code}</p>
                </div>
              </div>
            ))}

            <div className="flex gap-2 mt-4">
              <button className="flex-1 py-2 text-xs font-semibold text-[#0a0a0a] bg-green-brand hover:bg-green-muted rounded-lg transition-colors">
                Convert
              </button>
              <button className="flex-1 py-2 text-xs font-semibold text-white/70 hover:text-white rounded-lg transition-colors" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                Pay bills
              </button>
              <button className="flex-1 py-2 text-xs font-semibold text-white/70 hover:text-white rounded-lg transition-colors" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                Send crypto
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="activity"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="p-5 space-y-2"
          >
            {ACTIVITY.map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  a.type === "in" ? "bg-green-brand/15" : a.type === "approve" ? "bg-blue-500/15" : "bg-white/8"
                }`}>
                  <span className="text-[10px]" aria-hidden="true">
                    {a.type === "in" ? "↓" : a.type === "approve" ? "✓" : "↑"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{a.name}</p>
                  <p className="text-[10px] text-white/40 truncate">{a.action}</p>
                </div>
                <p className="text-[10px] text-white/25 shrink-0">{a.time}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
