// =========================================================================
// Captain Corgi Hub — TopicCard Component
// Expandable accordion card with markdown body rendering
// =========================================================================

import { useState } from 'react';
import styles from './TopicCard.module.css';

interface TopicCardProps {
  id: string;
  name: string;
  icon: string;
  body: string;
  index: number;
}

export function TopicCard({ id, name, icon, body, index }: TopicCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.card} ${isOpen ? styles.open : ''}`}>
      <button
        type="button"
        className={styles.header}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`topic-${id}`}
      >
        <span className={styles.number}>{index + 1}</span>
        <span className={styles.icon} aria-hidden="true">{icon}</span>
        <span className={styles.name}>{name}</span>
        <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} aria-hidden="true">
          ▾
        </span>
      </button>
      {isOpen && (
        <div id={`topic-${id}`} className={styles.body}>
          <div className={styles.bodyContent} dangerouslySetInnerHTML={{ __html: body }} />
        </div>
      )}
    </div>
  );
}
