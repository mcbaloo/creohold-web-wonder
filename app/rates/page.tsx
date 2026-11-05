import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import RatesTicker from "@/components/widgets/RatesTicker";
import ConvertCalculator from "@/components/widgets/ConvertCalculator";

export const metadata: Metadata = {
  title: "Rates",
  description: "Live indicative crypto-to-naira rates and fee information from your CreoHold wallet.",
};

export default function RatesPage() {
  return (
    <div className="bg-navy min-h-screen pt-16">
      <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Rates" }]} />
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-16 md:py-20">
        <p className="text-xs font-semibold text-green-brand uppercase tracking-widest mb-4">Rates</p>
        <h1 className="text-4xl font-bold text-white mb-4">Live rates</h1>
        <p className="text-white/60 mb-10 max-w-lg">
          Indicative rates shown below update every 15 seconds. The exact rate you receive is quoted and locked for 30 seconds at the point of conversion.
        </p>

        {/* Ticker */}
        <div className="bg-navy-mid border border-white/8 rounded-2xl p-6 mb-10">
          <RatesTicker />
        </div>

        {/* Calculator */}
        <div className="max-w-md">
          <h2 className="text-lg font-bold text-white mb-4">Try a conversion</h2>
          <ConvertCalculator />
        </div>
      </section>
    </div>
  );
}
