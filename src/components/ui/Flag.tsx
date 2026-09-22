import { cn } from "@/lib/cn";

/**
 * The three tax jurisdictions, drawn as inline SVG.
 *
 * Emoji flags render as letter pairs on Windows and image files would be four
 * extra requests for something 20px wide, so these are hand-built at 3:2.
 * Simplified for the size they are shown at — the Union Jack drops its
 * counterchange, the US canton uses a star grid.
 */

const STAR = "M0 -1 L0.225 -0.31 L0.951 -0.309 L0.364 0.118 L0.588 0.809 " +
  "L0 0.382 L-0.588 0.809 L-0.364 0.118 L-0.951 -0.309 L-0.225 -0.31 Z";

function Pakistan() {
  return (
    <>
      <rect width="24" height="16" fill="#01411C" />
      <rect width="6" height="16" fill="#fff" />
      <path
        d="M16.9 8a4.1 4.1 0 1 1-4.53-4.08 3.5 3.5 0 1 0 4.2 5.2A4.1 4.1 0 0 0 16.9 8Z"
        fill="#fff"
      />
      <g transform="translate(16.15 5.6) rotate(18) scale(1.5)" fill="#fff">
        <path d={STAR} />
      </g>
    </>
  );
}

function UnitedKingdom() {
  return (
    <>
      <rect width="24" height="16" fill="#012169" />
      <g stroke="#fff" strokeWidth="3.2">
        <path d="M0 0 24 16M24 0 0 16" />
      </g>
      <g stroke="#C8102E" strokeWidth="1.5">
        <path d="M0 0 24 16M24 0 0 16" />
      </g>
      <path d="M12 0v16M0 8h24" stroke="#fff" strokeWidth="5.3" />
      <path d="M12 0v16M0 8h24" stroke="#C8102E" strokeWidth="3.2" />
    </>
  );
}

function UnitedStates() {
  const stripes = Array.from({ length: 13 }, (_, i) => i);
  return (
    <>
      <rect width="24" height="16" fill="#fff" />
      {stripes.map((i) =>
        i % 2 === 0 ? (
          <rect key={i} y={(i * 16) / 13} width="24" height={16 / 13} fill="#B31942" />
        ) : null,
      )}
      <rect width="10" height={(16 * 7) / 13} fill="#3C3B6E" />
      <g fill="#fff">
        {Array.from({ length: 4 }, (_, r) =>
          Array.from({ length: 5 }, (_, c) => (
            <circle key={`${r}-${c}`} cx={1.3 + c * 1.9} cy={1.3 + r * 2.1} r="0.52" />
          )),
        )}
      </g>
    </>
  );
}

const flags = {
  pk: { node: <Pakistan />, label: "Flag of Pakistan" },
  uk: { node: <UnitedKingdom />, label: "Flag of the United Kingdom" },
  us: { node: <UnitedStates />, label: "Flag of the United States" },
} as const;

export type FlagCode = keyof typeof flags;

export function Flag({ code, className }: { code: FlagCode; className?: string }) {
  const flag = flags[code];
  return (
    <svg
      viewBox="0 0 24 16"
      role="img"
      aria-label={flag.label}
      className={cn("h-3.5 w-auto shrink-0 rounded-[1.5px] ring-1 ring-inset ring-ink/15", className)}
    >
      {flag.node}
    </svg>
  );
}
