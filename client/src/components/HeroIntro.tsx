import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroIntro() {
  const [count, setCount] = useState(0);
  const [isLoaderDone, setIsLoaderDone] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Check sessionStorage
    const alreadyShown = sessionStorage.getItem("hero-intro-shown") === "true";

    if (reducedMotion || alreadyShown) {
      setIsLoaderDone(true);
    } else {
      setShouldPlay(true);
      // Run counter 0 -> 100 in 1000ms
      const duration = 1000;
      const stepTime = 10;
      const steps = duration / stepTime;
      let step = 0;

      const timer = setInterval(() => {
        step += 1;
        const progress = Math.min(Math.floor((step / steps) * 100), 100);
        setCount(progress);

        if (step >= steps) {
          clearInterval(timer);
          sessionStorage.setItem("hero-intro-shown", "true");
          // Hold 100% briefly, then trigger loader exit
          setTimeout(() => {
            setIsLoaderDone(true);
          }, 200);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, []);

  if (isLoaderDone && !shouldPlay) {
    // Render static hero instantly with no loader overlay and no entry animations
    return <StaticHeroContent />;
  }

  return (
    <>
      <AnimatePresence>
        {!isLoaderDone && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "#000",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* Outline Background Name */}
            <motion.h2
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ opacity: 0.3, scale: 1 }}
              exit={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(3rem, 10vw, 8rem)",
                fontWeight: 700,
                color: "transparent",
                WebkitTextStroke: "1px rgba(255,255,255,0.3)",
                textStroke: "1px rgba(255,255,255,0.3)",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                position: "absolute",
                textAlign: "center",
                userSelect: "none",
                pointerEvents: "none",
              } as any}
            >
              Kanishka Arde
            </motion.h2>

            {/* Counter */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "clamp(3rem, 8vw, 7rem)",
                fontWeight: 300,
                color: "#fff",
                zIndex: 10,
              }}
            >
              {count}%
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Content Entry */}
      {isLoaderDone && (
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
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto",
            zIndex: 2,
            pointerEvents: "none",
          }}
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

          {/* Subtitle */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
            }}
            className="hero-title-line"
          >
            Electronics & Telecommunication
          </motion.p>

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
            <a href="#portfolio" className="btn-primary">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
              </svg>
              View Projects
            </a>
            <a href="#contact" className="btn-primary" style={{ background: "transparent", border: "1.5px solid rgba(255,255,255,0.3)", color: "#fff" }}>
              Get In Touch
            </a>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

function StaticHeroContent() {
  return (
    <div
      className="hero-text reveal visible"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        maxWidth: "800px",
        margin: "0 auto",
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      <div className="hero-eyebrow">
        <span></span> E&TC Engineer
      </div>
      <h1 className="hero-name">
        Kanishka<br /><em>Arde</em>
      </h1>
      <p className="hero-title-line">
        Electronics & Telecommunication
      </p>
      <p className="hero-desc" style={{ maxWidth: "600px" }}>
        Passionate about bridging hardware and software — from embedded systems to full-stack development. Building the future one circuit at a time.
      </p>
      <div className="hero-badges" style={{ justifyContent: "center", pointerEvents: "auto" }}>
        <span className="hero-badge">⚡ Embedded Systems</span>
        <span className="hero-badge">💻 Full Stack Dev</span>
        <span className="hero-badge">📡 IoT</span>
      </div>
      <div className="hero-cta" style={{ justifyContent: "center", pointerEvents: "auto" }}>
        <a href="#portfolio" className="btn-primary">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
          </svg>
          View Projects
        </a>
        <a href="#contact" className="btn-primary" style={{ background: "transparent", border: "1.5px solid rgba(255,255,255,0.3)", color: "#fff" }}>
          Get In Touch
        </a>
      </div>
    </div>
  );
}
