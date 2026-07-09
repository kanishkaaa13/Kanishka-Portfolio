import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KINETIC_WORDS = "Building Intelligent Systems.".split(" ");

function KineticLine() {
  return (
    <motion.p
      className="hero-title-line"
      style={{ minHeight: "2rem", display: "flex", gap: "0.35em", justifyContent: "center", flexWrap: "wrap" }}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
      }}
    >
      {KINETIC_WORDS.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
          }}
          style={{ display: "inline-block" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

const TYPING_PHRASES = [
  "Electronics & Telecommunication",
  "AI/ML Systems Engineer",
  "Embedded Systems Developer",
  "Full-Stack Builder",
];

function TypingText() {
  const [displayed, setDisplayed] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = TYPING_PHRASES[phraseIdx];
    const typeSpeed = deleting ? 38 : 68;
    const pauseAtEnd = 1800;
    const pauseAtStart = 400;

    if (!deleting && charIdx === current.length) {
      // Pause at end then start deleting
      timeoutRef.current = setTimeout(() => setDeleting(true), pauseAtEnd);
      return;
    }
    if (deleting && charIdx === 0) {
      // Move to next phrase
      timeoutRef.current = setTimeout(() => {
        setDeleting(false);
        setPhraseIdx((i) => (i + 1) % TYPING_PHRASES.length);
      }, pauseAtStart);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setDisplayed(current.slice(0, charIdx + (deleting ? -1 : 1)));
      setCharIdx((c) => c + (deleting ? -1 : 1));
    }, typeSpeed);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [charIdx, deleting, phraseIdx]);

  return (
    <p className="hero-title-line" style={{ minHeight: "2rem" }}>
      {displayed}
      <span
        style={{
          borderRight: "2px solid rgba(255,255,255,0.7)",
          marginLeft: "2px",
          animation: "blink 1s step-end infinite",
        }}
      />
    </p>
  );
}

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  maxWidth: "800px",
  position: "absolute",
  top: "7%",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 3,
  pointerEvents: "none",
  width: "100%",
  padding: "0 24px",
};

export default function HeroIntro({ isLoaded }: { isLoaded: boolean }) {
  const [skipAnimation, setSkipAnimation] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadyShown = sessionStorage.getItem("hero-intro-shown") === "true";

    if (reducedMotion || alreadyShown) {
      setSkipAnimation(true);
    }
  }, []);

  if (skipAnimation) {
    return <StaticHeroContent />;
  }

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      {/* Hero Content Entry */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.12,
              delayChildren: 0.1,
            },
          },
        }}
        className="hero-text reveal visible"
        style={containerStyle}
      >
          {/* Eyebrow */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
            }}
            className="hero-eyebrow"
          >
            <span></span> E&TC Engineer
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
            }}
            className="hero-name"
          >
            Kanishka<br /><em>Arde</em>
          </motion.h1>

          {/* Typing Subtitle */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
            }}
          >
            <TypingText />
          </motion.div>

          {/* Kinetic Tagline */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
            }}
          >
            <KineticLine />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
            }}
            className="hero-desc"
            style={{ maxWidth: "600px" }}
          >
            Passionate about bridging hardware and software — from embedded systems to full-stack development. Building the future one circuit at a time.
          </motion.p>

          {/* Badges */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
            }}
            className="hero-badges"
            style={{ justifyContent: "center", pointerEvents: "auto" }}
          >
            <span className="hero-badge">⚡ Embedded Systems</span>
            <span className="hero-badge">💻 Full Stack Dev</span>
            <span className="hero-badge">📡 IoT</span>
            <span className="hero-badge">🤖 AI/ML</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
            }}
            className="hero-cta"
            style={{ justifyContent: "center", pointerEvents: "auto" }}
          >
            <a href="#portfolio" className="btn-primary magnetic-btn">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
              </svg>
              View Projects
            </a>
            <a href="#contact" className="btn-primary magnetic-btn" style={{ background: "transparent", border: "1.5px solid rgba(255,255,255,0.3)", color: "#fff" }}>
              Get In Touch
            </a>
          </motion.div>
        </motion.div>
    </>
  );
}

function StaticHeroContent() {
  return (
    <div
      className="hero-text reveal visible"
      style={containerStyle}
    >
      <div className="hero-eyebrow">
        <span></span> E&TC Engineer
      </div>
      <h1 className="hero-name">
        Kanishka<br /><em>Arde</em>
      </h1>
      <p className="hero-title-line">
        Electronics &amp; Telecommunication
      </p>
      <p className="hero-title-line" style={{ display: "flex", gap: "0.35em", justifyContent: "center", flexWrap: "wrap" }}>
        {KINETIC_WORDS.map((word, i) => (
          <span key={i} style={{ display: "inline-block" }}>{word}</span>
        ))}
      </p>
      <p className="hero-desc" style={{ maxWidth: "600px" }}>
        Passionate about bridging hardware and software — from embedded systems to full-stack development. Building the future one circuit at a time.
      </p>
      <div className="hero-badges" style={{ justifyContent: "center", pointerEvents: "auto" }}>
        <span className="hero-badge">⚡ Embedded Systems</span>
        <span className="hero-badge">💻 Full Stack Dev</span>
        <span className="hero-badge">📡 IoT</span>
        <span className="hero-badge">🤖 AI/ML</span>
      </div>
      <div className="hero-cta" style={{ justifyContent: "center", pointerEvents: "auto" }}>
        <a href="#portfolio" className="btn-primary magnetic-btn">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
          </svg>
          View Projects
        </a>
        <a href="#contact" className="btn-primary magnetic-btn" style={{ background: "transparent", border: "1.5px solid rgba(255,255,255,0.3)", color: "#fff" }}>
          Get In Touch
        </a>
      </div>
    </div>
  );
}
