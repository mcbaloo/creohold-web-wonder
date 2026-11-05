"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { BillCategory, Biller } from "@/lib/api";
import MockLabel from "@/components/ui/MockLabel";
import Skeleton from "@/components/ui/Skeleton";
import ErrorState from "@/components/ui/ErrorState";

type Step = "category" | "biller" | "customer" | "amount" | "review" | "success";

const CATEGORIES: { id: BillCategory; label: string; icon: string }[] = [
  { id: "airtime",     label: "Airtime",     icon: "📱" },
  { id: "data",        label: "Data",        icon: "📶" },
  { id: "electricity", label: "Electricity", icon: "⚡" },
  { id: "tv",          label: "TV",          icon: "📺" },
];

export default function BillPayDemo({ className = "" }: { className?: string }) {
  const [step, setStep] = useState<Step>("category");
  const [category, setCategory] = useState<BillCategory | null>(null);
  const [biller, setBiller] = useState<Biller | null>(null);
  const [customerNum, setCustomerNum] = useState("");
  const [planId, setPlanId] = useState<string>("");
  const [freeAmount, setFreeAmount] = useState("2000");

  const { data: billers, isLoading: billersLoading } = useQuery({
    queryKey: ["billers", category],
    queryFn:  () => api.getBillers(category!),
    enabled:  !!category,
  });

  const { data: customerValidation, isLoading: validatingCustomer, error: customerError } = useQuery({
    queryKey: ["bill-customer", biller?.id, customerNum],
    queryFn:  () => api.validateBillCustomer(biller!.id, customerNum),
    enabled:  !!biller && customerNum.length >= 6,
    staleTime: 60_000,
  });

  const selectedPlan = biller?.plans?.find(p => p.id === planId);
  const payAmount = selectedPlan ? selectedPlan.amountNGN : parseInt(freeAmount) || 0;

  if (step === "success") {
    return (
      <div className={`bg-navy border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center gap-4 ${className}`}>
        <div className="w-14 h-14 rounded-full bg-green-brand/15 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12l5 5 9-9" stroke="#00D285" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <p className="text-white font-semibold mb-1">Payment successful</p>
          <p className="text-sm text-white/50">{biller?.name} — ₦{payAmount.toLocaleString()}</p>
          {customerValidation?.customerName && (
            <p className="text-xs text-white/30 mt-1">for {customerValidation.customerName}</p>
          )}
        </div>
        <div className="w-full bg-white/3 rounded-xl p-4 text-left space-y-1.5 text-xs">
          {[
            ["Reference",  "CREO-" + Math.random().toString(36).slice(2,10).toUpperCase()],
            ["Amount",     "₦" + payAmount.toLocaleString()],
            ["Status",     "Completed"],
          ].map(([k,v]) => (
            <div key={k} className="flex justify-between">
              <span className="text-white/40">{k}</span>
              <span className="text-white">{v}</span>
            </div>
          ))}
        </div>
        <a
          href="https://app.creohold.com/auth/signup"
          className="w-full flex items-center justify-center gap-2 bg-green-brand hover:bg-green-muted text-navy font-semibold py-3 rounded-lg transition-colors text-sm"
        >
          Do this for real — create your wallet
        </a>
        <button onClick={() => { setStep("category"); setCategory(null); setBiller(null); setCustomerNum(""); setPlanId(""); }} className="text-xs text-white/30 hover:text-white/60">
          Try again
        </button>
      </div>
    );
  }

  if (step === "review") {
    return (
      <div className={`bg-navy border border-white/10 rounded-2xl p-5 ${className}`}>
        <div className="flex items-center gap-2 mb-4">
          <button onClick={() => setStep("amount")} className="text-white/40 hover:text-white" aria-label="Back">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
          <h3 className="text-sm font-semibold text-white">Review payment</h3>
        </div>
        <div className="bg-white/3 rounded-xl px-4 py-4 space-y-3 text-sm mb-4">
          {[
            ["Biller",   biller?.name ?? ""],
            ["Customer", customerValidation?.customerName ?? customerNum],
            ["Amount",   "₦" + payAmount.toLocaleString()],
            [selectedPlan ? "Plan" : "Type", selectedPlan?.label ?? "Custom amount"],
          ].map(([k,v]) => (
            <div key={k} className="flex justify-between">
              <span className="text-white/40">{k}</span>
              <span className="text-white">{v}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-white/30 mb-4">This is a demonstration. No real payment will be made.</p>
        <button
          onClick={() => setStep("success")}
          className="w-full bg-green-brand hover:bg-green-muted text-navy font-semibold py-3 rounded-lg transition-colors text-sm"
        >
          Confirm payment
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-navy border border-white/10 rounded-2xl p-5 ${className}`} aria-label="Bill payment demo">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Pay bills</h3>
        <MockLabel />
      </div>

      {/* Category */}
      <label className="block text-[11px] text-white/40 mb-2">Category</label>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            onClick={() => { setCategory(c.id); setBiller(null); setCustomerNum(""); setPlanId(""); }}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm transition-colors ${
              category === c.id ? "bg-green-brand/15 border-green-brand/40 text-green-brand" : "border-white/10 text-white/50 hover:border-white/20"
            }`}
          >
            <span aria-hidden="true">{c.icon}</span> {c.label}
          </button>
        ))}
      </div>

      {/* Biller */}
      {category && (
        <>
          <label className="block text-[11px] text-white/40 mb-2">Provider</label>
          {billersLoading && <Skeleton className="h-9 w-full mb-4" />}
          {billers && (
            <div className="flex gap-1.5 flex-wrap mb-4">
              {billers.map(b => (
                <button
                  key={b.id}
                  onClick={() => { setBiller(b); setCustomerNum(""); setPlanId(""); }}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                    biller?.id === b.id ? "bg-green-brand/15 border-green-brand/40 text-green-brand" : "border-white/10 text-white/50 hover:border-white/20"
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Customer number */}
      {biller && (
        <>
          <label className="block text-[11px] text-white/40 mb-1">{biller.customerLabel}</label>
          <div className="relative mb-1">
            <input
              type="text"
              value={customerNum}
              onChange={e => setCustomerNum(e.target.value)}
              placeholder="e.g. 08012345678"
              className="w-full bg-navy-mid border border-white/10 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-green-brand/50"
            />
            {validatingCustomer && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white/40 animate-pulse">Checking…</span>
            )}
            {customerValidation?.valid && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-green-brand font-semibold">
                {customerValidation.customerName}
              </span>
            )}
          </div>
          {customerError && <p className="text-[11px] text-red-400 mb-3">Could not look up customer</p>}
          {customerValidation?.valid === false && (
            <p className="text-[11px] text-red-400 mb-3">{customerValidation.error}</p>
          )}
        </>
      )}

      {/* Plan / amount */}
      {biller && customerValidation?.valid && (
        <>
          {biller.plans ? (
            <>
              <label className="block text-[11px] text-white/40 mt-3 mb-2">Plan</label>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {biller.plans.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setPlanId(p.id)}
                    className={`px-3 py-2 rounded-lg border text-xs transition-colors text-left ${
                      planId === p.id ? "bg-green-brand/15 border-green-brand/40 text-green-brand" : "border-white/10 text-white/50 hover:border-white/20"
                    }`}
                  >
                    <span className="block font-semibold">{p.label}</span>
                    <span className="block">₦{p.amountNGN.toLocaleString()}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <label className="block text-[11px] text-white/40 mt-3 mb-1">Amount (₦)</label>
              <input
                type="number"
                min="100"
                value={freeAmount}
                onChange={e => setFreeAmount(e.target.value)}
                className="w-full bg-navy-mid border border-white/10 text-white text-sm rounded-lg px-3 py-2.5 mb-4 tabular-nums focus:outline-none focus:border-green-brand/50"
              />
            </>
          )}

          <button
            onClick={() => setStep("review")}
            disabled={biller.plans ? !planId : !parseInt(freeAmount)}
            className="w-full bg-green-brand hover:bg-green-muted disabled:opacity-30 disabled:cursor-not-allowed text-navy font-semibold py-3 rounded-lg transition-colors text-sm"
          >
            Review — ₦{payAmount.toLocaleString()}
          </button>
        </>
      )}
    </div>
  );
}
