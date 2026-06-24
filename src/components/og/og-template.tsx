import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Design system §7: paper bg (#f1f0eb), hairline border inset frame,
// name in bold sans, large ink title, ultramarine square mark + shakha.uz mono at bottom.
// Terracotta #b4541f replaced by signal #1d3be8.
export function renderOg(title: string, subtitle: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#f1f0eb",
          padding: "0",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Hairline border inset frame */}
        <div
          style={{
            position: "absolute",
            inset: "24px",
            border: "1px solid #d8d7cf",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 64px",
          }}
        >
          {/* Top: name in bold sans */}
          <div style={{ fontSize: 28, color: "#17171b", fontWeight: 700, letterSpacing: "-0.01em" }}>
            Shakhzodbek Sharipov
          </div>

          {/* Middle: large ink title */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div
              style={{
                fontSize: 72,
                fontWeight: 700,
                color: "#17171b",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </div>
            <div style={{ fontSize: 28, color: "#87867e", marginTop: "8px" }}>{subtitle}</div>
          </div>

          {/* Bottom: ultramarine square mark + shakha.uz in mono */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                background: "#1d3be8",
                flexShrink: 0,
              }}
            />
            <div
              style={{
                fontSize: 20,
                color: "#17171b",
                fontFamily: "monospace",
                letterSpacing: "0.05em",
              }}
            >
              shakha.uz
            </div>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
