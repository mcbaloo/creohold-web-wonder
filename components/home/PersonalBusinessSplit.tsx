import Link from "next/link";
import WalletPreview from "@/components/widgets/WalletPreview";

export default function PersonalBusinessSplit() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden" aria-label="Personal and business accounts"
      style={{ background: "#F4FAF7" }}>
      {/* Faint radial glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-brand/5 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-deep/4 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-green-deep uppercase tracking-widest mb-3">Available today</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
            For you and your company.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Personal */}
          <div className="bg-white border border-grey-mid rounded-2xl p-7 flex flex-col"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)", background: "linear-gradient(135deg, rgba(0,210,133,0.04) 0%, #FFFFFF 60%)" }}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs font-semibold text-green-deep uppercase tracking-widest mb-2">Personal</p>
                <h3 className="text-2xl font-bold text-navy">Individual wallet</h3>
              </div>
              <div className="w-9 h-9 rounded-xl bg-green-brand/10 border border-green-brand/20 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="6" r="3" stroke="#00D285" strokeWidth="1.25"/>
                  <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="#00D285" strokeWidth="1.25" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            <div className="mb-6">
              <WalletPreview variant="personal" compact />
            </div>

            <ul className="space-y-2 mb-6 flex-1">
              {["Naira wallet", "Crypto send and receive", "Currency conversion", "Bill payments", "Transaction alerts"].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-grey-text">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2.5 7l3 3 6-6" stroke="#00D285" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <div className="flex gap-3">
              <a href="https://app.creohold.com/auth/signup"
                className="flex-1 text-center bg-green-brand hover:bg-green-muted text-navy font-semibold py-3 rounded-xl transition-colors text-sm">
                Open personal wallet
              </a>
              <Link href="/naira"
                className="border border-grey-mid hover:border-navy text-navy px-4 py-3 rounded-xl transition-colors text-sm">
                Learn more
              </Link>
            </div>
          </div>

          {/* Business */}
          <div className="bg-white border border-grey-mid rounded-2xl p-7 flex flex-col"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)", background: "linear-gradient(135deg, rgba(0,108,68,0.04) 0%, #FFFFFF 60%)" }}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs font-semibold text-green-deep uppercase tracking-widest mb-2">Business</p>
                <h3 className="text-2xl font-bold text-navy">Company wallet</h3>
              </div>
              <div className="w-9 h-9 rounded-xl bg-green-brand/10 border border-green-brand/20 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="2" y="6" width="12" height="8" rx="1" stroke="#00D285" strokeWidth="1.25"/>
                  <path d="M5 6V4a3 3 0 016 0v2" stroke="#00D285" strokeWidth="1.25"/>
                </svg>
              </div>
            </div>

            <div className="mb-6">
              <WalletPreview variant="business" compact />
            </div>

            <ul className="space-y-2 mb-6 flex-1">
              {["Company naira wallet", "Crypto send and receive", "Currency conversion", "Company bill payments", "Transaction alerts"].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-grey-text">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2.5 7l3 3 6-6" stroke="#00D285" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <div className="flex gap-3">
              <a href="https://app.creohold.com/auth/signup"
                className="flex-1 text-center bg-green-brand hover:bg-green-muted text-navy font-semibold py-3 rounded-xl transition-colors text-sm">
                Open business account
              </a>
              <Link href="/business"
                className="border border-grey-mid hover:border-navy text-navy px-4 py-3 rounded-xl transition-colors text-sm">
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
