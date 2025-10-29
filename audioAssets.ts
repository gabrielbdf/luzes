// This file contains paths to audio files for playback.
// Audio files are loaded from the audios/ folder.
import { AudioKey, WordTiming } from './types';

const withBase = (file: string) => `${import.meta.env.BASE_URL}${file}`;

export const audioAssets: Record<AudioKey, { src: string; text: string; wordTimings?: WordTiming[] }> = {
  mainScreenWelcome: {
    src: withBase('audio-1.wav'),
    text: 'Olá, pessoal! Aqui é o Sol, a celebridade incandescente do sistema solar! Minha luz não é só para o show, ela é a energia vital de todos os planetas. E o melhor: meu brilho funciona como um raio-X cósmico! Vamos usá-lo para descobrir os segredos e a composição dos meus vizinhos! Preparados?',
    wordTimings: [
      { word: 'Olá, pessoal!', start: 0.0, end: 1.5 },
      { word: 'Aqui é o Sol, a celebridade incandescente do sistema solar!', start: 1.5, end: 5.0 },
      { word: 'Minha luz não é só para o show,', start: 5.0, end: 8.5 },
      { word: 'ela é a energia vital de todos os planetas.', start: 8.5, end: 12.0 },
      { word: 'E o melhor: meu brilho funciona como um raio-X cósmico!', start: 12.0, end: 16.0 },
      { word: 'Vamos usá-lo para descobrir os segredos', start: 16.0, end: 19.5 },
      { word: 'e a composição dos meus vizinhos!', start: 19.5, end: 22.5 },
      { word: 'Preparados?', start: 22.5, end: 24.0 },
    ],
  },
  temperatureTopic: {
    src: withBase('audio-2.wav'),
    text: 'Olha, aqui na minha superfície o negócio é SÉRIO: estamos falando de uns CINCO MIL E QUINHENTOS graus Celsius! É... quente o bastante pra derreter qualquer metal, tipo, fácil! Mas ó... (tom de segredo) se você se afasta de mim, a temperatura... déspenca! Fica um gelo! Bora descobrir como essa distância afeta o "clima" dos planetas!',
    wordTimings: [
      { word: 'Olha, aqui na minha superfície', start: 0.0, end: 2.5 },
      { word: 'o negócio é SÉRIO:', start: 2.5, end: 4.0 },
      { word: 'estamos falando de uns CINCO MIL E QUINHENTOS graus Celsius!', start: 4.0, end: 8.5 },
      { word: 'É... quente o bastante pra derreter qualquer metal,', start: 8.5, end: 12.5 },
      { word: 'tipo, fácil!', start: 12.5, end: 13.5 },
      { word: 'Mas ó... (tom de segredo) se você se afasta de mim,', start: 13.5, end: 18.0 },
      { word: 'a temperatura... déspenca!', start: 18.0, end: 20.0 },
      { word: 'Fica um gelo!', start: 20.0, end: 21.5 },
      { word: 'Bora descobrir como essa distância afeta', start: 21.5, end: 25.0 },
      { word: 'o "clima" dos planetas!', start: 25.0, end: 27.0 },
    ],
  },
  compositionTopic: {
    src: withBase('audio-3.wav'),
    text: 'Olha só: quando minha luz passa por um prisma, vira um arco-íris perfeito, certo? MAS... quando os cientistas analisam bem de perto, veem umas linhas escuras espalhadas aí! Essas são minhas impressões digitais cósmicas! Cada elemento químico que tem em mim deixa sua marca no meu espectro. Eu sou 74% Hidrogênio e 24% Hélio! E sabe do que é mais legal? O Hélio foi descoberto aqui em mim primeiro! Nem existia em nenhum lugar da Terra! Os pesquisadores conseguem descobrir tudo isso só olhando essas linhas escuras. É tipo um código genético do universo!',
    wordTimings: [
      { word: 'Olha só:', start: 0.0, end: 1.0 },
      { word: 'quando minha luz passa por um prisma,', start: 1.0, end: 4.0 },
      { word: 'vira um arco-íris perfeito, certo?', start: 4.0, end: 6.5 },
      { word: 'MAS...', start: 6.5, end: 7.2 },
      { word: 'quando os cientistas analisam bem de perto,', start: 7.2, end: 10.5 },
      { word: 'veem umas linhas escuras espalhadas aí!', start: 10.5, end: 13.5 },
      { word: 'Essas são minhas impressões digitais cósmicas!', start: 13.5, end: 16.5 },
      { word: 'Cada elemento químico que tem em mim', start: 16.5, end: 19.5 },
      { word: 'deixa sua marca no meu espectro.', start: 19.5, end: 22.0 },
      { word: 'Eu sou 74% Hidrogênio e 24% Hélio!', start: 22.0, end: 25.0 },
      { word: 'E sabe do que é mais legal?', start: 25.0, end: 27.5 },
      { word: 'O Hélio foi descoberto aqui em mim primeiro!', start: 27.5, end: 30.5 },
      { word: 'Nem existia em nenhum lugar da Terra!', start: 30.5, end: 33.5 },
      { word: 'Os pesquisadores conseguem descobrir tudo isso', start: 33.5, end: 36.5 },
      { word: 'só olhando essas linhas escuras.', start: 36.5, end: 38.5 },
      { word: 'É tipo um código genético do universo!', start: 38.5, end: 40.0 },
    ],
  },
  neighborsTopic: {
    src: withBase('audio-4.wav'),
    text: 'Se liga: minha luz viaja e atravessa a atmosfera dos planetas! Aí, os gases de cada um dão uma de "ladrões" e ROUBAM algumas das minhas cores! Os cientistas só olham as cores que faltam e... BINGO! Descobrem na hora do que são feitos meus vizinhos! É como se cada planeta deixasse sua "assinatura" no meu brilho! Eu sou o maior detetive!',
    wordTimings: [
      { word: 'Se liga:', start: 0.0, end: 1.0 },
      { word: 'minha luz viaja e atravessa a atmosfera dos planetas!', start: 1.0, end: 4.5 },
      { word: 'Aí, os gases de cada um dão uma de "ladrões"', start: 4.5, end: 8.0 },
      { word: 'e ROUBAM algumas das minhas cores!', start: 8.0, end: 10.5 },
      { word: 'Os cientistas só olham as cores que faltam', start: 10.5, end: 13.5 },
      { word: 'e... BINGO!', start: 13.5, end: 14.5 },
      { word: 'Descobrem na hora do que são feitos meus vizinhos!', start: 14.5, end: 18.0 },
      { word: 'É como se cada planeta deixasse sua "assinatura"', start: 18.0, end: 21.5 },
      { word: 'no meu brilho!', start: 21.5, end: 23.0 },
      { word: 'Eu sou o maior detetive!', start: 23.0, end: 25.0 },
    ],
  },
  quizQuestion: {
    src: withBase('audio-5.wav'),
    text: 'Ei, viajante estelar! Minha atmosfera rica em Metano deixa essas mordidas no meu espectro. Consegue lembrar qual gigante gasoso está falando com você?',
  },
  quizQuestion2: {
    src: withBase('audio-9.wav'),
    text: 'Aqui é um gigante turbulento! Minhas nuvens de Sódio deixam linhas gêmeas brilhando no amarelo. Quem sou eu?',
  },
  quizQuestion3: {
    src: withBase('audio-10.wav'),
    text: 'Saudações do meu deserto avermelhado! Minha atmosfera fina de dióxido de carbono engole a luz vermelha. Consegue dizer qual planeta está falando?',
  },
  quizQuestion4: {
    src: withBase('audio-11.wav'),
    text: 'Estou escondida sob nuvens de ácido sulfúrico e adoro engolir ultravioleta. Quem está chamando você agora?',
  },
  quizCorrect: {
    src: withBase('audio-6.wav'),
    text: "Correto! A atmosfera azul de Netuno é rica em Metano, que absorve fortemente a luz vermelha, criando essas impressões escuras no espectro.",
  },
  quizCorrect2: {
    src: withBase('audio-12.wav'),
    text: 'Correto! As nuvens altas de Júpiter estão cheias de Sódio, e essas linhas amarelas desaparecem rapidinho.',
  },
  quizCorrect3: {
    src: withBase('audio-13.wav'),
    text: 'Correto! O dióxido de carbono marciano engole o vermelho, deixando essa faixa larga no espectro.',
  },
  quizCorrect4: {
    src: withBase('audio-14.wav'),
    text: 'Correto! As nuvens venesianas de ácido sulfúrico devoram o ultravioleta e escondem esse pedaço de luz.',
  },
  quizWrong: {
    src: withBase('audio-7.wav'),
    text: "Quase! A resposta correta é Netuno. A atmosfera de Netuno é rica em Metano.",
  },
  quizWrong2: {
    src: withBase('audio-15.wav'),
    text: 'Quase! Era Júpiter. O Sódio das nuvens dele some com esse pedaço amarelo do meu arco-íris.',
  },
  quizWrong3: {
    src: withBase('audio-16.wav'),
    text: 'Quase! Era Marte. O CO₂ marciano suga o vermelho e abre esse vão gigante.',
  },
  quizWrong4: {
    src: withBase('audio-17.wav'),
    text: 'Quase! Era Vênus. As nuvens de ácido sulfúrico dão um banquete nesse ultravioleta.',
  },
  credits: {
    src: withBase('audio-8.wav'),
    text: "Obrigado por explorar os segredos da minha luz! Continue curioso e sempre olhe para as estrelas. Até a próxima aventura!",
  },
};
