export type LanguageCategory =
  | 'english'
  | 'russian'
  | 'german'
  | 'spanish'
  | 'turkish'
  | 'french'
  | 'korean'
  | 'programming';

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export interface VocabWord {
  id: string;
  word: string;
  transcription?: string;
  translation: string;
  langCode: string; // 'en-US' | 'ru-RU' | 'de-DE' | 'es-ES' | 'tr-TR' | 'fr-FR' | 'ko-KR'
  exampleSentence: string;
  exampleTranslation: string;
  level: CEFRLevel;
  category?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface SentenceExercise {
  id: string;
  uzbekSentence: string;
  targetSentence: string;
  jumbledWords: string[];
  explanation: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  level: CEFRLevel;
  order: number;
  title: string;
  subtitle: string;
  durationMinutes: number;
  xpReward: number;
  overview: string;
  grammarRules: {
    title: string;
    description: string;
    formula?: string;
    examples: { target: string; uzbek: string; notes?: string }[];
  }[];
  dialogue?: {
    speaker: string;
    text: string;
    translation: string;
  }[];
  vocabulary: VocabWord[];
  quiz: QuizQuestion[];
  sentenceExercises?: SentenceExercise[];
  codingTask?: {
    language: 'python' | 'javascript' | 'cpp';
    instruction: string;
    starterCode: string;
    solutionCode: string;
    expectedOutput: string;
    hints: string[];
  };
}

export interface Course {
  id: string;
  name: string;
  originalName: string;
  category: LanguageCategory;
  flag: string;
  description: string;
  maxLevel: CEFRLevel;
  totalLessons: number;
  estimatedHours: number;
  lessons: Lesson[];
}

export interface CodeChallenge {
  id: string;
  title: string;
  language: 'python' | 'javascript' | 'cpp';
  difficulty: 'Oson (A1-A2)' | "O'rta (B1)" | 'Murakkab (B2)';
  description: string;
  task: string;
  starterCode: string;
  expectedOutput: string;
  testCases: { input: string; expected: string }[];
  solutionCode: string;
  xp: number;
}

export interface ConversationalConnector {
  id: string;
  category: 'fikr_bildirish' | 'rozilik_inkor' | 'boglovchilar' | 'kundalik_ibora' | 'muhokama';
  titleUzbek: string;
  patterns: {
    target: string;
    uzbek: string;
    langCode: string;
    context: string;
  }[];
}

export interface SpokenSentenceTemplate {
  id: string;
  title: string;
  language: string;
  langCode: string;
  prefix: { target: string; uzbek: string };
  middles: { target: string; uzbek: string }[];
  suffixes: { target: string; uzbek: string }[];
}

export interface UserProgress {
  completedLessonIds: string[];
  streakDays: number;
  totalXp: number;
  vocabularyMastered: string[];
  quizScores: Record<string, number>;
  codingSolvedIds: string[];
  lastStudyDate: string;
  dailyGoalMinutes: number;
  minutesStudiedToday: number;
  goalMetToday: boolean;
  weeklyActivity: { day: string; date: string; minutes: number; goal: number }[];
}
