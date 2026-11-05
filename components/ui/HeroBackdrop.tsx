/**
 * Reusable layered background for hero sections.
 * Technique from ShiftMarkets: radial-gradient ellipse glow anchored behind
 * the right-side mockup, over a dark linear base.
 */
import { CSSProperties } from "react";

type Variant = "home" | "feature" | "business" | "dark";

const VARIANTS: Record<Variant, CSSProperties["background"]> = {
  home: `
    radial-gradient(ellipse 70% 60% at 75% 20%, rgba(0,210,133,0.18), rgba(0,163,104,0.06) 40%, rgba(5,35,56,0) 70%),
    linear-gradient(180deg, #031B2C 0%, #052338 100%)
  `,
  feature: `
    radial-gradient(ellipse 55% 50% at 80% 25%, rgba(0,210,133,0.14), rgba(5,35,56,0) 65%),
    linear-gradient(165deg, #0D3350 0%, #052338 100%)
  `,
  business: `
    radial-gradient(ellipse 60% 55% at 70% 30%, rgba(0,210,133,0.10), rgba(10,10,10,0) 60%),
    linear-gradient(170deg, #111111 0%, #0a0a0a 100%)
  `,
  dark: `linear-gradient(165deg, #0D3350 0%, #052338 100%)`,
};

interface Props {
  variant?: Variant;
  className?: string;
  children?: React.ReactNode;
}

export default function HeroBackdrop({ variant = "home", className = "", children }: Props) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: VARIANTS[variant] }}
    >
      {children}
    </div>
  );
}
