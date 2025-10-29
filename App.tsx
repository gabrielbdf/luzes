import React, { useState, useEffect, useCallback } from 'react';
import { Screen, Topic, AudioKey } from './types';
import SplashScreen from './components/SplashScreen';
import MainScreen from './components/MainScreen';
import InfoPopup from './components/InfoPopup';
import Quiz from './components/Quiz';
import CreditsScreen from './components/CreditsScreen';
import SunNarrator from './components/SunNarrator';
import { useNarration } from './hooks/useNarration';
import { TemperatureContent, CompositionContent, NeighborsContent } from './components/TopicContents';
import './sun-narrator.css';

const App: React.FC = () => {
  const skipSplash = window.location.search.includes('skipSplash');
  const [currentScreen, setCurrentScreen] = useState<Screen>(skipSplash ? Screen.Main : Screen.Splash);
  const [activePopup, setActivePopup] = useState<Topic | null>(null);
  const [visitedTopics, setVisitedTopics] = useState<Set<Topic>>(new Set());
  const { speak, cancel, clearNarration, isSpeaking, currentNarrationText, currentWordTimings, currentTime } = useNarration();
  const [stars, setStars] = useState<Array<{id: number; x: number; y: number; duration: number; delay: number}>>([]);

  const isTopicUnlocked = (topic: Topic): boolean => {
    switch (topic) {
      case Topic.Temperature:
        return true; // Always unlocked
      case Topic.Composition:
        return visitedTopics.has(Topic.Temperature); // Unlocked after Temperature
      case Topic.Neighbors:
        return visitedTopics.has(Topic.Composition); // Unlocked after Composition
    }
  };

  const handleTopicSelect = useCallback((topic: Topic) => {
    if (!isTopicUnlocked(topic)) return;
    setVisitedTopics(prev => new Set(prev).add(topic));
    setActivePopup(topic);
  }, [visitedTopics]);

  const handleClosePopup = () => {
    cancel();
    clearNarration();
    setActivePopup(null);
  };

  const handleStartQuiz = () => {
    setCurrentScreen(Screen.Quiz);
  };
  
  const handleQuizComplete = () => {
    setCurrentScreen(Screen.Credits);
  };
  
  const handleRestart = () => {
    setVisitedTopics(new Set());
    setActivePopup(null);
    setCurrentScreen(Screen.Splash);
  };

  useEffect(() => {
    // Cleanup speech on component unmount
    return () => cancel();
  }, [cancel]);

  useEffect(() => {
    // Generate stars
    const starsArray = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2
    }));
    setStars(starsArray);
  }, []);

  const renderPopup = () => {
    if (!activePopup) return null;

    const contentMap: Record<Topic, { title: string; content: React.ReactNode; narrationKey: AudioKey; }> = {
      [Topic.Temperature]: {
        title: "Minha Temperatura",
        content: <TemperatureContent />,
        narrationKey: 'temperatureTopic'
      },
      [Topic.Composition]: {
        title: "Do que sou feito?",
        content: <CompositionContent />,
        narrationKey: 'compositionTopic'
      },
      [Topic.Neighbors]: {
        title: "Meus Vizinhos",
        content: <NeighborsContent />,
        narrationKey: 'neighborsTopic'
      }
    };
    
    const { title, content, narrationKey } = contentMap[activePopup];

    return (
      <InfoPopup 
        title={title} 
        onClose={handleClosePopup} 
        narrationKey={narrationKey} 
        speak={speak} 
        currentNarrationText={currentNarrationText}
        currentWordTimings={currentWordTimings}
        currentTime={currentTime}
      >
        {content}
      </InfoPopup>
    );
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.Splash:
        return <SplashScreen onComplete={() => setCurrentScreen(Screen.Main)} />;
      case Screen.Main:
        return (
          <MainScreen
            onTopicSelect={handleTopicSelect}
            onStartQuiz={handleStartQuiz}
            visitedTopics={visitedTopics}
            isTopicUnlocked={isTopicUnlocked}
            speak={speak}
            narrationKey="mainScreenWelcome"
            currentNarrationText={currentNarrationText}
            currentWordTimings={currentWordTimings}
            currentTime={currentTime}
          />
        );
      case Screen.Quiz:
        return <Quiz onComplete={handleQuizComplete} speak={speak} />;
      case Screen.Credits:
        return <CreditsScreen onRestart={handleRestart} speak={speak} narrationKey="credits" />;
      default:
        return <SplashScreen onComplete={() => setCurrentScreen(Screen.Main)} />;
    }
  };

  return (
        <div className="w-screen h-screen text-white overflow-hidden relative">
      {/* Starry background */}
      <div className="starry-background">
        {stars.map(star => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              '--duration': `${star.duration}s`,
              '--delay': `${star.delay}s`
            } as React.CSSProperties & {
              '--duration': string;
              '--delay': string;
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {renderScreen()}
        {renderPopup()}
      </div>
      
      <SunNarrator isSpeaking={currentScreen === Screen.Quiz ? false : isSpeaking} />
    </div>
  );
};

export default App;
