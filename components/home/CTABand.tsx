"use client";
import { motion } from "framer-motion";
import GridPattern from "@/components/ui/GridPattern";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function CTABand() {
  return (
    <section
      className="relative py-16 md:py-24 overflow-hidden"
      aria-label="Get started"
      style={{
        background: "linear-gradient(165deg, #F4FAF7 0%, #FFFFFF 100%)",
      }}
    >
      <GridPattern variant="dots-faint" size={28} color="rgba(0,108,68,0.05)" />

      {/* Centre glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-green-brand/[0.08] rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />

      <motion.div
        className="relative max-w-7xl mx-auto px-5 lg:px-8 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.p
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
          className="text-xs font-semibold text-green-deep uppercase tracking-widest mb-4"
        >
          Get started
        </motion.p>
        <motion.h2
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy tracking-tight leading-tight mb-6"
        >
          Hold value,<br />
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #00D285, #006C44)" }}>
            move freely.
          </span>
        </motion.h2>
        <motion.p
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
          className="text-grey-text max-w-md mx-auto mb-10 leading-relaxed"
        >
          Available in Nigeria. Personal and business accounts. Sign in with Google or Apple.
        </motion.p>
        <motion.div
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a
            href="https://app.creohold.com/auth/signup"
            className="inline-flex items-center gap-2 bg-green-brand hover:bg-green-muted text-navy font-semibold px-8 py-4 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-green-brand/20 hover:shadow-[0_4px_24px_rgba(0,210,133,0.4)]"
          >
            Open your wallet
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a
            href="https://app.creohold.com/auth/signup"
            className="inline-flex items-center gap-2 border border-grey-mid hover:border-navy text-navy font-medium px-8 py-4 rounded-xl transition-colors text-sm"
          >
            Open a business account
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
