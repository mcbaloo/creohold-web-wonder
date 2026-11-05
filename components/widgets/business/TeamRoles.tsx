"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ComingSoonBadge from "@/components/ui/ComingSoonBadge";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Role = "Admin" | "Finance" | "Viewer";

const INITIAL_MEMBERS = [
  { name: "Adaeze Okafor",    email: "adaeze@acme.ng",     role: "Admin"   as Role, initials: "AO" },
  { name: "Emeka Nwosu",      email: "emeka@acme.ng",      role: "Finance" as Role, initials: "EN" },
  { name: "Fatima Aliyu",     email: "fatima@acme.ng",     role: "Finance" as Role, initials: "FA" },
  { name: "Chukwuemeka Eze",  email: "chuks@acme.ng",      role: "Viewer"  as Role, initials: "CE" },
];

const ROLE_STYLES: Record<Role, string> = {
  Admin:   "bg-green-brand/10 text-green-deep",
  Finance: "bg-blue-50 text-blue-700",
  Viewer:  "bg-grey-light text-grey-text",
};

export default function TeamRoles() {
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [inviteOpen, setInviteOpen] = useState(false);

  const setRole = (idx: number, role: Role) =>
    setMembers(m => m.map((v, i) => i === idx ? { ...v, role } : v));

  return (
    <div className="bg-white rounded-2xl border border-grey-mid shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-grey-mid flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-navy">Team and roles</p>
          <p className="text-xs text-grey-text mt-0.5">{members.length} members</p>
        </div>
        <ComingSoonBadge />
      </div>

      <div className="p-5 space-y-2">
        {members.map((m, i) => (
          <div key={m.email} className="flex items-center gap-3 p-3 rounded-xl border border-grey-mid">
            <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-navy">{m.initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-navy truncate">{m.name}</p>
              <p className="text-[10px] text-grey-text truncate">{m.email}</p>
            </div>
            <select
              value={m.role}
              onChange={e => setRole(i, e.target.value as Role)}
              className="text-[11px] font-semibold rounded-lg px-2 py-1 border border-grey-mid bg-white text-navy focus:outline-none focus:ring-1 focus:ring-green-brand cursor-pointer"
            >
              {(["Admin", "Finance", "Viewer"] as Role[]).map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        ))}

        <AnimatePresence>
          {inviteOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="p-3 rounded-xl border border-green-brand/20 bg-green-brand/5 space-y-2">
                <input
                  type="email"
                  placeholder="colleague@company.com"
                  className="w-full text-xs rounded-lg border border-grey-mid px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-brand"
                />
                <select className="w-full text-xs rounded-lg border border-grey-mid px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-brand bg-white text-navy">
                  {(["Admin", "Finance", "Viewer"] as Role[]).map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setInviteOpen(o => !o)}
          disabled
          className="w-full py-2.5 text-sm font-semibold text-white/50 bg-grey-mid rounded-xl cursor-not-allowed flex items-center justify-center gap-2"
        >
          Invite team member
          <ComingSoonBadge />
        </button>
      </div>
    </div>
  );
}
