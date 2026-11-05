"use client";
import { useState, useEffect } from "react";

const STEPS = [
  {
    key: "submitted",
    label: "Submitted",
    desc: "Your ID document and selfie are received.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 8h6M7 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: "review",
    label: "In review",
    desc: "We check your identity against Nigerian regulations.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: "verified",
    label: "Verified",
    desc: "Your wallet is active and ready to use.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6.5 10L8.5 12L13.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function VerificationStepper() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced) { setActive(2); return; }

    // Animate progress bar then advance step
    setProgress(0);
    const startTime = Date.now();
    const duration = 1800;

    const raf = requestAnimationFrame(function tick() {
      const elapsed = Date.now() - startTime;
      const p = Math.min(100, (elapsed / duration) * 100);
      setProgress(p);
      if (p < 100) {
        requestAnimationFrame(tick);
      } else {
        const timer = setTimeout(() => {
          setActive((a) => {
            const next = (a + 1) % STEPS.length;
            return next;
          });
        }, 400);
        return () => clearTimeout(timer);
      }
    });

    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reduced]);

  return (
    <section
      id="verify"
      className="bg-navy py-16 md:py-24"
      aria-label="Verification process"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Copy */}
          <div>
            <p className="text-xs font-semibold text-green-brand uppercase tracking-widest mb-3">
              Identity verification
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight tracking-tight mb-4">
              Your wallet is active once your identity is confirmed.
            </h2>
            <p className="text-white/60 leading-relaxed">
              Nigerian regulations require identity checks before a wallet can send or receive funds. The process takes under a minute and is required only once.
            </p>
          </div>

          {/* Stepper */}
          <div
            role="list"
            aria-label="Verification steps"
          >
            {STEPS.map((step, i) => {
              const isDone = i < active;
              const isCurrent = i === active;
              return (
                <div key={step.key} role="listitem" aria-current={isCurrent ? "step" : undefined}>
                  <div className="flex gap-4 items-start">
                    {/* Icon circle */}
                    <div
                      className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${
                        isDone
                          ? "bg-green-brand border-green-brand text-navy"
                          : isCurrent
                          ? "bg-transparent border-green-brand text-green-brand"
                          : "bg-transparent border-white/20 text-white/30"
                      }`}
                    >
                      {isDone ? (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M3.5 8L6.5 11L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        step.icon
                      )}
                    </div>

                    <div className="flex-1 pb-8">
                      <p
                        className={`font-semibold mb-1 transition-colors duration-300 ${
                          isDone || isCurrent ? "text-white" : "text-white/40"
                        }`}
                      >
                        {step.label}
                      </p>
                      <p
                        className={`text-sm transition-colors duration-300 ${
                          isDone || isCurrent ? "text-white/60" : "text-white/25"
                        }`}
                      >
                        {step.desc}
                      </p>

                      {/* Progress bar between steps */}
                      {i < STEPS.length - 1 && (
                        <div className="mt-4 h-0.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-brand rounded-full transition-none"
                            style={{
                              width: isDone
                                ? "100%"
                                : isCurrent && !reduced
                                ? `${progress}%`
                                : "0%",
                              transition: isDone ? "none" : undefined,
                            }}
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
