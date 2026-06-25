// =========================================================================
// Captain Corgi Hub — Badge Component
// Reusable badge for status, scores, and labels
// =========================================================================

import styles from './Badge.module.css';

type BadgeVariant = 'accent' | 'success' | 'warning' | 'danger' | 'neutral' | 'outline';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  showDot?: boolean;
}

export function Badge({
  children,
  variant = 'accent',
  size = 'md',
  showDot = false,
}: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${styles[size]}`}>
      {showDot && <span className={styles.dot} />}
      {children}
    </span>
  );
}
