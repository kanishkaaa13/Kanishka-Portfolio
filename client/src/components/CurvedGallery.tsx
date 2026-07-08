import { useState, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export default function CurvedGallery() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 480);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return null;
  }

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas
        camera={{ position: [0, 0, 2.2], fov: 60 }}
        dpr={Math.min(window.devicePixelRatio, 2)}
        gl={{ alpha: true, antialias: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={0.4} />
        <pointLight position={[0, -2, 2]} intensity={0.6} color="#7c5cbf" />

        <CurvedScreen />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minAzimuthAngle={-Math.PI / 12}
          maxAzimuthAngle={Math.PI / 12}
          minPolarAngle={Math.PI / 2 - Math.PI / 24}
          maxPolarAngle={Math.PI / 2 + Math.PI / 24}
        />
      </Canvas>
    </div>
  );
}

function CurvedScreen() {
  // Generate a procedural gradient canvas texture
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, 512, 0);
      grad.addColorStop(0, "#7c5cbf"); // purple
      grad.addColorStop(0.5, "#e91e7a"); // pink
      grad.addColorStop(1, "#d97706"); // gold
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 256);

      // White overlay lines for alignment and grid visibility
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 3;
      
      // Draw grid
      for (let i = 0; i <= 512; i += 64) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 256);
        ctx.stroke();
      }
      for (let j = 0; j <= 256; j += 64) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(512, j);
        ctx.stroke();
      }

      // Add simple placeholder text inside
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 20px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("[ 3D Gallery Scaffold ]", 256, 128);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }, []);

  return (
    <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
      {/* 
        A cylinder geometry segment centered at origin.
        Arguments: 
        radiusTop: 5, radiusBottom: 5, height: 2.2, 
        radialSegments: 64, heightSegments: 1, openEnded: true,
        thetaStart: Math.PI * 1.35, thetaLength: Math.PI * 0.3
      */}
      <cylinderGeometry args={[5, 5, 2.2, 64, 1, true, Math.PI * 1.35, Math.PI * 0.3]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.4}
        metalness={0.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
