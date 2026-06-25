import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DOMAINS, getDomainQuestionCount } from '@/lib/data';
import { useProgress } from '@/hooks/useProgress';
import { Badge } from '@/components/ui/Badge';
import styles from './StudyPlan.module.css';

export function StudyPlan() {
  const { t } = useTranslation();
  const { isDomainPassed, getDomainScore } = useProgress();

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>{t('studyPlan.title')}</h1>
        <p className={styles.description}>
          {t('studyPlan.description')}
        </p>
      </div>

      <div className={styles.domainGrid}>
        {DOMAINS.map((domain) => {
          const questionCount = getDomainQuestionCount(domain.id);
          return (
            <Link
              key={domain.id}
              to={`/study-plan/${domain.id}`}
              className={styles.domainCard}
            >
              <div className={styles.domainHeader}>
                <span className={styles.domainIcon}>{domain.icon}</span>
                <span className={styles.domainWeight}>{domain.weight}</span>
              </div>
              <h3 className={styles.domainName}>{domain.name}</h3>
              <p className={styles.domainDescription}>{domain.description}</p>
              <div className={styles.domainFooter}>
                <span className={styles.questionCount}>{t('studyPlan.questions', { count: questionCount })}</span>
                {isDomainPassed(domain.id) ? (
                  <Badge variant="success" size="sm">Passed</Badge>
                ) : getDomainScore(domain.id) ? (
                  <Badge variant="warning" size="sm">{getDomainScore(domain.id)!.score}/{getDomainScore(domain.id)!.total}</Badge>
                ) : (
                  <span className={styles.arrow}>→</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
