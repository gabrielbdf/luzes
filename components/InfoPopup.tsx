import React, { useEffect, useState } from 'react';
import { AudioKey, WordTiming } from '../types';
import SyncedCaption from './SyncedCaption';

interface InfoPopupProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  narrationKey: AudioKey;
  speak: (key: AudioKey) => void;
  currentNarrationText?: string;
  currentWordTimings?: WordTiming[];
  currentTime?: number;
}

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);


const InfoPopup: React.FC<InfoPopupProps> = ({ 
  title, 
  onClose, 
  children, 
  narrationKey, 
  speak, 
  currentNarrationText = '', 
  currentWordTimings = [], 
  currentTime = 0 
}) => {

  useEffect(() => {
    speak(narrationKey);
  }, [narrationKey, speak]);

  return (
    <div id="info-popup-overlay" className="fixed inset-0 bg-black bg-opacity-70 z-50 flex flex-col items-center justify-center p-4" onClick={onClose}>
      <div 
        id="info-popup-content"
        className="relative bg-gradient-to-br from-[#1E295A] to-[#0C143E] rounded-2xl shadow-2xl w-full max-w-2xl text-white border-2 border-blue-400/50 p-8 transform transition-all animate-scale-in flex-1 max-h-[70vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button id="close-popup-button" onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <CloseIcon className="w-8 h-8" />
        </button>
        <h2 id="info-popup-title" className="text-3xl md:text-4xl font-black-ops text-center mb-6 text-yellow-300">{title}</h2>
        <div id="info-popup-body" className="text-lg text-gray-200 space-y-4">
          {children}
        </div>
      </div>
      {currentNarrationText && currentWordTimings.length > 0 ? (
        <SyncedCaption 
          wordTimings={currentWordTimings} 
          currentTime={currentTime} 
          fullText={currentNarrationText} 
        />
      ) : currentNarrationText ? (
        <div id="narration-caption" className="w-full max-w-2xl mt-4 bg-black/80 rounded-lg p-4 border-2 border-blue-400/50 text-white text-sm md:text-base leading-relaxed min-h-[60px] flex items-center">
          <p className="italic text-gray-300">{currentNarrationText}</p>
        </div>
      ) : null}
    </div>
  );
};

export default InfoPopup;
