import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import * as THREE from "three";
import { Link } from "react-router-dom";
import { Upload, Search } from "lucide-react";
import SimpleWalletConnection from "../SimpleWalletConnection";

// Custom Golden Stars Component
const GoldenStars = () => {
  const ref = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(2500 * 3);
    const colors = new Float32Array(2500 * 3);
    const goldColor = new THREE.Color("#ffee99");

    for (let i = 0; i < 2500; i++) {
      // Random positions in a sphere
      const radius = 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = Math.random() * radius;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Set gold color for each star
      colors[i * 3] = goldColor.r;
      colors[i * 3 + 1] = goldColor.g;
      colors[i * 3 + 2] = goldColor.b;
    }

    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
      ref.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.002}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  );
};

export const AuroraHero = () => {
  return (
    <motion.section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gray-950 px-4 py-24 text-gray-200">
      <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto text-center">
        <h1 className="max-w-3xl bg-gradient-to-br from-slate-400 to-slate-600 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
          Launch Your Startup Into the Future
        </h1>
        <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
          The first decentralized launchpad where innovative startups meet
          visionary investors. Submit your pitch, get funded, and build the next
          generation of groundbreaking companies.
        </p>
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/explore"
            className="text-black font-semibold py-4 px-8 rounded-xl transition-all duration-300 inline-flex items-center shadow-lg hover:opacity-80"
            style={{ background: "#ffee99" }}
          >
            <Search className="mr-2 w-5 h-5" />
            Explore Projects
            <FiArrowRight className="ml-2 w-5 h-5" />
          </Link>

          <Link
            to="/idea-input"
            className="bg-black hover:bg-gray-900 border-2 font-semibold py-4 px-8 rounded-xl transition-all duration-300 inline-flex items-center"
            style={{ borderColor: "#ffee99", color: "#ffee99" }}
          >
            <Upload className="mr-2 w-5 h-5" />
            Submit Pitch
          </Link>

          <SimpleWalletConnection variant="hero" />
        </div>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <GoldenStars />
        </Canvas>
      </div>
    </motion.section>
  );
};
