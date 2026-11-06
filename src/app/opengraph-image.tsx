import { ImageResponse } from "next/og";

export const alt = "AXIOM — The Operating System for the Human Body";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded social-share card, generated at build time. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#060607",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* aurora glows */}
        <div
          style={{
            position: "absolute",
            top: -160,
            left: -120,
            width: 620,
            height: 620,
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(37,168,255,0.35), transparent 65%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -220,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(111,211,255,0.22), transparent 65%)",
            display: "flex",
          }}
        />

        {/* mark + eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 999,
              border: "2px solid rgba(37,168,255,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 999, background: "#25A8FF", display: "flex" }} />
          </div>
          <div style={{ color: "#9A9A94", fontSize: 24, letterSpacing: 6, display: "flex" }}>
            FITNESS &amp; WELLNESS OS
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#F4F3EE", fontSize: 124, fontWeight: 800, letterSpacing: -4, lineHeight: 1, display: "flex" }}>
            AXIOM
          </div>
          <div style={{ color: "#B9D9F2", fontSize: 38, marginTop: 20, maxWidth: 820, display: "flex" }}>
            The operating system for the human body.
          </div>
        </div>

        {/* footer row */}
        <div style={{ display: "flex", justifyContent: "space-between", color: "#6A6A66", fontSize: 22, letterSpacing: 2 }}>
          <div style={{ display: "flex" }}>TRAIN · RECOVER · FUEL</div>
          <div style={{ display: "flex" }}>axiom.fit</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
