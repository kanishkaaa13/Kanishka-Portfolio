import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import HeroIntro from "./components/HeroIntro";
import SkillsCloud from "./components/SkillsCloud";
import MapWidget from "./components/MapWidget";
import CurvedGallery from "./components/CurvedGallery";
import "./index.css";

// 1. Mount 3D Curved Gallery Scaffold
const galleryRoot = document.getElementById("hero-gallery-root");
if (galleryRoot) {
  createRoot(galleryRoot).render(
    <Suspense fallback={<div style={{ color: "white", padding: 20 }}>Loading 3D Canvas...</div>}>
      <CurvedGallery />
    </Suspense>
  );
}

// 2. Mount Hero Intro Loader
const heroRoot = document.getElementById("hero-intro-root");
if (heroRoot) {
  createRoot(heroRoot).render(<HeroIntro />);
}

// 3. Mount Skills Cloud
const skillsRoot = document.getElementById("skills-cloud-root");
if (skillsRoot) {
  createRoot(skillsRoot).render(<SkillsCloud />);
}

// 4. Mount Map Widget
const mapRoot = document.getElementById("map-widget-root");
if (mapRoot) {
  createRoot(mapRoot).render(<MapWidget />);
}


