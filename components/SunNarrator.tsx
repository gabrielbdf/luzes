import React, { useState, useRef, useEffect } from 'react';
import '../sun-narrator.css';

interface SunNarratorProps {
  isSpeaking: boolean;
}

const SunNarrator: React.FC<SunNarratorProps> = ({ isSpeaking }) => {
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPosition({ x: window.innerWidth - 120, y: 40 });
  }, []);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - startX,
        y: e.clientY - startY,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <>
      <div
        id="sun-narrator"
        ref={dragRef}
        className={`fixed w-24 h-24 bg-gradient-to-br from-yellow-100 via-yellow-300 to-amber-400 rounded-full flex flex-col items-center justify-center cursor-move select-none shadow-2xl z-50 ${isDragging ? 'scale-110' : isSpeaking ? 'animate-bounce' : 'hover:scale-105'}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: isDragging ? 'none' : 'all 0.3s ease',
          boxShadow: '0 0 30px rgba(253, 224, 71, 0.7), 0 10px 30px rgba(0, 0, 0, 0.2)',
          border: '3px solid rgba(253, 185, 19, 0.8)',
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Lacinho na frente */}
        <svg 
          width="50" 
          height="30" 
          viewBox="0 0 50 30" 
          className="absolute pointer-events-none"
          style={{ width: '62px', height: '36px', top: '-10px', left: '50%', transform: 'translateX(-50%)', zIndex: 99 }}
        >
          {/* Fita esquerda do lacinho */}
          <path d="M 15 15 Q 10 8 8 5 Q 7 3 10 2 Q 15 1 18 10" fill="#FF69B4" stroke="#FF1493" strokeWidth="1" />
          {/* Fita direita do lacinho */}
          <path d="M 35 15 Q 40 8 42 5 Q 43 3 40 2 Q 35 1 32 10" fill="#FF69B4" stroke="#FF1493" strokeWidth="1" />
          {/* Centro do lacinho */}
          <circle cx="25" cy="13" r="4" fill="#FF69B4" stroke="#FF1493" strokeWidth="1" />
        </svg>

        {/* Cabelo loiro encaracolado comprido - laterais e topo */}
        <svg 
          width="120" 
          height="140" 
          viewBox="0 0 120 140" 
          className="absolute top-0 left-1/2 transform -translate-x-1/2 pointer-events-none"
          style={{ width: '130px', height: '140px' }}
        >
          {/* Cachos no topo - centro */}
          <circle cx="50" cy="8" r="6" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" />
          <circle cx="60" cy="6" r="5.5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" />
          <circle cx="40" cy="6" r="5.5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" />
          <circle cx="55" cy="10" r="4.5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.9" />
          <circle cx="45" cy="10" r="4.5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.9" />
          <circle cx="70" cy="8" r="5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.85" />
          <circle cx="30" cy="8" r="5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.85" />
          
          {/* Cachos no topo - laterais */}
          <circle cx="25" cy="10" r="5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" />
          <circle cx="95" cy="10" r="5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" />
          <circle cx="30" cy="16" r="4.5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.9" />
          <circle cx="90" cy="16" r="4.5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.9" />
          <circle cx="20" cy="14" r="4" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.85" />
          <circle cx="100" cy="14" r="4" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.85" />
          
          {/* Cacho esquerdo - mais cheio */}
          <circle cx="8" cy="20" r="5.5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" />
          <circle cx="5" cy="38" r="5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" />
          <circle cx="6" cy="56" r="5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" />
          <circle cx="8" cy="74" r="5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" />
          <circle cx="6" cy="92" r="4.5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" />
          <circle cx="7" cy="110" r="4" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.9" />
          {/* Cachos laterais esquerdo - volume extra */}
          <circle cx="15" cy="28" r="4.5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.9" />
          <circle cx="12" cy="46" r="4.5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.9" />
          <circle cx="13" cy="64" r="4.5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.9" />
          <circle cx="15" cy="82" r="4" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.85" />
          {/* Mais cachos esquerdo - preenchimento extra */}
          <circle cx="2" cy="20" r="4" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.85" />
          <circle cx="0" cy="38" r="3.5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.8" />
          <circle cx="1" cy="56" r="3.5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.8" />
          <circle cx="10" cy="47" r="3.5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.8" />
          {/* Mais cachos esquerdo - segunda fileira */}
          <circle cx="20" cy="34" r="4" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.8" />
          <circle cx="18" cy="52" r="4" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.8" />
          <circle cx="19" cy="70" r="3.5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.75" />
          
          {/* Cacho direito - mais cheio */}
          <circle cx="112" cy="20" r="5.5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" />
          <circle cx="115" cy="38" r="5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" />
          <circle cx="114" cy="56" r="5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" />
          <circle cx="112" cy="74" r="5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" />
          <circle cx="114" cy="92" r="4.5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" />
          <circle cx="113" cy="110" r="4" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.9" />
          {/* Cachos laterais direito - volume extra */}
          <circle cx="105" cy="28" r="4.5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.9" />
          <circle cx="108" cy="46" r="4.5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.9" />
          <circle cx="107" cy="64" r="4.5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.9" />
          <circle cx="105" cy="82" r="4" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.85" />
          {/* Mais cachos direito - preenchimento extra */}
          <circle cx="118" cy="20" r="4" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.85" />
          <circle cx="120" cy="38" r="3.5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.8" />
          <circle cx="119" cy="56" r="3.5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.8" />
          <circle cx="110" cy="47" r="3.5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.8" />
          {/* Mais cachos direito - segunda fileira */}
          <circle cx="100" cy="34" r="4" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.8" />
          <circle cx="102" cy="52" r="4" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.8" />
          <circle cx="101" cy="70" r="3.5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" opacity="0.75" />
        </svg>

        {/* Olhos grandes, femininos e com cílios */}
        <div className="flex gap-6 mb-3 mt-2">
          <div className="flex flex-col items-center">
            {/* Cílios superiores */}
            <div className={`flex gap-1 justify-center mb-1 transition-all duration-100 ${isBlinking ? 'scale-y-0' : 'scale-y-100'}`}>
              <div className="w-0.5 h-2 bg-black" />
              <div className="w-0.5 h-2.5 bg-black" />
              <div className="w-0.5 h-2 bg-black" />
            </div>
            {/* Olho */}
            <div className={`w-4 bg-green-500 rounded-full flex items-center justify-center transition-all duration-100 ${isBlinking ? 'h-0.5' : 'h-4.5'}`}>
              <div className={`w-2 bg-white rounded-full transition-all duration-100 ${isBlinking ? 'h-0' : 'h-2.5'}`} />
              <div className={`w-1 bg-black rounded-full absolute transition-all duration-100 ${isBlinking ? 'h-0' : 'h-1.5'}`} />
            </div>
            {/* Cílios inferiores */}
            <div className={`flex gap-1 justify-center mt-1 transition-all duration-100 ${isBlinking ? 'scale-y-0' : 'scale-y-100'}`}>
              <div className="w-0.5 h-1 bg-black" />
              <div className="w-0.5 h-1.5 bg-black" />
              <div className="w-0.5 h-1 bg-black" />
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            {/* Cílios superiores */}
            <div className={`flex gap-1 justify-center mb-1 transition-all duration-100 ${isBlinking ? 'scale-y-0' : 'scale-y-100'}`}>
              <div className="w-0.5 h-2 bg-black" />
              <div className="w-0.5 h-2.5 bg-black" />
              <div className="w-0.5 h-2 bg-black" />
            </div>
            {/* Olho */}
            <div className={`w-4 bg-green-500 rounded-full flex items-center justify-center transition-all duration-100 ${isBlinking ? 'h-0.5' : 'h-4.5'}`}>
              <div className={`w-2 bg-white rounded-full transition-all duration-100 ${isBlinking ? 'h-0' : 'h-2.5'}`} />
              <div className={`w-1 bg-black rounded-full absolute transition-all duration-100 ${isBlinking ? 'h-0' : 'h-1.5'}`} />
            </div>
            {/* Cílios inferiores */}
            <div className={`flex gap-1 justify-center mt-1 transition-all duration-100 ${isBlinking ? 'scale-y-0' : 'scale-y-100'}`}>
              <div className="w-0.5 h-1 bg-black" />
              <div className="w-0.5 h-1.5 bg-black" />
              <div className="w-0.5 h-1 bg-black" />
            </div>
          </div>
        </div>
        
        {/* Boca feminina e expressiva */}
        {isSpeaking ? (
          <div className="flex gap-1 items-end mt-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
            <div 
              className="w-3 bg-red-500 rounded-b-3xl"
              style={{
                height: '1rem',
                animation: 'mouthTalk 0.4s ease-in-out infinite',
              }}
            />
            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
        ) : (
          <div className="flex items-center justify-center mt-2">
            {/* Sorriso feliz - invertido para parecer realmente alegre */}
            <svg width="26" height="14" viewBox="0 0 26 14" className="fill-none stroke-red-400" strokeWidth="2" strokeLinecap="round">
              <path d="M 3 4 Q 13 11 23 4" />
            </svg>
          </div>
        )}
      </div>
    </>
  );
};

export default SunNarrator;