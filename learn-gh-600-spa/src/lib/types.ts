// =========================================================================
// Captain Corgi Hub — TypeScript Type Definitions
// =========================================================================

// ---------- Question & Exam Types ----------

export interface Question {
  id: string;
  domain: number;
  domainName: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  source?: string;
  images?: string[];
}

export interface Exam {
  id: string;
  type: 'mock' | 'practice';
  title: string;
  description: string;
  timeLimit: number;
  questionCount: number;
  questions: Question[];
  metadata: {
    source: string;
    created: string;
    version: number;
  };
}

// ---------- Domain & Study Plan Types ----------

export interface Domain {
  id: number;
  icon: string;
  name: string;
  weight: string;
  description: string;
  topics: Topic[];
  quiz: Question[];
}

export interface Topic {
  id: string;
  name: string;
  icon: string;
  body: string;
  resources?: Resource[];
}

export interface Resource {
  type: 'ms' | 'gh';
  label: string;
  url: string;
}

// ---------- Lab Types ----------

export interface Lab {
  id: number;
  title: string;
  description: string;
  domain: number | null;
  weight: string;
  tools: string[];
  filePath: string;
}

// ---------- Progress Types ----------

export interface QuizScore {
  score: number;
  total: number;
  passed: boolean;
  attempts: number;
  bestScore: number;
  lastAttempt: string;
}

export interface ExamAttempt {
  examId: string;
  examType: 'mock' | 'practice';
  questions: string[];
  answers: Record<string, number>;
  score: number;
  totalQuestions: number;
  timeTaken: number;
  timeLimit: number;
  startedAt: string;
  completedAt: string;
  status: 'completed' | 'timed-out' | 'abandoned';
}

export interface UserProgress {
  studyPlan: {
    completedDomains: number[];
    currentDomain: number;
    quizScores: Record<number, QuizScore>;
  };
  exams: {
    completed: ExamAttempt[];
    bestScores: Record<string, number>;
  };
  labs: {
    completed: number[];
  };
  overall: {
    totalQuestionsAnswered: number;
    totalCorrect: number;
    studyStreak: number;
    lastVisit: string;
  };
}

// ---------- Search Types ----------

export interface SearchResult {
  id: string;
  type: 'topic' | 'question' | 'lab' | 'exam';
  title: string;
  excerpt: string;
  domain: number;
  url: string;
  score: number;
}

// ---------- Theme Types ----------

export type Theme = 'light' | 'dark' | 'night' | 'auto';

// ---------- Quiz Types ----------

export type QuizMode = 'guided' | 'review';
export type QuestionOrder = 'sequential' | 'random' | 'spaced';
export type FeedbackMode = 'instant' | 'delayed';

export interface QuizConfig {
  mode: QuizMode;
  questionCount: number;
  questionOrder: QuestionOrder;
  answerOrder: 'fixed' | 'random';
  feedbackMode: FeedbackMode;
  domainFilter: number | null;
}

// ---------- i18n Types ----------

export type Language = 'en' | 'vi';
