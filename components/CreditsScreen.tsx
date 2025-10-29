import React, { useEffect } from 'react';
import { AudioKey } from '../types';

interface CreditsScreenProps {
  onRestart: () => void;
  speak: (key: AudioKey) => void;
  narrationKey: AudioKey;
}

const CreditsScreen: React.FC<CreditsScreenProps> = ({ onRestart, speak, narrationKey }) => {
  useEffect(() => {
    speak(narrationKey);
  }, [speak, narrationKey]);

  return (
    <div id="credits-screen" className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-[#0C143E] to-[#1E295A]">
      <div id="credits-content" className="animate-fadeIn">
        <h1 id="credits-title" className="text-5xl md:text-7xl font-black-ops text-yellow-300 drop-shadow-lg">Luzes do Sistema Solar</h1>
        <p id="credits-subtitle" className="mt-8 text-2xl md:text-3xl text-gray-200">Uma Jornada pela Espectroscopia</p>
        
        <div id="credits-authors" className="mt-12 text-lg text-gray-400">
          <p>Criado por:</p>
          <p className="text-xl text-white mt-2">[Seu Nome / Nome da Equipe]</p>
        </div>

        <p id="credits-tagline" className="mt-16 text-2xl text-yellow-400 animate-pulse">
            O universo está cheio de segredos esperando para serem descobertos.
        </p>

        <button
          id="restart-button"
          onClick={onRestart}
          className="mt-12 px-10 py-5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-2xl font-bold rounded-full shadow-lg transition-transform hover:scale-105"
        >
          Explorar Novamente
        </button>
      </div>
    </div>
  );
};

export default CreditsScreen;
