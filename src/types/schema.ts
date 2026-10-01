export type BlockType = 'text' | 'tip' | 'mistakes' | 'practice' | 'widget';

export interface Block {
  id: string;
  type: BlockType;
  content?: string;
  items?: string[];
  minutes?: number;
  widgetType?: 'tuner' | 'fretboard' | 'stringQuiz';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Chapter {
  id: string;
  title: string;
  summary: string;
  blocks: Block[];
  quiz: QuizQuestion[];
}

export interface Stage {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
  finalTest: QuizQuestion[];
  passMark: number;
  chapterThreshold: number;
}

export interface StageProgress {
  status: 'locked' | 'unlocked' | 'completed';
  chaptersCompleted: string[];
  testScore: number | null;
}

export interface UserProgress {
  streak: number;
  lastActiveDate: string;
  totalPracticeTimeMs: number;
  stageProgress: Record<string, StageProgress>;
}
