"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { AssetRate } from "@/lib/api";
import MockLabel from "@/components/ui/MockLabel";

function formatNGN(n: number) {
  if (n >= 1_000_000) return `₦${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `₦${(n / 1_000).toFixed(2)}K`;
  return `₦${n.toLocaleString()}`;
}

function Tick({ rate, prev }: { rate: AssetRate; prev?: AssetRate }) {
  const up = rate.direction === "up";
  const dn = rate.direction === "down";
  const changed = prev && prev.priceNGN !== rate.priceNGN;

  return (
    <div
      className={`flex items-center gap-2 px-4 py-1.5 rounded-lg border transition-colors duration-500 ${
        changed && up ? "border-green-brand/40 bg-green-brand/5" :
        changed && dn ? "border-red-400/30 bg-red-500/5" :
        "border-white/8 bg-white/3"
      }`}
      aria-label={`${rate.asset} ${formatNGN(rate.priceNGN)}`}
    >
      <span className="text-xs font-bold text-white/80 w-10">{rate.asset}</span>
      <span className="text-xs font-semibold text-white tabular-nums">
        {formatNGN(rate.priceNGN)}
      </span>
      <span className={`text-[10px] font-semibold ${up ? "text-green-brand" : dn ? "text-red-400" : "text-white/40"}`}>
        {up ? "▲" : dn ? "▼" : "—"} {Math.abs(rate.change24hPct).toFixed(2)}%
      </span>
    </div>
  );
}

export default function RatesTicker({ className = "" }: { className?: string }) {
  const { data, error, refetch } = useQuery({
    queryKey: ["rates"],
    queryFn: () => api.getRates(),
    refetchInterval: 15_000,
  });

  return (
    <div className={`${className}`} aria-label="Live asset rates">
      <div className="flex items-center gap-2 flex-wrap">
        {error && (
          <span className="text-xs text-red-400">
            Rates unavailable —{" "}
            <button className="underline" onClick={() => refetch()}>retry</button>
          </span>
        )}
        {!data && !error && (
          <>
            {[0,1,2,3].map(i => (
              <div key={i} className="h-7 w-32 rounded-lg bg-white/5 animate-pulse" />
            ))}
          </>
        )}
        {data?.map((r) => <Tick key={r.asset} rate={r} />)}
        <MockLabel />
      </div>
    </div>
  );
}
