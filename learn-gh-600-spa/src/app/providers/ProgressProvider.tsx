// =========================================================================
// Captain Corgi Hub — ProgressProvider Context
// Wraps useProgress for app-wide access
// =========================================================================

import { createContext, useContext, type ReactNode } from 'react';
import { useProgress } from '@/hooks/useProgress';

type ProgressContextValue = ReturnType<typeof useProgress>;

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const progressState = useProgress();

  return (
    <ProgressContext.Provider value={progressState}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgressContext() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgressContext must be used within a ProgressProvider');
  }
  return context;
}
