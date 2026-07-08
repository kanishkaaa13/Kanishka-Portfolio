import { useEffect, useRef } from "react";

interface Skill {
  name: string;
  color: string;
  bg: string;
  border: string;
}

const innerSkills: Skill[] = [
  { name: "Machine Learning", color: "#d81b60", bg: "rgba(233, 30, 122, 0.08)", border: "rgba(233, 30, 122, 0.22)" },
  { name: "Python", color: "#2563eb", bg: "rgba(37, 99, 235, 0.08)", border: "rgba(37, 99, 235, 0.22)" },
  { name: "React", color: "#0891b2", bg: "rgba(8, 145, 178, 0.08)", border: "rgba(8, 145, 178, 0.22)" },
  { name: "Edge AI", color: "#059669", bg: "rgba(5, 150, 105, 0.08)", border: "rgba(5, 150, 105, 0.22)" },
  { name: "Embedded", color: "#7c5cbf", bg: "rgba(124, 92, 191, 0.08)", border: "rgba(124, 92, 191, 0.22)" },
];

const outerSkills: Skill[] = [
  { name: "Full-Stack Dev", color: "#d97706", bg: "rgba(217, 119, 6, 0.08)", border: "rgba(217, 119, 6, 0.22)" },
  { name: "FastAPI", color: "#d81b60", bg: "rgba(233, 30, 122, 0.08)", border: "rgba(233, 30, 122, 0.22)" },
  { name: "IoT", color: "#0891b2", bg: "rgba(8, 145, 178, 0.08)", border: "rgba(8, 145, 178, 0.22)" },
  { name: "C/C++", color: "#7c5cbf", bg: "rgba(124, 92, 191, 0.08)", border: "rgba(124, 92, 191, 0.22)" },
  { name: "SQL", color: "#2563eb", bg: "rgba(37, 99, 235, 0.08)", border: "rgba(37, 99, 235, 0.22)" },
  { name: "Data Pipelines", color: "#059669", bg: "rgba(5, 150, 105, 0.08)", border: "rgba(5, 150, 105, 0.22)" },
];

function OrbitRing({
  skills,
  radius,
  duration,
  direction,
  skillSize = 34,
}: {
  skills: Skill[];
  radius: number;
  duration: number;
  direction: "cw" | "ccw";
  skillSize?: number;
}) {
  const ringRef = useRef<HTMLDivElement>(null);

  // Pause orbit on hover
  useEffect(() => {
    const el = ringRef.current;
    if (!el) return;
    const pause = () => { el.style.animationPlayState = "paused"; };
    const resume = () => { el.style.animationPlayState = "running"; };
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    return () => {
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, []);

  const containerSize = radius * 2 + skillSize * 2 + 20;
  const animName = direction === "cw" ? "orbit-cw" : "orbit-ccw";
  const counterAnim = direction === "cw" ? "orbit-ccw" : "orbit-cw";

  return (
    <div
      ref={ringRef}
      style={{
        position: "absolute",
        width: containerSize,
        height: containerSize,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        animation: `${animName} ${duration}s linear infinite`,
        willChange: "transform",
      }}
    >
      {skills.map((skill, i) => {
        const angle = (360 / skills.length) * i;
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;

        return (
          <div
            key={skill.name}
            title={skill.name}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(0deg)`,
              animation: `${counterAnim} ${duration}s linear infinite`,
              willChange: "transform",
            }}
          >
            <div
              style={{
                padding: "7px 14px",
                backgroundColor: skill.bg,
                border: `1.5px solid ${skill.border}`,
                borderRadius: "50px",
                fontSize: "0.82rem",
                fontWeight: 500,
                color: skill.color,
                whiteSpace: "nowrap",
                cursor: "default",
                userSelect: "none",
                backdropFilter: "blur(4px)",
                transition: "box-shadow 0.25s, border-color 0.25s, background 0.25s",
                boxShadow: `0 2px 12px ${skill.bg}`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 20px ${skill.border}`;
                (e.currentTarget as HTMLDivElement).style.borderColor = skill.color;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 2px 12px ${skill.bg}`;
                (e.currentTarget as HTMLDivElement).style.borderColor = skill.border;
              }}
            >
              {skill.name}
            </div>
          </div>
        );
      })}

      {/* Ring guide line */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: radius * 2,
          height: radius * 2,
          borderRadius: "50%",
          border: "1px solid rgba(124, 92, 191, 0.12)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export default function SkillsCloud() {
  // Detect reduced motion preference
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mobile fallback (flat pills) — rendered via CSS media query
  const flatSkills = [...innerSkills, ...outerSkills];

  return (
    <div style={{ width: "100%", paddingBottom: "24px" }}>
      <div className="skills-title" style={{ marginBottom: "20px" }}>Core Skills</div>

      {/* ORBITAL VERSION — shown on desktop */}
      <div className="skills-orbit-container">
        {/* Center label */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 5,
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(233,30,122,0.15), rgba(124,92,191,0.15))",
            border: "1.5px solid rgba(124,92,191,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.4rem",
            backdropFilter: "blur(4px)",
          }}
        >
          ⚡
        </div>

        {!prefersReduced && (
          <>
            <OrbitRing
              skills={innerSkills}
              radius={110}
              duration={20}
              direction="cw"
            />
            <OrbitRing
              skills={outerSkills}
              radius={185}
              duration={32}
              direction="ccw"
            />
          </>
        )}

        {/* Static fallback for reduced motion */}
        {prefersReduced && flatSkills.map((skill, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(calc(-50% + ${Math.cos((i / flatSkills.length) * Math.PI * 2) * 140}px), calc(-50% + ${Math.sin((i / flatSkills.length) * Math.PI * 2) * 140}px))`,
              padding: "7px 14px",
              backgroundColor: skill.bg,
              border: `1.5px solid ${skill.border}`,
              borderRadius: "50px",
              fontSize: "0.82rem",
              fontWeight: 500,
              color: skill.color,
              whiteSpace: "nowrap",
            }}
          >
            {skill.name}
          </div>
        ))}
      </div>

      {/* FLAT PILL FALLBACK — shown on mobile via CSS class */}
      <div className="skills-flat-fallback">
        {flatSkills.map((skill, i) => (
          <div
            key={i}
            style={{
              padding: "8px 16px",
              backgroundColor: skill.bg,
              border: `1.5px solid ${skill.border}`,
              borderRadius: "50px",
              fontSize: "0.85rem",
              fontWeight: 500,
              color: skill.color,
              whiteSpace: "nowrap",
              cursor: "default",
            }}
          >
            {skill.name}
          </div>
        ))}
      </div>
    </div>
  );
}
