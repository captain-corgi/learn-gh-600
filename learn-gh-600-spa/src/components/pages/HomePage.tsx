import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getExamCount, getTotalQuestions, DOMAINS } from '@/lib/data';
import styles from './HomePage.module.css';

export function HomePage() {
  const { t } = useTranslation();
  const examCount = getExamCount();
  const totalQuestions = getTotalQuestions();

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>{t('home.eyebrow')}</span>
          <h1 className={styles.title}>{t('home.title')}</h1>
          <p className={styles.description}>
            {t('home.description', { totalQuestions, examCount: examCount.total })}
          </p>
          <div className={styles.actions}>
            <Link to="/study-plan" className={styles.primaryButton}>
              {t('home.startLearning')}
            </Link>
            <Link to="/exams" className={styles.secondaryButton}>
              {t('home.practiceExams')}
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.stats}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>6</span>
          <span className={styles.statLabel}>{t('home.domains')}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{totalQuestions}+</span>
          <span className={styles.statLabel}>{t('home.questions')}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{examCount.total}</span>
          <span className={styles.statLabel}>{t('home.examSets')}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>8</span>
          <span className={styles.statLabel}>{t('home.labs')}</span>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.featureCard}>
          <span className={styles.featureIcon}>📚</span>
          <h3 className={styles.featureTitle}>{t('features.studyPlan.title')}</h3>
          <p className={styles.featureDescription}>
            {t('features.studyPlan.description', { count: DOMAINS.length })}
          </p>
        </div>
        <div className={styles.featureCard}>
          <span className={styles.featureIcon}>📝</span>
          <h3 className={styles.featureTitle}>{t('features.questions.title', { totalQuestions })}</h3>
          <p className={styles.featureDescription}>
            {t('features.questions.description', { mockCount: examCount.mock, practiceCount: examCount.practice })}
          </p>
        </div>
        <div className={styles.featureCard}>
          <span className={styles.featureIcon}>🔬</span>
          <h3 className={styles.featureTitle}>{t('features.labs.title')}</h3>
          <p className={styles.featureDescription}>
            {t('features.labs.description')}
          </p>
        </div>
      </section>
    </div>
  );
}
