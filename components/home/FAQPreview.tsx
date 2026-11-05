"use client";
import { useState } from "react";
import Link from "next/link";

const FAQS = [
  { q: "Who can open a CreoHold wallet?", a: "Anyone who is 18 or older and resident in Nigeria. A valid government-issued ID is required for verification." },
  { q: "What cryptocurrencies are supported?", a: "BTC, ETH, USDT (ERC-20 and TRC-20) and USDC. Crypto assets are supported through [CONFIRM PARTNER]." },
  { q: "Can a company open an account?", a: "Yes. Business accounts are available today. The same live features — naira, crypto, convert and bills — are available for companies." },
  { q: "Is the fee shown before I send?", a: "Yes. The network fee is displayed in both crypto and naira before you confirm any send or conversion." },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-grey-mid last:border-b-0">
      <button
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-sm font-medium text-navy pr-2">{q}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          <path d="M8 3v10M3 8h10" stroke="#00913A" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
      {open && <p className="pb-5 text-sm text-grey-text leading-relaxed">{a}</p>}
    </div>
  );
}

export default function FAQPreview() {
  return (
    <section className="py-16 md:py-24" style={{ background: "#F4FAF7" }} aria-label="FAQ preview">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-3 gap-12">
        <div>
          <p className="text-xs font-semibold text-green-deep uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy leading-tight tracking-tight mb-4">
            Common questions
          </h2>
          <p className="text-grey-text text-sm leading-relaxed mb-6">
            More questions? Email us at{" "}
            <a href="mailto:info@creohold.com" className="text-navy/70 hover:text-green-deep transition-colors underline underline-offset-2">
              info@creohold.com
            </a>
          </p>
          <Link href="/help"
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-deep/70 hover:text-green-deep transition-colors">
            Browse all FAQs →
          </Link>
        </div>
        <div className="lg:col-span-2 bg-white border border-grey-mid rounded-2xl px-6" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
          {FAQS.map(f => <Item key={f.q} q={f.q} a={f.a} />)}
        </div>
      </div>
    </section>
  );
}
