export default function CTABand() {
  return (
    <section className="bg-navy py-16 md:py-24" aria-label="Get started">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
        <p className="text-xs font-semibold text-green-brand uppercase tracking-widest mb-4">
          Get started today
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-5">
          Open your wallet in<br className="hidden sm:block" /> under two minutes.
        </h2>
        <p className="text-white/60 max-w-md mx-auto mb-10 leading-relaxed">
          Available now in Nigeria. Hold naira, send crypto, pay bills — from one place.
        </p>
        <a
          href="https://app.creohold.com/auth/signin"
          className="inline-flex items-center gap-2 bg-green-brand hover:bg-green-muted text-navy font-semibold px-8 py-3.5 rounded-lg transition-colors text-sm"
        >
          Create your wallet
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
