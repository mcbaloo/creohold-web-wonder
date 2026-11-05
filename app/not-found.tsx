import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="bg-navy min-h-screen pt-16 flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        {/* Emblem */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-green-brand/15 rounded-full blur-2xl scale-150" aria-hidden="true" />
            <Image src="/brand/creohold-emblem.svg" alt="" width={56} height={56} className="relative" />
          </div>
        </div>

        <p className="text-xs font-semibold text-green-brand uppercase tracking-widest mb-4">404</p>
        <h1 className="text-4xl font-bold text-white mb-4">Page not found</h1>
        <p className="text-white/50 mb-8 leading-relaxed">
          The page you are looking for does not exist. It may have moved, or the link may be incorrect.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/"
            className="bg-green-brand hover:bg-green-muted text-navy font-semibold px-6 py-3 rounded-lg transition-colors text-sm">
            Go home
          </Link>
          <Link href="/help"
            className="border border-white/15 text-white/70 hover:text-white hover:border-white/30 font-medium px-6 py-3 rounded-lg transition-colors text-sm">
            Help
          </Link>
        </div>
      </div>
    </div>
  );
}
