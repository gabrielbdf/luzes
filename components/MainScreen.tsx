import React, { useEffect, useRef, useMemo } from 'react';
import { Topic, AudioKey } from '../types';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import vertexShader from '../shaders/sun.vert';
import fragmentShader from '../shaders/sun.frag';
import SyncedCaption from './SyncedCaption';

interface MainScreenProps {
  onTopicSelect: (topic: Topic) => void;
  onStartQuiz: () => void;
  visitedTopics: Set<Topic>;
  isTopicUnlocked: (topic: Topic) => boolean;
  speak: (key: AudioKey) => void;
  narrationKey: AudioKey;
  currentNarrationText?: string;
  currentWordTimings?: any[];
  currentTime?: number;
}

// Animated sun layer using the existing flame shaders
const AnimatedSunLayer: React.FC<{ color: string; size: number; speed: number; rotationOffset?: number; opacity?: number }> = ({ color, size, speed, rotationOffset = 0, opacity = 1 }) => {
  const matRef = useRef<THREE.ShaderMaterial | null>(null);

  const material = useMemo(() => {
    const m = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(color) },
        brightness: { value: 1.8 },
        opacity: { value: opacity },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    // keep glow vivid
    (m as any).toneMapped = false;
    return m;
  }, [color]);

  useFrame((state) => {
    material.uniforms.time.value = state.clock.getElapsedTime() * speed;
    material.uniforms.color.value.set(color as any);
    matRef.current = material;
  });

  return (
    <mesh rotation={[0, 0, rotationOffset]} scale={[size, size, size]}> 
      {/* use a circle geometry so the shadered layer is round, not square */}
      <circleGeometry args={[1.3, 128]} />
      <primitive object={material} />
    </mesh>
  );
};

const SunCanvas: React.FC = () => {
  return (
    <Canvas id="sun-canvas" camera={{ position: [0, 0, 6], fov: 50 }} className="absolute inset-0">
      <ambientLight intensity={0.2} />
      <pointLight intensity={1.5} distance={5} color={new THREE.Color('#ffdca8')} />
      {/* central emissive sphere to give a volumetric plasma feel */}
      <group position={[0, 0, 0]}> 
        <mesh>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshStandardMaterial emissive={'#fff4d9'} emissiveIntensity={2.2} color={'#fff8e1'} metalness={0} roughness={0.4} />
        </mesh>

        {/* layered shader planes for dynamic surface */}
        <AnimatedSunLayer color="#fff7c2" size={2.1} speed={0.6} rotationOffset={0} opacity={0.9} />
        <AnimatedSunLayer color="#ffd54f" size={1.8} speed={0.9} rotationOffset={0.3} opacity={0.8} />
        <AnimatedSunLayer color="#ffb142" size={1.7} speed={1.3} rotationOffset={0.7} opacity={0.7} />
        <AnimatedSunLayer color="#ff8a00" size={1.25} speed={1.9} rotationOffset={1.2} opacity={0.6} />

        {/* simple particle field using points to simulate sparks/plasma filaments */}
        <PointsField count={120} radius={1.6} />
      </group>
    </Canvas>
  );
};

// small points field to simulate sparks / plasma filaments
const PointsField: React.FC<{ count?: number; radius?: number }> = ({ count = 100, radius = 1.4 }) => {
  const ref = useRef<THREE.Points | null>(null);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = radius * (0.6 + Math.random() * 0.6);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi) * (0.4 + Math.random() * 0.6);
      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      sizes[i] = 1 + Math.random() * 2;
    }
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return g;
  }, [count, radius]);

  const mat = useMemo(() => {
    const m = new THREE.PointsMaterial({
      color: new THREE.Color('#ffd67a'),
      size: 0.045,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    return m;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    // pulse sizes slightly
    (ref.current.material as THREE.PointsMaterial).size = 0.03 + Math.sin(state.clock.getElapsedTime() * 3) * 0.012;
  });

  return <points ref={ref} geometry={geo} material={mat} />;
};

const TopicButton: React.FC<{ topic: Topic; position: string; onClick: () => void; isVisited: boolean; isUnlocked: boolean }> = ({ topic, position, onClick, isVisited, isUnlocked }) => (
  <button
    id={`topic-button-${topic.toLowerCase()}`}
    onClick={onClick}
    disabled={!isUnlocked}
    className={`absolute ${position} w-28 flex flex-col items-center group transform transition-transform ${isUnlocked ? 'hover:scale-110 cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
  >
    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center shadow-lg ${!isVisited ? 'animate-pulse-bright' : 'bg-opacity-50'}`}>
        <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full ${isUnlocked ? 'bg-yellow-300' : 'bg-gray-400'}`}></div>
    </div>
    <span className={`mt-3 text-center text-base md:text-lg font-bold transition-colors drop-shadow-md ${isUnlocked ? 'text-white group-hover:text-yellow-300' : 'text-gray-400'}`}>{topic}</span>
  </button>
);


const MainScreen: React.FC<MainScreenProps> = ({ onTopicSelect, onStartQuiz, visitedTopics, isTopicUnlocked, speak, narrationKey, currentNarrationText = '', currentWordTimings = [], currentTime = 0 }) => {
  const allTopicsVisited = visitedTopics.size === 3;

  useEffect(() => {
    speak(narrationKey);
  }, [speak, narrationKey]);

  return (
    <div id="main-screen" className="w-full h-full flex flex-col items-center justify-center relative p-4 md:p-8">

      <div id="sun-container" className="flex items-center justify-center w-full my-8 md:my-16">
        <div id="sun-canvas-wrapper" className="relative w-56 h-56 md:w-80 md:h-80">
          <SunCanvas />
          <TopicButton 
            topic={Topic.Temperature} 
            position="top-[-60px] md:top-[-120px] left-1/2 -translate-x-1/2" 
            onClick={() => onTopicSelect(Topic.Temperature)} 
            isVisited={visitedTopics.has(Topic.Temperature)}
            isUnlocked={isTopicUnlocked(Topic.Temperature)}
          />
          <TopicButton 
            topic={Topic.Composition} 
            position="top-1/2 -translate-y-1/2 left-[-110px] md:left-[-140px]" 
            onClick={() => onTopicSelect(Topic.Composition)} 
            isVisited={visitedTopics.has(Topic.Composition)}
            isUnlocked={isTopicUnlocked(Topic.Composition)}
          />
          <TopicButton 
            topic={Topic.Neighbors} 
            position="top-1/2 -translate-y-1/2 right-[-110px] md:right-[-140px]" 
            onClick={() => onTopicSelect(Topic.Neighbors)} 
            isVisited={visitedTopics.has(Topic.Neighbors)}
            isUnlocked={isTopicUnlocked(Topic.Neighbors)}
          />
        </div>
      </div>

      {currentNarrationText && currentWordTimings.length > 0 ? (
        <SyncedCaption 
          wordTimings={currentWordTimings} 
          currentTime={currentTime} 
          fullText={currentNarrationText} 
        />
      ) : null}

      {allTopicsVisited && (
        <div id="quiz-button-container" className="mt-8 text-center animate-bounce">
          <button
            id="start-quiz-button"
            onClick={onStartQuiz}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xl md:text-2xl font-bold rounded-full shadow-lg transition-transform hover:scale-105"
          >
            Teste seus conhecimentos!
          </button>
        </div>
      )}
    </div>
  );
};

export default MainScreen;
