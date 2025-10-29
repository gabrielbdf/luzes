// FIX: Removed self-import of `Screen` and `Topic` which was causing declaration conflicts.
export enum Screen {
  Splash,
  Main,
  Quiz,
  Credits,
}

export enum Topic {
  Temperature = "Minha Temperatura",
  Composition = "Do que sou feito?",
  Neighbors = "Meus Vizinhos",
}

export type AudioKey = 
  | 'mainScreenWelcome'
  | 'temperatureTopic'
  | 'compositionTopic'
  | 'neighborsTopic'
  | 'quizQuestion'
  | 'quizQuestion2'
  | 'quizQuestion3'
  | 'quizQuestion4'
  | 'quizCorrect'
  | 'quizCorrect2'
  | 'quizCorrect3'
  | 'quizCorrect4'
  | 'quizWrong'
  | 'quizWrong2'
  | 'quizWrong3'
  | 'quizWrong4'
  | 'credits';

export interface WordTiming {
  word: string;
  start: number; // tempo em segundos
  end: number;   // tempo em segundos
}