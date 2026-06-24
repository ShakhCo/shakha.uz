/**
 * Schematic — Signature architecture diagram component.
 * Represents a multi-tenant platform stack: CLIENT / API / DATA.
 * CSS-only animation (no "use client"). Renders as a static server component.
 * Animation keyframes are defined in globals.css (schematic-draw, schematic-rise, schematic-pulse).
 * prefers-reduced-motion is handled globally in globals.css (duration → 0.01ms).
 */

const LAYERS = [
  {
    label: "CLIENT",
    chips: ["Next.js", "Telegram Mini App", "Vue"],
    annotation: "multi-tenant",
    delay: "0ms",
  },
  {
    label: "API",
    chips: ["NestJS", "FastAPI", "WebSocket"],
    annotation: "payments",
    delay: "60ms",
  },
  {
    label: "DATA",
    chips: ["PostgreSQL", "Redis"],
    annotation: "realtime",
    delay: "120ms",
  },
] as const;

export function Schematic() {
  return (
    <figure
      role="img"
      aria-label="Architecture diagram: client, API, and data layers of a multi-tenant platform."
      className="relative w-full select-none"
      style={{ maxWidth: "440px" }}
    >
      {/* Vertical connector line — draws top→bottom via schematic-draw */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "23px",
          top: "16px",
          bottom: "16px",
          width: "1px",
          backgroundColor: "var(--color-line)",
          transformOrigin: "top",
          animation: "schematic-draw 700ms ease-out both",
        }}
      />

      <div className="flex flex-col gap-0">
        {LAYERS.map((layer, i) => {
          const isData = layer.label === "DATA";
          return (
            <div
              key={layer.label}
              style={{
                animation: `schematic-rise 400ms ease-out ${layer.delay} both`,
              }}
              className="relative flex items-center gap-0"
            >
              {/* Node dot on the connector */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "19px",
                  width: "9px",
                  height: "9px",
                  borderRadius: "50%",
                  border: "1px solid var(--color-line)",
                  backgroundColor: isData ? "var(--color-signal)" : "var(--color-surface)",
                  zIndex: 1,
                  animation: isData ? "schematic-pulse 800ms ease-out 500ms both" : undefined,
                }}
              />

              {/* Layer row */}
              <div
                className={`ml-10 flex flex-1 items-center justify-between border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3${i < LAYERS.length - 1 ? " border-b-0" : ""}`}
              >
                {/* Left: mono label + chips */}
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-muted)]"
                    style={{ minWidth: "46px" }}
                  >
                    {layer.label}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {layer.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-sm border border-[var(--color-line)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-ink)]"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: mono annotation */}
                <span className="ml-3 shrink-0 font-mono text-[10px] text-[var(--color-muted)]">
                  {layer.annotation}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </figure>
  );
}
