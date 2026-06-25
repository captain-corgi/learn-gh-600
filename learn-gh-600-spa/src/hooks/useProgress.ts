// =========================================================================
// Captain Corgi Hub — useProgress Hook
// localStorage persistence for user progress tracking
// =========================================================================

import { useState, useCallback, useEffect } from 'react';
import type { UserProgress, QuizScore, ExamAttempt } from '@/lib/types';
import { createQuizScore } from '@/lib/scoring';

const STORAGE_KEY = 'captain-corgi-progress';

function getDefaultProgress(): UserProgress {
  return {
    studyPlan: {
      completedDomains: [],
      currentDomain: 0,
      quizScores: {},
    },
    exams: {
      completed: [],
      bestScores: {},
    },
    labs: {
      completed: [],
    },
    overall: {
      totalQuestionsAnswered: 0,
      totalCorrect: 0,
      studyStreak: 0,
      lastVisit: new Date().toISOString(),
    },
  };
}

function loadProgress(): UserProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as UserProgress;
      // Merge with defaults to handle schema evolution
      return { ...getDefaultProgress(), ...parsed };
    }
  } catch {
    // localStorage not available or corrupt
  }
  return getDefaultProgress();
}

function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // localStorage not available
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(loadProgress);

  // Persist on every change
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Update study streak on visit
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastVisit = progress.overall.lastVisit.split('T')[0];

    if (lastVisit !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const isConsecutive = lastVisit === yesterday;

      setProgress((prev) => ({
        ...prev,
        overall: {
          ...prev.overall,
          studyStreak: isConsecutive ? prev.overall.studyStreak + 1 : 1,
          lastVisit: new Date().toISOString(),
        },
      }));
    }
  }, []); // Only run on mount

  const updateDomainQuiz = useCallback((domainId: number, score: QuizScore) => {
    setProgress((prev) => {
      const newQuizScores = { ...prev.studyPlan.quizScores, [domainId]: score };
      const completedDomains = score.passed
        ? [...new Set([...prev.studyPlan.completedDomains, domainId])]
        : prev.studyPlan.completedDomains;

      return {
        ...prev,
        studyPlan: {
          ...prev.studyPlan,
          completedDomains,
          quizScores: newQuizScores,
        },
      };
    });
  }, []);

  const recordQuizAttempt = useCallback(
    (domainId: number, correct: number, total: number) => {
      const existing = progress.studyPlan.quizScores[domainId];
      const newScore = createQuizScore(correct, total, existing);
      updateDomainQuiz(domainId, newScore);

      setProgress((prev) => ({
        ...prev,
        overall: {
          ...prev.overall,
          totalQuestionsAnswered: prev.overall.totalQuestionsAnswered + total,
          totalCorrect: prev.overall.totalCorrect + correct,
        },
      }));
    },
    [progress.studyPlan.quizScores, updateDomainQuiz]
  );

  const recordExamAttempt = useCallback((attempt: ExamAttempt) => {
    setProgress((prev) => {
      const newCompleted = [...prev.exams.completed, attempt];
      const currentBest = prev.exams.bestScores[attempt.examId] ?? 0;
      const newBest = Math.max(currentBest, attempt.score);

      return {
        ...prev,
        exams: {
          completed: newCompleted,
          bestScores: { ...prev.exams.bestScores, [attempt.examId]: newBest },
        },
        overall: {
          ...prev.overall,
          totalQuestionsAnswered: prev.overall.totalQuestionsAnswered + attempt.totalQuestions,
          totalCorrect: prev.overall.totalCorrect + attempt.score,
        },
      };
    });
  }, []);

  const markLabComplete = useCallback((labId: number) => {
    setProgress((prev) => ({
      ...prev,
      labs: {
        completed: [...new Set([...prev.labs.completed, labId])],
      },
    }));
  }, []);

  const isDomainPassed = useCallback(
    (domainId: number) => progress.studyPlan.completedDomains.includes(domainId),
    [progress.studyPlan.completedDomains]
  );

  const getDomainScore = useCallback(
    (domainId: number) => progress.studyPlan.quizScores[domainId],
    [progress.studyPlan.quizScores]
  );

  const getExamBestScore = useCallback(
    (examId: string) => progress.exams.bestScores[examId],
    [progress.exams.bestScores]
  );

  const passedCount = progress.studyPlan.completedDomains.length;
  const totalDomains = 6;
  const overallPercentage = Math.round((passedCount / totalDomains) * 100);

  return {
    progress,
    passedCount,
    totalDomains,
    overallPercentage,
    isDomainPassed,
    getDomainScore,
    getExamBestScore,
    recordQuizAttempt,
    recordExamAttempt,
    markLabComplete,
  };
}
