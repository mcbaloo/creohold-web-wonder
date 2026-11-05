"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import GridPattern from "@/components/ui/GridPattern";
import ComingSoonBadge from "@/components/ui/ComingSoonBadge";
import BusinessWalletOverview from "@/components/widgets/business/BusinessWalletOverview";
import BulkPayoutBuilder from "@/components/widgets/business/BulkPayoutBuilder";
import ApprovalsQueue from "@/components/widgets/business/ApprovalsQueue";
import TeamRoles from "@/components/widgets/business/TeamRoles";
import CollectPayments from "@/components/widgets/business/CollectPayments";
import ApiKeysPanel from "@/components/widgets/business/ApiKeysPanel";
import BookADemo from "@/components/business/BookADemo";
import { features } from "@/lib/features";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const LIVE_FEATURES = [
  { label: "Naira wallet",             desc: "A company naira balance funded directly from your bank account." },
  { label: "Crypto send and receive",  desc: "Send and receive BTC, ETH, USDT and USDC. Fee confirmed before every transaction." },
  { label: "Convert",                  desc: "Convert between naira and crypto. Rate locked for 30 seconds." },
  { label: "Bill payments",            desc: "Pay airtime, data, electricity and TV for the business from your naira balance." },
  { label: "Transaction alerts",       desc: "Real-time in-app and email notifications for every movement." },
];

export default function BusinessContent() {
  return (
    <div data-theme="business">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-16 min-h-screen"
        style={{
          background: `
            radial-gradient(ellipse 60% 55% at 70% 30%, rgba(0,210,133,0.10), rgba(10,10,10,0) 60%),
            linear-gradient(170deg, #161616 0%, #0a0a0a 100%)
          `,
        }}
      >
        <GridPattern variant="dots" size={28} color="rgba(255,255,255,0.03)" />

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {/* <motion.div variants={fadeUp}
              className="inline-flex items-center gap-2 text-xs font-semibold text-green-brand bg-green-brand/8 border border-green-brand/15 px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-brand shrink-0 animate-pulse" />
              Business accounts
            </motion.div> */}
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
              A wallet built<br />for companies.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/55 text-lg leading-relaxed mb-8 max-w-md">
              Shared naira and crypto balances for your whole team. Convert, pay bills and move money, all from one company wallet.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <a
                href="https://app.creohold.com/auth/signup"
                className="inline-flex items-center gap-2 bg-green-brand hover:bg-green-muted text-[#0a0a0a] font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-green-brand/20 hover:shadow-[0_4px_20px_rgba(0,210,133,0.4)]"
              >
                Open a business account
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </a>
              <Link href="#book-demo"
                className="inline-flex items-center gap-2 border border-white/15 hover:border-white/30 text-white/70 hover:text-white font-medium px-6 py-3.5 rounded-xl transition-colors text-sm">
                Book a demo
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 bg-green-brand/[0.07] rounded-3xl blur-3xl scale-110" aria-hidden="true" />
              <div className="relative z-10">
                <BusinessWalletOverview />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── LIVE FEATURES ──────────────────────────────────────────── */}
      <section className="py-16" style={{ background: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold text-green-deep uppercase tracking-widest mb-2">Available now</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-navy tracking-tight mb-8">
              What your business can do today.
            </motion.h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {LIVE_FEATURES.map(f => (
                <motion.div
                  key={f.label}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl p-5 border border-grey-mid bg-white cursor-default"
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
                >
                  <p className="text-sm font-semibold text-navy mb-2">{f.label}</p>
                  <p className="text-xs text-grey-text leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BULK PAYOUTS ───────────────────────────────────────────── */}
      <section className="py-16" style={{ background: "#F4FAF7" }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <p className="text-xs font-semibold text-green-deep uppercase tracking-widest">Bulk payouts</p>
              <ComingSoonBadge />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-navy tracking-tight mb-5">
              Pay hundreds of people without the spreadsheet.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-grey-text leading-relaxed mb-6">
              Upload your recipients list, review each row for errors, and submit the whole batch for a single approval. The fee is shown before you commit.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/business/solutions#bulk-payouts" className="inline-flex items-center gap-1 text-sm font-semibold text-green-deep hover:text-green-brand transition-colors">
                Learn how bulk payouts work →
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <BulkPayoutBuilder />
          </motion.div>
        </div>
      </section>

      {/* ── APPROVALS + TEAM ───────────────────────────────────────── */}
      <section className="py-16" style={{ background: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <p className="text-xs font-semibold text-green-deep uppercase tracking-widest">Team and approvals</p>
            <ComingSoonBadge />
          </div>
          <h2 className="text-3xl font-bold text-navy tracking-tight mb-8">
            Control who can move money.
          </h2>
          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <ApprovalsQueue />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
            >
              <TeamRoles />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── COLLECT PAYMENTS ───────────────────────────────────────── */}
      <section className="py-16" style={{ background: "#F4FAF7" }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <CollectPayments />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="lg:order-first"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <p className="text-xs font-semibold text-green-deep uppercase tracking-widest">Collect payments</p>
              <ComingSoonBadge />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-navy tracking-tight mb-5">
              Let customers pay you on the spot.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-grey-text leading-relaxed mb-6">
              Generate a payment link or crypto deposit address for any invoice. Send it to your customer and get notified the moment funds arrive.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/business/solutions#collect-payments" className="inline-flex items-center gap-1 text-sm font-semibold text-green-deep hover:text-green-brand transition-colors">
                See how it works →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── DEVELOPER API ──────────────────────────────────────────── */}
      <section className="py-16" style={{ background: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <p className="text-xs font-semibold text-green-deep uppercase tracking-widest">Developer API</p>
              <ComingSoonBadge />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-navy tracking-tight mb-5">
              Integrate our wallet into your platform.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-grey-text leading-relaxed mb-6">
              A REST API for rates, payments, deposit addresses and transaction webhooks. Build on top of CreoHold rather than starting from scratch.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/business/solutions#api" className="inline-flex items-center gap-1 text-sm font-semibold text-green-deep hover:text-green-brand transition-colors">
                View the API documentation →
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <ApiKeysPanel />
          </motion.div>
        </div>
      </section>

      {/* ── BOOK A DEMO ────────────────────────────────────────────── */}
      <BookADemo />
    </div>
  );
}
