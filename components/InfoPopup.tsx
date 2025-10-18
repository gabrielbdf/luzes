import React, { useEffect } from 'react';
import { AudioKey } from '../types';

interface InfoPopupProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  narrationKey: AudioKey;
  speak: (key: AudioKey) => void;
}

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);


const InfoPopup: React.FC<InfoPopupProps> = ({ title, onClose, children, narrationKey, speak }) => {

  useEffect(() => {
    speak(narrationKey);
  }, [narrationKey, speak]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="relative bg-gradient-to-br from-[#1E295A] to-[#0C143E] rounded-2xl shadow-2xl w-full max-w-2xl text-white border-2 border-blue-400/50 p-8 transform transition-all animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <CloseIcon className="w-8 h-8" />
        </button>
        <h2 className="text-3xl md:text-4xl font-black-ops text-center mb-6 text-yellow-300">{title}</h2>
        <div className="text-lg text-gray-200 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default InfoPopup;
