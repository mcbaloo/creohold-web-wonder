"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import WalletPreview from "@/components/widgets/WalletPreview";

const PANELS = [
  {
    id: "naira",
    label: "01",
    heading: "Hold naira",
    desc: "Fund from any Nigerian bank. Hold, send and withdraw naira at any time.",
    mockup: (
      <WalletPreview variant="personal" compact />
    ),
  },
  {
    id: "crypto",
    label: "02",
    heading: "Send crypto",
    desc: "BTC, ETH, USDT and USDC. Address verified, fee shown before you confirm.",
    mockup: (
      <div className="bg-navy border border-white/10 rounded-xl p-4 w-full text-xs">
        <p className="text-white/40 mb-2">Destination</p>
        <div className="bg-navy-light/50 rounded-lg px-3 py-2 font-mono text-white/50 mb-3 truncate">bc1qar0srrr7xfkvy5l6…</div>
        <div className="flex justify-between mb-3"><span className="text-white/40">Network fee</span><span className="text-white/70">0.000002 BTC</span></div>
        <div className="bg-green-brand/8 border border-green-brand/20 rounded-lg px-3 py-2">
          <span className="text-green-brand font-semibold text-[11px]">Address verified ✓</span>
        </div>
      </div>
    ),
  },
  {
    id: "convert",
    label: "03",
    heading: "Convert",
    desc: "Swap naira and crypto inside your wallet. Live rate locked for 30 seconds.",
    mockup: (
      <div className="bg-navy border border-white/10 rounded-xl p-4 w-full text-xs space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-white/40">From</span>
          <span className="text-white font-semibold">₦ 50,000</span>
        </div>
        <div className="flex justify-center">
          <div className="w-7 h-7 rounded-full bg-green-brand/10 border border-green-brand/20 flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1v8M2 6l3 3 3-3M2 4L5 1l3 3" stroke="#00D285" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/40">To</span>
          <span className="text-green-brand font-semibold">0.00031562 BTC</span>
        </div>
        <div className="flex justify-between pt-1 border-t border-white/5">
          <span className="text-white/30">Rate locked</span><span className="text-white/50 tabular-nums">28s</span>
        </div>
      </div>
    ),
  },
  {
    id: "bills",
    label: "04",
    heading: "Pay bills",
    desc: "Airtime, data, electricity and TV — settled from your naira balance.",
    mockup: (
      <div className="bg-navy border border-white/10 rounded-xl p-4 w-full text-xs">
        <p className="text-white/40 mb-3">Electricity — EKEDC</p>
        <div className="bg-navy-light/40 rounded-lg px-3 py-2 mb-3">
          <p className="text-white/30 text-[10px] mb-0.5">Meter number</p>
          <p className="text-white/60">1234567890</p>
        </div>
        <div className="flex justify-between mb-3"><span className="text-white/40">Customer</span><span className="text-green-brand">Adaeze Okafor ✓</span></div>
        <div className="bg-green-brand text-navy rounded-lg py-2 text-center font-semibold text-[11px]">Pay ₦12,000</div>
      </div>
    ),
  },
];

// ── Desktop — Framer Motion pinned horizontal scroll ─────────────
function DesktopSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Show 2 panels at a time; translate to reveal remaining 2
  const PANEL_W = 360;
  const GAP = 20;
  const shift = (PANELS.length - 2) * (PANEL_W + GAP);
  const x = useTransform(scrollYProgress, [0, 1], [0, -shift]);

  return (
    <section
      ref={containerRef}
      className="relative hidden md:block"
      style={{ height: `${PANELS.length * 42}vh`, background: "#FFFFFF" }}
      aria-label="What you can do with CreoHold"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Background dot grid */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" aria-hidden="true"
          style={{ backgroundImage: "radial-gradient(circle, #00D285 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        {/* Green glow */}
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-green-brand/5 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 w-full">
          <div className="mb-8">
            <p className="text-xs font-semibold text-green-brand uppercase tracking-widest mb-3">What you can do</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">One wallet, every need.</h2>
          </div>

          <div className="overflow-visible">
            <motion.div style={{ x }} className="flex gap-5 will-change-transform">
              {PANELS.map((p) => (
                <div
                  key={p.id}
                  style={{ width: PANEL_W, minWidth: PANEL_W, background: "linear-gradient(160deg, rgba(13,51,80,1) 0%, rgba(5,35,56,1) 100%)" }}
                  className="border border-white/8 rounded-2xl p-6 flex flex-col gap-4 h-80"
                >
                  <div>
                    <span className="text-[10px] font-bold text-green-brand/40 tabular-nums block mb-2">{p.label}</span>
                    <h3 className="text-lg font-bold text-white mb-1">{p.heading}</h3>
                    <p className="text-xs text-white/45 leading-relaxed">{p.desc}</p>
                  </div>
                  <div className="flex-1 flex items-end">
                    {p.mockup}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Scroll progress bar */}
          <div className="relative mt-6 h-0.5 bg-white/8 rounded-full overflow-hidden" style={{ width: `${(2 / PANELS.length) * 100}%` }}>
            <motion.div
              className="absolute inset-y-0 left-0 bg-green-brand rounded-full"
              style={{ width: `${(1 / 2) * 100}%`, x: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
            />
          </div>
          <p className="text-[10px] text-navy mt-2">Scroll to explore</p>
        </div>
      </div>
    </section>
  );
}

// ── Mobile — native snap carousel ───────────────────────────────
function MobileSection() {
  return (
    <section className="bg-navy md:hidden py-12" aria-label="What you can do with CreoHold">
      <div className="mb-6 px-5">
        <p className="text-xs font-semibold text-green-brand uppercase tracking-widest mb-3">What you can do</p>
        <h2 className="text-2xl font-bold text-white">One wallet, every need.</h2>
      </div>
      <div
        className="overflow-x-auto snap-x snap-mandatory flex gap-4 px-5"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        role="list"
      >
        {PANELS.map((p) => (
          <div
            key={p.id}
            role="listitem"
            className="snap-center shrink-0 w-72 border border-white/8 rounded-2xl p-5 flex flex-col gap-4"
            style={{ background: "linear-gradient(160deg, rgba(13,51,80,1) 0%, rgba(5,35,56,1) 100%)" }}
          >
            <span className="text-[10px] font-bold text-green-brand/40">{p.label}</span>
            <h3 className="text-base font-bold text-white">{p.heading}</h3>
            <p className="text-xs text-white/45 leading-relaxed">{p.desc}</p>
            <div className="mt-auto">{p.mockup}</div>
          </div>
        ))}
        {/* Trailing spacer */}
        <div className="shrink-0 w-5" aria-hidden="true" />
      </div>
    </section>
  );
}

export default function HorizontalScrollSection() {
  return (
    <>
      <DesktopSection />
      <MobileSection />
    </>
  );
}
