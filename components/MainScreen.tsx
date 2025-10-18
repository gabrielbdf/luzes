import React, { useEffect } from 'react';
import { Topic, AudioKey } from '../types';

interface MainScreenProps {
  onTopicSelect: (topic: Topic) => void;
  onStartQuiz: () => void;
  visitedTopics: Set<Topic>;
  speak: (key: AudioKey) => void;
  narrationKey: AudioKey;
}

const SunIcon: React.FC = () => (
  <div className="relative w-full h-full animate-pulse-slow">
    <div className="absolute inset-0 rounded-full bg-yellow-400 sun-glow"></div>
    <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full bg-yellow-200 opacity-80" style={{ transform: 'translate(-20px, -10px)' }}></div>
      <div className="w-12 h-12 rounded-full bg-yellow-200 opacity-80" style={{ transform: 'translate(10px, 10px)' }}></div>
      <div className="absolute bottom-1/4 w-20 h-8 bg-yellow-100 rounded-full" style={{ clipPath: 'ellipse(50% 30% at 50% 100%)' }}></div>
    </div>
  </div>
);

const TopicButton: React.FC<{ topic: Topic; position: string; onClick: () => void; isVisited: boolean }> = ({ topic, position, onClick, isVisited }) => (
  <button
    onClick={onClick}
    className={`absolute ${position} w-28 flex flex-col items-center group transform transition-transform hover:scale-110`}
  >
    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center shadow-lg ${!isVisited ? 'animate-pulse-bright' : 'bg-opacity-50'}`}>
        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-yellow-300"></div>
    </div>
    <span className="mt-3 text-center text-base md:text-lg font-bold text-white transition-colors group-hover:text-yellow-300 drop-shadow-md">{topic}</span>
  </button>
);


const MainScreen: React.FC<MainScreenProps> = ({ onTopicSelect, onStartQuiz, visitedTopics, speak, narrationKey }) => {
  const allTopicsVisited = visitedTopics.size === 3;

  useEffect(() => {
    speak(narrationKey);
  }, [speak, narrationKey]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative p-4 md:p-8">

      <div className="flex items-center justify-center w-full my-8 md:my-16">
        <div className="relative w-56 h-56 md:w-80 md:h-80">
          <SunIcon />
          <TopicButton 
            topic={Topic.Temperature} 
            position="top-[-60px] md:top-[-120px] left-1/2 -translate-x-1/2" 
            onClick={() => onTopicSelect(Topic.Temperature)} 
            isVisited={visitedTopics.has(Topic.Temperature)} 
          />
          <TopicButton 
            topic={Topic.Composition} 
            position="top-1/2 -translate-y-1/2 left-[-110px] md:left-[-140px]" 
            onClick={() => onTopicSelect(Topic.Composition)} 
            isVisited={visitedTopics.has(Topic.Composition)} 
          />
          <TopicButton 
            topic={Topic.Neighbors} 
            position="top-1/2 -translate-y-1/2 right-[-110px] md:right-[-140px]" 
            onClick={() => onTopicSelect(Topic.Neighbors)} 
            isVisited={visitedTopics.has(Topic.Neighbors)} 
          />
        </div>
      </div>

      {allTopicsVisited && (
        <div className="mt-8 text-center animate-bounce">
          <button
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
