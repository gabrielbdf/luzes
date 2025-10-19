import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import vertexShader from '../shaders/flame.vert';
import fragmentShader from '../shaders/flame.frag';

const AnimatedFlame: React.FC<{ color: string; position: [number, number, number]; rotateDeg?: number }> = ({ color, position, rotateDeg = 0 }) => {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  const material = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(color) },
        brightness: { value: 2.0 },
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
  }, [color]);

  useFrame((state) => {
    material.uniforms.time.value = state.clock.getElapsedTime();
    // update color uniform in case prop changes
    material.uniforms.color.value.set(color as any);
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

export const TemperatureContent: React.FC = () => (
  <div className="flex flex-col items-center text-center">
    <div className="w-full max-w-md my-4 h-48 relative">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <AnimatedFlame color="#3b82f6" position={[-2.2, 0, 1]} rotateDeg={180} />
        <AnimatedFlame color="#f59e0b" position={[2.2, 0, 1]} rotateDeg={180} />
      </Canvas>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-8 text-white text-sm">
        <span>Mais Quente</span>
        <span>Menos Quente</span>
      </div>
    </div>
    <p className="mt-4">Assim como a chama azul de um fogão é mais quente que a amarela, a minha cor amarelada me coloca em uma temperatura de...</p>
    <p className="text-5xl font-black-ops text-yellow-300 my-4">5.500 °C</p>
  </div>
);

export const CompositionContent: React.FC = () => (
  <div className="flex flex-col items-center text-center">
     <div className="w-full h-12 rounded-lg my-4 bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 relative overflow-hidden">
        <div className="absolute top-0 left-[20%] w-1 h-full bg-black"></div>
        <div className="absolute top-0 left-[35%] w-0.5 h-full bg-black"></div>
        <div className="absolute top-0 left-[50%] w-1 h-full bg-black"></div>
        <div className="absolute top-0 left-[70%] w-1.5 h-full bg-black"></div>
        <div className="absolute top-0 left-[85%] w-0.5 h-full bg-black"></div>
    </div>
    <p className="mt-2">Este é o meu espectro de luz, a minha "impressão digital". As linhas escuras mostram do que sou feito:</p>
    <div className="flex justify-around w-full mt-4">
        <div className="text-center">
            <p className="text-4xl font-bold text-blue-300">74%</p>
            <p className="text-xl">Hidrogênio</p>
        </div>
        <div className="text-center">
            <p className="text-4xl font-bold text-red-300">24%</p>
            <p className="text-xl">Hélio</p>
        </div>
    </div>
    <p className="mt-4 text-sm text-gray-400 italic">O Hélio foi nomeado a partir de 'Helios', o deus grego do Sol, porque foi descoberto em mim primeiro!</p>
  </div>
);

export const NeighborsContent: React.FC = () => (
  <div className="flex flex-col items-center text-center">
    <p className="mb-4">Minha luz viaja pelo sistema solar e, ao passar pela atmosfera de um planeta, alguns gases "absorvem" cores específicas.</p>
    <div className="w-full max-w-sm my-4">
        <svg viewBox="0 0 200 100" className="w-full">
           {/* Sun light source */}
           <circle cx="20" cy="50" r="10" fill="yellow"/>
           {/* Light rays */}
           <line x1="30" y1="50" x2="80" y2="50" stroke="white" strokeWidth="2" />
           {/* Planet */}
           <circle cx="100" cy="50" r="15" fill="#3b82f6" />
           <circle cx="100" cy="50" r="20" fill="#3b82f6" fillOpacity="0.3" />
           {/* Light ray after planet */}
           <line x1="120" y1="50" x2="160" y2="50" stroke="url(#fadedGradient)" strokeWidth="2"/>
           <defs>
                <linearGradient id="fadedGradient">
                    <stop offset="0%" stopColor="red"/>
                    <stop offset="50%" stopColor="green"/>
                    <stop offset="100%" stopColor="purple"/>
                </linearGradient>
           </defs>
           {/* Analyzer */}
           <rect x="170" y="40" width="20" height="20" fill="gray" />
           <text x="100" y="90" textAnchor="middle" fill="white" fontSize="8">Analisador de Espectro</text>
        </svg>
    </div>
    <p>Os cientistas analisam as "cores que faltam" para descobrir a composição da atmosfera de cada planeta. É um trabalho de detetive cósmico!</p>
  </div>
);
