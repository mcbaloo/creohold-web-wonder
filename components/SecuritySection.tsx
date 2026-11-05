const ITEMS = [
  {
    heading: "Identity verification",
    body: "Every account passes identity checks before the wallet is active. We verify your name, date of birth and government-issued ID.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="18" height="14" rx="2.5" stroke="#00D285" strokeWidth="1.5"/>
        <circle cx="8" cy="11" r="2.5" stroke="#00D285" strokeWidth="1.5"/>
        <path d="M14 9h3M14 12h2" stroke="#00D285" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    heading: "Encryption",
    body: "Your data and every transaction are encrypted in transit and at rest. Access requires authentication on every session.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="4" y="10" width="14" height="10" rx="2" stroke="#00D285" strokeWidth="1.5"/>
        <path d="M7 10V7a4 4 0 0 1 8 0v3" stroke="#00D285" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="11" cy="15" r="1.5" fill="#00D285"/>
      </svg>
    ),
  },
  {
    heading: "Two-factor authentication",
    body: "Enable 2FA to add a second layer of protection. Every sign-in requires a time-based code on top of your password.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="6" y="2" width="10" height="18" rx="2.5" stroke="#00D285" strokeWidth="1.5"/>
        <circle cx="11" cy="17" r="1" fill="#00D285"/>
        <path d="M9 7h4M9 10h2" stroke="#00D285" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    heading: "Transaction alerts",
    body: "Every funding, withdrawal, transfer and failed transaction sends an in-app and email notification in real time.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M11 3a6 6 0 0 1 6 6v3l1.5 2.5H3.5L5 12V9a6 6 0 0 1 6-6Z" stroke="#00D285" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M9 17a2 2 0 0 0 4 0" stroke="#00D285" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function SecuritySection() {
  return (
    <section id="security" className="bg-white py-16 md:py-24" aria-label="Security and trust">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        <div className="mb-12 md:mb-16 max-w-2xl">
          <p className="text-xs font-semibold text-green-brand uppercase tracking-widest mb-3">
            Security and trust
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy leading-tight tracking-tight mb-4">
            Built to hold your money.
          </h2>
          <p className="text-grey-text leading-relaxed">
            Your wallet requires identity verification before it is active. Everything that happens in it alerts you immediately.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {ITEMS.map((item) => (
            <div
              key={item.heading}
              className="border border-grey-mid rounded-xl p-5 hover:border-green-brand/40 transition-colors"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="font-semibold text-navy mb-2">{item.heading}</h3>
              <p className="text-sm text-grey-text leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="border border-grey-mid rounded-xl px-5 py-4 flex flex-wrap items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
            <path d="M8 1.5L2 4v4c0 3.5 2.5 6.5 6 7.5 3.5-1 6-4 6-7.5V4L8 1.5Z" stroke="#00D285" strokeWidth="1.25" strokeLinejoin="round"/>
          </svg>
          <p className="text-sm text-grey-text">
            Operated under{" "}
            <strong className="text-navy">[REGULATOR NAME] licence no. [LICENCE NUMBER]</strong>
          </p>
        </div>

      </div>
    </section>
  );
}
