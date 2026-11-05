"use client";
import { motion } from "framer-motion";
import WalletPreview from "@/components/widgets/WalletPreview";
import RatesTicker from "@/components/widgets/RatesTicker";
import GridPattern from "@/components/ui/GridPattern";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden pt-16 min-h-screen flex items-center"
      aria-label="Introduction"
      style={{
        background: `
          radial-gradient(ellipse 70% 60% at 75% 20%, rgba(0,210,133,0.18), rgba(0,163,104,0.06) 40%, rgba(5,35,56,0) 70%),
          linear-gradient(180deg, #031B2C 0%, #052338 100%)
        `,
      }}
    >
      {/* Floating orbs */}
      <motion.div
        aria-hidden="true"
        className="absolute top-1/4 right-1/4 w-[600px] h-[400px] bg-green-brand/[0.07] rounded-full blur-[100px] pointer-events-none"
        animate={{ x: [-20, 20, -20], y: [10, -15, 10] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-1/4 left-10 w-72 h-72 bg-green-deep/[0.08] rounded-full blur-[80px] pointer-events-none"
        animate={{ x: [15, -15, 15], y: [-10, 15, -10] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Dot grid — fades at edges */}
      <GridPattern variant="dots-faint" size={32} color="rgba(0,210,133,0.06)" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-16 md:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {/* <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
              className="inline-flex items-center gap-2 text-xs font-semibold text-green-brand bg-green-brand/8 border border-green-brand/15 px-3 py-1.5 rounded-full mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-brand shrink-0 animate-pulse" aria-hidden="true" />
              Available now in Nigeria
            </motion.div> */}

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.02] tracking-tight mb-6"
            >
              Hold value,<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #00D285, #006C44)" }}>
                move freely.
              </span>
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
              className="text-lg text-white/55 max-w-md mb-8 leading-relaxed"
            >
              A digital wallet for Nigeria. Hold naira, send and receive crypto, pay bills and convert currencies — all in one place.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <a
                href="https://app.creohold.com/auth/signup"
                className="inline-flex items-center gap-2 bg-green-brand hover:bg-green-muted text-navy font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-green-brand/20 hover:shadow-[0_4px_20px_rgba(0,210,133,0.4)]"
              >
                Open your wallet
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="https://app.creohold.com/auth/signin"
                className="inline-flex items-center gap-2 border border-white/15 hover:border-white/30 text-white/70 hover:text-white font-medium px-6 py-3.5 rounded-xl transition-colors text-sm"
              >
                Sign in
              </a>
            </motion.div>

            <motion.p
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4, ease: EASE } } }}
              className="text-xs text-white/30 mb-10"
            >
              Sign in with Google or Apple supported
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5, ease: EASE } } }}
              className="border-t border-white/8 pt-6"
            >
              <p className="text-[10px] font-semibold text-white/25 uppercase tracking-widest mb-3">Live rates</p>
              <RatesTicker />
            </motion.div>
          </motion.div>

          {/* Right — wallet preview with floating cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow behind wallet */}
              <div className="absolute inset-0 bg-green-brand/10 rounded-3xl blur-3xl scale-110" aria-hidden="true" />

              <div className="relative z-10">
                <WalletPreview variant="personal" />
              </div>

              {/* Floating business card */}
              <motion.div
                className="absolute -bottom-6 -left-10 z-20 hidden lg:block"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.8 }}
              >
                <div className="bg-navy border border-white/10 rounded-xl p-3 shadow-xl w-44 backdrop-blur-sm">
                  <p className="text-[9px] font-semibold text-white/30 uppercase tracking-widest mb-1">Business</p>
                  <p className="text-xs text-white font-semibold">₦2,840,000</p>
                  <p className="text-[10px] text-white/40 mt-0.5">Company wallet</p>
                </div>
              </motion.div>

              {/* Floating alert */}
              <motion.div
                className="absolute -top-4 -right-6 z-20 hidden lg:block"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 1.0 }}
              >
                <div className="bg-navy-mid border border-green-brand/25 rounded-xl px-3 py-2 shadow-xl backdrop-blur-sm">
                  <p className="text-[9px] font-semibold text-green-brand mb-0.5">BTC received</p>
                  <p className="text-[10px] text-white/60">+0.00124 BTC</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-navy pointer-events-none" aria-hidden="true" />
    </section>
  );
}
