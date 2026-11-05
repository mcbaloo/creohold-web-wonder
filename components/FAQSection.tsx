"use client";
import { useState } from "react";

const FAQS = [
  {
    q: "Who can open a CreoHold wallet?",
    a: "Anyone who is 18 or older and resident in Nigeria. You will need a valid government-issued ID to pass identity verification before the wallet becomes active.",
  },
  {
    q: "Which cryptocurrencies can I send and receive?",
    a: "Currently Bitcoin (BTC), Ethereum (ETH), Tether (USDT) and USD Coin (USDC). These assets are supported through Busha's infrastructure.",
  },
  {
    q: "How do I fund my naira balance?",
    a: "Transfer naira from any Nigerian bank account to your wallet account number. The funds appear in your wallet balance immediately once the bank transfer clears.",
  },
  {
    q: "What bills can I pay through CreoHold?",
    a: "Airtime and data for major Nigerian networks, electricity bills for the main DISCOs, and TV subscriptions including DStv, GOtv and StarTimes. Bill payments are powered by Bank78.",
  },
  {
    q: "How long does identity verification take?",
    a: "Usually under a minute. Upload a valid ID and a selfie and we check them against Nigerian KYC requirements. Your wallet is active once verification passes.",
  },
  {
    q: "How is my wallet secured?",
    a: "Your data and transactions are encrypted in transit and at rest. Every sign-in can require a two-factor authentication code, and every transaction on your account sends you an in-app and email notification in real time.",
  },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-grey-mid last:border-b-0">
      <button
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="text-sm font-semibold text-navy pr-2">{q}</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-45" : ""}`}
        >
          <path d="M9 4v10M4 9h10" stroke="#00D285" strokeWidth="1.75" strokeLinecap="round"/>
        </svg>
      </button>
      {open && (
        <div className="pb-5">
          <p className="text-sm text-grey-text leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="bg-white py-16 md:py-24" aria-label="Frequently asked questions">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">

          <div>
            <p className="text-xs font-semibold text-green-brand uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy leading-tight tracking-tight mb-4">
              Common questions
            </h2>
            <p className="text-grey-text text-sm leading-relaxed mb-6">
              Anything else? Email us at{" "}
              <a href="mailto:info@creohold.com" className="text-navy font-medium hover:text-green-brand transition-colors underline underline-offset-2">
                info@creohold.com
              </a>
            </p>
          </div>

          <div className="lg:col-span-2">
            {FAQS.map((faq) => (
              <Item key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
