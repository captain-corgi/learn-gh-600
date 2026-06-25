// =========================================================================
// Captain Corgi Hub — ProgressBar Component
// Animated progress bar with gradient fill
// =========================================================================

import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  value: number; // 0-100
  variant?: 'accent' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
}

export function ProgressBar({
  value,
  variant = 'accent',
  size = 'md',
  showLabel = false,
  label,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const displayLabel = label ?? `${Math.round(clamped)}%`;

  return (
    <div className={`${styles.container} ${styles[size]}`}>
      <div className={styles.track}>
        <div
          className={`${styles.fill} ${styles[variant]}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && <span className={styles.label}>{displayLabel}</span>}
    </div>
  );
}
