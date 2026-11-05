"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Asset, Network } from "@/lib/api";
import MockLabel from "@/components/ui/MockLabel";
import Skeleton from "@/components/ui/Skeleton";
import ErrorState from "@/components/ui/ErrorState";

type Step = "compose" | "review" | "success";

const ASSET_NETWORKS: Record<Asset, { network: Network; label: string }[]> = {
  BTC:  [{ network: "bitcoin",    label: "Bitcoin network" }],
  ETH:  [{ network: "erc20",      label: "ERC-20" }],
  USDT: [{ network: "erc20",      label: "ERC-20 (Ethereum)" }, { network: "trc20", label: "TRC-20 (Tron)" }],
  USDC: [{ network: "erc20-usdc", label: "ERC-20" }],
};

const SAMPLE_ADDRESSES: Record<Network, string> = {
  bitcoin:      "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
  erc20:        "0x742d35Cc6634C0532925a3b8D40c0a7ED421e3f7",
  "erc20-usdc": "0x742d35Cc6634C0532925a3b8D40c0a7ED421e3f7",
  trc20:        "TKzxdSv2FZKQrEqkKVgp5DcwEXBEKMg2Ax",
};

export default function SendCryptoDemo({ className = "" }: { className?: string }) {
  const [step, setStep] = useState<Step>("compose");
  const [asset, setAsset] = useState<Asset>("BTC");
  const [networkIdx, setNetworkIdx] = useState(0);
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("0.001");

  const nets = ASSET_NETWORKS[asset];
  const network = nets[networkIdx].network;

  const { data: validation, isLoading: validating } = useQuery({
    queryKey: ["validate-addr", asset, network, address],
    queryFn:  () => api.validateAddress(asset, network, address),
    enabled:  address.length > 10,
    staleTime: 60_000,
  });

  const { data: fee, isLoading: feeLoading, error: feeError, refetch: refetchFee } = useQuery({
    queryKey: ["fee-quote", asset, network, amount],
    queryFn:  () => api.getFeeQuote(asset, network, parseFloat(amount) || 0),
    enabled:  parseFloat(amount) > 0,
    staleTime: 15_000,
  });

  const handleAssetChange = (a: Asset) => {
    setAsset(a);
    setNetworkIdx(0);
    setAddress("");
  };

  const handleSample = () => {
    setAddress(SAMPLE_ADDRESSES[network]);
  };

  if (step === "success") {
    return (
      <div className={`bg-navy border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center gap-4 ${className}`}>
        <div className="w-14 h-14 rounded-full bg-green-brand/15 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12l5 5 9-9" stroke="#00D285" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <p className="text-white font-semibold mb-1">Transaction submitted</p>
          <p className="text-sm text-white/50">
            {amount} {asset} sent — arriving in ~{fee?.estimatedMinutes ?? 10} min
          </p>
        </div>
        <a
          href="https://app.creohold.com/auth/signup"
          className="w-full mt-2 flex items-center justify-center gap-2 bg-green-brand hover:bg-green-muted text-navy font-semibold py-3 rounded-lg transition-colors text-sm"
        >
          Do this for real — create your wallet
        </a>
        <button onClick={() => setStep("compose")} className="text-xs text-white/30 hover:text-white/60">
          Try again
        </button>
      </div>
    );
  }

  if (step === "review") {
    return (
      <div className={`bg-navy border border-white/10 rounded-2xl p-5 ${className}`}>
        <div className="flex items-center gap-2 mb-4">
          <button onClick={() => setStep("compose")} className="text-white/40 hover:text-white" aria-label="Back">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
          <h3 className="text-sm font-semibold text-white">Review send</h3>
        </div>
        <div className="bg-white/3 rounded-xl px-4 py-4 space-y-3 text-sm mb-4">
          {[
            ["Asset",   `${amount} ${asset}`],
            ["Network", nets[networkIdx].label],
            ["To",      address.slice(0,12) + "…" + address.slice(-6)],
            ["Fee",     fee ? `${fee.feeCrypto} ${asset} (₦${fee.feeNGN.toLocaleString()})` : "—"],
            ["Total",   fee ? `${fee.totalCrypto} ${asset}` : "—"],
            ["Est. arrival", fee ? `~${fee.estimatedMinutes} min` : "—"],
          ].map(([k,v]) => (
            <div key={k} className="flex justify-between">
              <span className="text-white/40">{k}</span>
              <span className="text-white tabular-nums text-right max-w-[60%]">{v}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-white/30 mb-4">
          This is a demonstration. No real funds will be sent.
        </p>
        <button
          onClick={() => setStep("success")}
          className="w-full bg-green-brand hover:bg-green-muted text-navy font-semibold py-3 rounded-lg transition-colors text-sm"
        >
          Confirm send
        </button>
      </div>
    );
  }

  const isAddressValid = validation?.valid === true;
  const isAddressInvalid = validation?.valid === false;

  return (
    <div className={`bg-navy border border-white/10 rounded-2xl p-5 ${className}`} aria-label="Send crypto demo">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Send crypto</h3>
        <MockLabel />
      </div>

      {/* Asset selector */}
      <label className="block text-[11px] text-white/40 mb-1">Asset</label>
      <div className="flex gap-1.5 mb-3 flex-wrap">
        {(["BTC","ETH","USDT","USDC"] as Asset[]).map(a => (
          <button
            key={a}
            onClick={() => handleAssetChange(a)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              asset === a ? "bg-green-brand/15 border-green-brand/40 text-green-brand" : "border-white/10 text-white/50 hover:border-white/20"
            }`}
          >
            {a}
          </button>
        ))}
      </div>

      {/* Network */}
      {nets.length > 1 && (
        <>
          <label className="block text-[11px] text-white/40 mb-1">Network</label>
          <div className="flex gap-1.5 mb-3 flex-wrap">
            {nets.map((n, i) => (
              <button
                key={n.network}
                onClick={() => setNetworkIdx(i)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  networkIdx === i ? "bg-green-brand/15 border-green-brand/40 text-green-brand" : "border-white/10 text-white/50 hover:border-white/20"
                }`}
              >
                {n.label}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Amount */}
      <label className="block text-[11px] text-white/40 mb-1">Amount ({asset})</label>
      <input
        type="number"
        min="0"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        className="w-full bg-navy-mid border border-white/10 text-white text-sm rounded-lg px-3 py-2.5 mb-3 tabular-nums focus:outline-none focus:border-green-brand/50"
        aria-label={`Amount in ${asset}`}
      />

      {/* Fee preview */}
      {feeLoading && <Skeleton className="h-6 w-full mb-3" />}
      {feeError && <ErrorState message="Fee unavailable" onRetry={() => refetchFee()} />}
      {fee && !feeError && (
        <p className="text-xs text-white/40 mb-3">
          Fee: <span className="text-white/70">{fee.feeCrypto} {asset} (₦{fee.feeNGN.toLocaleString()})</span>
          {" · "}Total: <span className="text-white/70">{fee.totalCrypto} {asset}</span>
        </p>
      )}

      {/* Address */}
      <label className="block text-[11px] text-white/40 mb-1">Destination address</label>
      <div className="relative mb-1">
        <input
          type="text"
          value={address}
          onChange={e => { setAddress(e.target.value); }}
          placeholder={`${nets[networkIdx].label} address`}
          className={`w-full bg-navy-mid border text-white text-xs rounded-lg px-3 py-2.5 pr-24 font-mono focus:outline-none transition-colors ${
            isAddressValid   ? "border-green-brand/50" :
            isAddressInvalid ? "border-red-400/50" :
            "border-white/10 focus:border-green-brand/40"
          }`}
          aria-label="Destination address"
          aria-describedby={isAddressInvalid ? "addr-error" : undefined}
        />
        {/* Validation status indicator */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {validating && (
            <span className="text-[10px] text-white/40 animate-pulse">Checking…</span>
          )}
          {isAddressValid && (
            <span className="text-[10px] text-green-brand font-semibold">Address verified ✓</span>
          )}
          {isAddressInvalid && (
            <span className="text-[10px] text-red-400 font-semibold">Invalid</span>
          )}
        </div>
      </div>

      {isAddressInvalid && validation?.reason && (
        <p id="addr-error" className="text-[11px] text-red-400 mb-1">{validation.reason}</p>
      )}

      <button onClick={handleSample} className="text-[10px] text-green-brand/70 hover:text-green-brand mb-4 transition-colors">
        Try a sample address
      </button>

      <button
        onClick={() => setStep("review")}
        disabled={!isAddressValid || !parseFloat(amount)}
        className="w-full bg-green-brand hover:bg-green-muted disabled:opacity-30 disabled:cursor-not-allowed text-navy font-semibold py-3 rounded-lg transition-colors text-sm"
      >
        Review send
      </button>
    </div>
  );
}
