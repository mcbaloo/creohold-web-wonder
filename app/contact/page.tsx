import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with CreoHold.",
};

export default function ContactPage() {
  return (
    <div className="bg-navy min-h-screen pt-16">
      <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <section className="max-w-3xl mx-auto px-5 lg:px-8 py-16 md:py-24">
        <p className="text-xs font-semibold text-green-brand uppercase tracking-widest mb-4">Contact</p>
        <h1 className="text-4xl font-bold text-white mb-10">Get in touch</h1>

        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          {[
            { label: "Email",   value: "info@creohold.com",         href: "mailto:info@creohold.com" },
            { label: "Phone",   value: "07033761997",               href: "tel:+2347033761997" },
          ].map(c => (
            <div key={c.label} className="bg-navy-mid border border-white/8 rounded-2xl p-5">
              <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-2">{c.label}</p>
              <a href={c.href} className="text-white hover:text-green-brand transition-colors font-medium">{c.value}</a>
            </div>
          ))}
        </div>

        <div className="bg-navy-mid border border-white/8 rounded-2xl p-5 mb-6">
          <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-2">Address</p>
          <address className="not-italic text-sm text-white/70 leading-relaxed">
            7, Riliwan Lawal Street<br />
            Lagos, Nigeria
          </address>
          <a
            href="https://maps.google.com/?q=7+Riliwan+Lawal+Street+Lagos+Nigeria"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-xs text-green-brand/70 hover:text-green-brand transition-colors"
          >
            View on Google Maps →
          </a>
        </div>
      </section>
    </div>
  );
}
