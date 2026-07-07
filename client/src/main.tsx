import { createRoot } from "react-dom/client";
import HeroIntro from "./components/HeroIntro";
import SkillsCloud from "./components/SkillsCloud";
import MapWidget from "./components/MapWidget";
import "./index.css";

// 1. Mount Hero Intro Loader
const heroRoot = document.getElementById("hero-intro-root");
if (heroRoot) {
  createRoot(heroRoot).render(<HeroIntro />);
}

// 2. Mount Skills Cloud
const skillsRoot = document.getElementById("skills-cloud-root");
if (skillsRoot) {
  createRoot(skillsRoot).render(<SkillsCloud />);
}

// 3. Mount Map Widget
const mapRoot = document.getElementById("map-widget-root");
if (mapRoot) {
  createRoot(mapRoot).render(<MapWidget />);
}

