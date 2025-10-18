import React, { useState, useEffect, useCallback } from 'react';
import { Screen, Topic, AudioKey } from './types';
import SplashScreen from './components/SplashScreen';
import MainScreen from './components/MainScreen';
import InfoPopup from './components/InfoPopup';
import Quiz from './components/Quiz';
import CreditsScreen from './components/CreditsScreen';
import { useNarration } from './hooks/useNarration';
import { TemperatureContent, CompositionContent, NeighborsContent } from './components/TopicContents';

const App: React.FC = () => {
  const skipSplash = window.location.search.includes('skipSplash');
  const [currentScreen, setCurrentScreen] = useState<Screen>(skipSplash ? Screen.Main : Screen.Splash);
  const [activePopup, setActivePopup] = useState<Topic | null>(null);
  const [visitedTopics, setVisitedTopics] = useState<Set<Topic>>(new Set());
  const { speak, cancel } = useNarration();

  const handleTopicSelect = useCallback((topic: Topic) => {
    setVisitedTopics(prev => new Set(prev).add(topic));
    setActivePopup(topic);
  }, []);

  const handleClosePopup = () => {
    cancel();
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
      <InfoPopup title={title} onClose={handleClosePopup} narrationKey={narrationKey} speak={speak}>
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
            speak={speak}
            narrationKey="mainScreenWelcome"
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
    <div className="w-screen h-screen bg-[#0C143E] text-white overflow-hidden">
      {renderScreen()}
      {renderPopup()}
    </div>
  );
};

export default App;
