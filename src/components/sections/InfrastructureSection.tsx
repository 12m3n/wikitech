import { Activity, Server, ShieldCheck, Factory, Cloud, Cpu } from "lucide-react";
import { SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";

const modules = [
  {
    name: "SolarWinds NPM",
    role: "Network Performance Monitor",
    detail:
      "Topology discovery, interface and path monitoring, and fault isolation across routed and switched estates.",
    icon: Activity,
  },
  {
    name: "SolarWinds SAM",
    role: "Server & Application Monitor",
    detail:
      "Component-level health for servers, databases and the applications that sit on them, including the ERP tier.",
    icon: Server,
  },
  {
    name: "Industrial networks",
    role: "Large-site design",
    detail:
      "Segmented, resilient network design for plants and multi-site industrial operations.",
    icon: Factory,
  },
  {
    name: "OT/IT convergence",
    role: "Boundary engineering",
    detail:
      "A controlled boundary between plant systems and corporate IT, monitored from both sides.",
    icon: ShieldCheck,
  },
];

/** Mobile-first stacked view of the same architecture the SVG shows on desktop. */
const stackedLayers = [
  { label: "Operational technology", items: ["PLC / RTU", "SCADA / HMI", "Industrial switching"], icon: Factory },
  { label: "Secured boundary", items: ["Segmentation", "Controlled data path"], icon: ShieldCheck },
  { label: "Corporate IT", items: ["Servers & virtualisation", "ERP application tier", "Cloud services"], icon: Cloud },
  { label: "Monitoring plane", items: ["SolarWinds NPM", "SolarWinds SAM", "Alerting & escalation"], icon: Cpu },
];

export function InfrastructureSection() {
  return (
    <section
      id="infrastructure"
      className="section relative scroll-mt-24 overflow-hidden bg-brand-950 text-white"
    >
      <SectionBackdrop image="bg/infrastructure" dim={0.5} />
      <div aria-hidden className="grid-field absolute inset-0 opacity-45" />
      <div className="shell relative">
        <SectionHeader
          tone="dark"
          eyebrow="02 — IT Infrastructure & SolarWinds"
          title="Visibility that reaches the plant floor."
          lead="Corporate IT and operational technology usually get monitored by different teams with different tools, which is exactly why cross-boundary faults take so long to diagnose. We instrument both sides and route alerts to whoever actually owns the segment."
        />

        {/* ---------- Desktop: architecture diagram ---------- */}
        <Reveal delay={80} className="mt-12 hidden md:block">
          <figure className="rounded-xl border border-white/12 bg-brand-950/80 p-6 shadow-lg backdrop-blur-md lg:p-8">
            <figcaption className="sr-only">
              Architecture diagram: operational technology and corporate IT separated by a secured
              boundary, with a SolarWinds monitoring plane observing both.
            </figcaption>
            <svg
              viewBox="0 0 900 400"
              className="h-auto w-full"
              role="img"
              aria-label="Operational technology on the left and corporate IT on the right, divided by a secured boundary, both observed by a SolarWinds monitoring plane below."
            >
              <defs>
                <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0 0 L6 3 L0 6 z" fill="rgb(147 174 234 / 0.8)" />
                </marker>
              </defs>

              {/* Zone plates */}
              <g>
                <rect x="16" y="16" width="380" height="196" rx="10" fill="rgb(255 255 255 / 0.05)" stroke="rgb(255 255 255 / 0.14)" />
                <text x="36" y="44" fill="rgb(147 174 234)" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="1.4">
                  OPERATIONAL TECHNOLOGY
                </text>
                <rect x="504" y="16" width="380" height="196" rx="10" fill="rgb(255 255 255 / 0.05)" stroke="rgb(255 255 255 / 0.14)" />
                <text x="524" y="44" fill="rgb(147 174 234)" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="1.4">
                  CORPORATE IT
                </text>
              </g>

              {/* Boundary */}
              <g>
                <rect x="412" y="16" width="76" height="196" rx="8" fill="rgb(13 140 155 / 0.12)" stroke="rgb(13 140 155 / 0.45)" />
                <text x="450" y="106" textAnchor="middle" fill="rgb(125 214 224)" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="1">
                  SECURED
                </text>
                <text x="450" y="124" textAnchor="middle" fill="rgb(125 214 224)" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="1">
                  BOUNDARY
                </text>
              </g>

              {/* OT nodes */}
              {[
                ["PLC / RTU", 44],
                ["SCADA / HMI", 156],
                ["Industrial switching", 268],
              ].map(([label, x], i) => (
                <g key={i as number}>
                  <rect x={x as number} y="72" width="108" height="56" rx="7" fill="rgb(8 24 71)" stroke="rgb(255 255 255 / 0.16)" />
                  <text
                    x={(x as number) + 54}
                    y="105"
                    textAnchor="middle"
                    fill="rgb(232 238 252)"
                    fontFamily="var(--font-sans)"
                    fontSize="12.5"
                  >
                    {label}
                  </text>
                </g>
              ))}
              <path d="M152 100 h4 M264 100 h4" stroke="rgb(147 174 234 / 0.5)" strokeWidth="1.5" />
              <path d="M152 100 H156 M264 100 H268" stroke="rgb(147 174 234 / 0.5)" strokeWidth="1.5" />
              <path d="M376 100 H412" stroke="rgb(147 174 234 / 0.55)" strokeWidth="1.5" markerEnd="url(#arrow)" />

              {/* IT nodes */}
              {[
                ["Servers", 532],
                ["ERP application tier", 644],
                ["Cloud services", 756],
              ].map(([label, x], i) => (
                <g key={`it-${i}`}>
                  <rect x={x as number} y="72" width="108" height="56" rx="7" fill="rgb(8 24 71)" stroke="rgb(255 255 255 / 0.16)" />
                  <text
                    x={(x as number) + 54}
                    y={label === "ERP application tier" ? 97 : 105}
                    textAnchor="middle"
                    fill="rgb(232 238 252)"
                    fontFamily="var(--font-sans)"
                    fontSize="12.5"
                  >
                    {label === "ERP application tier" ? "ERP application" : label}
                  </text>
                  {label === "ERP application tier" && (
                    <text x={(x as number) + 54} y="114" textAnchor="middle" fill="rgb(232 238 252)" fontFamily="var(--font-sans)" fontSize="12.5">
                      tier
                    </text>
                  )}
                </g>
              ))}
              <path d="M488 100 H532" stroke="rgb(147 174 234 / 0.55)" strokeWidth="1.5" markerEnd="url(#arrow)" />

              {/* Monitoring plane */}
              <rect x="16" y="268" width="868" height="112" rx="10" fill="rgb(18 51 138 / 0.75)" stroke="rgb(147 174 234 / 0.35)" />
              <text x="40" y="300" fill="rgb(147 174 234)" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="1.4">
                MONITORING PLANE
              </text>
              {[
                ["SolarWinds NPM", 40],
                ["SolarWinds SAM", 250],
                ["Alerting & escalation", 460],
                ["Capacity reporting", 680],
              ].map(([label, x], i) => (
                <text
                  key={`m-${i}`}
                  x={x as number}
                  y="348"
                  fill="rgb(232 238 252)"
                  fontFamily="var(--font-sans)"
                  fontSize="13.5"
                >
                  {label}
                </text>
              ))}

              {/* Telemetry lines: monitoring observes every zone */}
              <g
                stroke="rgb(13 140 155 / 0.7)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                className="motion-safe:[animation:var(--animate-dash)]"
                fill="none"
              >
                <path d="M98 128 V268" />
                <path d="M210 128 V268" />
                <path d="M322 128 V268" />
                <path d="M450 212 V268" />
                <path d="M586 128 V268" />
                <path d="M698 128 V268" />
                <path d="M810 128 V268" />
              </g>
            </svg>
          </figure>
        </Reveal>

        {/* ---------- Mobile: stacked layers ---------- */}
        <div className="mt-10 space-y-3 md:hidden">
          {stackedLayers.map((layer, i) => (
            <Reveal key={layer.label} delay={i * 50}>
              <div className="rounded-lg border border-white/12 bg-brand-950/80 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2.5">
                  <layer.icon className="h-4 w-4 shrink-0 text-accent-500" aria-hidden />
                  <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-brand-200">
                    {layer.label}
                  </h3>
                </div>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {layer.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-sm border border-white/10 bg-brand-900 px-2 py-1 text-[0.75rem] text-brand-100/85"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Modules */}
        <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-white/12 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((m, i) => (
            <Reveal as="li" key={m.name} delay={i * 60} className="bg-brand-950 p-6">
              <m.icon className="h-5 w-5 text-brand-300" aria-hidden />
              <h3 className="mt-4 text-[1rem] font-semibold text-white">{m.name}</h3>
              <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-brand-300/80">
                {m.role}
              </p>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-brand-100/70">{m.detail}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
