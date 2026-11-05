"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ComingSoonBadge from "@/components/ui/ComingSoonBadge";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const MOCK_KEY = "creo_test_sk_7f2a9b1c4e8d3f6a2b5c9e1d4f7a2b8c";
const SNIPPET = `curl https://api.creohold.com/v1/rates \\
  -H "Authorization: Bearer creo_test_sk_7f2a..." \\
  -H "Content-Type: application/json"`;

export default function ApiKeysPanel() {
  const [created, setCreated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [snippetCopied, setSnippetCopied] = useState(false);

  const copy = (val: string, setter: (v: boolean) => void) => {
    navigator.clipboard.writeText(val).catch(() => null);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-grey-mid shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-grey-mid flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-navy">Developer API</p>
          <p className="text-xs text-grey-text mt-0.5">Test key — no real data</p>
        </div>
        <ComingSoonBadge />
      </div>

      <div className="p-5">
        <AnimatePresence mode="wait">
          {!created ? (
            <motion.div
              key="pre"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-navy/5 border border-grey-mid flex items-center justify-center mx-auto mb-4">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path d="M7 8l-4 3 4 3M15 8l4 3-4 3M13 5l-4 12" stroke="#052338" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-sm font-semibold text-navy mb-1">Access the CreoHold API</p>
              <p className="text-xs text-grey-text mb-5 leading-relaxed">
                Integrate wallet operations, rates, and payment collection into your product.
              </p>
              <button
                onClick={() => setCreated(true)}
                disabled
                className="w-full py-2.5 text-sm font-semibold text-white/50 bg-grey-mid rounded-xl cursor-not-allowed flex items-center justify-center gap-2"
              >
                Create test API key
                <ComingSoonBadge />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="post"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="space-y-4"
            >
              {/* Key display */}
              <div>
                <p className="text-xs font-semibold text-grey-text mb-2">Test secret key</p>
                <div className="flex gap-2">
                  <div className="flex-1 bg-grey-light rounded-xl px-3 py-2 font-mono text-[11px] text-navy truncate">
                    {MOCK_KEY.slice(0, 24)}…
                  </div>
                  <button
                    onClick={() => copy(MOCK_KEY, setCopied)}
                    className="shrink-0 px-3 py-2 rounded-xl bg-navy text-white text-xs font-semibold hover:bg-navy-mid transition-colors"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Code snippet */}
              <div>
                <p className="text-xs font-semibold text-grey-text mb-2">Quick start</p>
                <div
                  className="rounded-xl p-3 relative"
                  style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <pre className="text-[10px] text-green-brand font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap break-all">{SNIPPET}</pre>
                  <button
                    onClick={() => copy(SNIPPET, setSnippetCopied)}
                    className="absolute top-2 right-2 text-[10px] font-semibold text-white/40 hover:text-white transition-colors"
                  >
                    {snippetCopied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              <a href="/business/solutions#api" className="inline-flex items-center gap-1 text-xs font-semibold text-green-deep hover:text-green-brand transition-colors">
                Full API documentation →
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
