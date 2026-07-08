import { useState, useEffect } from "react";
import CurvedGallery from "./CurvedGallery";
import HeroIntro from "./HeroIntro";
import HeroPreloader from "./HeroPreloader";
import { AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadyShown = sessionStorage.getItem("hero-intro-shown") === "true";
    if (reducedMotion || alreadyShown) {
      setShowPreloader(false);
      setIsLoaded(true);
    }
  }, []);

  const handleLoaderComplete = () => {
    setIsLoaded(true);
    sessionStorage.setItem("hero-intro-shown", "true");
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <AnimatePresence>
        {showPreloader && !isLoaded && (
          <HeroPreloader onComplete={handleLoaderComplete} />
        )}
      </AnimatePresence>

      {/* Hero Text overlay — sits in top portion (z-index 3) */}
      <HeroIntro isLoaded={isLoaded} />

      {/* 3D Curved Gallery — occupies the lower 55% of the hero */}
      <div
        style={{
          position: "absolute",
          top: "44%",
          left: 0,
          width: "100%",
          height: "56%",
          zIndex: 1,
        }}
      >
        <CurvedGallery />
      </div>
    </div>
  );
}
