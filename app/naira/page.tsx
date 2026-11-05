import type { Metadata } from "next";
import WalletPreview from "@/components/widgets/WalletPreview";
import GridPattern from "@/components/ui/GridPattern";

export const metadata: Metadata = {
  title: "Naira wallet",
  description: "Fund your naira wallet from any Nigerian bank and hold, send and withdraw naira at any time.",
};

export default function NairaPage() {
  return (
    <div className="min-h-screen pt-16" style={{ background: "linear-gradient(170deg, #031B2C 0%, #052338 100%)" }}>
      <section className="relative max-w-7xl mx-auto px-5 lg:px-8 py-16 md:py-20 grid lg:grid-cols-2 gap-12 items-center">
        <GridPattern variant="dots-faint" size={32} color="rgba(0,210,133,0.05)" />
        <div>
          <p className="text-xs font-semibold text-green-brand uppercase tracking-widest mb-4">Naira wallet</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
            Your naira,<br />your bank account.
          </h1>
          <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-md">
            Fund from any Nigerian bank account. Your naira balance is yours to move at any time.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              "Fund from any Nigerian bank",
              "Withdraw to your bank on demand",
              "Real-time balance updates",
              "Transfer naira to other CreoHold wallets",
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
          <a href="https://app.creohold.com/auth/signup"
            className="inline-flex items-center gap-2 bg-green-brand hover:bg-green-muted text-navy font-semibold px-6 py-3 rounded-lg transition-colors text-sm">
            Open your wallet
          </a>
        </div>
        <div className="flex justify-center lg:justify-end">
          <WalletPreview variant="personal" />
        </div>
      </section>
    </div>
  );
}
