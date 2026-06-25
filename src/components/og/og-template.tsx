import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Design system v2 §7: pure white bg, large ink title, muted name above,
// small accent dot, shakha.uz small muted at bottom. Lots of padding, no frame.
export function renderOg(title: string, subtitle: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#ffffff",
          padding: "80px 96px",
          fontFamily: "sans-serif",
          justifyContent: "space-between",
        }}
      >
        {/* Top: name in muted */}
        <div style={{ fontSize: 26, color: "#6e6e73", fontWeight: 500, letterSpacing: "-0.01em" }}>
          Shakhzodbek Sharipov
        </div>

        {/* Middle: large ink title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#1d1d1f",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 28, color: "#6e6e73", lineHeight: 1.4 }}>{subtitle}</div>
        </div>

        {/* Bottom: accent dot + shakha.uz */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#0071e3",
              flexShrink: 0,
            }}
          />
          <div
            style={{
              fontSize: 18,
              color: "#6e6e73",
              letterSpacing: "0.02em",
            }}
          >
            shakha.uz
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
