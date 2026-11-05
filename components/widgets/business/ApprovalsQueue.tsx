"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ComingSoonBadge from "@/components/ui/ComingSoonBadge";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Status = "pending" | "approved" | "rejected";

const INITIAL = [
  { id: "1", maker: "Emeka Nwosu",     action: "Bulk payout — 4 recipients",  amount: "₦445,000",  time: "10m ago" },
  { id: "2", maker: "Fatima Aliyu",    action: "Send 0.05 BTC to external",    amount: "0.05 BTC",  time: "1h ago" },
  { id: "3", maker: "Chukwuemeka Eze", action: "Pay IKEDC electricity bill",    amount: "₦85,000",   time: "3h ago" },
];

export default function ApprovalsQueue() {
  const [states, setStates] = useState<Record<string, Status>>({});

  const act = (id: string, s: "approved" | "rejected") =>
    setStates(prev => ({ ...prev, [id]: s }));

  const pending = INITIAL.filter(p => !states[p.id]);
  const resolved = INITIAL.filter(p => states[p.id]);

  return (
    <div className="bg-white rounded-2xl border border-grey-mid shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-grey-mid flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-navy">Approvals queue</p>
          <p className="text-xs text-grey-text mt-0.5">{pending.length} awaiting your review</p>
        </div>
        <ComingSoonBadge />
      </div>

      <div className="p-5 space-y-3">
        <AnimatePresence>
          {pending.map(p => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="rounded-xl border border-grey-mid p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-xs font-semibold text-navy">{p.action}</p>
                  <p className="text-[10px] text-grey-text mt-0.5">By {p.maker} · {p.time}</p>
                </div>
                <p className="text-sm font-bold text-navy ml-3 shrink-0">{p.amount}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => act(p.id, "approved")}
                  className="flex-1 py-1.5 text-xs font-semibold text-white bg-green-brand hover:bg-green-muted rounded-lg transition-colors"
                >
                  Approve
                </button>
                <button
                  onClick={() => act(p.id, "rejected")}
                  className="flex-1 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-colors"
                >
                  Reject
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {resolved.length > 0 && (
          <div className="space-y-2">
            {resolved.map(p => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-between p-3 rounded-xl bg-grey-light"
              >
                <div>
                  <p className="text-xs text-grey-text truncate max-w-[180px]">{p.action}</p>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  states[p.id] === "approved"
                    ? "bg-green-brand/10 text-green-deep"
                    : "bg-red-50 text-red-600"
                }`}>
                  {states[p.id] === "approved" ? "Approved" : "Rejected"}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {pending.length === 0 && resolved.length === INITIAL.length && (
          <div className="text-center py-4">
            <p className="text-sm font-semibold text-green-deep">All caught up!</p>
            <p className="text-xs text-grey-text mt-1">No more pending approvals.</p>
          </div>
        )}
      </div>
    </div>
  );
}
