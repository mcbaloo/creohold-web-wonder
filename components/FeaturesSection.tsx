type Side = "left" | "right";

interface Feature {
  id: string;
  label: string;
  heading: string;
  body: string;
  bullets: string[];
  mockup: React.ReactNode;
  mockupSide: Side;
}

function NairaMockup() {
  return (
    <div className="bg-navy rounded-xl p-5 border border-white/10 shadow-lg max-w-xs mx-auto">
      <p className="text-xs text-white/40 mb-1">Naira balance</p>
      <p className="text-3xl font-bold text-white mb-5">₦ 125,000.00</p>
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2.5">
          <div>
            <p className="text-xs font-medium text-white">Steph Bank transfer</p>
            <p className="text-xs text-white/40">Today, 09:12</p>
          </div>
          <span className="text-sm font-bold text-green-brand">+₦50,000</span>
        </div>
        <div className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2.5">
          <div>
            <p className="text-xs font-medium text-white">Withdraw to GT Bank</p>
            <p className="text-xs text-white/40">Yesterday</p>
          </div>
          <span className="text-sm font-bold text-white/60">−₦30,000</span>
        </div>
      </div>
      <button className="w-full mt-4 bg-green-brand text-navy text-xs font-bold py-2.5 rounded-lg">
        Withdraw to bank
      </button>
    </div>
  );
}

function CryptoMockup() {
  return (
    <div className="bg-navy rounded-xl p-5 border border-white/10 shadow-lg max-w-xs mx-auto">
      <p className="text-xs text-white/40 mb-1">Send crypto</p>
      <div className="bg-navy-mid/60 rounded-lg px-3 py-3 mb-3 border border-white/8">
        <p className="text-xs text-white/40 mb-1">To address</p>
        <p className="text-xs font-mono text-white truncate">0x1a2b3c4d…9f8e7d6c</p>
        <div className="flex items-center gap-1.5 mt-2 bg-green-brand/10 rounded px-2 py-1">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <circle cx="5" cy="5" r="4.5" fill="#00D285"/>
            <path d="M2.5 5L4 6.5L7.5 3" stroke="#052338" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xs font-semibold text-green-brand">Address verified</span>
        </div>
      </div>
      <div className="bg-navy-mid/60 rounded-lg px-3 py-3 mb-3 border border-white/8">
        <p className="text-xs text-white/40 mb-1">Amount</p>
        <p className="text-sm font-bold text-white">0.05 ETH</p>
      </div>
      <div className="flex items-center gap-1.5 bg-green-brand/10 border border-green-brand/20 rounded-lg px-3 py-2 mb-3">
        <p className="text-xs text-green-brand font-medium">Fee: ₦245 shown before you send</p>
      </div>
      <button className="w-full bg-green-brand text-navy text-xs font-bold py-2.5 rounded-lg">
        Confirm send
      </button>
    </div>
  );
}

function ConvertMockup() {
  return (
    <div className="bg-navy rounded-xl p-5 border border-white/10 shadow-lg max-w-xs mx-auto">
      <p className="text-xs text-white/40 mb-3">Convert</p>
      <div className="bg-navy-mid/60 rounded-lg px-3 py-3 mb-2 border border-white/8">
        <p className="text-xs text-white/40 mb-1">From</p>
        <p className="text-sm font-bold text-white">0.05 BTC</p>
      </div>
      <div className="flex justify-center my-1">
        <div className="w-7 h-7 rounded-full bg-green-brand/10 border border-green-brand/20 flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M6 2v8M3 7l3 3 3-3" stroke="#00D285" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <div className="bg-navy-mid/60 rounded-lg px-3 py-3 mb-3 border border-white/8">
        <p className="text-xs text-white/40 mb-1">To</p>
        <p className="text-sm font-bold text-green-brand">≈ ₦ 8,500,000</p>
      </div>
      <p className="text-xs text-white/40 text-center mb-3">Rate: 1 BTC = ₦ 170,000,000</p>
      <div className="flex items-center justify-center gap-1.5 mb-3">
        <span className="text-xs text-white/40">No third party</span>
        <span className="text-white/20">·</span>
        <span className="text-xs text-white/40">No extra step</span>
      </div>
      <button className="w-full bg-green-brand text-navy text-xs font-bold py-2.5 rounded-lg">
        Convert
      </button>
    </div>
  );
}

function BillsMockup() {
  return (
    <div className="bg-navy rounded-xl p-5 border border-white/10 shadow-lg max-w-xs mx-auto">
      <p className="text-xs text-white/40 mb-3">Pay Bills</p>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[
          { label: "Airtime",      icon: "📶", active: false },
          { label: "Data",         icon: "📡", active: false },
          { label: "Electricity",  icon: "⚡", active: true  },
          { label: "TV",           icon: "📺", active: false },
        ].map((b) => (
          <div
            key={b.label}
            className={`flex flex-col items-center gap-1 py-3 rounded-lg border text-xs font-medium transition-colors ${
              b.active
                ? "bg-green-brand/10 border-green-brand/30 text-green-brand"
                : "bg-white/5 border-white/10 text-white/50"
            }`}
          >
            <span role="img" aria-label={b.label} className="text-base">{b.icon}</span>
            {b.label}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2.5 mb-2 border border-white/8">
        <div>
          <p className="text-xs text-white/40">Provider</p>
          <p className="text-xs font-semibold text-white">EKEDC</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-white/40">Amount</p>
          <p className="text-xs font-bold text-white">₦ 8,500</p>
        </div>
      </div>
      <button className="w-full bg-green-brand text-navy text-xs font-bold py-2.5 rounded-lg">
        Pay ₦ 8,500
      </button>
    </div>
  );
}

function NotificationsMockup() {
  return (
    <div className="bg-navy rounded-xl p-5 border border-white/10 shadow-lg max-w-xs mx-auto">
      <p className="text-xs text-white/40 mb-3">Notifications</p>
      <div className="flex flex-col gap-2.5">
        {[
          { type: "credit", title: "₦50,000 received",     body: "Funded from Steph Bank",     time: "Now"     },
          { type: "debit",  title: "₦8,500 paid",          body: "EKEDC electricity bill",      time: "2 min"   },
          { type: "credit", title: "0.05 ETH received",    body: "From 0x1a2b…9c8d",           time: "1 hr"    },
          { type: "alert",  title: "Withdrawal confirmed",  body: "₦30,000 → GT Bank *1234",   time: "Yesterday" },
        ].map((n) => (
          <div key={n.title} className="flex items-start gap-3 bg-white/5 rounded-lg px-3 py-2.5 border border-white/8">
            <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${
              n.type === "credit" ? "bg-green-brand" : n.type === "debit" ? "bg-white/40" : "bg-blue-400"
            }`} aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white leading-tight">{n.title}</p>
              <p className="text-xs text-white/40 leading-tight mt-0.5 truncate">{n.body}</p>
            </div>
            <span className="text-xs text-white/30 shrink-0 ml-auto">{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const FEATURES: Feature[] = [
  {
    id: "naira",
    label: "Hold naira",
    heading: "Your naira, your bank account.",
    body: "Fund your wallet from any Nigerian bank account and withdraw back to it whenever you need. Your naira balance is yours to move at any time.",
    bullets: [
      "Fund from any Nigerian bank",
      "Withdraw on demand",
      "Real-time balance updates",
    ],
    mockup: <NairaMockup />,
    mockupSide: "right",
  },
  {
    id: "crypto",
    label: "Send and receive crypto",
    heading: "Send crypto with the fee shown first.",
    body: "Paste a wallet address and CreoHold validates it before you go further. You see the network fee before you confirm. Receive crypto at your CreoHold address.",
    bullets: [
      "Address validation before you send",
      "Fee shown before you confirm",
      "BTC, ETH, USDT and USDC via Busha",
    ],
    mockup: <CryptoMockup />,
    mockupSide: "left",
  },
  {
    id: "convert",
    label: "Convert",
    heading: "Move between crypto and naira in one step.",
    body: "Convert between your crypto and naira balances inside the wallet. No third party involved, no extra app.",
    bullets: [
      "No third party or extra step",
      "Live conversion rate shown",
      "Funds available instantly",
    ],
    mockup: <ConvertMockup />,
    mockupSide: "right",
  },
  {
    id: "bills",
    label: "Pay bills",
    heading: "Airtime, data, electricity, TV — settled.",
    body: "Pay your most common Nigerian bills without leaving the wallet. Airtime, data, electricity and TV subscriptions, powered by Bank78.",
    bullets: [
      "Airtime and data for major networks",
      "Electricity DISCOs and TV subscriptions",
      "Powered by Bank78",
    ],
    mockup: <BillsMockup />,
    mockupSide: "left",
  },
  {
    id: "notifications",
    label: "Transaction notifications",
    heading: "Every transaction sends an alert.",
    body: "Every funding, withdrawal, transfer and failed transaction sends an in-app and email notification. Nothing in your wallet happens without you knowing.",
    bullets: [
      "In-app and email alerts",
      "Instant delivery on every event",
      "Failed transactions flagged immediately",
    ],
    mockup: <NotificationsMockup />,
    mockupSide: "right",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" aria-label="Features">
      {FEATURES.map((f, i) => {
        const bg = i % 2 === 0 ? "bg-white" : "bg-grey-light";
        const isLeft = f.mockupSide === "left";
        return (
          <div key={f.id} className={`${bg} py-16 md:py-24`}>
            <div className="max-w-7xl mx-auto px-5 lg:px-8">
              <div
                className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  isLeft ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Copy */}
                <div>
                  <p className="text-xs font-semibold text-green-brand uppercase tracking-widest mb-3">
                    {f.label}
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-navy leading-tight tracking-tight mb-4">
                    {f.heading}
                  </h2>
                  <p className="text-grey-text leading-relaxed mb-6">{f.body}</p>
                  <ul className="flex flex-col gap-2.5">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-grey-text">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          aria-hidden="true"
                          className="shrink-0 mt-0.5"
                        >
                          <circle cx="8" cy="8" r="8" fill="#00D285" fillOpacity="0.15" />
                          <path
                            d="M4.5 8L6.5 10L11 5.5"
                            stroke="#00D285"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mockup */}
                <div className="flex justify-center">{f.mockup}</div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
