import React, { useState, useEffect } from 'react';
import { AudioKey } from '../types';

interface QuizProps {
  onComplete: () => void;
  speak: (key: AudioKey) => void;
}

const questions = [
  {
    question: "Esta 'impressão digital' de luz, rica em Metano, pertence a qual gigante gasoso?",
    spectrum: (
      <div className="w-full h-12 rounded-lg my-4 bg-gradient-to-r from-red-500 via-green-500 to-purple-500 relative overflow-hidden">
        <div className="absolute top-0 left-[15%] w-2 h-full bg-black"></div>
        <div className="absolute top-0 left-[60%] w-3 h-full bg-black"></div>
        <div className="absolute top-0 left-[80%] w-1.5 h-full bg-black"></div>
    </div>
    ),
    options: ["Marte", "Netuno", "Vênus"],
    correctAnswer: "Netuno",
    feedback: "Correto! A atmosfera azul de Netuno é rica em Metano, que absorve fortemente a luz vermelha, criando essas 'impressões' escuras no espectro."
  }
];

const Quiz: React.FC<QuizProps> = ({ onComplete, speak }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    speak('quizQuestion');
  }, [speak]);

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);
    if (answer === currentQuestion.correctAnswer) {
      setFeedback(currentQuestion.feedback);
      speak('quizCorrect');
    } else {
      const wrongFeedback = `Quase! A resposta correta é ${currentQuestion.correctAnswer}. A atmosfera de Netuno é rica em Metano.`;
      setFeedback(wrongFeedback);
      speak('quizWrong');
    }

    setTimeout(() => {
        onComplete();
    }, 5000);
  };

  const getButtonClass = (option: string) => {
    if (!selectedAnswer) {
      return "bg-blue-600 hover:bg-blue-500";
    }
    if (option === currentQuestion.correctAnswer) {
      return "bg-green-600 animate-pulse";
    }
    if (option === selectedAnswer) {
      return "bg-red-600";
    }
    return "bg-gray-600 opacity-50";
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-3xl bg-[#1E295A]/80 p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Detetive Espacial!</h2>
        <p className="text-xl md:text-2xl mb-6">{currentQuestion.question}</p>
        {currentQuestion.spectrum}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={!!selectedAnswer}
              className={`p-6 text-2xl font-bold rounded-lg transition-all duration-300 ${getButtonClass(option)}`}
            >
              {option}
            </button>
          ))}
        </div>
        {feedback && (
          <p className="mt-8 text-xl text-yellow-300 animate-fadeIn">{feedback}</p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
