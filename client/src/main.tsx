import { createRoot } from "react-dom/client";
import HeroSection from "./components/HeroSection";
import SkillsCloud from "./components/SkillsCloud";
import MapWidget from "./components/MapWidget";
import AITimeline from "./components/AITimeline";
import ProjectDetailModal from "./components/ProjectDetailModal";
import AnimatedStats from "./components/AnimatedStats";
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

// 5. Mount AI Journey Timeline
const timelineRoot = document.getElementById("ai-timeline-root");
if (timelineRoot) {
  createRoot(timelineRoot).render(<AITimeline />);
}

// 6. Mount Project Detail Modal
const detailRoot = document.getElementById("project-detail-root");
if (detailRoot) {
  createRoot(detailRoot).render(<ProjectDetailModal />);
}

// 7. Mount Animated Stats
const statsRoot = document.getElementById("animated-stats-root");
if (statsRoot) {
  createRoot(statsRoot).render(<AnimatedStats />);
}

// 8. Wire project card clicks to open detail modal
document.querySelectorAll(".project-card[id]").forEach((card) => {
  card.addEventListener("click", () => {
    window.dispatchEvent(
      new CustomEvent("project-detail-open", { detail: { id: card.id } })
    );
  });
});
