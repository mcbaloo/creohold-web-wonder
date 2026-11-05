import Link from "next/link";

interface Crumb { label: string; href?: string }

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-5 lg:px-8 py-4">
      <ol className="flex items-center gap-2 text-xs text-white/40" role="list">
        {crumbs.map((c, i) => (
          <li key={c.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {c.href && i < crumbs.length - 1 ? (
              <Link href={c.href} className="hover:text-white/70 transition-colors">{c.label}</Link>
            ) : (
              <span className={i === crumbs.length - 1 ? "text-white/60" : ""}>{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
