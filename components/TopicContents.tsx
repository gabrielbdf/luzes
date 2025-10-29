import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import * as THREE from "three";
import vertexShader from "../shaders/flame.vert";
import fragmentShader from "../shaders/flame.frag";

const AnimatedFlame: React.FC<{
  color: string;
  position: [number, number, number];
  rotateDeg?: number;
  intensity?: number;
}> = ({ color, position, rotateDeg = 0, intensity = 1 }) => {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  const material = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(color) },
        brightness: { value: 2.0 * intensity },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    // prevent tone mapping from dimming additive glow
    (mat as any).toneMapped = false;
    return mat;
  }, [color, intensity]);

  useFrame((state) => {
    material.uniforms.time.value = state.clock.getElapsedTime();
    // update color uniform in case prop changes
    material.uniforms.color.value.set(color as any);
    material.uniforms.brightness.value = 2.0 * intensity;
    materialRef.current = material;
  });

  const angleRad = (rotateDeg * Math.PI) / 180;

  return (
    <mesh position={position} scale={[1.2, 2.2, 1.2]} rotation={[0, 0, angleRad]}>
      <planeGeometry args={[1, 1, 32, 64]} />
      <primitive object={material} />
    </mesh>
  );
};

// Component to animate number counter
const AnimatedCounter: React.FC<{ targetValue: number; duration: number; delay?: number; className?: string }> = ({
  targetValue,
  duration,
  delay = 0,
  className = "",
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const startTime = Date.now();
      const endTime = startTime + duration * 1000;

      const updateCounter = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / (duration * 1000), 1);
        setDisplayValue(Math.floor(progress * targetValue));

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };

      requestAnimationFrame(updateCounter);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [targetValue, duration, delay]);

  return <span className={className}>{displayValue.toLocaleString("pt-BR")}</span>;
};

export const TemperatureContent: React.FC = () => {
  return (
    <div id="temperature-content" className="flex flex-col items-center text-center">
      <div id="temperature-visualization" className="w-full max-w-md my-4 h-48 relative">
        <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <AnimatedFlame color="#3b82f6" position={[-2.2, 0, 1]} rotateDeg={180} />
          <AnimatedFlame color="#f59e0b" position={[2.2, 0, 1]} rotateDeg={180} />
        </Canvas>
        <div
          id="temperature-labels"
          className="absolute bottom-0 left-0 right-0 flex justify-between px-8 text-white text-sm opacity-100 animate-pulse"
        >
          <span>Mais Quente</span>
          <span>Menos Quente</span>
        </div>
      </div>
      <p className="mt-4 opacity-100">
        Assim como a chama azul de um fogão é mais quente que a amarela, a minha cor amarelada me coloca em uma
        temperatura superficial de aproximadamente 5.500 graus Celsius
      </p>
      <div className="relative my-4">
        <p className="text-5xl font-black-ops text-yellow-300">
          <AnimatedCounter targetValue={5500} duration={8} delay={1} />
          {" °C"}
        </p>
      </div>
    </div>
  );
};

const NeighborsVisualization: React.FC = () => {
  return (
    <motion.svg
      id="neighbors-diagram"
      viewBox="0 0 200 100"
      className="w-full"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <defs>
        <linearGradient id="fadedGradient" gradientUnits="userSpaceOnUse" x1="120" y1="50" x2="160" y2="50">
          <motion.stop
            offset="0%"
            stopColor="#fb7185"
            animate={{ stopColor: ["#fb7185", "#f97316", "#facc15", "#fb7185"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.stop
            offset="50%"
            stopColor="#4ade80"
            animate={{ stopColor: ["#22d3ee", "#f472b6", "#4ade80", "#22d3ee"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          />
          <motion.stop
            offset="100%"
            stopColor="#a855f7"
            animate={{ stopColor: ["#a855f7", "#6366f1", "#f472b6", "#a855f7"] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          />
        </linearGradient>
        <linearGradient id="analyzerGradient" gradientUnits="userSpaceOnUse" x1="180" y1="30" x2="180" y2="90">
          <stop offset="0%" stopColor="#3865f8" stopOpacity="1" />
          <stop offset="20%" stopColor="#1dacd8" stopOpacity="1" />
          <stop offset="22%" stopColor="#000000ff" stopOpacity="1" />
          <stop offset="25%" stopColor="#1dacd8" stopOpacity="1" />
          <stop offset="40%" stopColor="#1dd83c" stopOpacity="1" />
          <stop offset="42%" stopColor="#000000ff" stopOpacity="1" />
          <stop offset="50%" stopColor="#1dd83c" stopOpacity="1" />
          <stop offset="60%" stopColor="#d8d51d" stopOpacity="1" />
          <stop offset="80%" stopColor="#d83f1d" stopOpacity="1" />
          <stop offset="82%" stopColor="#000000ff" stopOpacity="1" />
          <stop offset="85%" stopColor="#d83f1d" stopOpacity="1" />
          <stop offset="100%" stopColor="#d81d49" stopOpacity="1" />
        </linearGradient>
        <radialGradient id="sunGlow" cx="20" cy="50" r="18">
          <stop offset="0%" stopColor="#fde047" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
        </radialGradient>
      </defs>
      <motion.circle
        cx="20"
        cy="50"
        r="10"
        fill="#fde047"
        animate={{ scale: [1, 1.08, 1], opacity: [0.9, 1, 0.85] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: 0.5, originY: 0.5 }}
      />
      <motion.g
        animate={{ rotate: [0, 0, 0, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: 20, originY: 50 }}
      >
        <motion.line
          x1="32"
          y1="44"
          x2="82"
          y2="42"
          stroke="#ffffff"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeDasharray="4 8"
          animate={{ strokeDashoffset: [0, -20] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
        />
        <motion.line
          x1="32"
          y1="50"
          x2="82"
          y2="49"
          stroke="#ffffff"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="2 10"
          animate={{ strokeDashoffset: [0, -24] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.4 }}
        />
        <motion.line
          x1="32"
          y1="56"
          x2="82"
          y2="58"
          stroke="#ffffff"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="3 9"
          animate={{ strokeDashoffset: [0, -18] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "linear", delay: 0.8 }}
        />
      </motion.g>
      <motion.circle
        cx="100"
        cy="50"
        r="22"
        fill="#3b82f6"
        fillOpacity="0.16"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: 0.5, originY: 0.5 }}
      />
      <motion.circle
        cx="100"
        cy="50"
        r="17"
        fill="#2563eb"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ originX: 0.5, originY: 0.5 }}
      />
      <motion.circle
        cx="100"
        cy="50"
        r="14"
        fill="#38bdf8"
        animate={{ scale: [0.98, 1.02, 0.98], opacity: [0.9, 1, 0.85] }}
        transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: 0.5, originY: 0.5 }}
      />
      <motion.line
        x1="120"
        y1="50"
        x2="160"
        y2="50"
        stroke="url(#fadedGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 6"
        animate={{ strokeDashoffset: [0, -40] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
      />
      <motion.circle
        cx="130"
        cy="50"
        r="2.5"
        fill="#facc15"
        animate={{ cx: [120, 160], opacity: [0, 1, 0.15] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.line
        x1="120"
        y1="44"
        x2="160"
        y2="44"
        stroke="#10b981"
        strokeWidth="0.6"
        strokeDasharray="2 12"
        animate={{ strokeDashoffset: [0, -32], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay: 0.4 }}
      />
      <motion.line
        x1="120"
        y1="56"
        x2="160"
        y2="56"
        stroke="#f472b6"
        strokeWidth="0.6"
        strokeDasharray="2 12"
        animate={{ strokeDashoffset: [0, -32], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay: 1.1 }}
      />
      <motion.rect
        x="170"
        y="20"
        width="22"
        height="70"
        rx="5"
        fill="url(#analyzerGradient)"
        stroke="#60a5fa"
        strokeWidth="0.8"
      />
    </motion.svg>
  );
};

export const CompositionContent: React.FC = () => (
  <div id="composition-content" className="flex flex-col items-center text-center">
    <div className="mb-4 p-4 bg-blue-900/30 rounded-lg border border-blue-400/50">
      <p className="text-sm text-blue-200">✨ Espectroscopia - O método secreto dos astrônomos:</p>
    </div>
    <div
      id="composition-spectrum"
      className="w-full h-16 rounded-lg my-4 bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 relative overflow-hidden shadow-lg"
    >
      <div className="absolute top-0 left-[20%] w-1 h-full bg-black shadow-md"></div>
      <div className="absolute top-0 left-[35%] w-0.5 h-full bg-black shadow-md"></div>
      <div className="absolute top-0 left-[50%] w-1 h-full bg-black shadow-md"></div>
      <div className="absolute top-0 left-[70%] w-1.5 h-full bg-black shadow-md"></div>
      <div className="absolute top-0 left-[85%] w-0.5 h-full bg-black shadow-md"></div>
      <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold opacity-70">
        <span>Minhas Impressões Digitais 👇</span>
      </div>
    </div>
    <p className="mt-2 text-sm text-gray-300">
      Este é o meu espectro de luz! As linhas escuras são chamadas de{" "}
      <span className="text-yellow-300 font-bold">Linhas de Fraunhofer</span> e cada uma representa um elemento
      diferente na minha composição.
    </p>
    <div id="composition-elements" className="flex justify-around w-full mt-6 gap-4">
      <div className="text-center bg-gradient-to-b from-blue-500/20 to-blue-900/20 p-4 rounded-lg flex-1">
        <p className="text-5xl font-black-ops text-blue-300 mb-1">74%</p>
        <p className="text-lg font-bold text-white">Hidrogênio</p>
        <p className="text-xs text-gray-400 mt-1">O elemento mais abundante</p>
      </div>
      <div className="text-center bg-gradient-to-b from-red-500/20 to-red-900/20 p-4 rounded-lg flex-1">
        <p className="text-5xl font-black-ops text-red-300 mb-1">24%</p>
        <p className="text-lg font-bold text-white">Hélio</p>
        <p className="text-xs text-gray-400 mt-1">Descoberto aqui primeiro!</p>
      </div>
    </div>
    <p className="mt-6 text-sm text-gray-300 bg-purple-900/30 p-3 rounded border border-purple-400/30">
      🔬{" "}
      <span className="italic">
        Os 2% restantes incluem Oxigênio, Carbono, Nitrogênio e outros elementos mais pesados!
      </span>
    </p>
  </div>
);

export const NeighborsContent: React.FC = () => (
  <div id="neighbors-content" className="flex flex-col items-center text-center">
    <p className="mb-4">
      Minha luz viaja pelo sistema solar e, ao passar pela atmosfera de um planeta, alguns gases "absorvem" cores
      específicas.
    </p>
    <div id="neighbors-visualization" className="w-full max-w-sm my-4">
      <NeighborsVisualization />
    </div>
    <p>
      Os cientistas analisam as "cores que faltam" para descobrir a composição da atmosfera de cada planeta. É um
      trabalho de detetive cósmico!
    </p>
  </div>
);
