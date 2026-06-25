// =========================================================================
// Captain Corgi Hub — ExamHistory Component
// Table of past exam attempts with scores, timing, and trends
// =========================================================================

import { useProgress } from '@/hooks/useProgress';
import { getExamById } from '@/lib/data';
import styles from './ExamHistory.module.css';

export function ExamHistory() {
  const { progress } = useProgress();
  const attempts = progress.exams.completed;

  if (attempts.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No exam attempts yet. Start a practice or mock exam to see your history here.</p>
      </div>
    );
  }

  // Sort by most recent first
  const sorted = [...attempts].sort(
    (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  );

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Exam History</h3>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Exam</th>
              <th>Score</th>
              <th>Result</th>
              <th>Time</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((attempt, i) => {
              const meta = getExamById(attempt.examId);
              const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
              const passed = percentage >= 75;
              const minutes = Math.floor(attempt.timeTaken / 60);
              const seconds = attempt.timeTaken % 60;
              const date = new Date(attempt.completedAt);
              const dateStr = date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <tr key={i} className={styles.row}>
                  <td className={styles.examCell}>
                    <span className={styles.examType}>{attempt.examType}</span>
                    <span className={styles.examName}>{meta?.title ?? attempt.examId}</span>
                  </td>
                  <td className={styles.scoreCell}>
                    <span className={styles.scoreValue}>{attempt.score}/{attempt.totalQuestions}</span>
                    <span className={styles.scorePercent}>{percentage}%</span>
                  </td>
                  <td>
                    <span className={`${styles.resultBadge} ${passed ? styles.passed : styles.failed}`}>
                      {passed ? 'Pass' : 'Fail'}
                    </span>
                  </td>
                  <td className={styles.timeCell}>
                    {minutes}m {seconds.toString().padStart(2, '0')}s
                  </td>
                  <td className={styles.dateCell}>{dateStr}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
