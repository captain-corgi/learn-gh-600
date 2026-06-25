// =========================================================================
// Captain Corgi Hub — useTimer Hook
// Countdown timer with pause/resume and warning states
// =========================================================================

import { useState, useEffect, useRef, useCallback } from 'react';

export type TimerState = 'idle' | 'running' | 'paused' | 'expired';

interface UseTimerOptions {
  durationMinutes: number;
  onExpire?: () => void;
  warningAtMinutes?: number;
  dangerAtMinutes?: number;
}

interface UseTimerReturn {
  state: TimerState;
  remainingSeconds: number;
  totalSeconds: number;
  percentage: number;
  formattedTime: string;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  elapsedSeconds: number;
}

export function useTimer({
  durationMinutes,
  onExpire,
  warningAtMinutes: _warningAtMinutes = 15,
  dangerAtMinutes: _dangerAtMinutes = 5,
}: UseTimerOptions): UseTimerReturn {
  const totalSeconds = durationMinutes * 60;
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);
  const [state, setState] = useState<TimerState>('idle');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pausedRemainingRef = useRef(totalSeconds);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    if (!startTimeRef.current) return;

    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
    const remaining = Math.max(0, pausedRemainingRef.current - elapsed);

    setRemainingSeconds(remaining);

    if (remaining <= 0) {
      clearTimer();
      setState('expired');
      onExpire?.();
    }
  }, [clearTimer, onExpire]);

  const start = useCallback(() => {
    clearTimer();
    pausedRemainingRef.current = totalSeconds;
    startTimeRef.current = Date.now();
    setRemainingSeconds(totalSeconds);
    setState('running');

    intervalRef.current = setInterval(tick, 1000);
  }, [clearTimer, totalSeconds, tick]);

  const pause = useCallback(() => {
    if (state !== 'running') return;
    clearTimer();
    pausedRemainingRef.current = remainingSeconds;
    setState('paused');
  }, [state, remainingSeconds, clearTimer]);

  const resume = useCallback(() => {
    if (state !== 'paused') return;
    startTimeRef.current = Date.now();
    setState('running');
    intervalRef.current = setInterval(tick, 1000);
  }, [state, tick]);

  const reset = useCallback(() => {
    clearTimer();
    setRemainingSeconds(totalSeconds);
    pausedRemainingRef.current = totalSeconds;
    startTimeRef.current = null;
    setState('idle');
  }, [clearTimer, totalSeconds]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  const percentage = totalSeconds > 0
    ? Math.round((remainingSeconds / totalSeconds) * 100)
    : 0;

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return {
    state,
    remainingSeconds,
    totalSeconds,
    percentage,
    formattedTime,
    start,
    pause,
    resume,
    reset,
    elapsedSeconds: totalSeconds - remainingSeconds,
  };
}
