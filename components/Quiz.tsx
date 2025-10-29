import React, { useState, useEffect, useRef } from 'react';
import { AudioKey } from '../types';

interface QuizProps {
  onComplete: () => void;
  speak: (key: AudioKey) => void;
}

interface QuizQuestion {
  question: string;
  spectrum: React.ReactNode;
  options: string[];
  correctAnswer: string;
  feedback: string;
  wrongFeedback: string;
  promptAudio: AudioKey;
  correctAudio: AudioKey;
  wrongAudio: AudioKey;
}

const questions: QuizQuestion[] = [
  {
    question: "Ei, viajante estelar! Minha atmosfera rica em Metano deixa essas mordidas no meu espectro. Consegue lembrar qual gigante gasoso está falando com você?",
    spectrum: (
      <div className="w-full h-12 rounded-lg my-4 bg-gradient-to-r from-red-500 via-green-500 to-purple-500 relative overflow-hidden">
        <div className="absolute top-0 left-[15%] w-2 h-full bg-black"></div>
        <div className="absolute top-0 left-[60%] w-3 h-full bg-black"></div>
        <div className="absolute top-0 left-[80%] w-1.5 h-full bg-black"></div>
      </div>
    ),
    options: ["Marte", "Netuno", "Vênus"],
    correctAnswer: "Netuno",
    feedback: "Correto! A atmosfera azul de Netuno é rica em Metano, que absorve fortemente a luz vermelha, criando essas 'impressões' escuras no espectro.",
    wrongFeedback: "Quase! A resposta correta é Netuno. A atmosfera de Netuno é rica em Metano.",
    promptAudio: 'quizQuestion',
    correctAudio: 'quizCorrect',
    wrongAudio: 'quizWrong'
  },
  {
    question: "Aqui é um gigante turbulento! Minhas nuvens de Sódio deixam linhas gêmeas brilhando no amarelo. Quem sou eu?",
    spectrum: (
      <div className="w-full h-12 rounded-lg my-4 bg-gradient-to-r from-indigo-600 via-blue-500 to-yellow-200 relative overflow-hidden">
        <div className="absolute top-0 left-[48%] w-1.5 h-full bg-black/80"></div>
        <div className="absolute top-0 left-[52%] w-2 h-full bg-black/80"></div>
        <div className="absolute top-0 left-[71%] w-1 h-full bg-black/70"></div>
      </div>
    ),
    options: ["Júpiter", "Mercúrio", "Urano"],
    correctAnswer: "Júpiter",
    feedback: "Correto! As nuvens altas de Júpiter são ricas em sais de Sódio que apagam essas faixas amarelas.",
    wrongFeedback: "Quase! A resposta certa é Júpiter. O Sódio joviano cria essas linhas duplas no amarelo.",
    promptAudio: 'quizQuestion2',
    correctAudio: 'quizCorrect2',
    wrongAudio: 'quizWrong2'
  },
  {
    question: "Saudações do meu deserto avermelhado! Minha atmosfera fina de dióxido de carbono engole a luz vermelha. Consegue dizer qual planeta está falando?",
    spectrum: (
      <div className="w-full h-12 rounded-lg my-4 bg-gradient-to-r from-red-700 via-orange-500 to-purple-700 relative overflow-hidden">
        <div className="absolute top-0 left-[20%] w-8 h-full bg-black/60"></div>
        <div className="absolute top-0 left-[65%] w-2 h-full bg-black/70"></div>
      </div>
    ),
    options: ["Marte", "Mercúrio", "Vênus"],
    correctAnswer: "Marte",
    feedback: "Correto! A atmosfera fina de Marte é cheia de dióxido de carbono, que engole essa parte vermelha do espectro.",
    wrongFeedback: "Quase! Era Marte. O CO₂ marciano devora a luz vermelha e abre essa faixa larga.",
    promptAudio: 'quizQuestion3',
    correctAudio: 'quizCorrect3',
    wrongAudio: 'quizWrong3'
  },
  {
    question: "Escondida sob nuvens de ácido sulfúrico, eu engulo o ultravioleta do espectro. Quem está te chamando daqui?",
    spectrum: (
      <div className="w-full h-12 rounded-lg my-4 bg-gradient-to-r from-purple-800 via-blue-600 to-teal-300 relative overflow-hidden">
        <div className="absolute top-0 left-[12%] w-3 h-full bg-black/75"></div>
        <div className="absolute top-0 left-[18%] w-2 h-full bg-black/70"></div>
        <div className="absolute top-0 left-[34%] w-2.5 h-full bg-black/80"></div>
      </div>
    ),
    options: ["Vênus", "Saturno", "Terra"],
    correctAnswer: "Vênus",
    feedback: "Correto! As nuvens espessas e ácidas de Vênus devoram o ultravioleta e deixam esse espectro misterioso.",
    wrongFeedback: "Quase! Era Vênus. O ácido sulfúrico venusiando bloqueia essas faixas de luz.",
    promptAudio: 'quizQuestion4',
    correctAudio: 'quizCorrect4',
    wrongAudio: 'quizWrong4'
  }
];

const Quiz: React.FC<QuizProps> = ({ onComplete, speak }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null); // allow cleanup if user leave early

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    speak(currentQuestion.promptAudio);
    setSelectedAnswer(null);
    setFeedback(null);
  }, [currentQuestionIndex, currentQuestion.promptAudio, speak]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);
    if (answer === currentQuestion.correctAnswer) {
      setFeedback(currentQuestion.feedback);
      speak(currentQuestion.correctAudio);
    } else {
      const wrongFeedback = currentQuestion.wrongFeedback ?? `Quase! A resposta correta é ${currentQuestion.correctAnswer}.`;
      setFeedback(wrongFeedback);
      speak(currentQuestion.wrongAudio);
    }

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    timeoutRef.current = window.setTimeout(() => {
      if (isLastQuestion) {
        onComplete();
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
      timeoutRef.current = null;
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
    <div id="quiz-screen" className="w-full h-full flex flex-col items-center justify-center p-8">
      <div id="quiz-container" className="w-full max-w-3xl bg-[#1E295A]/80 p-8 rounded-xl shadow-lg text-center">
        <h2 id="quiz-title" className="text-3xl md:text-4xl font-bold mb-4">Detetive Espacial!</h2>
        <p id="quiz-progress" className="text-lg text-indigo-200 mb-2">Pergunta {currentQuestionIndex + 1} de {questions.length}</p>
        <p id="quiz-question" className="text-xl md:text-2xl mb-6">{currentQuestion.question}</p>
        <div id="quiz-spectrum">{currentQuestion.spectrum}</div>
        <div id="quiz-options" className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
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
          <p id="quiz-feedback" className="mt-8 text-xl text-yellow-300 animate-fadeIn">{feedback}</p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
