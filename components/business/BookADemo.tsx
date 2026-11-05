"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import type { DemoRequest } from "@/lib/api";
import GridPattern from "@/components/ui/GridPattern";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type FormState = "idle" | "loading" | "success";

const FIELD_BASE = "w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all duration-200 bg-white/5 text-white placeholder:text-white/30 border-white/10 focus:ring-green-brand/40 focus:border-green-brand/60";

const COMPANY_SIZES = ["1-10", "11-50", "51-200", "200+"] as const;
const USE_CASES = [
  { value: "business-wallet", label: "Business wallet" },
  { value: "bulk-payouts",    label: "Bulk payouts" },
  { value: "collect-payments", label: "Collect payments" },
  { value: "api",             label: "Developer API" },
  { value: "other",           label: "Other" },
] as const;

export default function BookADemo() {
  const [form, setForm] = useState({
    fullName: "", workEmail: "", companyName: "", phone: "",
    companySize: "" as DemoRequest["companySize"] | "",
    useCase: "" as DemoRequest["useCase"] | "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [state, setState] = useState<FormState>("idle");
  const [refId, setRefId] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e: typeof errors = {};
    if (!form.fullName.trim())    e.fullName    = "Required";
    if (!form.workEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.workEmail))
                                   e.workEmail   = "Enter a valid work email";
    if (!form.companyName.trim()) e.companyName = "Required";
    if (!form.phone.trim())       e.phone       = "Required";
    if (!form.companySize)        e.companySize = "Select a size";
    if (!form.useCase)            e.useCase     = "Select an option";
    return e;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setState("loading");
    try {
      const res = await api.submitDemoRequest(form as DemoRequest);
      setRefId(res.referenceId);
      setState("success");
    } catch {
      setState("idle");
    }
  };

  return (
    <section
      id="book-demo"
      className="relative py-20 overflow-hidden"
      aria-label="Book a demo"
      style={{ background: "#0a0a0a" }}
    >
      {/* Green radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse 60% 55% at 30% 50%, rgba(0,210,133,0.10), rgba(10,10,10,0) 60%)",
        }}
      />
      <GridPattern variant="dots" size={28} color="rgba(255,255,255,0.03)" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <p className="text-xs font-semibold text-green-brand uppercase tracking-widest mb-4">Book a demo</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
              See CreoHold Business<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #00D285, #006C44)" }}>
                in action.
              </span>
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-10">
              Get a walkthrough of the business wallet, bulk payouts, team approvals and payment collection. We will tailor the demo to your use case.
            </p>

            <ul className="space-y-4">
              {[
                { icon: "⚡", text: "Live demo of the business wallet with real data flows" },
                { icon: "🏢", text: "Team structure and approval workflows for your company size" },
                { icon: "🔗", text: "API integration options and sandbox access" },
                { icon: "✅", text: "Answers to your compliance and licensing questions" },
              ].map(item => (
                <li key={item.text} className="flex items-start gap-3">
                  <span className="text-lg shrink-0 mt-0.5" aria-hidden="true">{item.icon}</span>
                  <span className="text-sm text-white/60 leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
          >
            <div
              className="rounded-2xl p-7"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <AnimatePresence mode="wait">
                {state === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="flex flex-col items-center text-center py-10 gap-4"
                  >
                    {/* Pop-in success */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
                      className="relative w-16 h-16"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-brand/15 flex items-center justify-center">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                          <path d="M6 14l5.5 5.5 11-11" stroke="#00D285" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      {/* Ripple */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-green-brand/30"
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{ scale: 1.8, opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                      />
                    </motion.div>
                    <div>
                      <p className="text-lg font-bold text-white mb-2">Request received</p>
                      <p className="text-sm text-white/55 leading-relaxed">
                        We will be in touch within one business day to schedule your demo.
                      </p>
                      <p className="text-xs text-white/25 mt-3">Reference: {refId}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={submit}
                    noValidate
                    className="space-y-4"
                  >
                    {/* Row 1 */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Full name"
                          value={form.fullName}
                          onChange={set("fullName")}
                          className={FIELD_BASE}
                          aria-label="Full name"
                        />
                        {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>}
                      </div>
                      <div>
                        <input
                          type="email"
                          placeholder="Work email"
                          value={form.workEmail}
                          onChange={set("workEmail")}
                          className={FIELD_BASE}
                          aria-label="Work email"
                        />
                        {errors.workEmail && <p className="text-xs text-red-400 mt-1">{errors.workEmail}</p>}
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Company name"
                          value={form.companyName}
                          onChange={set("companyName")}
                          className={FIELD_BASE}
                          aria-label="Company name"
                        />
                        {errors.companyName && <p className="text-xs text-red-400 mt-1">{errors.companyName}</p>}
                      </div>
                      <div>
                        <input
                          type="tel"
                          placeholder="Phone number"
                          value={form.phone}
                          onChange={set("phone")}
                          className={FIELD_BASE}
                          aria-label="Phone number"
                        />
                        {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Row 3 */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <select
                          value={form.companySize}
                          onChange={set("companySize")}
                          className={`${FIELD_BASE} ${!form.companySize ? "text-white/30" : "text-white"}`}
                          aria-label="Company size"
                        >
                          <option value="" disabled>Company size</option>
                          {COMPANY_SIZES.map(s => <option key={s} value={s}>{s} employees</option>)}
                        </select>
                        {errors.companySize && <p className="text-xs text-red-400 mt-1">{errors.companySize}</p>}
                      </div>
                      <div>
                        <select
                          value={form.useCase}
                          onChange={set("useCase")}
                          className={`${FIELD_BASE} ${!form.useCase ? "text-white/30" : "text-white"}`}
                          aria-label="Intended use"
                        >
                          <option value="" disabled>What do you need?</option>
                          {USE_CASES.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                        </select>
                        {errors.useCase && <p className="text-xs text-red-400 mt-1">{errors.useCase}</p>}
                      </div>
                    </div>

                    {/* Optional message */}
                    <div>
                      <textarea
                        placeholder="Anything else you want us to know? (optional)"
                        value={form.message}
                        onChange={set("message")}
                        rows={3}
                        className={`${FIELD_BASE} resize-none`}
                        aria-label="Additional message"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={state === "loading"}
                      className="w-full py-3.5 text-sm font-semibold text-[#0a0a0a] bg-green-brand hover:bg-green-muted rounded-xl transition-all duration-200 shadow-lg shadow-green-brand/20 hover:shadow-[0_4px_20px_rgba(0,210,133,0.4)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {state === "loading" ? (
                        <>
                          <motion.div
                            className="w-4 h-4 border-2 border-[#0a0a0a]/30 border-t-[#0a0a0a] rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          />
                          Sending…
                        </>
                      ) : "Book your demo"}
                    </button>

                    <p className="text-xs text-white/25 text-center">
                      We will respond within one business day.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
