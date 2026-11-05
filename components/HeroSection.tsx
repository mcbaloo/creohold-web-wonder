import WalletMockup from "./WalletMockup";

const TABS = ["Naira", "Crypto", "Convert", "Bills"];

export default function HeroSection() {
  return (
    <section
      className="bg-navy pt-16 min-h-screen flex items-center"
      aria-label="Introduction"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16 md:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — copy */}
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold text-green-brand bg-green-brand/10 border border-green-brand/20 px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-brand shrink-0" aria-hidden="true" />
              Available now in Nigeria
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-6">
              Hold value,<br />
              move freely.
            </h1>

            <p className="text-lg text-white/60 max-w-md mb-8 leading-relaxed">
              A digital wallet that holds your naira and cryptocurrency in one place. Fund it, send crypto, pay bills — without switching apps.
            </p>

            {/* Cycling tab labels */}
            <div className="flex flex-wrap gap-2 mb-10" aria-label="Wallet features">
              {TABS.map((t) => (
                <span
                  key={t}
                  className="text-xs font-semibold text-white/50 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://app.creohold.com/auth/signin"
                className="inline-flex items-center gap-2 bg-green-brand hover:bg-green-muted text-navy font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
              >
                Get started
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="https://app.creohold.com/auth/signin"
                className="inline-flex items-center text-sm font-medium text-white/60 hover:text-white transition-colors px-2"
              >
                Sign in →
              </a>
            </div>
          </div>

          {/* Right — wallet mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow behind mockup */}
              <div
                className="absolute inset-0 bg-green-brand/8 rounded-3xl blur-3xl scale-110"
                aria-hidden="true"
              />
              <div className="relative">
                <WalletMockup />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
