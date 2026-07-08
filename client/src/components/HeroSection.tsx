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

      {/* 3D Curved Gallery Background */}
      <CurvedGallery />

      {/* Hero Text and Taglines Overlay */}
      <HeroIntro isLoaded={isLoaded} />
    </div>
  );
}
