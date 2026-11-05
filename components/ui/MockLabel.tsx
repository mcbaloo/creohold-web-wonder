import { isMockMode } from "@/lib/api";

export default function MockLabel() {
  if (!isMockMode) return null;
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-white/30 border border-white/10 rounded px-1.5 py-0.5 select-none">
      Illustrative rates
    </span>
  );
}
