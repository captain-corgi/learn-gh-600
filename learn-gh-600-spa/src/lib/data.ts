// =========================================================================
// Captain Corgi Hub — Data Loading Utilities
// Lazy-loads exam question data to keep initial bundle small
// =========================================================================

import type { Exam, Question, Domain } from './types';

// ---------- Static Imports (small files) ----------
import examsCatalog from '@/data/exams.json';

// Question data files (imported eagerly since Vite needs resolvable paths)
import mock1 from '@/data/questions/mock-1.json';
import mock2 from '@/data/questions/mock-2.json';
import mock3 from '@/data/questions/mock-3.json';
import mock4 from '@/data/questions/mock-4.json';
import mock5 from '@/data/questions/mock-5.json';
import mock6 from '@/data/questions/mock-6.json';
import practice1 from '@/data/questions/practice-1.json';
import practice2 from '@/data/questions/practice-2.json';
import practice3 from '@/data/questions/practice-3.json';
import practice4 from '@/data/questions/practice-4.json';
import practice5 from '@/data/questions/practice-5.json';
import practice6 from '@/data/questions/practice-6.json';
import practice7 from '@/data/questions/practice-7.json';

// ---------- Question Data Map ----------
const examDataMap: Record<string, Exam> = {
  'mock-1': mock1 as unknown as Exam,
  'mock-2': mock2 as unknown as Exam,
  'mock-3': mock3 as unknown as Exam,
  'mock-4': mock4 as unknown as Exam,
  'mock-5': mock5 as unknown as Exam,
  'mock-6': mock6 as unknown as Exam,
  'practice-1': practice1 as unknown as Exam,
  'practice-2': practice2 as unknown as Exam,
  'practice-3': practice3 as unknown as Exam,
  'practice-4': practice4 as unknown as Exam,
  'practice-5': practice5 as unknown as Exam,
  'practice-6': practice6 as unknown as Exam,
  'practice-7': practice7 as unknown as Exam,
};

// ---------- Domain Definitions ----------
export const DOMAINS: Domain[] = [
  {
    id: 0, icon: '🏗️', name: 'Architecture & SDLC', weight: '15–20%',
    description: 'Structure agent systems, integrate them into the SDLC, define the planning/execution boundary, configure observability, and right-size human oversight.',
    topics: [], quiz: [],
  },
  {
    id: 1, icon: '🔧', name: 'Tool Use & MCP', weight: '20–25%',
    description: 'Select and configure agent tools, set up MCP servers with registries and allow lists, integrate agents into CI, and implement safe execution with robust error handling.',
    topics: [], quiz: [],
  },
  {
    id: 2, icon: '🧠', name: 'Memory, State & Execution', weight: '10–15%',
    description: 'Choose memory strategies, persist durable state, prevent context drift, and maintain task continuity — including Copilot Memory specifics tested directly on the exam.',
    topics: [], quiz: [],
  },
  {
    id: 3, icon: '📊', name: 'Evaluation & Tuning', weight: '15–20%',
    description: 'Define success signals, analyze agent failures using logs and traces, classify root causes, and tune instructions, memory, and tool access based on evidence.',
    topics: [], quiz: [],
  },
  {
    id: 4, icon: '🤝', name: 'Multi-Agent Coordination', weight: '15–20%',
    description: 'Apply orchestration patterns, configure parallel isolation, detect and resolve conflicts, manage agent lifecycles, and implement recovery in multi-agent workflows.',
    topics: [], quiz: [],
  },
  {
    id: 5, icon: '🛡️', name: 'Guardrails & Accountability', weight: '10–15%',
    description: 'Define autonomy levels by risk, implement human-in-the-loop workflows, enforce least-privilege access, block policy violations, and design complete accountability systems.',
    topics: [], quiz: [],
  },
];

// ---------- Exam Catalog ----------
export type ExamCatalogEntry = Omit<Exam, 'questions'>;

export function getExamCatalog(): ExamCatalogEntry[] {
  return examsCatalog as ExamCatalogEntry[];
}

export function getExamById(id: string): ExamCatalogEntry | undefined {
  return getExamCatalog().find((e) => e.id === id);
}

// ---------- Question Access ----------
/**
 * Get questions for a specific exam.
 * Questions are pre-loaded at bundle time for instant access.
 */
export function getExamQuestions(examId: string): Question[] {
  const exam = examDataMap[examId];
  return exam ? exam.questions : [];
}

/**
 * Get questions for a specific domain from a specific exam.
 */
export function getDomainQuestions(examId: string, domainId: number): Question[] {
  return getExamQuestions(examId).filter((q) => q.domain === domainId);
}

/**
 * Get all questions across all exams for a specific domain.
 * Useful for domain-specific quizzes. Note: iterates all exams.
 */
export function getAllDomainQuestions(domainId: number): Question[] {
  const allQuestions: Question[] = [];
  for (const exam of Object.values(examDataMap)) {
    allQuestions.push(...exam.questions.filter((q) => q.domain === domainId));
  }
  return allQuestions;
}

// ---------- Statistics ----------
export function getTotalQuestions(): number {
  return Object.values(examDataMap).reduce((sum, exam) => sum + exam.questions.length, 0);
}

export function getExamCount(): { mock: number; practice: number; total: number } {
  const catalog = getExamCatalog();
  const mock = catalog.filter((e) => e.type === 'mock').length;
  const practice = catalog.filter((e) => e.type === 'practice').length;
  return { mock, practice, total: mock + practice };
}

export function getDomainQuestionCount(domainId: number): number {
  return getAllDomainQuestions(domainId).length;
}
