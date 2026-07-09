import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectDetail {
  id: string;
  title: string;
  subtitle: string;
  problem: string;
  approach: string;
  architecture: string;
  stack: string[];
  metrics: string;
  github?: string;
}

const PROJECT_DATA: ProjectDetail[] = [
  {
    id: "project-exoseekers",
    title: "ExoSeekers",
    subtitle: "AI-Powered Exoplanet Transit Detection Pipeline",
    problem: "Identifying exoplanet transit signals in NASA TESS light curve data is extremely challenging — the signal-to-noise ratio is low, and false positives from stellar variability dominate the raw datasets.",
    approach: "Built a 4-stage pipeline: astrophysical noise filters → BLS/TLS periodogram detection → physics-based parameter estimation → dual ML classifier (1D CNN + XGBoost ensemble) for final candidate scoring.",
    architecture: "React 18 frontend with interactive Recharts visualizations, Flask REST API backend serving ML inference, batch processing pipeline for TESS FITS files with automated detrending.",
    stack: ["React 18", "TypeScript", "Flask", "1D CNN", "XGBoost", "Recharts", "Python", "Lightkurve"],
    metrics: "63 exoplanet candidates surfaced from TESS sectors with 94%+ classifier precision. Developed for ISRO Bharatiya Antariksh Hackathon 2026.",
    github: "https://github.com/kanishkaaa13",
  },
  {
    id: "project-dropout-system",
    title: "Dropout Prediction System",
    subtitle: "AI Early Warning System for At-Risk Students",
    problem: "JEE prep institutions lack early indicators for student dropout risk, losing students silently before intervention is possible.",
    approach: "Engineered a composite 0-100 risk scoring engine across 17 behavioral and academic features using ensemble ML models with SHAP-based explainable AI for transparent predictions.",
    architecture: "Full-stack: FastAPI backend with PostgreSQL, React frontend with role-based dashboards, JWT auth, APScheduler for automated reassessment cycles, PDF/Excel report generation.",
    stack: ["Python", "FastAPI", "React", "XGBoost", "Docker", "PostgreSQL", "SHAP"],
    metrics: "Automated risk scoring across 17 features with explainable AI outputs. Role-based access control with scheduled reassessment reports.",
    github: "https://github.com/kanishkaaa13/Dropout-System-",
  },
  {
    id: "project-ai-assistant",
    title: "AI Knowledge Assistant",
    subtitle: "RAG-Based Context-Aware Document QA",
    problem: "Organizations need efficient ways to query large document collections without manual search — traditional keyword search misses semantic meaning.",
    approach: "Implemented Retrieval-Augmented Generation (RAG) with ChromaDB vector store for semantic document chunking and retrieval, paired with local Ollama LLM models for privacy-first inference.",
    architecture: "Next.js frontend → FastAPI middleware → ChromaDB vector store + Ollama inference → PostgreSQL for session/user management. Efficient chunking with overlap for context continuity.",
    stack: ["Next.js", "FastAPI", "ChromaDB", "Ollama", "PostgreSQL", "Python", "LangChain"],
    metrics: "Context-aware document QA with semantic search capability. Local LLM inference for data privacy. Efficient retrieval across large document collections.",
  },
  {
    id: "project-forest-fire",
    title: "Forest Fire Detection",
    subtitle: "Multi-Sensory IoT + Aerial CV Monitoring System",
    problem: "Forest fires are often detected too late for effective response. Remote sensing alone lacks the granularity for early detection in dense canopy environments.",
    approach: "Fused ground-level IoT telemetry (temperature, humidity, CO₂ over LoRaWAN) with aerial drone imagery processed through YOLOv8 object detection for multi-modal early warning.",
    architecture: "ESP32 sensor nodes → LoRaWAN gateway → FastAPI data ingestion → PyTorch/YOLOv8 inference pipeline → React dashboard with real-time alerts and geo-tagged visualization.",
    stack: ["PyTorch", "YOLOv8", "LoRaWAN", "ESP32", "FastAPI", "React"],
    metrics: "Real-time multi-modal fire detection combining IoT telemetry with computer vision. LoRaWAN for long-range, low-power sensor communication.",
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.1 + i * 0.08, ease: "easeOut" },
  }),
};

export default function ProjectDetailModal() {
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);

  useEffect(() => {
    function handleOpen(e: Event) {
      const detail = (e as CustomEvent).detail;
      const project = PROJECT_DATA.find((p) => p.id === detail?.id);
      if (project) {
        setActiveProject(project);
        document.body.style.overflow = "hidden";
      }
    }

    window.addEventListener("project-detail-open", handleOpen);
    return () => window.removeEventListener("project-detail-open", handleOpen);
  }, []);

  function close() {
    setActiveProject(null);
    document.body.style.overflow = "";
  }

  return (
    <AnimatePresence>
      {activeProject && (
        <motion.div
          className="project-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9000,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            cursor: "pointer",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(160deg, #12100e 0%, #1a1814 40%, #0e0d0b 100%)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "22px",
              maxWidth: "720px",
              width: "100%",
              maxHeight: "85vh",
              overflowY: "auto",
              padding: "48px 40px",
              cursor: "default",
              boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
              position: "relative",
            }}
          >
            {/* Close button */}
            <button
              onClick={close}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "rgba(255,255,255,0.5)",
                fontSize: "18px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLButtonElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)";
              }}
            >
              ✕
            </button>

            {/* Title */}
            <motion.div custom={0} variants={sectionVariants} initial="hidden" animate="visible">
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "3px",
                marginBottom: "12px",
              }}>
                PROJECT DEEP DIVE
              </div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: 700,
                color: "rgba(255,255,255,0.92)",
                lineHeight: 1.15,
                marginBottom: "6px",
              }}>
                {activeProject.title}
              </h2>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.1rem",
                fontStyle: "italic",
                color: "rgba(255,255,255,0.4)",
                marginBottom: "32px",
              }}>
                {activeProject.subtitle}
              </p>
            </motion.div>

            {/* Sections */}
            {[
              { label: "Problem", content: activeProject.problem },
              { label: "Approach", content: activeProject.approach },
              { label: "Architecture", content: activeProject.architecture },
              { label: "Metrics & Outcomes", content: activeProject.metrics },
            ].map((section, i) => (
              <motion.div
                key={section.label}
                custom={i + 1}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                style={{ marginBottom: "24px" }}
              >
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.62rem",
                  color: "#e91e7a",
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}>
                  {section.label}
                </div>
                <p style={{
                  fontSize: "0.88rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.55)",
                }}>
                  {section.content}
                </p>
              </motion.div>
            ))}

            {/* Tech Stack */}
            <motion.div custom={5} variants={sectionVariants} initial="hidden" animate="visible">
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.62rem",
                color: "#7c5cbf",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}>
                Tech Stack
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
                {activeProject.stack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      padding: "5px 14px",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "50px",
                      fontSize: "0.72rem",
                      color: "rgba(255,255,255,0.55)",
                      fontFamily: "'JetBrains Mono', monospace",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* GitHub link */}
            {activeProject.github && (
              <motion.div custom={6} variants={sectionVariants} initial="hidden" animate="visible">
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 24px",
                    border: "1.5px solid rgba(255,255,255,0.15)",
                    borderRadius: "10px",
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    transition: "all 0.3s",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(233,30,122,0.4)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.15)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                  }}
                >
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
