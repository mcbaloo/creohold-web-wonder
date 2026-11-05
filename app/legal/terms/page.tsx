import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "CreoHold terms of service.",
};

const SECTIONS = [
  "Eligibility",
  "Account registration and verification",
  "Services",
  "Acceptable use",
  "Fees and charges",
  "Funds and balances",
  "Crypto assets",
  "Intellectual property",
  "Disclaimers and limitation of liability",
  "Termination",
  "Governing law",
  "Changes to these terms",
  "Contact",
];

export default function TermsPage() {
  return (
    <div className="bg-navy min-h-screen pt-16">
      <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Legal", href: "/legal/terms" }, { label: "Terms of service" }]} />
      <section className="max-w-3xl mx-auto px-5 lg:px-8 py-16 md:py-20">
        <p className="text-xs font-semibold text-green-brand uppercase tracking-widest mb-4">Legal</p>
        <h1 className="text-4xl font-bold text-white mb-3">Terms of service</h1>
        <p className="text-sm text-white/30 mb-10">Last updated: 2026</p>

        <div className="space-y-8 text-sm text-white/50 leading-relaxed">
          {SECTIONS.map(s => (
            <div key={s}>
              <h2 className="text-base font-semibold text-white mb-3">{s}</h2>
              <div className="bg-navy-mid border border-white/8 rounded-xl p-4">
                <p className="text-white/30 italic">[LEGAL COPY TO BE PROVIDED — {s}]</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-white/8 text-sm text-white/30">
          <p>CreoHold · 7, Riliwan Lawal Street, Lagos, Nigeria ·{" "}
            <a href="mailto:info@creohold.com" className="hover:text-white/60 transition-colors">info@creohold.com</a>
          </p>
        </div>
      </section>
    </div>
  );
}
