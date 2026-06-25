import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { DOMAINS, getDomainQuestions } from '@/lib/data';
import type { Question } from '@/lib/types';
import { TopicCard } from '@/components/domain/TopicCard';
import styles from './DomainDetail.module.css';

export function DomainDetail() {
  const { domainId } = useParams<{ domainId: string }>();
  const domainIndex = parseInt(domainId ?? '0', 10);
  const domain = DOMAINS[domainIndex];

  const [activeTab, setActiveTab] = useState<'learn' | 'quiz' | 'resources'>('learn');
  const [quizQuestions] = useState<Question[]>(() =>
    getDomainQuestions('mock-1', domainIndex).slice(0, 5)
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  if (!domain) {
    return (
      <div className={styles.container}>
        <h1>Domain not found</h1>
        <Link to="/study-plan">← Back to Study Plan</Link>
      </div>
    );
  }

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === quizQuestions[currentQuestion]?.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((c) => c + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizComplete(false);
  };

  const q = quizQuestions[currentQuestion];

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroTop}>
          <span className={styles.heroIcon}>{domain.icon}</span>
          <h1 className={styles.title}>{domain.name}</h1>
          <span className={styles.badge}>{domain.weight} of exam</span>
        </div>
        <p className={styles.heroDescription}>{domain.description}</p>
      </div>

      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${activeTab === 'learn' ? styles.active : ''}`}
          onClick={() => setActiveTab('learn')}
        >
          Learn
        </button>
        <button
          type="button"
          className={`${styles.tab} ${activeTab === 'quiz' ? styles.active : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          Quiz Check
        </button>
        <button
          type="button"
          className={`${styles.tab} ${activeTab === 'resources' ? styles.active : ''}`}
          onClick={() => setActiveTab('resources')}
        >
          Resources
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'learn' && (
          <div className={styles.learnContent}>
            {domain.topics.length > 0 ? (
              <div className={styles.topicList}>
                {domain.topics.map((topic, i) => (
                  <TopicCard
                    key={topic.id}
                    id={topic.id}
                    name={topic.name}
                    icon={topic.icon}
                    body={topic.body}
                    index={i}
                  />
                ))}
              </div>
            ) : (
              <p className={styles.placeholder}>
                Topics for this domain are being prepared. For now, explore the quiz to test your knowledge of {domain.name}.
              </p>
            )}
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => setActiveTab('quiz')}
            >
              Start Quiz
            </button>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className={styles.quizContent}>
            {quizComplete ? (
              <div className={styles.quizResult}>
                <div className={`${styles.score} ${score >= Math.ceil(quizQuestions.length * 0.75) ? styles.pass : styles.fail}`}>
                  {score}/{quizQuestions.length}
                </div>
                <div className={styles.verdict}>
                  {score >= Math.ceil(quizQuestions.length * 0.75) ? 'Domain passed!' : 'Not passed yet'}
                </div>
                <p className={styles.resultSub}>
                  You need {Math.ceil(quizQuestions.length * 0.75)}/{quizQuestions.length} correct to pass.
                </p>
                <div className={styles.resultActions}>
                  <button type="button" className={styles.primaryButton} onClick={handleRetry}>
                    Retry Quiz
                  </button>
                  <Link to="/study-plan" className={styles.secondaryButton}>
                    Back to Study Plan
                  </Link>
                </div>
              </div>
            ) : q ? (
              <div className={styles.quizWrap}>
                <div className={styles.quizMeta}>
                  <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                  <span>Score: {score}</span>
                </div>
                <div className={styles.questionText}>{q.question}</div>
                <div className={styles.options}>
                  {q.options.map((opt, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`${styles.option} ${
                        selectedAnswer !== null
                          ? i === q.correctIndex
                            ? styles.correct
                            : i === selectedAnswer
                            ? styles.wrong
                            : ''
                          : ''
                      }`}
                      onClick={() => handleAnswer(i)}
                      disabled={selectedAnswer !== null}
                    >
                      <span className={styles.optionLetter}>{'ABCD'[i]}</span>
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>
                {showExplanation && (
                  <div className={styles.explanation}>
                    <strong>Explanation:</strong> {q.explanation}
                  </div>
                )}
                {selectedAnswer !== null && (
                  <button type="button" className={styles.primaryButton} onClick={handleNext}>
                    {currentQuestion < quizQuestions.length - 1 ? 'Next' : 'See Results'}
                  </button>
                )}
              </div>
            ) : (
              <p>No quiz questions available for this domain.</p>
            )}
          </div>
        )}

        {activeTab === 'resources' && (
          <div className={styles.resourcesContent}>
            <h3>Official Resources</h3>
            <ul className={styles.resourceList}>
              <li>
                <a href="https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-600" target="_blank" rel="noopener noreferrer">
                  GH-600 Official Study Guide ↗
                </a>
              </li>
              <li>
                <a href="https://docs.github.com/en/copilot/concepts/agents/copilot-memory" target="_blank" rel="noopener noreferrer">
                  GitHub Docs: Copilot Memory ↗
                </a>
              </li>
              <li>
                <a href="https://docs.github.com/en/copilot/concepts/agents/cloud-agent/mcp-and-cloud-agent" target="_blank" rel="noopener noreferrer">
                  GitHub Docs: MCP and Cloud Agent ↗
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
