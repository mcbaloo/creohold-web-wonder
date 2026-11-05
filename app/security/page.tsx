import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Security",
  description: "How CreoHold keeps your wallet, identity and transactions secure.",
};

const SECURITY_ITEMS = [
  {
    heading: "Identity verification (KYC)",
    desc: "Every personal account requires a valid government-issued ID and a selfie, checked against Nigerian KYC requirements. Your wallet is active once verification passes.",
    steps: ["Upload your ID", "Take a selfie", "Automatic check", "Wallet activated"],
  },
  {
    heading: "Business verification (KYB)",
    desc: "Business accounts require company registration documents and verification of beneficial ownership. Requirements vary by company type.",
    steps: ["Provide company documents", "Beneficial owner verification", "Review", "Account activated"],
  },
  {
    heading: "Data encryption",
    desc: "Your data and transactions are encrypted in transit using TLS and at rest using industry-standard encryption.",
    steps: [],
  },
  {
    heading: "Two-factor authentication",
    desc: "Every sign-in can require a one-time code in addition to your password. Enable 2FA in your account settings.",
    steps: [],
  },
  {
    heading: "Transaction alerts",
    desc: "Every funding, withdrawal, transfer and failed transaction sends an in-app and email notification in real time.",
    steps: [],
  },
];

function KYCStepper({ steps, label }: { steps: string[]; label: string }) {
  if (!steps.length) return null;
  return (
    <div className="mt-4">
      <ol className="flex gap-0 relative" aria-label={label}>
        {steps.map((s, i) => (
          <li key={s} className="flex-1 relative text-center">
            {/* Connector */}
            {i < steps.length - 1 && (
              <div className="absolute top-4 left-1/2 w-full h-0.5 bg-white/10" aria-hidden="true">
                <div className="h-full w-1/2 bg-green-brand/40" />
              </div>
            )}
            {/* Step bubble */}
            <div className="relative flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold z-10
                ${i < 3 ? "border-green-brand bg-green-brand/15 text-green-brand" : "border-white/20 text-white/30"}`}>
                {i < 3 ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6l3 3 5-5" stroke="#00D285" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : i + 1}
              </div>
              <span className="text-[10px] text-white/40 leading-tight max-w-[60px]">{s}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function SecurityPage() {
  return (
    <div className="bg-navy min-h-screen pt-16">
      <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Security" }]} />
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-16 md:py-20">
        <p className="text-xs font-semibold text-green-brand uppercase tracking-widest mb-4">Security</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
          Built to hold<br />your money.
        </h1>
        <p className="text-white/60 text-lg leading-relaxed mb-12 max-w-lg">
          Your wallet requires identity verification before it is active. Every transaction on your account is encrypted and monitored.
        </p>

        <div className="space-y-4 mb-12">
          {SECURITY_ITEMS.map(item => (
            <div key={item.heading} className="bg-navy-mid border border-white/8 rounded-2xl p-6">
              <h2 className="text-base font-semibold text-white mb-2">{item.heading}</h2>
              <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
              <KYCStepper steps={item.steps} label={item.heading + " steps"} />
            </div>
          ))}
        </div>

        <div className="bg-navy-mid border border-white/8 rounded-2xl p-5">
          <p className="text-xs text-white/30">
            Operated under [REGULATOR NAME] licence no. [LICENCE NUMBER]
          </p>
        </div>
      </section>
    </div>
  );
}
