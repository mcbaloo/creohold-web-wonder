const ITEMS = [
  { label: "iOS app",                 desc: "Native iPhone wallet app"                       },
  { label: "Android app",             desc: "Native Android wallet app"                      },
  { label: "Business accounts",       desc: "Multi-user accounts for teams and businesses"   },
  { label: "Virtual cards",           desc: "Spend naira and crypto online"                  },
  { label: "Merchant payment APIs",   desc: "Accept wallet payments on your platform"        },
  { label: "More African markets",    desc: "Expanding beyond Nigeria"                       },
];

export default function RoadmapSection() {
  return (
    <section className="bg-grey-light py-16 md:py-24" aria-label="Product roadmap">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        <div className="mb-10 md:mb-12">
          <p className="text-xs font-semibold text-green-brand uppercase tracking-widest mb-3">
            On the roadmap
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy leading-tight tracking-tight">
            Coming soon
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ITEMS.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-3 bg-white border border-grey-mid rounded-xl px-4 py-4"
            >
              <div className="mt-1 w-2 h-2 rounded-full bg-green-brand shrink-0" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-navy">{item.label}</p>
                <p className="text-xs text-grey-text mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
