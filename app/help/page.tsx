"use client";
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";

const GROUPS = [
  {
    heading: "Getting started",
    faqs: [
      { q: "Who can open a CreoHold wallet?", a: "Anyone who is 18 or older and resident in Nigeria. You will need a valid government-issued ID to pass identity verification." },
      { q: "How long does identity verification take?", a: "Verification is typically quick. Upload a valid ID and a selfie; we check them against Nigerian KYC requirements. Your wallet is active once verification passes. Exact timing is [TIME TO CONFIRM]." },
      { q: "Can I sign in with Google or Apple?", a: "Yes. You can use Google or Apple sign-in to create and access your CreoHold wallet." },
    ],
  },
  {
    heading: "Naira wallet",
    faqs: [
      { q: "How do I fund my naira balance?", a: "Transfer naira from any Nigerian bank account to your wallet account number. The funds appear in your wallet balance once the bank transfer clears." },
      { q: "Can I withdraw my naira at any time?", a: "Yes. You can withdraw to any registered Nigerian bank account. Processing times depend on the receiving bank." },
    ],
  },
  {
    heading: "Crypto",
    faqs: [
      { q: "Which cryptocurrencies can I send and receive?", a: "Currently Bitcoin (BTC), Ethereum (ETH), Tether (USDT) and USD Coin (USDC). Crypto assets are supported through [CONFIRM PARTNER]." },
      { q: "What networks are supported for USDT?", a: "USDT is supported on ERC-20 (Ethereum) and TRC-20 (Tron). Make sure to choose the correct network when sending." },
      { q: "Is the fee shown before I confirm a send?", a: "Yes. The network fee is displayed in both crypto and naira before you confirm any send." },
    ],
  },
  {
    heading: "Bills",
    faqs: [
      { q: "What bills can I pay through CreoHold?", a: "Airtime and data for major Nigerian networks, electricity for the main DISCOs, and TV subscriptions including DStv, GOtv and StarTimes. Bill payments are powered by [CONFIRM PARTNER]." },
      { q: "Is the customer name shown before I pay?", a: "Yes. For meters, smart cards and phone numbers that require a customer lookup, we show the account name before you confirm payment." },
    ],
  },
  {
    heading: "Business accounts",
    faqs: [
      { q: "Can a company open a CreoHold account?", a: "Yes. Business accounts are available. The same live features — naira wallet, crypto, convert and bills — are available to business accounts. Business-specific features such as multi-user access, roles and approvals are [CONFIRM BUSINESS FEATURE]." },
      { q: "What documents does a business need for verification?", a: "Business verification (KYB) requires company registration documents and verification of beneficial ownership. Specific requirements are confirmed at account creation." },
    ],
  },
  {
    heading: "Security",
    faqs: [
      { q: "How is my wallet secured?", a: "Your data and transactions are encrypted in transit and at rest. Every sign-in can require two-factor authentication, and every transaction on your account sends an in-app and email notification in real time." },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/8 last:border-b-0">
      <button
        className="w-full flex items-center justify-between gap-4 py-4 text-left"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-sm font-medium text-white/80 pr-2">{q}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          <path d="M8 3v10M3 8h10" stroke="#00D285" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
      {open && <p className="pb-4 text-sm text-white/50 leading-relaxed">{a}</p>}
    </div>
  );
}

export default function HelpPage() {
  const [search, setSearch] = useState("");
  const q = search.toLowerCase();
  const filtered = GROUPS.map(g => ({
    ...g,
    faqs: g.faqs.filter(f => !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)),
  })).filter(g => g.faqs.length > 0);

  return (
    <div className="bg-navy min-h-screen pt-16">
      <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Help" }]} />
      <section className="max-w-3xl mx-auto px-5 lg:px-8 py-16 md:py-20">
        <p className="text-xs font-semibold text-green-brand uppercase tracking-widest mb-4">Help</p>
        <h1 className="text-4xl font-bold text-white mb-6">Frequently asked questions</h1>
        <input
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search questions…"
          className="w-full bg-navy-mid border border-white/10 text-white text-sm rounded-xl px-4 py-3 mb-10 focus:outline-none focus:border-green-brand/50"
          aria-label="Search FAQs"
        />

        {filtered.length === 0 && (
          <p className="text-sm text-white/40 text-center py-10">No results for &ldquo;{search}&rdquo;</p>
        )}

        <div className="space-y-10">
          {filtered.map(g => (
            <div key={g.heading}>
              <h2 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">{g.heading}</h2>
              <div className="bg-navy-mid border border-white/8 rounded-2xl px-5">
                {g.faqs.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-white/40 mb-2">Still have questions?</p>
          <a href="mailto:info@creohold.com" className="text-sm font-semibold text-green-brand hover:underline">
            info@creohold.com
          </a>
        </div>
      </section>
    </div>
  );
}
