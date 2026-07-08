import { createRoot } from "react-dom/client";
import HeroSection from "./components/HeroSection";
import SkillsCloud from "./components/SkillsCloud";
import MapWidget from "./components/MapWidget";
import "./index.css";

// 1. Mount 3D Curved Gallery & Hero Text Coordinator
const galleryRoot = document.getElementById("hero-gallery-root");
if (galleryRoot) {
  createRoot(galleryRoot).render(<HeroSection />);
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


