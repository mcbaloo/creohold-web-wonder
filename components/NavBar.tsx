"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ComingSoonBadge from "@/components/ui/ComingSoonBadge";

// ── Types ────────────────────────────────────────────────────────
interface NavItem { label: string; href: string; desc?: string; soon?: boolean }
type Dropdown = "features" | "solutions" | "company" | null;

// ── Personal nav ─────────────────────────────────────────────────
const FEATURES_ITEMS: NavItem[] = [
  { label: "Naira wallet",          href: "/naira",   desc: "Fund, hold and withdraw naira" },
  { label: "Send and receive crypto", href: "/crypto",  desc: "BTC, ETH, USDT, USDC" },
  { label: "Convert",               href: "/convert", desc: "Swap naira and crypto" },
  { label: "Bill payments",         href: "/bills",   desc: "Airtime, data, electricity, TV" },
  { label: "Rates",                 href: "/rates",   desc: "Live market rates" },
];

// ── Business nav ─────────────────────────────────────────────────
const SOLUTIONS_ITEMS: NavItem[] = [
  { label: "Business wallet",    href: "/business/solutions#business-wallet",  desc: "Company naira and crypto" },
  { label: "Bulk payouts",       href: "/business/solutions#bulk-payouts",     desc: "Pay many recipients at once",   soon: true },
  { label: "Team and approvals", href: "/business/solutions#approvals",        desc: "Roles and maker/checker flow",  soon: true },
  { label: "Collect payments",   href: "/business/solutions#collect-payments", desc: "Links and crypto addresses",    soon: true },
  { label: "Developer API",      href: "/business/solutions#api",              desc: "REST API and webhooks",         soon: true },
];

const COMPANY_ITEMS: NavItem[] = [
  { label: "About",   href: "/about",   desc: "Our story and mission" },
  { label: "Contact", href: "/contact", desc: "Get in touch" },
];

// ── Shared dropdown shell ─────────────────────────────────────────
function DropPanel({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div
      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-grey-mid rounded-2xl shadow-xl p-4 ${wide ? "w-[520px]" : "w-72"}`}
      style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)" }}
    >
      {children}
    </div>
  );
}

function DropItem({ item, onClick }: { item: NavItem; onClick?: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-grey-light transition-colors group"
    >
      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium text-navy group-hover:text-green-deep transition-colors block">{item.label}</span>
        {item.desc && <span className="text-xs text-grey-text mt-0.5 block">{item.desc}</span>}
      </div>
      {item.soon && <ComingSoonBadge className="mt-0.5 shrink-0" />}
    </Link>
  );
}

export default function NavBar() {
  const pathname = usePathname();
  const isBusinessContext = pathname.startsWith("/business");

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<Dropdown>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileContext, setMobileContext] = useState<"personal" | "business">(isBusinessContext ? "business" : "personal");
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const lastY = useRef(0);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastY.current && y > 80);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
    setMobileContext(pathname.startsWith("/business") ? "business" : "personal");
  }, [pathname]);

  const handleEnter = (d: Dropdown) => {
    clearTimeout(closeTimeout.current);
    setOpenDropdown(d);
  };
  const handleLeave = () => {
    closeTimeout.current = setTimeout(() => setOpenDropdown(null), 180);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("#")[0]);

  // Both landing pages use light nav text over their dark hero and dark text
  // over the white header once scrolled.
  const navItemColor = scrolled
    ? "text-grey-text hover:text-navy"
    : "text-white/70 hover:text-white";

  const headerClass = scrolled
    ? "bg-white/95 backdrop-blur-md border-b border-grey-mid shadow-sm"
    : "bg-transparent";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClass} ${hidden ? "-translate-y-full" : "translate-y-0"}`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between gap-4">

          {/* Left: logo + context tabs */}
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/" className="flex items-center gap-2.5" aria-label="CreoHold home">
              <Image src="/brand/creohold-emblem.svg" alt="" width={28} height={28} aria-hidden="true" />
              <span className={`font-bold text-sm tracking-widest uppercase ${!scrolled ? "text-white" : "text-navy"}`}>
                Creohold
              </span>
            </Link>
          </div>

          {/* Desktop nav — changes with context */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center" aria-label="Main navigation">
            {/* Context tabs */}
            <div
              className="hidden lg:flex items-center p-0.5"
            >
              <Link
                href="/"
                className={`px-3.5 py-1.5 font-semibold rounded-full transition-all duration-200 ${
                  !isBusinessContext
                    ?  "text-navy bg-white text-xs"
                    : `${navItemColor} text-sm`
                }`}
              >
                Personal
              </Link>
              <Link
                href="/business"
                className={`px-3.5 py-1.5 font-semibold rounded-full transition-all duration-200 ${
                  isBusinessContext
                    ? "bg-green-brand text-[#0a0a0a] text-xs"
                    : `${navItemColor} text-sm`
                }`}
              >
                Business
              </Link>
            </div>

            {isBusinessContext ? (
              <>
                {/* Solutions dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => handleEnter("solutions")}
                  onMouseLeave={handleLeave}
                >
                  <button
                    className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-1 ${navItemColor} transition-colors`}
                    aria-expanded={openDropdown === "solutions"}
                    aria-haspopup="true"
                  >
                    Solutions
                    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"
                      className={`transition-transform duration-200 ${openDropdown === "solutions" ? "rotate-180" : ""}`}>
                      <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {openDropdown === "solutions" && (
                    <DropPanel wide>
                      <div onMouseEnter={() => handleEnter("solutions")} onMouseLeave={handleLeave}>
                        {SOLUTIONS_ITEMS.map(item => <DropItem key={item.href} item={item} />)}
                      </div>
                    </DropPanel>
                  )}
                </div>

                <Link href="/security"
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive("/security") ? (scrolled ? "text-navy" : "text-white") : navItemColor}`}>
                  Security
                </Link>

                {/* Company dropdown */}
                <div className="relative" onMouseEnter={() => handleEnter("company")} onMouseLeave={handleLeave}>
                  <button className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-1 ${navItemColor} transition-colors`}
                    aria-expanded={openDropdown === "company"} aria-haspopup="true">
                    Company
                    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"
                      className={`transition-transform duration-200 ${openDropdown === "company" ? "rotate-180" : ""}`}>
                      <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {openDropdown === "company" && (
                    <DropPanel>
                      <div onMouseEnter={() => handleEnter("company")} onMouseLeave={handleLeave}>
                        {COMPANY_ITEMS.map(item => <DropItem key={item.href} item={item} />)}
                      </div>
                    </DropPanel>
                  )}
                </div>

                <Link href="/help" className={`px-3 py-2 text-sm font-medium rounded-lg ${navItemColor} transition-colors`}>Help</Link>

                <Link href="/business#book-demo"
                  className="px-3 py-2 text-sm font-medium rounded-lg text-green-brand hover:text-green-muted transition-colors">
                  Book a demo
                </Link>
              </>
            ) : (
              <>
                {/* Features dropdown */}
                <div className="relative" onMouseEnter={() => handleEnter("features")} onMouseLeave={handleLeave}>
                  <button
                    className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-1 transition-colors ${
                      ["/naira","/crypto","/convert","/bills","/rates"].some(p => pathname.startsWith(p))
                        ? (scrolled ? "text-navy" : "text-white") : navItemColor
                    }`}
                    aria-expanded={openDropdown === "features"} aria-haspopup="true"
                  >
                    Features
                    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"
                      className={`transition-transform duration-200 ${openDropdown === "features" ? "rotate-180" : ""}`}>
                      <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {openDropdown === "features" && (
                    <DropPanel wide>
                      <div onMouseEnter={() => handleEnter("features")} onMouseLeave={handleLeave}>
                        {FEATURES_ITEMS.map(item => <DropItem key={item.href} item={item} />)}
                      </div>
                    </DropPanel>
                  )}
                </div>

                <Link href="/security"
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive("/security") ? (scrolled ? "text-navy" : "text-white") : navItemColor}`}>
                  Security
                </Link>

                {/* Company dropdown */}
                <div className="relative" onMouseEnter={() => handleEnter("company")} onMouseLeave={handleLeave}>
                  <button className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-1 ${navItemColor} transition-colors`}
                    aria-expanded={openDropdown === "company"} aria-haspopup="true">
                    Company
                    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"
                      className={`transition-transform duration-200 ${openDropdown === "company" ? "rotate-180" : ""}`}>
                      <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {openDropdown === "company" && (
                    <DropPanel>
                      <div onMouseEnter={() => handleEnter("company")} onMouseLeave={handleLeave}>
                        {COMPANY_ITEMS.map(item => <DropItem key={item.href} item={item} />)}
                      </div>
                    </DropPanel>
                  )}
                </div>

                <Link href="/help" className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive("/help") ? (scrolled ? "text-navy" : "text-white") : navItemColor}`}>
                  Help
                </Link>
              </>
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href="https://app.creohold.com/auth/signin"
              className={`text-sm font-medium transition-colors ${scrolled ? "text-grey-text hover:text-navy" : "text-white/60 hover:text-white"}`}
            >
              Sign in
            </a>
            <a
              href="https://app.creohold.com/auth/signup"
              className="bg-green-brand hover:bg-green-muted text-navy font-semibold px-4 py-2 rounded-lg transition-all duration-200 text-sm shadow-sm hover:shadow-[0_2px_12px_rgba(0,210,133,0.4)]"
            >
              {isBusinessContext ? "Open a business account" : "Get started"}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span className={`block w-5 h-0.5 transition-all duration-200 ${scrolled ? "bg-navy" : "bg-white"} ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 transition-all duration-200 ${scrolled ? "bg-navy" : "bg-white"} ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 transition-all duration-200 ${scrolled ? "bg-navy" : "bg-white"} ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white overflow-y-auto pt-16" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <nav className="max-w-7xl mx-auto px-5 py-6 space-y-2">

            {/* Context toggle */}
            <div className="flex gap-2 p-1 bg-grey-light rounded-xl mb-4">
              {(["personal", "business"] as const).map(ctx => (
                <button
                  key={ctx}
                  onClick={() => { setMobileContext(ctx); setMobileGroup(null); }}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 capitalize ${
                    mobileContext === ctx ? "bg-white text-navy shadow-sm" : "text-grey-text"
                  }`}
                >
                  {ctx}
                </button>
              ))}
            </div>

            {/* Nav groups */}
            {mobileContext === "personal" ? (
              <>
                <MobileGroup label="Features" id="features" open={mobileGroup === "features"} onToggle={() => setMobileGroup(g => g === "features" ? null : "features")}>
                  {FEATURES_ITEMS.map(l => (
                    <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-grey-text hover:text-navy transition-colors">
                      {l.label}
                    </Link>
                  ))}
                </MobileGroup>
                {[{ label: "Security", href: "/security" }, { label: "Help", href: "/help" }].map(l => (
                  <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-semibold text-navy border-b border-grey-mid">
                    {l.label}
                  </Link>
                ))}
                <MobileGroup label="Company" id="company" open={mobileGroup === "company"} onToggle={() => setMobileGroup(g => g === "company" ? null : "company")}>
                  {COMPANY_ITEMS.map(l => (
                    <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-grey-text hover:text-navy transition-colors">
                      {l.label}
                    </Link>
                  ))}
                </MobileGroup>
              </>
            ) : (
              <>
                <MobileGroup label="Solutions" id="solutions" open={mobileGroup === "solutions"} onToggle={() => setMobileGroup(g => g === "solutions" ? null : "solutions")}>
                  {SOLUTIONS_ITEMS.map(l => (
                    <div key={l.href} className="flex items-center gap-2">
                      <Link href={l.href} onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-grey-text hover:text-navy transition-colors flex-1">
                        {l.label}
                      </Link>
                      {l.soon && <ComingSoonBadge />}
                    </div>
                  ))}
                </MobileGroup>
                {[{ label: "Security", href: "/security" }, { label: "Help", href: "/help" }].map(l => (
                  <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-semibold text-navy border-b border-grey-mid">
                    {l.label}
                  </Link>
                ))}
                <Link href="/business#book-demo" onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-semibold text-green-deep border-b border-grey-mid">
                  Book a demo
                </Link>
                <MobileGroup label="Company" id="company-biz" open={mobileGroup === "company-biz"} onToggle={() => setMobileGroup(g => g === "company-biz" ? null : "company-biz")}>
                  {COMPANY_ITEMS.map(l => (
                    <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-grey-text hover:text-navy transition-colors">
                      {l.label}
                    </Link>
                  ))}
                </MobileGroup>
              </>
            )}

            <div className="pt-4 flex flex-col gap-3">
              <a href="https://app.creohold.com/auth/signin"
                className="text-center py-3 border border-grey-mid rounded-lg text-sm font-medium text-navy">
                Sign in
              </a>
              <a href="https://app.creohold.com/auth/signup"
                className="text-center py-3 bg-green-brand text-navy font-semibold rounded-lg text-sm">
                {mobileContext === "business" ? "Open a business account" : "Get started"}
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

function MobileGroup({ label, id, open, onToggle, children }: {
  label: string; id: string; open: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className="border-b border-grey-mid pb-2">
      <button
        className="w-full flex justify-between items-center py-3 text-sm font-semibold text-navy"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
      >
        {label}
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"
          className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div id={id} className="pl-3 pb-2 space-y-0.5">
          {children}
        </div>
      )}
    </div>
  );
}
