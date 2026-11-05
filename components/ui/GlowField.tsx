/**
 * Floating orb glows — matches Shift's slp-o1/o2 technique.
 * Absolutely-positioned blurred divs that give radial depth.
 */

type GlowPreset = "hero" | "section" | "business";

interface GlowConfig {
  orbs: { className: string; style?: React.CSSProperties }[];
}

const PRESETS: Record<GlowPreset, GlowConfig> = {
  hero: {
    orbs: [
      { className: "top-1/4 right-1/4 w-[600px] h-[400px] bg-green-brand/[0.08] rounded-full blur-[100px]" },
      { className: "top-1/2 right-10 w-[300px] h-[300px] bg-green-muted/[0.06] rounded-full blur-[80px]" },
    ],
  },
  section: {
    orbs: [
      { className: "top-0 left-1/4 w-96 h-96 bg-green-brand/[0.06] rounded-full blur-[80px]" },
      { className: "bottom-0 right-1/4 w-96 h-96 bg-green-deep/[0.06] rounded-full blur-[80px]" },
    ],
  },
  business: {
    orbs: [
      { className: "top-1/4 right-1/3 w-[500px] h-[300px] bg-green-brand/[0.07] rounded-full blur-[100px]" },
      { className: "bottom-1/4 left-1/4 w-72 h-72 bg-green-muted/[0.05] rounded-full blur-[80px]" },
    ],
  },
};

interface Props {
  preset?: GlowPreset;
  className?: string;
}

export default function GlowField({ preset = "section", className = "" }: Props) {
  const { orbs } = PRESETS[preset];
  return (
    <div aria-hidden="true" className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {orbs.map((orb, i) => (
        <div key={i} className={`absolute ${orb.className}`} style={orb.style} />
      ))}
    </div>
  );
}
