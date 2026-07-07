import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function MapWidget() {
  const [svgPaths, setSvgPaths] = useState<string>("");

  useEffect(() => {
    fetch("/assets/world-map.svg")
      .then((res) => res.text())
      .then((text) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "image/svg+xml");
        const group = doc.querySelector("g");
        if (group) {
          setSvgPaths(group.innerHTML);
        }
      })
      .catch((err) => console.error("Error fetching world map SVG:", err));
  }, []);

  const puneX = 576;
  const puneY = 472;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.45)",
        border: "1px solid rgba(232, 227, 218, 0.8)",
        borderRadius: "16px",
        padding: "16px",
        overflow: "hidden",
        boxShadow: "var(--shadow-sm)",
        backdropFilter: "blur(6px)",
      }}
    >
      {/* Dot pattern definition used to fill countries */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <pattern
            id="map-dot-pattern"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.2" fill="rgba(138, 130, 120, 0.38)" />
          </pattern>
        </defs>
      </svg>

      {/* World Map SVG */}
      <svg
        viewBox="30.767 241.591 784.077 458.627"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      >
        {svgPaths && (
          <g
            dangerouslySetInnerHTML={{ __html: svgPaths }}
            style={{
              fill: "url(#map-dot-pattern)",
              stroke: "rgba(232, 227, 218, 0.4)",
              strokeWidth: "0.5px",
            }}
          />
        )}

        {/* Pulsing Pin for Pune, India */}
        <g>
          {/* Outer Pulsing Ring 1 */}
          <motion.circle
            cx={puneX}
            cy={puneY}
            r={16}
            fill="none"
            stroke="var(--purple)"
            strokeWidth={1.5}
            initial={{ scale: 0.4, opacity: 0.8 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: "easeOut",
            }}
          />
          {/* Outer Pulsing Ring 2 */}
          <motion.circle
            cx={puneX}
            cy={puneY}
            r={16}
            fill="none"
            stroke="var(--purple)"
            strokeWidth={1}
            initial={{ scale: 0.4, opacity: 0.8 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              delay: 1.1,
              ease: "easeOut",
            }}
          />
          {/* Pin Core */}
          <circle cx={puneX} cy={puneY} r={4.5} fill="var(--purple)" />
          <circle cx={puneX} cy={puneY} r={2} fill="#fff" />
        </g>
      </svg>

      {/* Info Card Overlay */}
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          left: "16px",
          right: "16px",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          border: "1px solid rgba(232, 227, 218, 0.8)",
          borderRadius: "12px",
          padding: "12px 14px",
          boxShadow: "var(--shadow-sm)",
          backdropFilter: "blur(12px)",
          maxWidth: "260px",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "var(--ink)",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: "var(--purple)",
              borderRadius: "50%",
              display: "inline-block",
            }}
          />
          Based in Pune, India
        </div>
        <div
          style={{
            fontSize: "0.75rem",
            color: "var(--muted)",
            marginTop: "4px",
            lineHeight: 1.4,
          }}
        >
          Open to remote opportunities — let's connect.
        </div>
      </div>
    </motion.div>
  );
}
