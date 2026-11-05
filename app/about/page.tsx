import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind CreoHold.",
};

export default function AboutPage() {
  return (
    <div className="bg-navy min-h-screen pt-16">
      <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <section className="max-w-3xl mx-auto px-5 lg:px-8 py-16 md:py-24">
        <p className="text-xs font-semibold text-green-brand uppercase tracking-widest mb-4">About</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-8">
          Our story
        </h1>

        <div className="prose-custom space-y-8 text-white/60 leading-relaxed">
          <div className="flex items-center gap-4 not-prose mb-8">
            <Image src="/brand/creohold-emblem.svg" alt="CreoHold emblem" width={64} height={64} />
            <div>
              <p className="text-2xl font-bold text-white tracking-widest uppercase">Creohold</p>
              <p className="text-sm text-white/40 mt-1">Hold value, move freely.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">The name</h2>
            <p>
              CreoHold draws from the Spanish <em className="text-white/80">creer</em> — to believe. We believe
              in a financial system that moves with people, not against them. The second half,
              <em className="text-white/80"> Hold</em>, speaks to stability: a place to hold value
              safely while remaining free to move it.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">The emblem</h2>
            <p>
              The emblem carries several meanings at once. The arc of the C traces the shape of
              a shield — protection for your funds. It also represents the intersection of two worlds:
              crypto meeting fiat, businesses meeting individuals. The navy rectangle grounds the mark
              in stability; the green arc signals the digital economy it bridges into.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">The mission</h2>
            <p>
              We are building financial infrastructure for Nigeria — starting with a wallet that
              holds naira and crypto in one place and lets you pay bills, convert currencies and
              send funds without switching apps. No complexity, no hidden fees, no waiting.
              Hold value, move freely.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/8">
          <address className="not-italic text-sm text-white/40 leading-relaxed">
            7, Riliwan Lawal Street, Lagos, Nigeria<br />
            <a href="tel:+2347033761997" className="hover:text-white/60 transition-colors">07033761997</a>
            {" · "}
            <a href="mailto:info@creohold.com" className="hover:text-white/60 transition-colors">info@creohold.com</a>
          </address>
        </div>
      </section>
    </div>
  );
}
