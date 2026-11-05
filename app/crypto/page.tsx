import type { Metadata } from "next";
import SendCryptoDemo from "@/components/widgets/SendCryptoDemo";

export const metadata: Metadata = {
  title: "Crypto",
  description: "Send and receive BTC, ETH, USDT and USDC. Fee shown before you confirm.",
};

const ASSETS = [
  { name: "Bitcoin",    symbol: "BTC",  networks: ["Bitcoin network"] },
  { name: "Ethereum",   symbol: "ETH",  networks: ["ERC-20"] },
  { name: "Tether USD", symbol: "USDT", networks: ["ERC-20 (Ethereum)", "TRC-20 (Tron)"] },
  { name: "USD Coin",   symbol: "USDC", networks: ["ERC-20"] },
];

export default function CryptoPage() {
  return (
    <div className="min-h-screen pt-16" style={{
      background: `radial-gradient(ellipse 60% 55% at 70% 25%, rgba(0,210,133,0.15), rgba(5,35,56,0) 60%), linear-gradient(180deg, #031B2C 0%, #052338 100%)`
    }}>
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-16 md:py-20 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <p className="text-xs font-semibold text-green-brand uppercase tracking-widest mb-4">Crypto</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
            Send crypto with the<br />fee shown first.
          </h1>
          <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-md">
            Paste an address, choose a network, see the fee before you confirm. Your wallet address is verified against the network. Crypto assets are supported through [CONFIRM PARTNER].
          </p>

          <div className="bg-navy-mid border border-white/8 rounded-2xl overflow-hidden mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-white/30 uppercase tracking-wider">Asset</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-white/30 uppercase tracking-wider">Networks supported</th>
                </tr>
              </thead>
              <tbody>
                {ASSETS.map((a, i) => (
                  <tr key={a.symbol} className={i < ASSETS.length - 1 ? "border-b border-white/5" : ""}>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-white">{a.symbol}</span>
                      <span className="text-white/40 ml-2 text-xs">{a.name}</span>
                    </td>
                    <td className="px-4 py-3 text-white/50 text-xs">{a.networks.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="space-y-3">
            {[
              "Address verified before you send",
              "Fee shown before you confirm",
              "BTC, ETH, USDT and USDC supported",
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
          <SendCryptoDemo />
        </div>
      </section>
    </div>
  );
}
