import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { motion } from "framer-motion";

export default function HeroPreloader({ onComplete }: { onComplete: () => void }) {
  const { progress } = useProgress();
  const [displayPercent, setDisplayPercent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 480);
  }, []);

  // Smoothly interpolate the progress
  useEffect(() => {
    // If on mobile or assets are cached (progress is 100 on start), run a simulated timer
    if (isMobile || progress === 100) {
      const duration = 1000; // 1 second loading time
      const stepTime = 10;
      const steps = duration / stepTime;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const targetPercent = Math.min(Math.floor((currentStep / steps) * 100), 100);
        setDisplayPercent((prev) => Math.max(prev, targetPercent));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepTime);

      return () => clearInterval(timer);
    } else {
      // Desktop & not fully cached: update display percentage based on real loader progress
      const target = Math.floor(progress) || 0;
      if (target > displayPercent) {
        const interval = setInterval(() => {
          setDisplayPercent((prev) => {
            if (prev >= target) {
              clearInterval(interval);
              return target;
            }
            return prev + 1;
          });
        }, 5);
        return () => clearInterval(interval);
      }
    }
  }, [progress, isMobile, displayPercent]);

  // Trigger completion hook once progress reaches 100%
  useEffect(() => {
    if (displayPercent >= 100) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 300); // Brief hold for cinematic feel
      return () => clearTimeout(timeout);
    }
  }, [displayPercent, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#000000",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "clamp(3rem, 8vw, 7rem)",
          fontWeight: 300,
          color: "#ffffff",
          letterSpacing: "-2px",
          userSelect: "none",
        }}
      >
        {displayPercent}%
      </div>
    </motion.div>
  );
}
