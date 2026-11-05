"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import GridPattern from "@/components/ui/GridPattern";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function SecurityComposition() {
  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden"
      aria-label="Security"
      style={{ background: "linear-gradient(165deg, #F4FAF7 0%, #FFFFFF 100%)" }}
    >
      <GridPattern variant="dots-faint" size={32} color="rgba(0,108,68,0.05)" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-green-brand/[0.07] rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — composition */}
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <div className="relative grid grid-cols-2 gap-3">
              <motion.div variants={fadeUp} className="col-span-2 rounded-2xl p-5 bg-white"
                style={{ border: "1px solid rgba(0,210,133,0.2)", boxShadow: "0 4px 24px rgba(0,210,133,0.08), 0 0 0 1px rgba(0,210,133,0.06)" }}>
                <p className="text-xs font-semibold text-green-deep mb-1">Identity verified</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="w-9 h-9 rounded-full bg-green-brand/15 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M4 8l3 3 5-5" stroke="#00D285" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">Adaeze Okafor</p>
                    <p className="text-xs text-grey-text">NIN verified · wallet active</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-white border border-grey-mid rounded-xl p-4" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="mb-2">
                  <rect x="4" y="9" width="12" height="9" rx="2" stroke="#00D285" strokeWidth="1.25"/>
                  <path d="M7 9V7a3 3 0 016 0v2" stroke="#00D285" strokeWidth="1.25"/>
                </svg>
                <p className="text-xs font-semibold text-navy">Encrypted</p>
                <p className="text-[10px] text-grey-text mt-1">In transit and at rest</p>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-white border border-grey-mid rounded-xl p-4" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="mb-2">
                  <rect x="6" y="2" width="8" height="16" rx="2" stroke="#00D285" strokeWidth="1.25"/>
                  <circle cx="10" cy="14" r="1.5" fill="#00D285"/>
                </svg>
                <p className="text-xs font-semibold text-navy">2FA available</p>
                <p className="text-[10px] text-grey-text mt-1">Every sign-in</p>
              </motion.div>

              <motion.div variants={fadeUp} className="col-span-2 bg-white border border-grey-mid rounded-xl p-4 flex items-start gap-3" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div className="w-8 h-8 rounded-full bg-green-brand/10 flex items-center justify-center shrink-0">
                  <span className="text-green-brand text-sm" aria-hidden="true">🔔</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-navy">Transaction alert sent</p>
                  <p className="text-[10px] text-grey-text mt-0.5">Every transaction — in-app and email, instantly</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold text-green-deep uppercase tracking-widest mb-4">Security</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-navy leading-tight tracking-tight mb-6">
              Built with your<br />money in mind.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-grey-text leading-relaxed mb-6">
              Identity verification before your wallet activates. Every transaction is encrypted end-to-end. Two-factor authentication at every sign-in. Real-time alerts the moment anything moves.
            </motion.p>
            <motion.p variants={fadeUp} className="text-xs text-grey-text/60 mb-6">
              Operated under [REGULATOR NAME] licence no. [LICENCE NUMBER]
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/security"
                className="inline-flex items-center gap-2 border border-grey-mid hover:border-green-brand/40 text-navy hover:text-green-deep text-sm font-medium px-5 py-3 rounded-xl transition-all duration-200">
                Read more about security
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
