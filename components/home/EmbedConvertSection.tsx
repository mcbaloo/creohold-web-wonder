"use client";
import { motion } from "framer-motion";
import ConvertCalculator from "@/components/widgets/ConvertCalculator";
import Link from "next/link";
import GridPattern from "@/components/ui/GridPattern";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function EmbedConvertSection() {
  return (
    <section
      className="relative py-16 md:py-24 overflow-hidden"
      aria-label="Try the converter"
      style={{ background: "#F5F7FA" }}
    >
      {/* Subtle dots on light bg */}
      <GridPattern variant="dots" size={28} color="rgba(0,108,68,0.06)" />

      {/* Light green accent glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-green-brand/[0.07] rounded-full blur-[80px] pointer-events-none -translate-y-1/2" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
            className="text-xs font-semibold text-green-deep uppercase tracking-widest mb-4"
          >
            Try it now
          </motion.p>
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
            className="text-3xl sm:text-4xl font-bold text-navy leading-tight tracking-tight mb-6"
          >
            See what your money<br />converts to.
          </motion.h2>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
            className="text-grey-text leading-relaxed mb-6"
          >
            Live indicative rates. The exact rate is locked for 30 seconds when you convert inside your wallet.
          </motion.p>
          <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } } }}>
            <Link href="/convert"
              className="inline-flex items-center gap-2 text-sm font-semibold text-green-deep hover:text-green-brand transition-colors">
              Learn how converting works →
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <ConvertCalculator />
        </motion.div>
      </div>
    </section>
  );
}
