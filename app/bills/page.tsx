import type { Metadata } from "next";
import BillPayDemo from "@/components/widgets/BillPayDemo";

export const metadata: Metadata = {
  title: "Bills",
  description: "Pay airtime, data, electricity and TV subscriptions from your CreoHold naira balance.",
};

export default function BillsPage() {
  return (
    <div className="min-h-screen pt-16" style={{
      background: `radial-gradient(ellipse 60% 55% at 70% 25%, rgba(0,210,133,0.15), rgba(5,35,56,0) 60%), linear-gradient(180deg, #031B2C 0%, #052338 100%)`
    }}>
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-16 md:py-20 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <p className="text-xs font-semibold text-green-brand uppercase tracking-widest mb-4">Bills</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
            Airtime, data, electricity,<br />TV — settled.
          </h1>
          <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-md">
            Pay your most common Nigerian utility bills without leaving the wallet. Customer name shown before you pay. Bill payments are powered by [CONFIRM PARTNER].
          </p>
          <ul className="space-y-3">
            {[
              "Airtime for MTN, Airtel, Glo, 9mobile",
              "Data bundles from major networks",
              "Electricity — main DISCOs supported",
              "TV subscriptions: DStv, GOtv, StarTimes",
            ].map(b => (
              <li key={b} className="flex items-start gap-2 text-sm text-white/70">
                <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="7" fill="#00D285" fillOpacity=".15"/>
                  <path d="M5 8l2 2 4-4" stroke="#00D285" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <BillPayDemo />
        </div>
      </section>
    </div>
  );
}
