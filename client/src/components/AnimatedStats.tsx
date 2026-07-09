import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  target: number;
  suffix: string;
  label: string;
  gradient: string;
}

const STATS: StatItem[] = [
  { target: 10, suffix: "+", label: "Projects Completed", gradient: "linear-gradient(135deg, #e91e7a, #7c5cbf)" },
  { target: 4, suffix: "+", label: "Years of Study", gradient: "linear-gradient(135deg, #7c5cbf, #2563eb)" },
  { target: 6, suffix: "+", label: "Certifications", gradient: "linear-gradient(135deg, #0891b2, #059669)" },
  { target: 63, suffix: "", label: "Exoplanet Candidates", gradient: "linear-gradient(135deg, #d97706, #e91e7a)" },
];

function useCountUp(target: number, duration: number, start: boolean): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let raf: number;

    function animate(ts: number) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      }
    }

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return count;
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useCountUp(stat.target, 1200, isInView);

  const hoverBorderColors = [
    "rgba(233,30,122,0.25)",
    "rgba(124,92,191,0.25)",
    "rgba(8,145,178,0.25)",
    "rgba(217,119,6,0.25)",
  ];

  return (
    <motion.div
      ref={ref}
      className="stat-card"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = hoverBorderColors[index] || hoverBorderColors[0];
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "";
      }}
    >
      <div
        className="stat-number"
        style={{
          background: stat.gradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {count}{stat.suffix}
      </div>
      <div className="stat-label">{stat.label}</div>
    </motion.div>
  );
}

export default function AnimatedStats() {
  return (
    <div className="about-stats">
      {STATS.map((stat, i) => (
        <StatCard key={i} stat={stat} index={i} />
      ))}
    </div>
  );
}
