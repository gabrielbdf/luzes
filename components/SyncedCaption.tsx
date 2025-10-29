import React, { useMemo } from 'react';
import { WordTiming } from '../types';

interface SyncedCaptionProps {
  wordTimings: WordTiming[];
  currentTime: number;
  fullText: string;
}

const SyncedCaption: React.FC<SyncedCaptionProps> = ({ wordTimings, currentTime, fullText }) => {
  // Se não houver timings, mostrar o texto completo
  if (!wordTimings || wordTimings.length === 0) {
    return (
      <div className="w-full max-w-2xl mt-4 bg-black/80 rounded-lg p-4 border-2 border-blue-400/50 text-white text-sm md:text-base leading-relaxed min-h-[60px] flex items-center">
        <p className="italic text-gray-300">{fullText}</p>
      </div>
    );
  }

  // Encontrar quais palavras devem ser mostradas
  const visibleWords = useMemo(() => {
    return wordTimings.filter((timing) => currentTime >= timing.start);
  }, [wordTimings, currentTime]);

  // Encontrar a palavra atual (destacada)
  const currentWord = useMemo(() => {
    return wordTimings.find(
      (timing) => currentTime >= timing.start && currentTime < timing.end
    );
  }, [wordTimings, currentTime]);

  return (
    <div className="w-full max-w-2xl mt-4 bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-lg p-4 border-2 border-blue-400/50 text-white text-sm md:text-base leading-relaxed min-h-[60px] flex items-center">
      <p className="italic text-gray-300">
        {visibleWords.map((timing, idx) => (
          <span
            key={idx}
            className={`transition-all duration-100 ${
              currentWord && currentWord.word === timing.word
                ? 'text-yellow-300 font-bold scale-110 drop-shadow-lg'
                : 'text-gray-300'
            }`}
          >
            {timing.word}{' '}
          </span>
        ))}
      </p>
    </div>
  );
};

export default SyncedCaption;
