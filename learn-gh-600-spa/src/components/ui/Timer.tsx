// =========================================================================
// Captain Corgi Hub — Timer Component
// Visual countdown with circular SVG ring and warning states
// =========================================================================

import type { TimerState } from '@/hooks/useTimer';
import styles from './Timer.module.css';

interface TimerProps {
  state: TimerState;
  formattedTime: string;
  percentage: number;
  onPause: () => void;
  onResume: () => void;
}

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function Timer({
  state,
  formattedTime,
  percentage,
  onPause,
  onResume,
}: TimerProps) {
  const strokeDashoffset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;

  // Determine warning state based on remaining time percentage
  const isDanger = percentage <= 10; // ≤ 10% remaining
  const isWarning = percentage <= 25 && !isDanger; // ≤ 25% remaining

  const colorClass = isDanger
    ? styles.danger
    : isWarning
    ? styles.warning
    : styles.normal;

  return (
    <div className={styles.container} data-state={state}>
      <svg className={`${styles.ring} ${colorClass}`} viewBox="0 0 100 100">
        {/* Background ring */}
        <circle
          className={styles.ringBg}
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          strokeWidth="6"
        />
        {/* Progress ring */}
        <circle
          className={`${styles.ringFill} ${colorClass}`}
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 50 50)"
        />
      </svg>

      <div className={styles.timeDisplay}>
        <span className={styles.time}>{formattedTime}</span>
        <span className={styles.label}>
          {state === 'idle' ? 'Ready' : state === 'expired' ? 'Time up' : 'remaining'}
        </span>
      </div>

      {state === 'running' && (
        <button
          type="button"
          className={styles.controlBtn}
          onClick={onPause}
          aria-label="Pause timer"
        >
          ⏸
        </button>
      )}
      {state === 'paused' && (
        <button
          type="button"
          className={styles.controlBtn}
          onClick={onResume}
          aria-label="Resume timer"
        >
          ▶
        </button>
      )}
    </div>
  );
}
