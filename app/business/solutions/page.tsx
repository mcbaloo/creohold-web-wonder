import type { Metadata } from "next";
import Link from "next/link";
import ComingSoonBadge from "@/components/ui/ComingSoonBadge";
import GridPattern from "@/components/ui/GridPattern";
import { features } from "@/lib/features";

export const metadata: Metadata = {
  title: "Business solutions",
  description: "Business wallet, bulk payouts, team approvals, payment collection and API access — all in one platform.",
};

const SOLUTIONS = [
  {
    id: "business-wallet",
    anchor: "business-wallet",
    label: "Business wallet",
    featureKey: "businessWallet",
    headline: "A wallet your whole company shares.",
    body: "One naira balance, one crypto wallet, shared across your entire team. Fund from your business account, withdraw on demand, and track every transaction in real time.",
    bullets: [
      "Company naira and crypto balances",
      "Shared access with role-based permissions",
      "Convert currencies and pay bills for the business",
      "Full transaction history for every team member",
    ],
  },
  {
    id: "bulk-payouts",
    anchor: "bulk-payouts",
    label: "Bulk payouts",
    featureKey: "bulkPayout",
    headline: "Pay hundreds of recipients in one go.",
    body: "Upload a list of bank accounts or crypto addresses, review validation per row, then submit the payout for approval. The maker/checker workflow keeps every large payment authorised before it moves.",
    bullets: [
      "Upload CSV or paste account numbers",
      "Per-row validation before you submit",
      "Transparent fee shown before approval",
      "Maker/checker approval required for large batches",
    ],
  },
  {
    id: "approvals",
    anchor: "approvals",
    label: "Team and approvals",
    featureKey: "teamApprovals",
    headline: "No payment moves without authorisation.",
    body: "Assign Admin, Finance or Viewer roles to each team member. Payments above a threshold require a second approval before processing — so you always have a second pair of eyes on large transactions.",
    bullets: [
      "Invite team members with assigned roles",
      "Approval thresholds per payment type",
      "Real-time approvals queue",
      "Audit log of every approval and rejection",
    ],
  },
  {
    id: "collect-payments",
    anchor: "collect-payments",
    label: "Collect payments",
    featureKey: "collectPayments",
    headline: "Let customers pay you in naira or crypto.",
    body: "Generate a payment link or crypto deposit address for any invoice. Share it with your customer and receive a notification the moment payment lands.",
    bullets: [
      "Shareable naira payment links",
      "Crypto deposit addresses with QR codes",
      "Instant payment confirmation notifications",
      "Payment history tied to each link",
    ],
  },
  {
    id: "api",
    anchor: "api",
    label: "Developer API",
    featureKey: "developerApi",
    headline: "Integrate wallet operations into your product.",
    body: "Access rates, initiate payments, generate deposit addresses and validate transactions directly from your backend. Full REST API with webhook support.",
    bullets: [
      "REST API with JSON responses",
      "Webhook events for every transaction",
      "Sandbox environment for testing",
      "API key management with scopes",
    ],
  },
] as const;

export default function BusinessSolutionsPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 60% 55% at 70% 30%, rgba(0,210,133,0.10), rgba(10,10,10,0) 60%),
            linear-gradient(170deg, #161616 0%, #0a0a0a 100%)
          `,
        }}
      >
        <GridPattern variant="dots" size={28} color="rgba(255,255,255,0.03)" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-20 text-center">
          <p className="text-xs font-semibold text-green-brand uppercase tracking-widest mb-4">Business solutions</p>
          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
            Everything your<br />company needs.
          </h1>
          <p className="text-white/55 text-lg max-w-2xl mx-auto leading-relaxed">
            One platform for naira, crypto, bulk payments, team access and payment collection.
          </p>
        </div>
      </section>

      {/* Solutions */}
      <div className="bg-white">
        {SOLUTIONS.map((s, i) => {
          const isComingSoon = features[s.featureKey] === "coming-soon";
          const isEven = i % 2 === 0;

          return (
            <section
              key={s.id}
              id={s.anchor}
              className={`py-20 ${isEven ? "bg-white" : ""}`}
              style={!isEven ? { background: "#F4FAF7" } : undefined}
            >
              <div className="max-w-7xl mx-auto px-5 lg:px-8">
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}>
                  <div className={isEven ? "" : "lg:order-2"}>
                    <div className="flex items-center gap-3 mb-4">
                      <p className="text-xs font-semibold text-green-deep uppercase tracking-widest">{s.label}</p>
                      {isComingSoon && <ComingSoonBadge />}
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-navy leading-tight tracking-tight mb-6">
                      {s.headline}
                    </h2>
                    <p className="text-grey-text leading-relaxed mb-8">
                      {s.body}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {s.bullets.map(b => (
                        <li key={b} className="flex items-start gap-2 text-sm text-grey-text">
                          <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <circle cx="8" cy="8" r="7" fill="#00D285" fillOpacity=".12"/>
                            <path d="M5 8l2 2 4-4" stroke="#00D285" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-3">
                      {isComingSoon ? (
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-grey-mid text-sm text-grey-text cursor-default">
                          Not yet available <ComingSoonBadge />
                        </span>
                      ) : (
                        <a
                          href="https://app.creohold.com/auth/signup"
                          className="inline-flex items-center gap-2 bg-green-brand hover:bg-green-muted text-navy font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-green-brand/20 hover:shadow-[0_4px_20px_rgba(0,210,133,0.4)]"
                        >
                          Get started
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        </a>
                      )}
                      <Link
                        href="/business#book-demo"
                        className="inline-flex items-center gap-2 border border-grey-mid hover:border-navy text-navy font-medium px-5 py-2.5 rounded-xl transition-colors text-sm"
                      >
                        Book a demo
                      </Link>
                    </div>
                  </div>

                  {/* Placeholder panel */}
                  <div className={isEven ? "" : "lg:order-1"}>
                    <div
                      className="rounded-2xl p-8 min-h-[280px] flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, rgba(0,210,133,0.06) 0%, #F4FAF7 100%)",
                        border: "1px solid rgba(0,210,133,0.15)",
                      }}
                    >
                      <p className="text-sm text-grey-text text-center opacity-50">{s.label} widget preview</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA */}
      <section className="py-20" style={{ background: "#F4FAF7" }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight mb-4">
            Ready to get started?
          </h2>
          <p className="text-grey-text mb-8">
            Open a business account today, or book a demo for a guided walkthrough.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://app.creohold.com/auth/signup"
              className="inline-flex items-center gap-2 bg-green-brand hover:bg-green-muted text-navy font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-green-brand/20"
            >
              Open a business account
            </a>
            <Link href="/business#book-demo"
              className="inline-flex items-center gap-2 border border-grey-mid hover:border-navy text-navy font-medium px-6 py-3.5 rounded-xl transition-colors text-sm">
              Book a demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
