"use client";
import { useState, useEffect, useCallback } from "react";

type Tab = "naira" | "crypto" | "convert" | "bills";

const TABS: { key: Tab; label: string }[] = [
  { key: "naira",   label: "Naira"   },
  { key: "crypto",  label: "Crypto"  },
  { key: "convert", label: "Convert" },
  { key: "bills",   label: "Bills"   },
];

function NairaContent() {
  return (
    <div className="animate-tab flex-1 flex flex-col">
      <p className="text-xs text-white/50 mb-1">Total Balance</p>
      <p className="text-2xl font-bold text-white tracking-tight mb-0.5">₦ 125,000.00</p>
      <p className="text-xs text-white/40 mb-5">≈ 0.08 BTC</p>
      <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Recent</p>
      <ul className="flex flex-col gap-2.5">
        {[
          { label: "Steph Bank funding",     amt: "+₦50,000", pos: true  },
          { label: "EKEDC electricity",       amt: "−₦8,500",  pos: false },
          { label: "BTC received",            amt: "+₦47,350", pos: true  },
          { label: "MTN airtime",             amt: "−₦1,000",  pos: false },
        ].map((tx) => (
          <li key={tx.label} className="flex items-center justify-between gap-2">
            <span className="text-xs text-white/70 truncate">{tx.label}</span>
            <span className={`text-xs font-semibold shrink-0 ${tx.pos ? "text-green-brand" : "text-white/60"}`}>
              {tx.amt}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CryptoContent() {
  return (
    <div className="animate-tab flex-1 flex flex-col gap-3">
      <p className="text-sm font-semibold text-white">Send Crypto</p>
      <div className="bg-navy-mid/60 rounded-lg px-3 py-2.5 border border-white/8">
        <p className="text-xs text-white/40 mb-1">Recipient address</p>
        <p className="text-xs text-white font-mono truncate">0x1a2b3c4d…9f8e7d6c</p>
        <div className="flex items-center gap-1 mt-1.5">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <circle cx="5" cy="5" r="4.5" fill="#00D285"/>
            <path d="M2.5 5L4 6.5L7.5 3" stroke="#052338" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xs font-semibold text-green-brand">Address verified</span>
        </div>
      </div>
      <div className="bg-navy-mid/60 rounded-lg px-3 py-2.5 border border-white/8">
        <p className="text-xs text-white/40 mb-1">Amount</p>
        <p className="text-sm font-bold text-white">0.05 ETH</p>
      </div>
      <div className="flex items-center gap-2 bg-green-brand/10 rounded-lg px-3 py-2 border border-green-brand/20">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <circle cx="6" cy="6" r="5.5" stroke="#00D285"/>
          <path d="M6 4v3M6 8.5v.5" stroke="#00D285" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        <p className="text-xs text-green-brand font-medium">Fee: ₦245 — shown before you confirm</p>
      </div>
      <button className="w-full bg-green-brand text-navy text-xs font-bold py-2.5 rounded-lg mt-auto">
        Confirm send
      </button>
    </div>
  );
}

function ConvertContent() {
  return (
    <div className="animate-tab flex-1 flex flex-col gap-3">
      <p className="text-sm font-semibold text-white">Convert</p>
      <div className="bg-navy-mid/60 rounded-lg px-3 py-2.5 border border-white/8">
        <p className="text-xs text-white/40 mb-0.5">From</p>
        <p className="text-sm font-bold text-white">0.05 BTC</p>
      </div>
      <div className="flex justify-center">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 4v12M6 12l4 4 4-4" stroke="#00D285" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="bg-navy-mid/60 rounded-lg px-3 py-2.5 border border-white/8">
        <p className="text-xs text-white/40 mb-0.5">To naira</p>
        <p className="text-sm font-bold text-green-brand">≈ ₦ 8,500,000</p>
      </div>
      <p className="text-xs text-white/40 text-center">Rate: 1 BTC = ₦ 170,000,000</p>
      <div className="mt-auto text-center">
        <p className="text-xs text-white/40">No third party · No extra step</p>
      </div>
      <button className="w-full bg-green-brand text-navy text-xs font-bold py-2.5 rounded-lg">
        Convert now
      </button>
    </div>
  );
}

function BillsContent() {
  const [active, setActive] = useState<"airtime"|"data"|"electricity"|"tv">("electricity");
  const categories = [
    { key: "airtime" as const,     label: "Airtime"      },
    { key: "data" as const,        label: "Data"         },
    { key: "electricity" as const, label: "Electricity"  },
    { key: "tv" as const,          label: "TV"           },
  ];
  return (
    <div className="animate-tab flex-1 flex flex-col gap-3">
      <p className="text-sm font-semibold text-white">Pay Bills</p>
      <div className="flex gap-1.5 flex-wrap">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            className={`text-xs px-2.5 py-1 rounded-md font-medium border transition-colors ${
              active === c.key
                ? "bg-green-brand border-green-brand text-navy"
                : "bg-transparent border-white/20 text-white/60 hover:border-white/40"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="bg-navy-mid/60 rounded-lg px-3 py-2.5 border border-white/8">
        <p className="text-xs text-white/40 mb-1">
          {active === "airtime" ? "Network" : active === "data" ? "Network" : active === "electricity" ? "DISCO" : "Provider"}
        </p>
        <p className="text-sm font-semibold text-white">
          {active === "airtime" ? "MTN" : active === "data" ? "Airtel" : active === "electricity" ? "EKEDC" : "DStv"}
        </p>
      </div>
      <div className="bg-navy-mid/60 rounded-lg px-3 py-2.5 border border-white/8">
        <p className="text-xs text-white/40 mb-1">Amount</p>
        <p className="text-sm font-bold text-white">₦ {active === "electricity" ? "8,500" : active === "tv" ? "9,900" : "1,000"}</p>
      </div>
      <button className="w-full bg-green-brand text-navy text-xs font-bold py-2.5 rounded-lg mt-auto">
        Pay now
      </button>
    </div>
  );
}

export default function WalletMockup({ interactive = false }: { interactive?: boolean }) {
  const [tab, setTab] = useState<Tab>("naira");
  const [key, setKey] = useState(0);

  const setTabAnimated = useCallback((t: Tab) => {
    setTab(t);
    setKey((k) => k + 1);
  }, []);

  // Auto-cycle tabs unless user has interacted or prefers reduced motion
  useEffect(() => {
    if (interactive) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const order: Tab[] = ["naira", "crypto", "convert", "bills"];
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % order.length;
      setTabAnimated(order[i]);
    }, 3200);
    return () => clearInterval(id);
  }, [interactive, setTabAnimated]);

  return (
    <div className="mockup-glow bg-navy rounded-2xl border border-white/10 overflow-hidden w-72 select-none" aria-label="Wallet interface preview" role="img">
      {/* Status bar */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-sm bg-green-brand/20 flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M 21 11 A 7 7 0 1 0 21 21" stroke="#00D285" strokeWidth="3.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-xs font-semibold text-white/70 tracking-wide">CreoHold</span>
        </div>
        <span className="text-xs text-white/40">10:30</span>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/8 px-4">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTabAnimated(t.key)}
            className={`text-xs font-semibold py-2 px-2.5 border-b-2 transition-colors -mb-px ${
              tab === t.key
                ? "border-green-brand text-green-brand"
                : "border-transparent text-white/40 hover:text-white/60"
            }`}
            aria-pressed={tab === t.key}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div key={key} className="px-4 py-4 h-72 flex flex-col">
        {tab === "naira"   && <NairaContent />}
        {tab === "crypto"  && <CryptoContent />}
        {tab === "convert" && <ConvertContent />}
        {tab === "bills"   && <BillsContent />}
      </div>
    </div>
  );
}
