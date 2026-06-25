// =========================================================================
// Captain Corgi Hub — ExamPage
// Full exam experience with timer, quiz, and results recording
// =========================================================================

import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { getExamById, getExamQuestions } from '@/lib/data';
import { useTimer } from '@/hooks/useTimer';
import { useProgress } from '@/hooks/useProgress';
import { Quiz } from '@/components/ui/Quiz';
import { Timer } from '@/components/ui/Timer';
import type { QuizConfig } from '@/lib/types';
import styles from './ExamPage.module.css';

export function ExamPage() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { recordExamAttempt, getExamBestScore } = useProgress();

  const examMeta = examId ? getExamById(examId) : undefined;
  const allQuestions = examId ? getExamQuestions(examId) : [];

  const [phase, setPhase] = useState<'setup' | 'taking' | 'review'>('setup');
  const [config, setConfig] = useState<QuizConfig>({
    mode: 'guided',
    questionCount: allQuestions.length || 10,
    questionOrder: 'sequential',
    answerOrder: 'fixed',
    feedbackMode: 'instant',
    domainFilter: null,
  });
  const [startedAt, setStartedAt] = useState<string>('');
  const [finalScore, setFinalScore] = useState<{ score: number; total: number; answers: Record<number, number> } | null>(null);

  const questions = allQuestions.length > 0 ? allQuestions : [];

  const handleExpire = useCallback(() => {
    // Timer expired — treat as timed-out
    setPhase('review');
  }, []);

  const timer = useTimer({
    durationMinutes: examMeta?.timeLimit ?? 60,
    onExpire: handleExpire,
  });

  // Filter questions by domain if needed
  const filteredQuestions = config.domainFilter !== null
    ? questions.filter((q) => q.domain === config.domainFilter)
    : questions;

  const handleStart = () => {
    setStartedAt(new Date().toISOString());
    timer.start();
    setPhase('taking');
  };

  const handleComplete = useCallback((score: number, total: number, answers: Record<number, number>) => {
    timer.pause();
    setFinalScore({ score, total, answers });
    setPhase('review');

    if (examId) {
      const questionIds = filteredQuestions.map((q) => q.id);
      const answerMap: Record<string, number> = {};
      Object.entries(answers).forEach(([key, val]) => {
        answerMap[questionIds[parseInt(key, 10)]] = val;
      });

      recordExamAttempt({
        examId,
        examType: examMeta?.type ?? 'mock',
        questions: questionIds,
        answers: answerMap,
        score,
        totalQuestions: total,
        timeTaken: timer.elapsedSeconds,
        timeLimit: (examMeta?.timeLimit ?? 60) * 60,
        startedAt,
        completedAt: new Date().toISOString(),
        status: 'completed',
      });
    }
  }, [examId, examMeta, filteredQuestions, recordExamAttempt, startedAt, timer]);

  const handleQuit = () => {
    timer.pause();
    navigate('/exams');
  };

  // Show 404 if exam not found
  if (!examMeta || questions.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h1>Exam not found</h1>
          <p>The exam &quot;{examId}&quot; could not be found.</p>
          <Link to="/exams" className={styles.backLink}>← Back to Exams</Link>
        </div>
      </div>
    );
  }

  const bestScore = getExamBestScore(examMeta.id);

  if (phase === 'setup') {
    return (
      <div className={styles.container}>
        <Link to="/exams" className={styles.backLink}>← Back to Exams</Link>

        <div className={styles.setupHero}>
          <div className={styles.setupMeta}>
            <span className={styles.typeBadge}>{examMeta.type === 'mock' ? 'Mock Exam' : 'Practice Exam'}</span>
            <span className={styles.timeBadge}>{examMeta.timeLimit} min</span>
          </div>
          <h1 className={styles.title}>{examMeta.title}</h1>
          <p className={styles.description}>{examMeta.description}</p>
          <div className={styles.setupInfo}>
            <span>{examMeta.questionCount} questions</span>
            <span>·</span>
            <span>Pass mark: 75%</span>
            {bestScore !== undefined && (
              <>
                <span>·</span>
                <span className={styles.bestScore}>Best: {bestScore}%</span>
              </>
            )}
          </div>
        </div>

        <div className={styles.setupOptions}>
          <label className={styles.optionRow}>
            <span className={styles.optionLabel}>Feedback mode</span>
            <select
              className={styles.select}
              value={config.feedbackMode}
              onChange={(e) => setConfig((c) => ({
                ...c,
                feedbackMode: e.target.value as 'instant' | 'delayed',
              }))}
            >
              <option value="instant">Instant — see answer after each question</option>
              <option value="delayed">Delayed — review all at the end</option>
            </select>
          </label>

          <label className={styles.optionRow}>
            <span className={styles.optionLabel}>Question order</span>
            <select
              className={styles.select}
              value={config.questionOrder}
              onChange={(e) => setConfig((c) => ({
                ...c,
                questionOrder: e.target.value as 'sequential' | 'random',
              }))}
            >
              <option value="sequential">Sequential</option>
              <option value="random">Randomized</option>
            </select>
          </label>

          <label className={styles.optionRow}>
            <span className={styles.optionLabel}>Number of questions</span>
            <select
              className={styles.select}
              value={config.questionCount}
              onChange={(e) => setConfig((c) => ({
                ...c,
                questionCount: parseInt(e.target.value, 10),
              }))}
            >
              {Math.min(10, filteredQuestions.length) >= 10 && <option value={10}>10</option>}
              {Math.min(20, filteredQuestions.length) >= 20 && <option value={20}>20</option>}
              {Math.min(30, filteredQuestions.length) >= 30 && <option value={30}>30</option>}
              <option value={filteredQuestions.length}>All ({filteredQuestions.length})</option>
            </select>
          </label>
        </div>

        <div className={styles.setupActions}>
          <button type="button" className={styles.startBtn} onClick={handleStart}>
            Start {examMeta.type === 'mock' ? 'Mock' : 'Practice'} Exam
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'review' && finalScore) {
    const percentage = Math.round((finalScore.score / finalScore.total) * 100);
    const passed = percentage >= 75;

    return (
      <div className={styles.container}>
        <div className={styles.resultHero}>
          <div className={`${styles.resultScore} ${passed ? styles.pass : styles.fail}`}>
            {finalScore.score}/{finalScore.total}
          </div>
          <div className={styles.resultVerdict}>
            {passed ? 'Nice work — that\'s a pass!' : 'Not this time — keep going'}
          </div>
          <div className={styles.resultMeta}>
            {percentage}% correct · Pass mark: 75% · Time: {timer.elapsedSeconds >= 60
              ? `${Math.floor(timer.elapsedSeconds / 60)}m ${timer.elapsedSeconds % 60}s`
              : `${timer.elapsedSeconds}s`
            }
          </div>
        </div>

        <div className={styles.resultActions}>
          <button
            type="button"
            className={styles.startBtn}
            onClick={() => {
              setPhase('setup');
              setFinalScore(null);
              timer.reset();
              setStartedAt('');
            }}
          >
            Retake Exam
          </button>
          <Link to="/exams" className={styles.backToList}>
            Back to Exams
          </Link>
        </div>
      </div>
    );
  }

  // Taking phase — show quiz + timer
  return (
    <div className={styles.container}>
      <div className={styles.examHeader}>
        <div className={styles.examTitleBar}>
          <button type="button" className={styles.quitBtn} onClick={handleQuit}>
            ✕ Quit
          </button>
          <span className={styles.examName}>{examMeta.title}</span>
          <Timer
            state={timer.state}
            formattedTime={timer.formattedTime}
            percentage={timer.percentage}
            onPause={timer.pause}
            onResume={timer.resume}
          />
        </div>
      </div>

      <div className={styles.quizArea}>
        <Quiz
          questions={filteredQuestions}
          config={config}
          onComplete={handleComplete}
          onCancel={handleQuit}
        />
      </div>
    </div>
  );
}
