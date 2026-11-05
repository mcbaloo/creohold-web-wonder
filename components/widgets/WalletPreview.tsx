"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { api } from "@/lib/api";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ── Shared check icon ─────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="rgba(0,210,133,0.15)"/>
      <path d="M6 10l3 3 5-5" stroke="#00D285" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Success screen ────────────────────────────────────────────────
function SuccessScreen({ message, onReset }: { message: string; onReset: () => void }) {
  useEffect(() => {
    const t = setTimeout(onReset, 2800);
    return () => clearTimeout(t);
  }, [onReset]);

  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="flex flex-col items-center justify-center gap-3 py-6 text-center"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: EASE, delay: 0.1 }}
        className="w-12 h-12 rounded-full bg-green-brand/15 flex items-center justify-center"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path d="M5 11l4.5 4.5 7.5-8" stroke="#00D285" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
      <p className="text-sm font-semibold text-white">{message}</p>
    </motion.div>
  );
}

// ── Tab: Naira ───────────────────────────────────────────────────
function NairaTab({ balance }: { balance: string }) {
  const [step, setStep] = useState<"home" | "add" | "withdraw" | "done">("home");
  const [amount, setAmount] = useState("50000");
  const [doneMsg, setDoneMsg] = useState("");

  const handleAdd = () => {
    setDoneMsg("₦" + Number(amount).toLocaleString() + " added");
    setStep("done");
  };
  const handleWithdraw = () => {
    setDoneMsg("₦" + Number(amount).toLocaleString() + " sent to your bank");
    setStep("done");
  };

  if (step === "done") {
    return <SuccessScreen message={doneMsg} onReset={() => { setStep("home"); setAmount("50000"); }} />;
  }
  if (step === "add" || step === "withdraw") {
    return (
      <motion.div key="flow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease: EASE }}>
        <div className="flex items-center gap-2 mb-4">
          <button onClick={() => setStep("home")} className="text-white/40 hover:text-white transition-colors" aria-label="Back">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
          <p className="text-sm font-semibold text-white">{step === "add" ? "Add money" : "Withdraw"}</p>
        </div>
        <div className="bg-white/5 rounded-xl p-3 mb-3">
          <p className="text-sm text-white/40 mb-1">Amount (₦)</p>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="w-full bg-transparent text-white text-lg font-bold tabular-nums focus:outline-none"
          />
        </div>
        <button
          onClick={step === "add" ? handleAdd : handleWithdraw}
          disabled={!Number(amount)}
          className="w-full bg-green-brand hover:bg-green-muted disabled:opacity-30 text-navy font-semibold py-2.5 rounded-xl text-sm transition-colors"
        >
          {step === "add" ? "Confirm deposit" : "Confirm withdrawal"}
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div key="naira-home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <div className="bg-white/5 rounded-xl p-3 mb-3">
        <p className="text-sm text-white/40 mb-0.5">Naira balance</p>
        <p className="text-xl font-bold text-white tabular-nums">{balance}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => { setStep("add"); }}
          className="bg-green-brand/10 border border-green-brand/25 hover:bg-green-brand/20 text-green-brand font-semibold py-2.5 rounded-xl text-sm transition-colors"
        >
          Add money
        </button>
        <button
          onClick={() => setStep("withdraw")}
          className="bg-white/5 border border-white/10 hover:bg-white/10 text-white/70 font-semibold py-2.5 rounded-xl text-sm transition-colors"
        >
          Withdraw
        </button>
      </div>
      <div className="mt-3 space-y-1.5">
        {[
          { label: "MTN Airtime", amt: "−₦1,000", pos: false },
          { label: "Deposit", amt: "+₦50,000", pos: true },
        ].map(tx => (
          <div key={tx.label} className="flex justify-between text-sm">
            <span className="text-white/40">{tx.label}</span>
            <span className={tx.pos ? "text-green-brand font-semibold" : "text-white/50"}>{tx.amt}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Tab: Crypto ──────────────────────────────────────────────────
function CryptoTab() {
  const [step, setStep] = useState<"compose" | "done">("compose");
  const [address, setAddress] = useState("");

  const { data: validation, isLoading: validating } = useQuery({
    queryKey: ["validate-mini", "BTC", "bitcoin", address],
    queryFn: () => api.validateAddress("BTC", "bitcoin", address),
    enabled: address.length > 10,
    staleTime: 60_000,
  });
  const { data: fee } = useQuery({
    queryKey: ["fee-mini", "BTC", "bitcoin", "0.001"],
    queryFn: () => api.getFeeQuote("BTC", "bitcoin", 0.001),
    enabled: validation?.valid === true,
    staleTime: 15_000,
  });

  const isValid = validation?.valid === true;

  if (step === "done") {
    return <SuccessScreen message="0.001 BTC sent" onReset={() => { setStep("compose"); setAddress(""); }} />;
  }

  return (
    <motion.div key="crypto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <p className="text-sm text-white/40">Sending 0.001 BTC</p>
          {validating && <span className="text-sm text-white/30 animate-pulse">Checking…</span>}
          {isValid && <span className="text-sm text-green-brand font-semibold">Verified ✓</span>}
        </div>
        <div className="relative">
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Paste BTC address…"
            className={`w-full bg-white/5 border rounded-xl px-3 py-2 text-sm font-mono text-white placeholder:text-white/20 focus:outline-none transition-colors ${
              isValid ? "border-green-brand/40" : "border-white/10 focus:border-white/25"
            }`}
          />
        </div>
        <button
          onClick={() => setAddress("bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq")}
          className="mt-1 text-sm text-green-brand/60 hover:text-green-brand transition-colors"
        >
          Try a sample address
        </button>
      </div>
      {fee && isValid && (
        <div className="bg-white/5 rounded-xl px-3 py-2 mb-3 space-y-1 text-sm">
          <div className="flex justify-between"><span className="text-white/40">Fee</span><span className="text-white/70">{fee.feeCrypto} BTC</span></div>
          <div className="flex justify-between"><span className="text-white/40">Total</span><span className="text-white font-semibold">{fee.totalCrypto} BTC</span></div>
        </div>
      )}
      <button
        disabled={!isValid}
        onClick={() => setStep("done")}
        className="w-full bg-green-brand hover:bg-green-muted disabled:opacity-25 text-navy font-semibold py-2.5 rounded-xl text-sm transition-colors"
      >
        Send
      </button>
    </motion.div>
  );
}

// ── Tab: Convert ─────────────────────────────────────────────────
function ConvertTab() {
  const [step, setStep] = useState<"quote" | "done">("quote");
  const [ngn, setNgn] = useState("50000");

  const { data: rates } = useQuery({
    queryKey: ["rates"],
    queryFn: () => api.getRates(),
    refetchInterval: 15_000,
  });
  const btcRate = rates?.find(r => r.asset === "BTC")?.priceNGN ?? 158_432_500;
  const btcAmount = (Number(ngn) / btcRate).toFixed(8);

  if (step === "done") {
    return <SuccessScreen message={`Converted ₦${Number(ngn).toLocaleString()} → ${btcAmount} BTC`} onReset={() => setStep("quote")} />;
  }

  return (
    <motion.div key="convert" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <div className="bg-white/5 rounded-xl p-3 mb-2">
        <p className="text-sm text-white/40 mb-1">From (₦)</p>
        <input
          type="number"
          value={ngn}
          onChange={e => setNgn(e.target.value)}
          className="w-full bg-transparent text-white text-lg font-bold tabular-nums focus:outline-none"
        />
      </div>
      <div className="flex justify-center my-2">
        <div className="w-7 h-7 rounded-full bg-green-brand/10 border border-green-brand/20 flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1v8M2 6l3 3 3-3" stroke="#00D285" strokeWidth="1" strokeLinecap="round"/></svg>
        </div>
      </div>
      <div className="bg-white/5 rounded-xl p-3 mb-3">
        <p className="text-sm text-white/40 mb-1">To (BTC)</p>
        <p className="text-lg font-bold text-green-brand tabular-nums">{btcAmount}</p>
        <p className="text-sm text-white/30 mt-0.5">Rate: 1 BTC = ₦{btcRate.toLocaleString()}</p>
      </div>
      <button
        disabled={!Number(ngn)}
        onClick={() => setStep("done")}
        className="w-full bg-green-brand hover:bg-green-muted disabled:opacity-25 text-navy font-semibold py-2.5 rounded-xl text-sm transition-colors"
      >
        Convert
      </button>
    </motion.div>
  );
}

// ── Tab: Bills ───────────────────────────────────────────────────
function BillsTab() {
  const [cat, setCat] = useState<"airtime" | "electricity" | null>(null);
  const [meter, setMeter] = useState("");
  const [step, setStep] = useState<"cat" | "input" | "confirm" | "done">("cat");

  const handlePay = () => setStep("done");

  if (step === "done") {
    return <SuccessScreen message="Bill paid!" onReset={() => { setCat(null); setMeter(""); setStep("cat"); }} />;
  }
  if (step === "confirm") {
    return (
      <motion.div key="confirm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease: EASE }}>
        <div className="flex items-center gap-2 mb-4">
          <button onClick={() => setStep("input")} className="text-white/40 hover:text-white transition-colors" aria-label="Back">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
          <p className="text-sm font-semibold text-white">Review</p>
        </div>
        <div className="bg-white/5 rounded-xl p-3 mb-3 space-y-2 text-sm">
          {[
            ["Provider", cat === "electricity" ? "EKEDC" : "MTN"],
            ["Account", cat === "electricity" ? meter : "08012345678"],
            ["Customer", "Adaeze Okafor"],
            ["Amount", "₦5,000"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <span className="text-white/40">{k}</span>
              <span className="text-white font-medium">{v}</span>
            </div>
          ))}
        </div>
        <button onClick={handlePay} className="w-full bg-green-brand hover:bg-green-muted text-navy font-semibold py-2.5 rounded-xl text-sm transition-colors">
          Pay ₦5,000
        </button>
      </motion.div>
    );
  }
  if (step === "input") {
    return (
      <motion.div key="input" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease: EASE }}>
        <div className="flex items-center gap-2 mb-4">
          <button onClick={() => setStep("cat")} className="text-white/40 hover:text-white transition-colors" aria-label="Back">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
          <p className="text-sm font-semibold text-white">{cat === "electricity" ? "Electricity" : "Airtime"}</p>
        </div>
        <input
          type="text"
          value={meter}
          onChange={e => setMeter(e.target.value)}
          placeholder={cat === "electricity" ? "Meter number" : "Phone number"}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-green-brand/40 mb-2 transition-colors"
        />
        {meter.length > 4 && (
          <div className="text-sm text-green-brand bg-green-brand/8 border border-green-brand/20 rounded-lg px-2 py-1 mb-3 flex items-center gap-1">
            <CheckIcon />
            <span>Customer: Adaeze Okafor</span>
          </div>
        )}
        <button
          disabled={meter.length < 5}
          onClick={() => setStep("confirm")}
          className="w-full bg-green-brand hover:bg-green-muted disabled:opacity-25 text-navy font-semibold py-2.5 rounded-xl text-sm transition-colors"
        >
          Continue
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div key="cat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <p className="text-sm text-white/40 mb-3">What would you like to pay?</p>
      <div className="grid grid-cols-2 gap-2">
        {[
          { key: "airtime" as const, label: "Airtime", icon: "📱" },
          { key: "electricity" as const, label: "Electricity", icon: "⚡" },
        ].map(c => (
          <button
            key={c.key}
            onClick={() => { setCat(c.key); setStep("input"); }}
            className="bg-white/5 border border-white/10 hover:border-green-brand/30 hover:bg-green-brand/5 rounded-xl p-3 text-left transition-colors"
          >
            <span className="block text-lg mb-1" aria-hidden="true">{c.icon}</span>
            <span className="text-sm font-semibold text-white">{c.label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// ── Main WalletPreview ────────────────────────────────────────────
const TABS = [
  { key: "naira",   label: "Naira"   },
  { key: "crypto",  label: "Crypto"  },
  { key: "convert", label: "Convert" },
  { key: "bills",   label: "Bills"   },
] as const;

type TabKey = typeof TABS[number]["key"];

interface Props {
  variant?: "personal" | "business";
  compact?: boolean;
}

export default function WalletPreview({ variant = "personal", compact = false }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>("naira");

  const handleTabClick = (key: TabKey) => {
    setActiveTab(key);
  };

  if (compact) {
    return (
      <div className="bg-navy border border-white/10 rounded-2xl overflow-hidden mockup-glow w-72 max-w-full text-sm"
        aria-label={`${variant === "business" ? "Business" : "Personal"} wallet`}
      >
        <div className="bg-navy-mid border-b border-white/8 px-4 py-3">
          <p className="text-sm text-white/40">Total balance</p>
          <p className="text-xl font-bold text-white tabular-nums">{variant === "business" ? "₦2,840,000.00" : "₦125,000.00"}</p>
        </div>
        <div className="px-4 py-3 space-y-2">
          {(variant === "business" ? [
            { label: "Client payment",  amount: "+₦1,500,000", pos: true },
            { label: "Payroll batch",   amount: "−₦890,000",   pos: false },
          ] : [
            { label: "Naira deposit",   amount: "+₦50,000",    pos: true },
            { label: "Electricity",     amount: "−₦12,000",    pos: false },
          ]).map(tx => (
            <div key={tx.label} className="flex justify-between">
              <span className="text-white/50 truncate pr-2">{tx.label}</span>
              <span className={`font-semibold tabular-nums shrink-0 ${tx.pos ? "text-green-brand" : "text-white/60"}`}>{tx.amount}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative bg-navy border border-white/10 rounded-2xl overflow-hidden mockup-glow w-96 sm:w-[28rem] max-w-full"
      aria-label={`${variant === "business" ? "Business" : "Personal"} wallet preview`}
    >
      {/* Header */}
      <div className="bg-navy-mid border-b border-white/8 px-4 py-3 flex justify-between items-center">
        <div>
          {variant === "business" && (
            <p className="text-sm font-semibold text-white/30 uppercase tracking-widest mb-0.5">Business</p>
          )}
          <p className="text-sm text-white/40">CreoHold wallet</p>
          <p className="text-sm font-bold text-white tabular-nums">
            {variant === "business" ? "₦2,840,000.00" : "₦125,000.00"}
          </p>
        </div>
        <div className="w-7 h-7 rounded-full bg-green-brand/15 flex items-center justify-center">
          <span className="text-green-brand text-sm font-bold">{variant === "business" ? "B" : "P"}</span>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex border-b border-white/8">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => handleTabClick(tab.key)}
            className={`flex-1 py-2 text-sm font-semibold transition-colors relative ${
              activeTab === tab.key
                ? "text-green-brand"
                : "text-white/35 hover:text-white/70"
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-brand"
                transition={{ duration: 0.25, ease: EASE }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="px-4 py-4 min-h-[180px]">
        <AnimatePresence mode="wait">
          {activeTab === "naira" && <NairaTab key="naira" balance={variant === "business" ? "₦2,840,000.00" : "₦125,000.00"} />}
          {activeTab === "crypto" && <CryptoTab key="crypto" />}
          {activeTab === "convert" && <ConvertTab key="convert" />}
          {activeTab === "bills" && <BillsTab key="bills" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
