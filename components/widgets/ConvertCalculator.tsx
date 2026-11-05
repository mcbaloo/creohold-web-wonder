"use client";
import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Asset } from "@/lib/api";
import MockLabel from "@/components/ui/MockLabel";
import Skeleton from "@/components/ui/Skeleton";
import ErrorState from "@/components/ui/ErrorState";

type Side = Asset | "NGN";
const ASSETS: Side[] = ["NGN", "BTC", "ETH", "USDT", "USDC"];

function label(a: Side) {
  return a === "NGN" ? "Naira (NGN)" : a;
}

function CountdownBar({ expiresAt, onExpire }: { expiresAt: number; onExpire: () => void }) {
  const [remaining, setRemaining] = useState(30);
  useEffect(() => {
    const tick = setInterval(() => {
      const left = Math.max(0, Math.round((expiresAt - Date.now()) / 1000));
      setRemaining(left);
      if (left === 0) { clearInterval(tick); onExpire(); }
    }, 500);
    return () => clearInterval(tick);
  }, [expiresAt, onExpire]);

  const pct = (remaining / 30) * 100;
  return (
    <div className="mt-3">
      <div className="flex justify-between text-[10px] text-white/40 mb-1">
        <span>Quote expires</span>
        <span className={remaining <= 5 ? "text-red-400 font-semibold" : ""}>{remaining}s</span>
      </div>
      <div className="h-0.5 bg-white/8 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${remaining <= 5 ? "bg-red-400" : "bg-green-brand"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function ConvertCalculator({ className = "" }: { className?: string }) {
  const [from, setFrom] = useState<Side>("NGN");
  const [to, setTo]     = useState<Side>("BTC");
  const [amount, setAmount] = useState("50000");
  const [quoteKey, setQuoteKey] = useState(0);

  const validAmount = parseFloat(amount) > 0;

  const { data: quote, isLoading, error, refetch } = useQuery({
    queryKey: ["convert-quote", from, to, amount, quoteKey],
    queryFn:  () => api.getConvertQuote(from as Asset | "NGN", to as Asset | "NGN", parseFloat(amount) || 0),
    enabled:  validAmount && from !== to,
    staleTime: 0,
  });

  const swap = () => {
    setFrom(to);
    setTo(from);
    setQuoteKey(k => k + 1);
  };

  const refresh = useCallback(() => setQuoteKey(k => k + 1), []);

  const fmtOutput = (n: number) => {
    if (to === "NGN") return "₦" + Math.round(n).toLocaleString();
    if (to === "BTC")  return n.toFixed(8);
    return n.toFixed(6);
  };

  return (
    <div className={`bg-navy border border-white/10 rounded-2xl p-5 ${className}`} aria-label="Convert calculator">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Convert</h3>
        <MockLabel />
      </div>

      {/* From */}
      <label className="block text-[11px] text-white/40 mb-1">From</label>
      <div className="flex gap-2 mb-3">
        <select
          value={from}
          onChange={e => { setFrom(e.target.value as Side); setQuoteKey(k => k+1); }}
          className="bg-navy-mid border border-white/10 text-white text-sm rounded-lg px-3 py-2.5 flex-1 focus:outline-none focus:border-green-brand/50"
          aria-label="Convert from"
        >
          {ASSETS.filter(a => a !== to).map(a => (
            <option key={a} value={a}>{label(a)}</option>
          ))}
        </select>
        <input
          type="number"
          min="0"
          value={amount}
          onChange={e => { setAmount(e.target.value); setQuoteKey(k => k+1); }}
          className="bg-navy-mid border border-white/10 text-white text-sm rounded-lg px-3 py-2.5 w-32 tabular-nums focus:outline-none focus:border-green-brand/50"
          aria-label="Amount to convert"
        />
      </div>

      {/* Swap */}
      <div className="flex justify-center mb-3">
        <button
          onClick={swap}
          className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-green-brand/10 hover:border-green-brand/30 transition-colors"
          aria-label="Swap direction"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 2v10M4 9l3 3 3-3M4 5l3-3 3 3" stroke="#00D285" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* To */}
      <label className="block text-[11px] text-white/40 mb-1">To</label>
      <div className="flex gap-2 mb-4">
        <select
          value={to}
          onChange={e => { setTo(e.target.value as Side); setQuoteKey(k => k+1); }}
          className="bg-navy-mid border border-white/10 text-white text-sm rounded-lg px-3 py-2.5 flex-1 focus:outline-none focus:border-green-brand/50"
          aria-label="Convert to"
        >
          {ASSETS.filter(a => a !== from).map(a => (
            <option key={a} value={a}>{label(a)}</option>
          ))}
        </select>
        <div className="bg-navy-mid border border-white/10 rounded-lg px-3 py-2.5 w-32 tabular-nums text-sm">
          {isLoading && <Skeleton className="h-4 w-20" />}
          {!isLoading && quote && (
            <span className="text-green-brand font-semibold">
              {fmtOutput(quote.outputAmount)}
            </span>
          )}
          {!isLoading && !quote && !error && (
            <span className="text-white/20">—</span>
          )}
        </div>
      </div>

      {/* Quote details */}
      {error && <ErrorState message="Couldn't fetch quote" onRetry={() => refetch()} />}

      {quote && !error && (
        <>
          <div className="bg-white/3 rounded-xl px-4 py-3 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-white/40">Rate</span>
              <span className="text-white/70 tabular-nums">
                1 {from} = {to === "NGN" ? "₦" + quote.rate.toLocaleString() : quote.rate.toFixed(8) + " " + to}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Fee</span>
              <span className="text-white/70 tabular-nums">₦{quote.feeNGN.toLocaleString()}</span>
            </div>
          </div>
          <CountdownBar expiresAt={quote.expiresAt} onExpire={refresh} />
        </>
      )}

      <a
        href="https://app.creohold.com/auth/signup"
        className="mt-4 w-full flex items-center justify-center gap-2 bg-green-brand hover:bg-green-muted text-navy font-semibold py-3 rounded-lg transition-colors text-sm"
      >
        Do this for real — create your wallet
      </a>
    </div>
  );
}
