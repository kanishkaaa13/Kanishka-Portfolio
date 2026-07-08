import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

const projects = [
  { name: "EXOSEEKERS", thumbnail: "/gallery/exoseekers.png", targetId: "project-exoseekers" },
  { name: "AI ASSISTANT", thumbnail: "/gallery/ai_assistant.png", targetId: "project-ai-assistant" },
  { name: "FOREST FIRE", thumbnail: "/gallery/forest_fire.png", targetId: "project-forest-fire" },
  { name: "DROPOUT SYSTEM", thumbnail: "/gallery/dropout_system.png", targetId: "project-dropout-system" },
];

export default function CurvedGallery() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 480);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Performance Guardrail: Hide and pause the background video on desktop to save resources
  useEffect(() => {
    const video = document.getElementById("hero-video");
    if (video) {
      if (isMobile) {
        (video as HTMLVideoElement).style.display = "block";
        (video as HTMLVideoElement).play().catch(() => {});
      } else {
        (video as HTMLVideoElement).style.display = "none";
        (video as HTMLVideoElement).pause();
      }
    }
  }, [isMobile]);

  if (isMobile) {
    return null;
  }

  const handleNext = () => {
    setPrevIndex(activeIndex);
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setPrevIndex(activeIndex);
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleThumbnailClick = () => {
    const targetElement = document.getElementById(projects[activeIndex].targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      targetElement.classList.add("highlight-project");
      setTimeout(() => {
        targetElement.classList.remove("highlight-project");
      }, 2000);
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas
        camera={{ position: [0, 0, 2.2], fov: 60 }}
        dpr={Math.min(window.devicePixelRatio, 2)}
        gl={{ alpha: true, antialias: true }}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Basic lighting: one ambient light + one directional light */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />

        <CurvedScreen activeIndex={activeIndex} prevIndex={prevIndex} setPrevIndex={setPrevIndex} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minAzimuthAngle={-Math.PI / 12}
          maxAzimuthAngle={Math.PI / 12}
          minPolarAngle={Math.PI / 2 - Math.PI / 24}
          maxPolarAngle={Math.PI / 2 + Math.PI / 24}
        />
      </Canvas>

      {/* DOM Navigation Overlay */}
      <div className="gallery-nav-container">
        <button className="gallery-nav-btn prev" onClick={handlePrev} aria-label="Previous Project">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div className="gallery-nav-info" onClick={handleThumbnailClick} title="Scroll to project details">
          <img src={projects[activeIndex].thumbnail} alt="" className="gallery-nav-thumb" />
          <span className="gallery-nav-label">{projects[activeIndex].name}</span>
        </div>

        <button className="gallery-nav-btn next" onClick={handleNext} aria-label="Next Project">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}

function CurvedScreen({
  activeIndex,
  prevIndex,
  setPrevIndex,
}: {
  activeIndex: number;
  prevIndex: number | null;
  setPrevIndex: (val: number | null) => void;
}) {
  // Load the 4 project images as textures
  const textures = useTexture([
    "/gallery/exoseekers.png",
    "/gallery/ai_assistant.png",
    "/gallery/forest_fire.png",
    "/gallery/dropout_system.png",
  ]);

  // Adjust texture settings for best mapping
  textures.forEach((tex) => {
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.minFilter = THREE.LinearFilter;
  });

  const meshActiveRef = useRef<THREE.Mesh>(null);
  const meshPrevRef = useRef<THREE.Mesh>(null);

  const blendRef = useRef(1);
  const rotationNudgeRef = useRef(0);
  const directionRef = useRef(1); // 1 = next, -1 = prev

  // Detect index changes to trigger transition
  const prevActiveIndexRef = useRef(activeIndex);
  useEffect(() => {
    if (activeIndex !== prevActiveIndexRef.current) {
      const diff = activeIndex - prevActiveIndexRef.current;
      directionRef.current = (diff === 1 || diff === -3) ? 1 : -1;
      
      blendRef.current = 0;
      rotationNudgeRef.current = -0.15 * directionRef.current;
      
      prevActiveIndexRef.current = activeIndex;
    }
  }, [activeIndex]);

  useFrame((state, delta) => {
    const speed = 1 / 0.7; // Transition duration ~0.7 seconds
    if (blendRef.current < 1) {
      blendRef.current = Math.min(1, blendRef.current + delta * speed);
      rotationNudgeRef.current = THREE.MathUtils.lerp(rotationNudgeRef.current, 0, delta * 8);

      // Interpolate opacity and rotation directly to optimize rendering performance
      if (meshActiveRef.current) {
        const mat = meshActiveRef.current.material as THREE.MeshStandardMaterial;
        mat.opacity = blendRef.current;
        mat.transparent = true;
        meshActiveRef.current.rotation.y = rotationNudgeRef.current;
      }

      if (meshPrevRef.current) {
        const mat = meshPrevRef.current.material as THREE.MeshStandardMaterial;
        mat.opacity = 1 - blendRef.current;
        mat.transparent = true;
        meshPrevRef.current.rotation.y = rotationNudgeRef.current;
      }
    } else {
      if (prevIndex !== null) {
        setPrevIndex(null);
      }
      if (meshActiveRef.current) {
        const mat = meshActiveRef.current.material as THREE.MeshStandardMaterial;
        mat.opacity = 1;
        mat.transparent = false;
        meshActiveRef.current.rotation.y = 0;
      }
    }
  });

  return (
    <>
      {/* Outgoing mesh fading out */}
      {prevIndex !== null && (
        <mesh ref={meshPrevRef} position={[0, 0, -0.005]}>
          <cylinderGeometry args={[5, 5, 2.2, 64, 1, true, Math.PI * 0.85, Math.PI * 0.3]} />
          <meshStandardMaterial
            map={textures[prevIndex]}
            roughness={0.4}
            metalness={0.6}
            side={THREE.DoubleSide}
            transparent={true}
            opacity={0}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Incoming mesh fading in */}
      <mesh ref={meshActiveRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[5, 5, 2.2, 64, 1, true, Math.PI * 0.85, Math.PI * 0.3]} />
        <meshStandardMaterial
          map={textures[activeIndex]}
          roughness={0.4}
          metalness={0.6}
          side={THREE.DoubleSide}
          transparent={blendRef.current < 1}
          opacity={1}
        />
      </mesh>
    </>
  );
}
