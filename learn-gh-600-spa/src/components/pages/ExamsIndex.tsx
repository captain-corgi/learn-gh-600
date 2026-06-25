import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getExamCatalog, getTotalQuestions } from '@/lib/data';
import { useProgress } from '@/hooks/useProgress';
import { ExamHistory } from '@/components/ui/ExamHistory';
import styles from './ExamsIndex.module.css';

export function ExamsIndex() {
  const { t } = useTranslation();
  const catalog = getExamCatalog();
  const { getExamBestScore } = useProgress();
  const mockExams = catalog.filter((e) => e.type === 'mock');
  const practiceExams = catalog.filter((e) => e.type === 'practice');
  const totalQuestions = getTotalQuestions();

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>{t('exams.title')}</h1>
        <p className={styles.description}>
          {t('exams.description', { count: catalog.length, totalQuestions })}
        </p>
      </div>

      <section>
        <h2 className={styles.sectionTitle}>{t('exams.mockExams')}</h2>
        <p className={styles.sectionDescription}>
          {t('exams.mockDescription')}
        </p>
        <div className={styles.examGrid}>
          {mockExams.map((exam) => (
            <Link key={exam.id} to={`/exams/${exam.id}`} className={styles.examCard}>
              <div className={styles.examMeta}>
                <span className={styles.badge}>{t('exams.mockExams')}</span>
                <span className={styles.badgeTime}>{exam.timeLimit} {t('exams.minutes')}</span>
              </div>
              <h3 className={styles.examTitle}>{exam.title}</h3>
              <p className={styles.examDescription}>{exam.description}</p>
              <div className={styles.examInfo}>{t('exams.questions', { count: exam.questionCount })}</div>
              {getExamBestScore(exam.id) !== undefined && (
                <div className={styles.bestScore}>Best: {getExamBestScore(exam.id)}%</div>
              )}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>{t('exams.practiceExams')}</h2>
        <p className={styles.sectionDescription}>
          {t('exams.practiceDescription')}
        </p>
        <div className={styles.examGrid}>
          {practiceExams.map((exam) => (
            <Link key={exam.id} to={`/exams/${exam.id}`} className={styles.examCard}>
              <div className={styles.examMeta}>
                <span className={styles.badge}>{t('exams.practiceExams')}</span>
                <span className={styles.badgeTime}>{exam.timeLimit} {t('exams.minutes')}</span>
              </div>
              <h3 className={styles.examTitle}>{exam.title}</h3>
              <p className={styles.examDescription}>{exam.description}</p>
              <div className={styles.examInfo}>{t('exams.questions', { count: exam.questionCount })}</div>
              {getExamBestScore(exam.id) !== undefined && (
                <div className={styles.bestScore}>Best: {getExamBestScore(exam.id)}%</div>
              )}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <ExamHistory />
      </section>
    </div>
  );
}
