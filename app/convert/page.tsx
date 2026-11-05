import type { Metadata } from "next";
import ConvertCalculator from "@/components/widgets/ConvertCalculator";
import RatesTicker from "@/components/widgets/RatesTicker";

export const metadata: Metadata = {
  title: "Convert",
  description: "Swap naira and crypto inside your CreoHold wallet. Live rate, transparent fee, 30-second quotes.",
};

export default function ConvertPage() {
  return (
    <div className="min-h-screen pt-16" style={{
      background: `radial-gradient(ellipse 60% 55% at 70% 25%, rgba(0,210,133,0.15), rgba(5,35,56,0) 60%), linear-gradient(180deg, #031B2C 0%, #052338 100%)`
    }}>
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-16 md:py-20 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <p className="text-xs font-semibold text-green-brand uppercase tracking-widest mb-4">Convert</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
            Move between crypto<br />and naira in one step.
          </h1>
          <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-md">
            Convert your crypto and naira balances inside the wallet. Live rate, transparent fee, 30-second quoted price.
          </p>
          <ul className="space-y-3 mb-10">
            {[
              "No third party or extra step",
              "Live quoted rate, 30-second window",
              "Funds available instantly",
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
          <div className="bg-navy-mid border border-white/8 rounded-2xl p-4">
            <p className="text-xs text-white/30 mb-3">Live rates</p>
            <RatesTicker />
          </div>
        </div>
        <div>
          <ConvertCalculator />
        </div>
      </section>
    </div>
  );
}
