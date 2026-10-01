import type { Stage } from '../types/schema';

export const stage1: Stage = {
  id: 'stage-1',
  title: 'Foundations',
  description: 'Parts of the guitar, posture, tuning, and basic fretboard navigation.',
  passMark: 0.7,
  chapterThreshold: 0.8,
  chapters: [
    {
      id: 'ch-1-1',
      title: 'Anatomy & Posture',
      summary: 'Learn the parts of the guitar and how to hold it correctly.',
      blocks: [
        { id: 'b1', type: 'text', content: 'The guitar consists of the headstock, neck, and body. Posture is critical to avoid injury.' },
        { id: 'b2', type: 'tip', content: 'Keep your back straight and your thumb anchored behind the neck.' },
        { id: 'b3', type: 'mistakes', items: ['Slouching over the guitar', 'Gripping the neck too tightly (the "death grip")'] },
        { id: 'b4', type: 'practice', items: ['Sit with the guitar', 'Check thumb placement'], minutes: 5 }
      ],
      quiz: [
        { id: 'q1', question: 'Where should your thumb be placed?', options: ['Over the top', 'Behind the neck', 'Hanging off'], correctIndex: 1 }
      ]
    },
    {
      id: 'ch-1-2',
      title: 'String Names & Tuning',
      summary: 'Memorize E A D G B e and use the interactive tuner.',
      blocks: [
        { id: 'b1', type: 'text', content: 'Standard tuning from thickest to thinnest is E A D G B e. A common mnemonic is "Eddie Ate Dynamite, Good Bye Eddie".' },
        { id: 'b2', type: 'widget', widgetType: 'stringQuiz' },
        { id: 'b3', type: 'widget', widgetType: 'tuner' },
        { id: 'b4', type: 'practice', items: ['Tune your low E string', 'Tune your A string'], minutes: 5 }
      ],
      quiz: [
        { id: 'q1', question: 'What is the thickest string?', options: ['High E', 'Low E', 'G'], correctIndex: 1 }
      ]
    }
  ],
  finalTest: [
    { id: 't1', question: 'What is the mnemonic for the guitar strings?', options: ['Eddie Ate Dynamite...', 'Every Apple Does...', 'Elephants Are...'], correctIndex: 0 },
    { id: 't2', question: 'Where is the headstock located?', options: ['Top of the neck', 'Bottom of the body', 'On the strings'], correctIndex: 0 }
  ]
};
