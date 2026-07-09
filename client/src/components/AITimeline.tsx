import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TimelineNode {
  year?: string;
  label: string;
}

const NODES: TimelineNode[] = [
  { year: "2023", label: "Started Engineering" },
  { label: "Python" },
  { label: "Machine Learning" },
  { label: "Deep Learning" },
  { label: "Exoplanet Detection" },
  { label: "RAG / LangChain" },
  { label: "FastAPI" },
  { label: "Edge AI" },
  { year: "Today", label: "Building the Future" },
];

export default function AITimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <div ref={containerRef} style={{ width: "100%", overflow: "hidden" }}>
      {/* Desktop — horizontal */}
      <div className="ai-timeline-desktop">
        <div className="ai-timeline-track">
          {/* SVG connecting line */}
          <svg
            className="ai-timeline-line"
            viewBox={`0 0 ${NODES.length * 140} 4`}
            preserveAspectRatio="none"
          >
            <motion.line
              x1="0"
              y1="2"
              x2={NODES.length * 140}
              y2="2"
              stroke="url(#timeline-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e91e7a" />
                <stop offset="50%" stopColor="#7c5cbf" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
          </svg>

          {/* Nodes */}
          {NODES.map((node, i) => (
            <motion.div
              key={i}
              className="ai-timeline-node"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }}
            >
              <div className="ai-timeline-dot-wrapper">
                <div className="ai-timeline-dot" />
                <div className="ai-timeline-glow" />
              </div>
              <div className="ai-timeline-label">
                {node.year && <span className="ai-timeline-year">{node.year}</span>}
                <span className="ai-timeline-text">{node.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile — vertical */}
      <div className="ai-timeline-mobile">
        <div className="ai-timeline-vertical-track">
          <svg
            className="ai-timeline-vertical-line"
            viewBox={`0 0 4 ${NODES.length * 80}`}
            preserveAspectRatio="none"
          >
            <motion.line
              x1="2"
              y1="0"
              x2="2"
              y2={NODES.length * 80}
              stroke="url(#timeline-gradient-v)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="timeline-gradient-v" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e91e7a" />
                <stop offset="50%" stopColor="#7c5cbf" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
          </svg>

          {NODES.map((node, i) => (
            <motion.div
              key={i}
              className="ai-timeline-v-node"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
            >
              <div className="ai-timeline-dot-wrapper">
                <div className="ai-timeline-dot" />
                <div className="ai-timeline-glow" />
              </div>
              <div className="ai-timeline-v-label">
                {node.year && <span className="ai-timeline-year">{node.year}</span>}
                <span className="ai-timeline-text">{node.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
