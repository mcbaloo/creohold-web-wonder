"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ComingSoonBadge from "@/components/ui/ComingSoonBadge";
import { features } from "@/lib/features";

const COLS = [
  {
    heading: "Products",
    links: [
      { label: "Personal",          href: "/"                    },
      { label: "Business",          href: "/business"            },
      { label: "Naira wallet",      href: "/naira"               },
      { label: "Crypto",            href: "/crypto"              },
      { label: "Convert",           href: "/convert"             },
      { label: "Bills",             href: "/bills"               },
      { label: "Bulk payouts",      href: "/business/solutions#bulk-payouts",     soon: true  },
      { label: "Collect payments",  href: "/business/solutions#collect-payments", soon: true  },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About",   href: "/about"   },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Help",     href: "/help"     },
      { label: "Security", href: "/security" },
      { label: "Rates",    href: "/rates"    },
    ],
  },
  {
    heading: "Developers",
    links: [
      { label: "API documentation", href: "/business/solutions#api", soon: true },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy policy",   href: "/legal/privacy" },
      { label: "Terms of service", href: "/legal/terms"   },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();
  const isBusiness = pathname.startsWith("/business");
  const footerBg = isBusiness ? "#0a0a0a" : "#052338";
  const textColor = "text-white";
  const textHoverColor = "text-green-brand";

  return (
    <footer
      className="border-t border-white/8"
      style={{ background: footerBg }}
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-4 pt-14 pb-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-7 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <Image src="/brand/creohold-emblem.svg" alt="" width={28} height={28} aria-hidden="true" />
              <span className="font-bold text-sm tracking-widest uppercase text-white">Creohold</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-5 max-w-xs">
              Hold value, move freely.
            </p>
            <address className="not-italic text-sm text-white leading-relaxed">
              7, Riliwan Lawal Street<br />
              Lagos, Nigeria<br />
              <a href="tel:+2347033761997" className="hover:text-white transition-colors">07033761997</a><br />
              <a href="mailto:info@creohold.com" className="hover:text-green-brand transition-colors">info@creohold.com</a>
            </address>
            <div className="flex gap-3 mt-5">
              {["Twitter / X", "LinkedIn", "Instagram"].map(s => (
                <span key={s} className="text-[10px] text-white border border-white/40 px-2 py-1 rounded">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {COLS.map(col => (
            <nav key={col.heading} aria-label={col.heading}>
              <p className="text-[10px] font-semibold text-green-brand uppercase tracking-widest mb-4">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map(link => {
                  const isSoon = "soon" in link && link.soon;
                  return (
                    <li key={link.label} className="flex items-center gap-2">
                      <Link
                        href={link.href}
                        className={`text-sm ${textColor} hover:${textHoverColor} transition-colors`}
                      >
                        {link.label}
                      </Link>
                      {isSoon && <ComingSoonBadge />}
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-t border-white/8 pt-6 flex flex-wrap gap-4 justify-between items-center">
          <p className="text-xs text-white/25">
            &copy; 2026 CreoHold. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            Operated under [REGULATOR NAME] licence no. [LICENCE NUMBER]
          </p>
        </div>
      </div>
    </footer>
  );
}
