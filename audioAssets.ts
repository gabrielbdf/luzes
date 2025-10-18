// This file contains paths to audio files for playback.
// Audio files are loaded from the audios/ folder.
import { AudioKey } from './types';

export const audioAssets: Record<AudioKey, string> = {
  mainScreenWelcome: './public/audio-1.wav',
  temperatureTopic: './public/audio-2.wav',
  compositionTopic:
    '// PLACEHOLDER: Base64 encoded audio for: "Quando minha luz passa por um prisma, ela mostra um arco-íris com linhas escuras. Essas linhas são as impressões digitais dos elementos químicos que me formam. Sou feito principalmente de Hidrogênio e Hélio. Curiosidade: o Hélio foi descoberto em mim antes de ser encontrado na Terra!"',
  neighborsTopic:
    '// PLACEHOLDER: Base64 encoded audio for: "A minha luz viaja pelo espaço e atravessa a atmosfera dos planetas. Os gases de cada planeta roubam algumas cores da minha luz. Analisando as cores que faltam, os cientistas descobrem do que são feitas as atmosferas dos meus vizinhos! É como se cada planeta deixasse sua assinatura na minha luz."',
  quizQuestion:
    '// PLACEHOLDER: Base64 encoded audio for: "Vamos testar seus conhecimentos! Esta impressão digital de luz, rica em Metano, pertence a qual gigante gasoso?"',
  quizCorrect:
    '// PLACEHOLDER: Base64 encoded audio for: "Correto! A atmosfera azul de Netuno é rica em Metano, que absorve fortemente a luz vermelha, criando essas impressões escuras no espectro."',
  quizWrong:
    '// PLACEHOLDER: Base64 encoded audio for: "Quase! A resposta correta é Netuno. A atmosfera de Netuno é rica em Metano."',
  credits:
    '// PLACEHOLDER: Base64 encoded audio for: "Obrigado por explorar os segredos da minha luz! Continue curioso e sempre olhe para as estrelas. Até a próxima aventura!"',
};
