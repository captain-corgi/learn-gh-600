// =========================================================================
// Captain Corgi Hub — Quiz Component
// Interactive quiz with guided (one-at-a-time) and review modes
// =========================================================================

import { useState, useMemo } from 'react';
import type { Question, QuizConfig } from '@/lib/types';
import { calculateScore, calculateDomainBreakdown } from '@/lib/scoring';
import styles from './Quiz.module.css';

interface QuizProps {
  questions: Question[];
  config: QuizConfig;
  onComplete: (score: number, total: number, answers: Record<number, number>) => void;
  onCancel?: () => void;
}

export function Quiz({ questions, config, onComplete, onCancel }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Shuffle questions if needed
  const orderedQuestions = useMemo(() => {
    if (config.questionOrder === 'random') {
      return [...questions].sort(() => Math.random() - 0.5);
    }
    return questions;
  }, [questions, config.questionOrder]);

  // Limit to configured count
  const displayQuestions = useMemo(() => {
    return orderedQuestions.slice(0, config.questionCount);
  }, [orderedQuestions, config.questionCount]);

  const q = displayQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === displayQuestions.length - 1;
  const result = calculateScore(displayQuestions, answers);

  const handleAnswer = (index: number) => {
    if (config.feedbackMode === 'instant' && answers[currentQuestion] !== undefined) return;

    setAnswers((prev) => ({ ...prev, [currentQuestion]: index }));

    if (config.feedbackMode === 'instant') {
      setShowExplanation(true);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setIsComplete(true);
      onComplete(result.score, result.total, answers);
    } else {
      setCurrentQuestion((c) => c + 1);
      setShowExplanation(false);
    }
  };

  if (isComplete) {
    const domainBreakdown = calculateDomainBreakdown(displayQuestions, answers);

    return (
      <div className={styles.container}>
        <div className={styles.resultHero}>
          <div className={`${styles.score} ${result.passed ? styles.pass : styles.fail}`}>
            {result.score}/{result.total}
          </div>
          <div className={styles.verdict}>
            {result.passed ? 'Nice work — that\'s a pass!' : 'Not this time — keep going'}
          </div>
          <div className={styles.resultSub}>
            {result.percentage}% correct · Pass mark: 75%
          </div>
        </div>

        <div className={styles.domainBreakdown}>
          <div className={styles.breakdownTitle}>Score by domain</div>
          <div className={styles.domainGrid}>
            {domainBreakdown.map((d) => (
              <div key={d.domain} className={styles.domainCard}>
                <div className={styles.domainName}>{d.domainName}</div>
                <div className={styles.domainScore}>
                  {d.correct}/{d.total} ({d.percentage}%)
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={`${styles.progressFill} ${
                      d.percentage >= 75 ? styles.good : d.percentage >= 60 ? styles.medium : styles.bad
                    }`}
                    style={{ width: `${d.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {config.feedbackMode === 'delayed' && (
          <div className={styles.reviewSection}>
            <div className={styles.breakdownTitle}>Review answers</div>
            {displayQuestions.map((question, i) => {
              const chosen = answers[i];
              const isCorrect = chosen === question.correctIndex;
              const wasSkipped = chosen === undefined;

              return (
                <div
                  key={i}
                  className={`${styles.reviewQuestion} ${
                    wasSkipped ? styles.skipped : isCorrect ? styles.correct : styles.wrong
                  }`}
                >
                  <div className={styles.reviewMeta}>
                    <strong>Q{i + 1}</strong>
                    <span>{question.domainName}</span>
                    <span className={wasSkipped ? styles.skippedBadge : isCorrect ? styles.correctBadge : styles.wrongBadge}>
                      {wasSkipped ? 'Skipped' : isCorrect ? 'Correct' : 'Wrong'}
                    </span>
                  </div>
                  <div className={styles.reviewQuestionText}>{question.question}</div>
                  {question.options.map((opt, oi) => (
                    <div
                      key={oi}
                      className={`${styles.reviewOption} ${
                        oi === question.correctIndex && chosen === oi
                          ? styles.correctOption
                          : oi === chosen && !isCorrect
                          ? styles.wrongOption
                          : oi === question.correctIndex
                          ? styles.correctAnswer
                          : ''
                      }`}
                    >
                      <span className={styles.optionLetter}>{'ABCD'[oi]}.</span>
                      <span>{opt}</span>
                    </div>
                  ))}
                  <div className={styles.explanation}>
                    <strong>Explanation:</strong> {question.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className={styles.resultActions}>
          <button type="button" className={styles.primaryButton} onClick={() => onComplete(result.score, result.total, answers)}>
            Continue
          </button>
          {onCancel && (
            <button type="button" className={styles.secondaryButton} onClick={onCancel}>
              Back
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!q) {
    return <div className={styles.container}>No questions available.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.quizMeta}>
        <span>Question {currentQuestion + 1} of {displayQuestions.length}</span>
        <span>Score: {result.score}</span>
      </div>

      <div className={styles.progressBar}>
        <div
          className={`${styles.progressFill} ${styles.accent}`}
          style={{ width: `${((currentQuestion + 1) / displayQuestions.length) * 100}%` }}
        />
      </div>

      <div className={styles.questionText}>{q.question}</div>

      <div className={styles.options}>
        {q.options.map((opt, i) => {
          const isSelected = answers[currentQuestion] === i;
          const isCorrectAnswer = i === q.correctIndex;
          const showCorrect = showExplanation && isCorrectAnswer;
          const showWrong = showExplanation && isSelected && !isCorrectAnswer;

          return (
            <button
              key={i}
              type="button"
              className={`${styles.option} ${
                showCorrect ? styles.correct : showWrong ? styles.wrong : isSelected ? styles.selected : ''
              }`}
              onClick={() => handleAnswer(i)}
              disabled={showExplanation}
            >
              <span className={styles.optionLetter}>{'ABCD'[i]}</span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      {showExplanation && config.feedbackMode === 'instant' && (
        <div className={styles.explanation}>
          <strong>Explanation:</strong> {q.explanation}
        </div>
      )}

      <div className={styles.quizNav}>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => setCurrentQuestion((c) => c - 1)}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>
        <button type="button" className={styles.primaryButton} onClick={handleNext}>
          {isLastQuestion ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
}
