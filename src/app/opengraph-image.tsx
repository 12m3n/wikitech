import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

export default async function OpengraphImage() {
  // satori cannot decode WebP, so the OG build uses the PNG the logo script emits.
  const seal = await readFile(join(process.cwd(), "public/brand/seal-light-og.png"));
  const sealSrc = `data:image/png;base64,${seal.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050f2e",
          backgroundImage:
            "radial-gradient(110% 80% at 78% 0%, rgba(33,69,172,0.55), transparent 62%)",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={sealSrc} width={88} height={88} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "#ffffff", fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>
              WIKITECH GROUP
            </div>
            <div style={{ color: "#93aeea", fontSize: 15, letterSpacing: 3, marginTop: 6 }}>
              TECHNOLOGY SOLUTIONS &amp; SERVICES
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -2.2,
              maxWidth: 940,
            }}
          >
            ERP, finance and infrastructure, engineered as one system.
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 36, color: "#c0d0f4", fontSize: 21 }}>
            {["ERP", "Accounting", "Tax", "Infrastructure", "Automation"].map((t) => (
              <div
                key={t}
                style={{
                  border: "1px solid rgba(255,255,255,0.22)",
                  borderRadius: 8,
                  padding: "8px 16px",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
