// =========================================================================
// Captain Corgi Hub — Scoring Logic
// =========================================================================

import type { Question, QuizScore } from './types';

/** Pass threshold: 75% of questions correct */
export const PASS_THRESHOLD = 0.75;

/**
 * Calculate score from answers.
 * @param questions - The questions answered
 * @param answers - Map of question index to selected option index
 * @returns Score object with count, total, and pass status
 */
export function calculateScore(
  questions: Question[],
  answers: Record<number, number>
): { score: number; total: number; percentage: number; passed: boolean } {
  const total = questions.length;
  let correct = 0;

  questions.forEach((q, i) => {
    if (answers[i] === q.correctIndex) {
      correct++;
    }
  });

  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const passed = total > 0 && correct / total >= PASS_THRESHOLD;

  return { score: correct, total, percentage, passed };
}

/**
 * Calculate per-domain breakdown from answers.
 */
export function calculateDomainBreakdown(
  questions: Question[],
  answers: Record<number, number>
): Array<{ domain: number; domainName: string; correct: number; total: number; percentage: number }> {
  const domainMap = new Map<number, { domainName: string; correct: number; total: number }>();

  questions.forEach((q, i) => {
    const existing = domainMap.get(q.domain);
    if (existing) {
      existing.total++;
      if (answers[i] === q.correctIndex) existing.correct++;
    } else {
      domainMap.set(q.domain, {
        domainName: q.domainName,
        correct: answers[i] === q.correctIndex ? 1 : 0,
        total: 1,
      });
    }
  });

  return Array.from(domainMap.entries()).map(([domain, data]) => ({
    domain,
    domainName: data.domainName,
    correct: data.correct,
    total: data.total,
    percentage: Math.round((data.correct / data.total) * 100),
  }));
}

/**
 * Create a QuizScore from a quiz attempt.
 */
export function createQuizScore(
  score: number,
  total: number,
  existing?: QuizScore
): QuizScore {
  const passed = total > 0 && score / total >= PASS_THRESHOLD;
  const bestScore = existing ? Math.max(existing.bestScore, score) : score;

  return {
    score,
    total,
    passed,
    attempts: (existing?.attempts ?? 0) + 1,
    bestScore,
    lastAttempt: new Date().toISOString(),
  };
}
