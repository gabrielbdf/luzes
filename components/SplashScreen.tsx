
import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCanProceed(true), 4500);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    if (canProceed) {
      onComplete();
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0C143E] animate-fadeIn cursor-pointer" onClick={handleClick}>
      <svg width="300" height="200" viewBox="0 0 300 200">
        {/* Prism */}
        <path d="M 150 50 L 120 125 L 180 125 Z" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1" />
        
        {/* White Light Beam */}
        <rect x="0" y="98" width="150" height="4" fill="white" className="light-beam" />

        {/* Rainbow Beams */}
        <rect x="150" y="99" width="150" height="2" fill="#ef4444" className="rainbow-beam" style={{ '--angle': '-15deg' } as React.CSSProperties} />
        <rect x="150" y="99" width="150" height="2" fill="#f97316" className="rainbow-beam" style={{ '--angle': '-10deg' } as React.CSSProperties} />
        <rect x="150" y="99" width="150" height="2" fill="#eab308" className="rainbow-beam" style={{ '--angle': '-5deg' } as React.CSSProperties} />
        <rect x="150" y="99" width="150" height="2" fill="#84cc16" className="rainbow-beam" style={{ '--angle': '0deg' } as React.CSSProperties} />
        <rect x="150" y="99" width="150" height="2" fill="#22c55e" className="rainbow-beam" style={{ '--angle': '5deg' } as React.CSSProperties} />
        <rect x="150" y="99" width="150" height="2" fill="#3b82f6" className="rainbow-beam" style={{ '--angle': '10deg' } as React.CSSProperties} />
        <rect x="150" y="99" width="150" height="2" fill="#8b5cf6" className="rainbow-beam" style={{ '--angle': '15deg' } as React.CSSProperties} />
      </svg>
      <p className="mt-8 text-2xl text-gray-300 tracking-widest animate-pulse">
        {canProceed ? 'Clique para continuar...' : 'Analisando a luz...'}
      </p>
    </div>
  );
};

export default SplashScreen;
