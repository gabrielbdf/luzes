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
  | 'quizCorrect'
  | 'quizWrong'
  | 'credits';