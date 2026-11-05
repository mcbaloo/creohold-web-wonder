/**
 * Dot-grid or line-grid pattern that fades at edges.
 * From CreoHold signup: radial-gradient dots.
 * "fade" variant masks the grid so it softens near the edges.
 */

type GridVariant = "dots" | "lines" | "dots-faint";

interface Props {
  variant?: GridVariant;
  size?: number;
  className?: string;
  color?: string;
}

export default function GridPattern({
  variant = "dots",
  size = 32,
  className = "",
  color = "rgba(0,210,133,0.07)",
}: Props) {
  const styles: Record<GridVariant, React.CSSProperties> = {
    dots: {
      backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
      backgroundSize: `${size}px ${size}px`,
    },
    "dots-faint": {
      backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
      backgroundSize: `${size}px ${size}px`,
      WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
      maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
    },
    lines: {
      backgroundImage: `
        linear-gradient(${color} 1px, transparent 1px),
        linear-gradient(90deg, ${color} 1px, transparent 1px)
      `,
      backgroundSize: `${size}px ${size}px`,
    },
  };

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={styles[variant]}
    />
  );
}
